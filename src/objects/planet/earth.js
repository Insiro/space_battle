import { Planet } from "./planet.js";
export class Earth extends Planet {

      /**
       *
       * @param {THREE.Scene} scene
       * @param {*} player
       */
    gltf_path = "./models/earth/scene.gltf";
    mesh = null;
    initX = 300;
    initY = 0;
    initZ = -300;
    scale = [0.05, 0.05, 0.05];
    x = 150;
    y = 0;
    z = -150;
    disX = 0;
    disY = 0;
    disZ = 0;
    movX = 0;
    movY = 0;
    movZ = 0;
    hp = 3;
    rotation = 0.5;
    reset = -1;
    timetokill = 0;
    model = null;
    light = new THREE.PointLight(0xc4c4c4, 0.8);
    damage = 15;

}
