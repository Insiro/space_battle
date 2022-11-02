import { Item } from "./item.js";
export class Granade extends Item {
    gltf_path = "./models/granade/scene.gltf";
    initX = 100;
    initY = 0;
    initZ = 100;
    x = 50;
    y = 50;
    z = 50;
    inittime = 5;
    timeleft = 5;
    rotation = 0.1;
    reset = 10;
    timetokill = 0;
    model = null;
    itemcode = 2;
    scale = [0.01, 0.01, 0.01];



    /**
     *
     * @param {THREE.Scene} scene
     * @param {*} player
     */
}
