import { Game } from "./game.js";
import { Bullet } from "./objects/bullet.js";
var renderer;
var USE_WIREFRAME = false;

var loadingScreen = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(90, 1280 / 720, 0.1, 100),
    box: new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshBasicMaterial({ color: 0x4444ff })),
};

// Bullets array

function init() {
    window.game = new Game();
    const game = window.game;

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
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhongMaterial({ color: 0xff4444, wireframe: USE_WIREFRAME }));
    mesh.position.y += 1;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);

    const meshFloor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20, 10, 10), new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: USE_WIREFRAME }));
    meshFloor.rotation.x -= Math.PI / 2;
    meshFloor.receiveShadow = true;
    scene.add(meshFloor);

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

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(1280, 720);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    document.body.appendChild(renderer.domElement);

    render();
}
// Runs when all resources are loaded

function render() {
    /**@type {Game} */
    const game = window.game;
    // Play the loading screen until resources are loaded.
    if (!game.RESOURCES_LOADED) {
        requestAnimationFrame(render);
        loadingScreen.box.position.x -= 0.05;
        if (loadingScreen.box.position.x < -10) loadingScreen.box.position.x = 10;
        loadingScreen.box.position.y = Math.sin(loadingScreen.box.position.x);
        renderer.render(loadingScreen.scene, loadingScreen.camera);
        game.updateLoaded();
        return;
    }

    const player = game.player;
    player.update();

    for (const meteor of game.meteors) {
        meteor.move(game.scene, game.player);
        if (meteor.hp === 0);
        //TODO: update score, respawn
    }
    for (const item of game.items) item.move(game.scene, game.player);
    for (const planet of game.planets) planet.move(game.scene, game.player);

    // Uncomment for absurdity!

    // go through bullets array and update position
    // remove bullets when appropriate
    game.bullets = game.bullets.filter((bullet) => {
        bullet.move(game.meteors);
        if (bullet.alive_time > 0) {
            return true;
        }
        game.scene.remove(bullet);
        return false;
    });

    if (player.canShoot > 0) player.canShoot -= 1;
    keyboardAction();

    // position the gun in front of the camera
    renderer.render(game.scene, game.player.camera);
    requestAnimationFrame(render);
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
        let bullet = new Bullet(player);
        window.game.bullets.push(bullet);
        window.game.scene.add(bullet.model);
        player.canShoot = 10;
    }
}
window.addEventListener("keydown", (event) => (window.game.keyboard[event.keyCode] = true));
window.addEventListener("keyup", (event) => (window.game.keyboard[event.keyCode] = undefined));
window.onload = init;
