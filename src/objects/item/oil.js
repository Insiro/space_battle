import { Item } from "./item.js";
export class Oil extends Item {
    /**
     * @param {THREE.OBJLoader | THREE.GLTFLoader} loader
     * @param {THREE.scene} scene
     */
    constructor(loader, scene) {
        super();
        this.init(loader, scene);
    }
    gltf_path = "models/oil/scene.gltf";
    buff() {
        console.log("item1 obtained! hp +1 ");
        player.inTime = 3;
        player.speed = player.speed * 2;
        player.hp += 1;
    }
}
