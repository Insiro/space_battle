import { Game } from "./game.js";
import { Bullet } from "./objects/bullet.js";
import { SuperBullet } from "./objects/superBullet.js";
var USE_WIREFRAME = false;

var loadingScreen = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(90, 1280 / 720, 0.1, 100),
    box: new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshBasicMaterial({ color: 0x4444ff })),
};
let dialog;
// Bullets array

function init() {
    let urlQuery = new URLSearchParams(window.location.search);
    let modelInfo = JSON.parse(urlQuery.get("q"));
    dialog = document.getElementById("dialog");
    dialog.childNodes[8].onclick = () => saveScores();
    dialog.childNodes[11].onclick = () => {
        dialog.removeAttribute("open");
        window.game.reset();
        render();
    };
    let infoBoard = document.getElementById("infoBoard");
    window.game = new Game(infoBoard, modelInfo);
    const game = window.game;
    game.loadAll();
    game.reset();

    const light3 = new THREE.PointLight(0xc4c4c4, 0.8);
    light3.position.set(50, 50, 50);

    const scene = game.scene;
    scene.add(light3);
    //#region loading Screen
    loadingScreen.box.position.set(0, 0, 5);
    loadingScreen.camera.lookAt(loadingScreen.box.position);
    loadingScreen.scene.add(loadingScreen.box);
    //#endregion

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const light = new THREE.PointLight(0xffffff, 0.8, 18);
    light.position.set(-3, 6, -3);
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 25;
    scene.add(light);

    // Load models
    // REMEMBER: Loading in Javascript is asynchronous, so you need
    // to wrap the code in a function and pass it the index. If you
    // don't, then the index '_key' can change while the model is being
    // downloaded, and so the wrong model will be matched with the wrong
    // index key.
    const loader = new THREE.TextureLoader();
    const bgTexture = loader.load("res/bg.webp");
    scene.background = bgTexture;

    window.renderer = new THREE.WebGLRenderer();
    let renderer = window.renderer;
    renderer.setSize(1280, 720);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    let container = document.getElementById("renderer_container");
    container.appendChild(renderer.domElement);

    render();
}
// Runs when all resources are loaded

function render() {
    const game = window.game;
    // Play the loading screen until resources are loaded.
    if (!game.RESOURCES_LOADED) {
        loadingScreen.box.position.x -= 0.05;
        if (loadingScreen.box.position.x < -10) loadingScreen.box.position.x = 10;
        loadingScreen.box.position.y = Math.sin(loadingScreen.box.position.x);
        game.updateLoaded();
        window.renderer.render(loadingScreen.scene, loadingScreen.camera);
        requestAnimationFrame(render);
        return;
    }

    const player = game.player;
    player.update();
    //# region move objects
    game.bullets = game.bullets.filter((bullet) => {
        bullet.move(game.enemies);
        if (bullet.alive_time > 0) {
            return true;
        }
        game.scene.remove(bullet.model);
        return false;
    });

    game.superbullets = game.superbullets.filter((superbullet) => {
        superbullet.move(game.enemies);
        if (superbullet.alive_time > 0) {
            return true;
        }
        game.scene.remove(superbullet.model);
        return false;
    });
    for (const enemy of game.enemies) {
        enemy.move(game.scene, game.player);
        if (enemy.hp <= 0) {
            enemy.respawn(player);
            game.score++;
        }
    }
    for (const item of game.items) item.move(game.scene, game.player);
    for (const planet of game.planets) planet.move(game.scene, game.player);
    //for (const background of game.backgrounds) planet.move(game.scene, game.player);
    //#endregion
    keyboardAction();

    // position the gun in front of the camera
    window.renderer.render(game.scene, game.player.camera);

    if (player.hp <= 0) {
        gameOver();
        return;
    }
    game.updateInfoBoard();
    requestAnimationFrame(render);
}

function gameOver() {
    dialog.childNodes[1].innerText = window.game.score;
    dialog.childNodes[8].removeAttribute("disabled");
    dialog.setAttribute("open", "");
}
function saveScores() {
    dialog.childNodes[8].setAttribute("disabled", "");
    let name = dialog.childNodes[5].value;
    dialog.childNodes[5].value = "";
    let scoreList = JSON.parse(localStorage.getItem("scores")) ?? [];

    scoreList.push({ name: name, score: window.game.score });
    scoreList.sort((a, b) => b.score - a.score);
    scoreList.slice(0, 10);
    localStorage.setItem("scores", JSON.stringify(scoreList));
}
function keyboardAction() {
    let player = window.game.player;
    let keyboard = window.game.keyboard;
    if (keyboard[87]) player.key_w();
    if (keyboard[83]) player.key_s();
    if (keyboard[65]) player.key_a();
    if (keyboard[68]) player.key_d();
    if (keyboard[37]) player.key_lr(true);
    if (keyboard[39]) player.key_lr(false);

    // shoot a bullet
    if (keyboard[32] && player.canShoot <= 0) {
        // spacebar key
        // creates a bullet as a Mesh object
        if (player.bullettime == 0) {
            let bullet = new Bullet(player);
            window.game.bullets.push(bullet);
            window.game.scene.add(bullet.model);
            player.canShoot = 10;
        } else {
            let superbullet = new SuperBullet(player);
            window.game.bullets.push(superbullet);
            window.game.scene.add(superbullet.model);
            player.canShoot = 10;
        }
    }
}
window.addEventListener("keydown", (event) => (window.game.keyboard[event.keyCode] = true));
window.addEventListener("keyup", (event) => (window.game.keyboard[event.keyCode] = undefined));
window.onload = init;
