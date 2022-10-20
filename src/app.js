import { Player } from "./objects/player.js";
/** state of game is processing */
let gameState = false;
//#region game objects
let player = null;
let meteos = [];
let planets = [];
let items = [];
let bullets = [];
//#endregion

/** other objects like lights */
let otherObjets = [];
let renderer = null;
let screen = {
    scene: null,
    camera: null,
};

/** keyboad pressed state */
let keyboard = {};

function init() {
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    resetGame();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(1280, 720);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    document.body.appendChild(renderer.domElement);
    const loader = new THREE.TextureLoader();
    const bgTexture = loader.load("res/bg.webp");
    screen.scene.background = bgTexture;
    animate();
}

/** reset game states */
function resetGame() {
    gameState = true;
    // player = new Player(0,0,gltf, ()=>{});
    screen.scene = new THREE.Scene();
    screen.camera = new THREE.PerspectiveCamera(90, 1280 / 720, 0.1, 1000);

    // screen.scene.add(player.gltf.scene);
    for (const meteo of meteos) screen.scene.add(meteo.gltf.scene);
    for (const obj of otherObjets) screen.scene.add(obj.gltf.scene);
    for (const planet of planets) screen.scene.add(planet.gltf.scene);
    for (const item of items) screen.scene.add(item.gltf.scene);
    for (const bullet of bullets) screen.scene.add(bullet.gltf.scene);
}

function animate() {
    generateObjects();
    keyboardAction();
    moveObjects();

    renderer.render(screen.scene, screen.camera);
    if (gameState) {
        // requestAnimationFrame(animate);
    }
}

/**keyboard action */
function keyboardAction() {
    if (keyboard[87]) {
        // W key
    } else if (keyboard[83]) {
        // S key
    } else if (keyboard[65]) {
        // A key
    } else if (keyboard[68]) {
        // D key
    }
    // shoot a bullet
    if (keyboard[32] && player.canShoot <= 0) {
        //TODO: generate bullets
    }
}

/**
 * generate random new Objets
 */
function generateObjects() {}

/**
 * move Object points, collision process
 */
function moveObjects() {
    for (const meteo of meteos) meteo.move();
    for (const planet of planets) planet.move();
    for (const item of items) item.move();
    for (const bullet of bullets) bullet.move();
    //TODO: remove too far object
    //TODO: collision check, work with player, Bullet
}

function keyDown(event) {
    keyboard[event.keyCode] = true;
}

function keyUp(event) {
    keyboard[event.keyCode] = false;
}

window.onload = init;
