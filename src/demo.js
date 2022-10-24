import { Meteor } from "./objects/mateor.js";
import { Oil } from "./objects/item/oil.js";
import { Moon } from "./objects/planet/moon.js";
var scene, camera;

var crateTexture, crateNormalMap, crateBumpMap;

var keyboard = {};
var player = { height: 1.8, speed: 0.2, turnSpeed: Math.PI * 0.02, canShoot: 0, hp: 3, Score: 0, inTime: 0 };
var USE_WIREFRAME = false;

window.game = {};

function onResourcesLoaded() {}

var loadingManager = null;
var RESOURCES_LOADED = false;

function resetGame() {
    let camera = new THREE.PerspectiveCamera(90, 1280 / 720, 0.1, 1000);
    let clock = new THREE.Clock();
    let scene = new THREE.Scene();

    window.game.scene = scene;
    window.game.camera = camera;
    window.game.clock = clock;

    let light3 = new THREE.PointLight(0xc4c4c4, 0.8);
    light3.position.set(50, 50, 50);
    scene.add(light3);

    let box = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshBasicMaterial({ color: 0x4444ff }));
    box.position.set(0, 0, 5);
    window.game.box = box;
    game.scene.add(game.box);

    //#region add meshes on scene
    let mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhongMaterial({ color: 0xff4444, wireframe: USE_WIREFRAME }));
    mesh.position.y += 1;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);

    let meshFloor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20, 10, 10), new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: USE_WIREFRAME }));
    meshFloor.rotation.x -= Math.PI / 2;
    meshFloor.receiveShadow = true;
    scene.add(meshFloor);
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    let light = new THREE.PointLight(0xffffff, 0.8, 18);
    light.position.set(-3, 6, -3);
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 25;
    scene.add(light);
    //#endregion

    game.meteors = [
        new Meteor(game.gltfLoader, scene),
        new Meteor(game.gltfLoader, scene),
        new Meteor(game.gltfLoader, scene),
        new Meteor(game.gltfLoader, scene),
        new Meteor(game.gltfLoader, scene),
        new Meteor(game.gltfLoader, scene),
        new Meteor(game.gltfLoader, scene),
    ];
    game.planets = [new Moon(game.gltfLoader, scene)];
    game.items = [new Oil(game.gltfLoader, scene)];
    // let textureLoader = new THREE.TextureLoader(loadingManager);
    // crateTexture = textureLoader.load("./crate0/crate0_diffuse.jpg");
    // crateBumpMap = textureLoader.load("./crate0/crate0_bump.jpg");
    // crateNormalMap = textureLoader.load("./crate0/crate0_normal.jpg");

    // Load models
    // REMEMBER: Loading in Javascript is asynchronous, so you need
    // to wrap the code in a function and pass it the index. If you
    // don't, then the index '_key' can change while the model is being
    // downloaded, and so the wrong model will be matched with the wrong
    // index key.

    camera.position.set(0, player.height, -5);
    camera.lookAt(new THREE.Vector3(0, player.height, 0));

    document.body.appendChild(window.game.renderer.domElement);
    const loader = new THREE.TextureLoader();
    const bgTexture = loader.load("res/bg.webp");
    scene.background = bgTexture;
}

function init() {
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(1280, 720);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    window.game = {
        scene: null,
        game: null,
        camera: null,
        box: null,
        loadingManager: new THREE.LoadingManager(),
        renderer: null,
        items: [],
        planets: [],
        meteors: [],
        bullets: [],
        gltfLoader: new THREE.GLTFLoader(),
    };
    window.game.loadingManager.onProgress = (item, loaded, total) => console.log(item, loaded, total);
    window.game.loadingManager.onLoad = function () {
        console.log("loaded all resources");
        RESOURCES_LOADED = true;
        onResourcesLoaded();
    };
    game = window.game;
    game.renderer = renderer;
    document.body.appendChild(renderer.domElement);

    resetGame();
    render();
}

function render() {
    // Play the loading screen until resources are loaded.
    if (RESOURCES_LOADED == false) {
        requestAnimationFrame(render);

        game.box.position.x -= 0.05;
        if (game.box.position.x < -10) game.box.position.x = 10;
        game.box.position.y = Math.sin(game.box.position.x);

        game.renderer.render(game.scene, game.camera);
        return;
    }

    if (player.inTime > 0) {
        player.inTime -= 0.05;
    } else {
        player.speed = 0.2;
        player.inTime = 0;
    }
    keyboardAction();
    moveObjects();
    game.renderer.render(scene, camera);
}
function keyboardAction() {
    if (keyboard[87]) {
        // W key
        camera.position.x -= Math.sin(camera.rotation.y) * 2 * player.speed;
        camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
    } else if (keyboard[83]) {
        // S key
        camera.position.x -= Math.sin(camera.rotation.y) * 0.5 * player.speed;
        camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
    } else if (keyboard[65]) {
        // A key
        camera.position.x -= Math.sin(camera.rotation.y) * 2 * player.speed;
        camera.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y + Math.PI / 2) * player.speed;
    } else if (keyboard[68]) {
        // D key
        camera.position.x -= Math.sin(camera.rotation.y) * 2 * player.speed;
        camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * player.speed;
    }

    if (keyboard[37]) {
        // left arrow key
        camera.rotation.y -= player.turnSpeed;
    }
    if (keyboard[39]) {
        // right arrow key
        camera.rotation.y += player.turnSpeed;
    }

    if (keyboard[32] && player.canShoot <= 0) {
        let bullet = new bullet(scene, player);
        setTimeout(function () {
            bullet.alive = false;
            scene.remove(bullet);
        }, 1000);

        // add to scene, array, and set the delay to 10 frames
        game.bullets.push(bullet);
        player.canShoot = 10;
    }
}
function moveObjects() {
    camera.updateMatrixWorld();
    for (let mateo of game.meteors) mateo.move();
    for (let item of game.items) item.move();
    for (let planet of game.planets) planet.move();
    for (var index = 0; index < game.bullets.length; index += 1) {
        if (game.bullets[index] === undefined) continue;
        if (game.bullets[index].alive == false) {
            game.bullets.splice(index, 1);
            continue;
        }
        game.bullets[index].move();
    }

    // item code ends here
}

window.addEventListener("keydown", (event) => (keyboard[event.keyCode] = true));
window.addEventListener("keyup", (event) => (keyboard[event.keyCode] = false));
window.onload = init;
