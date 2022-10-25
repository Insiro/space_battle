import { loadObjects } from "./objects/object.js";
import { Meteor } from "./objects/meteor.js";
import { Oil } from "./objects/oil.js";
import { Moon } from "./objects/moon.js";
var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;
let clock, crateBumpMap, crateNormalMap, crateTexture;
var keyboard = {};
var player = { height: 1.8, speed: 0.2, turnSpeed: Math.PI * 0.02, canShoot: 0, hp: 3, Score: 0, inTime: 0 };
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
    clock = new THREE.Clock();

    let light3 = new THREE.PointLight(0xc4c4c4, 0.8);
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
        onResourcesLoaded();
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
    crateTexture = textureLoader.load("crate0/crate0_diffuse.jpg");
    crateBumpMap = textureLoader.load("crate0/crate0_bump.jpg");
    crateNormalMap = textureLoader.load("crate0/crate0_normal.jpg");

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
function onResourcesLoaded() {}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
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

    for (var _key in meteors) {
        (function (key) {
            camera.updateMatrixWorld();
            meteors[key].model.rotation.z -= meteors[key].rotation * 0.05;
            if (meteors[key].timetokill > 0) meteors[key].timetokill -= 0.05;

            if (meteors[key].timetokill <= 0) {
                meteors[key].reset -= 0.1;

                meteors[key].model.scale.set(0, 0, 0);

                meteors[key].y = 1000;
                meteors[key].z = 1000;

                if (meteors[key].reset < 0) {
                    meteors[key].initX = getRandomInt(0, 3) * 0.1 * (getRandomInt(-2, 2) > 0 ? 1 : -1);
                    meteors[key].initY = getRandomInt(0, 3) * 0.1 * (getRandomInt(-2, 2) > 0 ? 1 : -1);
                    meteors[key].initZ = getRandomInt(0, 3) * 0.1 * (getRandomInt(-2, 2) > 0 ? 1 : -1);
                    meteors[key].x = camera.position.x - 50 * (getRandomInt(-2, 2) > 0 ? 1 : -1);
                    meteors[key].y = camera.position.y - 50 * (getRandomInt(-2, 2) > 0 ? 1 : -1);
                    meteors[key].z = camera.position.z - 50 * (getRandomInt(-2, 2) > 0 ? 1 : -1);

                    meteors[key].model.scale.set(1, 1, 1);
                    meteors[key].reset = 1;
                    meteors[key].timetokill = getRandomInt(20, 30); ///getRandomInt(10,11)
                    console.log(key, "ini  ", meteors[key].initX, " ", meteors[key].initZ);
                    console.log(
                        key +
                            "  x " +
                            (meteors[key].x - camera.position.x) +
                            " z " +
                            (meteors[key].z - camera.position.z) +
                            "COND 1 X " +
                            (meteors[key].x - camera.position.x < 10 && meteors[key].x - camera.position.x > -10) +
                            "COND Z : " +
                            (meteors[key].z - camera.position.z > -10 && meteors[key].z - camera.position.z < 10)
                    );
                }
            } else {
                meteors[key].x += meteors[key].initX + getRandomInt(-12, 12) * 0.1;

                meteors[key].y += meteors[key].initY + getRandomInt(-12, 12) * 0.1;
                meteors[key].z += meteors[key].initZ + getRandomInt(-12, 12) * 0.1;

                meteors[key].model.position.set(meteors[key].x, meteors[key].y, meteors[key].z);

                meteors[key].light.position.set(meteors[key].x + 25, meteors[key].y + 25, meteors[key].z + 25);

                scene.add(meteors[key].light);

                console.log(player.inTime, " ", player.hp);

                if (
                    meteors[key].x - camera.position.x < 10 &&
                    meteors[key].x - camera.position.x > -10 &&
                    meteors[key].y - camera.position.y < 10 &&
                    meteors[key].y - camera.position.y > -10 &&
                    meteors[key].z - camera.position.z > -10 &&
                    meteors[key].z - camera.position.z < 10
                ) {
                    console.log("Player get hit by meteor " + key + " !");
                    meteors[key].reset = 0;
                    meteors[key].timetokill = 0;
                    if (player.inTime <= 0) {
                        player.inTime = 3;
                        player.hp -= 1;
                    }

                    if (player.hp <= 0) {
                        console.log("GAME OVER!");
                        player.speed = 0;
                    }
                    //TODO: HIT EFFECT
                }
            }
        })(_key);
    }

    // Meteor code ends

    for (var _key in items) {
        (function (key) {
            camera.updateMatrixWorld();
            items[key].model.rotation.z -= items[key].rotation * items[key].timetokill * 0.06;
            if (items[key].timetokill > 0) items[key].timetokill -= 0.05;
            if (items[key].timetokill <= 0) {
                items[key].reset -= 0.1;
                if (items[key].reset < 0) {
                    items[key].timetokill = getRandomInt(15, 30);
                    items[key].initX = camera.position.x + +getRandomInt(20, 100) * (getRandomInt(1, 2) == 2 ? 1 : -1);
                    items[key].initZ = camera.position.z + getRandomInt(20, 100) * (getRandomInt(1, 2) == 2 ? 1 : -1);
                    items[key].reset = 5;
                }
            }

            items[key].x = items[key].initX;
            items[key].y = camera.position.y;
            items[key].z = items[key].initZ;
            items[key].model.position.set(items[key].x, items[key].y, items[key].z);

            if (items[key].x - camera.position.x < 5 && items[key].x - camera.position.x > -5 && items[key].z - camera.position.z > -5 && items[key].z - camera.position.z < 5) {
                console.log("Player get item " + key + " !");
                items[key].timetokill = 0;
                items[key].reset = 0;
                if (key == "oil1") {
                    console.log("item1 obtained! hp +1 ");
                    player.inTime = 3;
                    player.speed = player.speed * 2;
                    player.hp += 1;
                }

                //TODO: HIT EFFECT
            }
        })(_key);
    }

    // item code ends here

    if (player.inTime > 0) {
        player.inTime -= 0.05;
    } else {
        player.speed = 0.2;
        player.inTime = 0;
    }
    var temp = 0.00005;
    temp *= 0.001;
    planets[0].model.rotation.x += 0.01;
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
    if (player.canShoot > 0) player.canShoot -= 1;

    // position the gun in front of the camera

    renderer.render(scene, camera);
}

function keyDown(event) {
    keyboard[event.keyCode] = true;
}

function keyUp(event) {
    keyboard[event.keyCode] = false;
}
window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);

window.onload = init;
