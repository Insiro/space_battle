import { Alien } from "./objects/enemy/alien.js";
import { Meteor } from "./objects/enemy/meteor.js";
import { UFO } from "./objects/enemy/ufo.js";
import { Oil } from "./objects/item/oil.js";
import { Moon } from "./objects/planet/moon.js";
import { Uranus } from "./objects/planet/uranus.js";
import { Sun } from "./objects/planet/sun.js";
import { Earth } from "./objects/planet/Earth.js";
import { Mars} from "./objects/planet/Mars.js";
import { Player } from "./objects/player.js";
import { Bullet } from "./objects/bullet.js";
import {Granade} from  "./objects/item/granade.js";
import {SuperBullet} from "./objects/superBullet.js";
import {SpacePlanet} from "./objects/planet/spaceplanet.js"
export class Game {
    loaded = Math.max;
    RESOURCES_LOADED = false;
    /**@type {THREE.GLTFLoader} */
    gltfloader = new THREE.GLTFLoader();
    /**@type {THREE.Scene} */
    scene = new THREE.Scene();
    /**@type {Bullet[]} */
    bullets = [];
    /**@type {SuperBullet[]} */
    superbullets = [];
    enemies = [new UFO(),new UFO(),new Alien(), new Alien(), new Alien(), new Alien(), new Alien(), new Meteor(),new Meteor(), new Meteor(),new Meteor(),new Meteor(),new Meteor()];
    items = [new Oil(), new Granade()];
    planets = [new Moon() , new Uranus(), new Earth(),new Sun(),new Mars(),new SpacePlanet()];
    backgrounds = [ ];
    player = new Player();
    keyboard = {};
    score = 0;
    loaded = 0;
    constructor(infoBoard) {
        let scoreDiv = document.createElement("div");
        scoreDiv.innerHTML = "score : &nbsp;";
        let hpDiv = document.createElement("div");
        hpDiv.innerHTML = "HP : &nbsp;";
        infoBoard.appendChild(scoreDiv);
        infoBoard.appendChild(hpDiv);
        this.scoreBoard = document.createElement("span");
        this.hpBoard = document.createElement("span");

        scoreDiv.appendChild(this.scoreBoard);
        hpDiv.appendChild(this.hpBoard);
        this.updateInfoBoard();
    }
    updateLoaded() {
        this.RESOURCES_LOADED = this.loaded == this.enemies.length + this.items.length + this.planets.length;
    }
    remove_objects() {
        for (const enemy of this.enemies) this.scene.remove(enemy);
        for (const item of this.items) this.scene.remove(item);
        for (const planet of this.planets) this.scene.remove(planet);
        for (const bullet of this.bullets) this.scene.remove(bullet);
        for (const superbullet of this.superbullets) this.scene.remove(superbullet);
        //for (const background of this.backgrounds) this.scene.remove(background);
    }
    async reset() {
        this.remove_objects();
        for (const bullet of this.bullets) {
            this.scene.remove(bullet.model);
            bullet.alive_time = 0;
        }
        this.bullets = [];

        for (const superbullet of this.superbullets) {
            this.scene.remove(superbullet.model);
            superbullet.alive_time = 0;
        }
        this.superbullets = [];
        for (const enemy of this.enemies) enemy.respawn(this.player);
        for (const item of this.items) item.respawn(this.player);
        this.score = 0;
        this.player.reset();
    }
    async loadAll() {
        this.loadObjects(this.enemies, this.gltfloader);
        this.loadObjects(this.items, this.gltfloader);
        this.loadObjects(this.planets, this.gltfloader);
        //this.loadObjects(this.backgrounds, this.gltfloader);
    }

    async loadObjects(objs, loader) {
        let scene = this.scene;
        for (const obj of objs) {
            await loader.load(
                obj.gltf_path,
                function (gltf) {
                    let model = gltf.scene.children[0];
                    if (model.light !== null || model.light !== undefined) scene.add(model.light);
                    obj.setModel(model);
                    scene.add(gltf.scene);
                    window.game.loaded += 1;
                    window.game.updateLoaded();
                },
                undefined,
                (error) => console.error(error)
            );
        }
    }
    updateInfoBoard() {
        this.scoreBoard.innerText = this.score;
        this.hpBoard.innerText = this.player.hp;
    }
}
