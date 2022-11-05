import { Game } from "./game.js";
import { Bullet } from "./objects/bullet/bullet.js";
import { SuperBullet } from "./objects/bullet/superBullet.js";

var loadingScreen = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(90, 1280 / 720, 0.1, 100),
    box: new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshBasicMaterial({ color: 0x4444ff })),
};
let dialog;

function init() {
    let urlQuery = new URLSearchParams(window.location.search);
    let modelInfo = JSON.parse(urlQuery.get("q"));
    let infoBoard = document.getElementById("infoBoard");
    window.rankBoard = document.getElementById("ranking");
    window.game = new Game(infoBoard, modelInfo);

    dialog = document.getElementById("dialog");
    dialog.childNodes[8].onclick = () => saveScores();
    dialog.childNodes[11].onclick = () => {
        dialog.removeAttribute("open");
        window.game.reset();
        render();
    };

    const game = window.game;
    game.loadAll();
    game.reset();

    //#region loading Screen
    loadingScreen.box.position.set(0, 0, 5);
    loadingScreen.camera.lookAt(loadingScreen.box.position);
    loadingScreen.scene.add(loadingScreen.box);
    //#endregion
    const scene = game.scene;
    const light = new THREE.PointLight(0xffffff, 0.8, 18);
    const light3 = new THREE.PointLight(0xc4c4c4, 0.8);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);

    light3.position.set(50, 50, 50);
    light.position.set(-3, 6, -3);
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 25;
    scene.add(light);
    scene.add(light3);
    scene.add(ambientLight);

    scene.background = new THREE.TextureLoader().load("res/bg.webp");

    window.renderer = new THREE.WebGLRenderer();
    const renderer = window.renderer;
    renderer.setSize(1280, 720);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    document.getElementById("renderer_container").appendChild(renderer.domElement);

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

    //# region move objects
    const player = game.player;
    const scene = game.scene;
    player.update();
    game.bullets = game.bullets.filter((bullet) => {
        bullet.move(game.enemies);
        if (bullet.alive_time > 0) return true;
        scene.remove(bullet.model);
        return false;
    });

    for (const enemy of game.enemies) {
        enemy.move(scene, player);
        if (enemy.hp <= 0) {
            enemy.respawn(player);
            game.score++;
        }
    }
    for (const item of game.items) item.move(scene, player);
    for (const planet of game.planets) planet.move(scene, player);
    //#endregion
    keyboardAction();

    window.renderer.render(scene, player.camera);
    if (player.hp <= 0) {
        gameOver();
        return;
    }
    game.updateInfoBoard();
    requestAnimationFrame(render);
}
function updateScoreBoard(scorelist) {
    const rankBoard = window.rankBoard;
    rankBoard.innerHTML = "";
    for (const score of scorelist) {
        console.log(score);
        const div = document.createElement("div");
        div.innerHTML = score.name + " : " + score.score + "<br/>";
        rankBoard.appendChild(div);
    }
}
function gameOver() {
    dialog.childNodes[1].innerText = window.game.score;
    dialog.childNodes[8].removeAttribute("disabled");
    dialog.setAttribute("open", "");
    const scoreList = JSON.parse(localStorage.getItem("scores")) ?? [];
    updateScoreBoard(scoreList);
}
function saveScores() {
    const name = dialog.childNodes[5].value;
    dialog.childNodes[8].setAttribute("disabled", "");
    dialog.childNodes[5].value = "";
    let scoreList = JSON.parse(localStorage.getItem("scores")) ?? [];
    scoreList.push({ name: name, score: window.game.score });
    scoreList.sort((a, b) => b.score - a.score);
    scoreList.slice(0, 5);
    localStorage.setItem("scores", JSON.stringify(scoreList));
    updateScoreBoard(scoreList);
}
function keyboardAction() {
    let player = window.game.player;
    let keyboard = window.game.keyboard;
    if (keyboard[87]) player.key_ws(true);
    if (keyboard[83]) player.key_ws(false);
    if (keyboard[65]) player.key_ad(true);
    if (keyboard[68]) player.key_ad(false);
    if (keyboard[37]) player.key_lr(true);
    if (keyboard[39]) player.key_lr(false);
    if (keyboard[38]) player.key_ud(true);
    if (keyboard[40]) player.key_ud(false);

    // shoot a bullet  spacebar key
    if (keyboard[32] && player.canShoot <= 0) {
        let bullet;
        if (player.bullettime == 0) bullet = new Bullet(player);
        else bullet = new SuperBullet(player);
        window.game.bullets.push(bullet);
        window.game.scene.add(bullet.model);
        player.canShoot = 10;
    }
}
window.addEventListener("keydown", (event) => (window.game.keyboard[event.keyCode] = true));
window.addEventListener("keyup", (event) => (window.game.keyboard[event.keyCode] = undefined));
window.onload = init;
