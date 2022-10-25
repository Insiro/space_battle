import { loadObjects } from "./objects/object.js";
import { Meteor } from "./objects/meteor.js";
import { Oil } from "./objects/item/oil.js";
import { Moon } from "./objects/moon.js";
import { Player } from "./objects/player.js";
var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;
var keyboard = {};
let player = new Player();
var USE_WIREFRAME = false;

var loadingScreen = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(90, 1280 / 720, 0.1, 100),
    box: new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshBasicMaterial({ color: 0x4444ff })),
};
var loadingManager = null;
var RESOURCES_LOADED = false;

/**@type {THREE.GLTFLoader} */

// Models index

var planets = [new Moon()];
var items = [new Oil()];
var meteors = [new Meteor(), new Meteor(), new Meteor(), new Meteor(), new Meteor(), new Meteor(), new Meteor(), new Meteor()];

// Meshes index
var meshes = {};

// Bullets array
var bullets = [];

async function init() {
    let gltfloader = new THREE.GLTFLoader();
    scene = new THREE.Scene();
    await loadObjects(meteors, gltfloader, scene);
    await loadObjects(items, gltfloader, scene);
    await loadObjects(planets, gltfloader, scene);
    camera = new THREE.PerspectiveCamera(90, 1280 / 720, 0.1, 1000);
    player.camera = camera;

    const light3 = new THREE.PointLight(0xc4c4c4, 0.8);
    light3.position.set(50, 50, 50);
    scene.add(light3);

    loadingScreen.box.position.set(0, 0, 5);
    loadingScreen.camera.lookAt(loadingScreen.box.position);
    loadingScreen.scene.add(loadingScreen.box);

    loadingManager = new THREE.LoadingManager();
    loadingManager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };
    loadingManager.onLoad = function () {
        console.log("loaded all resources");
        RESOURCES_LOADED = true;
    };

    mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhongMaterial({ color: 0xff4444, wireframe: USE_WIREFRAME }));
    mesh.position.y += 1;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);

    meshFloor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20, 10, 10), new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: USE_WIREFRAME }));
    meshFloor.rotation.x -= Math.PI / 2;
    meshFloor.receiveShadow = true;
    scene.add(meshFloor);

    ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    light = new THREE.PointLight(0xffffff, 0.8, 18);
    light.position.set(-3, 6, -3);
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 25;
    scene.add(light);

    var textureLoader = new THREE.TextureLoader(loadingManager);
    let crateNormalMap = textureLoader.load("crate0/crate0_normal.jpg");

    // Load models
    // REMEMBER: Loading in Javascript is asynchronous, so you need
    // to wrap the code in a function and pass it the index. If you
    // don't, then the index '_key' can change while the model is being
    // downloaded, and so the wrong model will be matched with the wrong
    // index key.

    camera.position.set(0, player.height, -5);
    camera.lookAt(new THREE.Vector3(0, player.height, 0));

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(1280, 720);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    document.body.appendChild(renderer.domElement);
    const loader = new THREE.TextureLoader();
    const bgTexture = loader.load("res/bg.webp");
    scene.background = bgTexture;
    render();
}

// Runs when all resources are loaded

function render() {
    // Play the loading screen until resources are loaded.
    if (RESOURCES_LOADED == false) {
        requestAnimationFrame(render);

        loadingScreen.box.position.x -= 0.05;
        if (loadingScreen.box.position.x < -10) loadingScreen.box.position.x = 10;
        loadingScreen.box.position.y = Math.sin(loadingScreen.box.position.x);

        renderer.render(loadingScreen.scene, loadingScreen.camera);
        return;
    }

    requestAnimationFrame(render);
    for (const meteor of meteors) meteor.move(camera, scene, player);
    for (const item of items) item.move(camera, player);

    // item code ends here
    player.move();

    for (const planet of planets) planet.move();
    // Uncomment for absurdity!
    // meshes["pirateship"].rotation.z += 0.01;

    // go through bullets array and update position
    // remove bullets when appropriate
    for (var index = 0; index < bullets.length; index += 1) {
        if (bullets[index] === undefined) continue;
        if (bullets[index].alive == false) {
            bullets.splice(index, 1);
            continue;
        }

        bullets[index].position.add(bullets[index].velocity);
    }
    keyboardAction();
    if (player.canShoot > 0) player.canShoot -= 1;

    // position the gun in front of the camera

    renderer.render(scene, camera);
}

function keyboardAction() {
    if (keyboard[87]) player.key_w();
    else if (keyboard[83]) player.key_s();
    else if (keyboard[65]) player.key_a();
    else if (keyboard[68]) player.key_d();
    if (keyboard[37]) player.key_lr(true);
    if (keyboard[39]) player.key_lr(false);

    // shoot a bullet
    if (keyboard[32] && player.canShoot <= 0) {
        // spacebar key
        // creates a bullet as a Mesh object
        var bullet = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        // this is silly.
        // var bullet = models.pirateship.mesh.clone();

        // position the bullet to come from the player's weapon
        bullet.position.set(camera.position.x, camera.position.y + 0.15, camera.position.z);

        // set the velocity of the bullet
        bullet.velocity = new THREE.Vector3(-Math.sin(camera.rotation.y), 0, Math.cos(camera.rotation.y));

        // after 1000ms, set alive to false and remove from scene
        // setting alive to false flags our update code to remove
        // the bullet from the bullets array
        bullet.alive = true;
        setTimeout(function () {
            bullet.alive = false;
            scene.remove(bullet);
        }, 1000);

        // add to scene, array, and set the delay to 10 frames
        bullets.push(bullet);
        scene.add(bullet);
        player.canShoot = 10;
    }
}
window.addEventListener("keydown", (event) => (keyboard[event.keyCode] = true));
window.addEventListener("keyup", (event) => (keyboard[event.keyCode] = false));

window.onload = init;
