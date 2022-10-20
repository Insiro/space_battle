import { Player } from "./objects/player.js";

let player = null;
let meteos = [];
let planets = [];
let items = [];
let bullets = [];
let scene = null;
let camera = null;
let renderer = null;

function init() {
    resetGame();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, 1280 / 720, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(1280, 720);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    document.body.appendChild(renderer.domElement);
    const loader = new THREE.TextureLoader();
    const bgTexture = loader.load("res/bg.webp");
    scene.background = bgTexture;
    animate();
}
function resetGame() {
    player = new Player();
}
function animate() {
    generateObjects();
    moveObjects();

    render();
}

function generateObjects() {}

function moveObjects() {
    //TODO: remove too far object
    //TODO: collision check with player, Bullet
}

function render() {}

init();
