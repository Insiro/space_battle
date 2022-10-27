import { Meteor } from "./objects/meteor.js";
import { Oil } from "./objects/item/oil.js";
import { Moon } from "./objects/moon.js";
import { Player } from "./objects/player.js";
import { Bullet } from "./objects/bullet.js";
export class Game {
    loaded = Math.max;
    RESOURCES_LOADED = false;
    /**@type {THREE.GLTFLoader} */
    gltfloader = new THREE.GLTFLoader();
    /**@type {THREE.Scene} */
    scene = new THREE.Scene();
    /**@type {Bullet[]} */
    bullets = [];
    player = new Player();
    keyboard = {};
    meteors = [];
    items = [];
    score = 0;
    planets = [];
    updateLoaded() {
        this.RESOURCES_LOADED = this.loaded == this.meteors.length + this.items.length + this.planets.length;
    }
    remove_objects() {
        for (const meteor of this.meteors) this.scene.remove(meteor);
        for (const item of this.items) this.scene.remove(item);
        for (const planet of this.planets) this.scene.remove(planet);
        for (const bullet of this.bullets) this.scene.remove(bullet);
    }
    async reset() {
        this.remove_objects();
        this.meteors = [new Meteor(), new Meteor(), new Meteor(), new Meteor(), new Meteor(), new Meteor(), new Meteor(), new Meteor()];
        this.score = 0;
        this.items = [new Oil()];
        this.planets = [new Moon()];
        this.bullets = [];
        this.loaded = 0;
        await this.loadObjects(this.meteors, this.gltfloader);
        await this.loadObjects(this.items, this.gltfloader);
        await this.loadObjects(this.planets, this.gltfloader);
        this.player.reset();
    }
    /**
     * @param {[Object]} objs
     * @param {THREE.GLTFLoader} loader
     */
    async loadObjects(objs, loader) {
        let scene = this.scene;
        for (const obj of objs) {
            await loader.load(
                obj.gltf_path,
                function (gltf) {
                    let model = gltf.scene.children[0];
                    if (model.light !== null) scene.add(model.light);
                    obj.setModel(model);
                    scene.add(gltf.scene);
                    window.game.loaded += 1;
                },
                undefined,
                (error) => console.error(error)
            );
        }
    }
}
