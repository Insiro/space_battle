import { Planet } from "./planet.js";
export class SpacePlanet extends Planet {


      /**
       *
       * @param {THREE.Scene} scene
       * @param {*} player
       */
    gltf_path = "./models/spaceplanet/scene.gltf";
    mesh = null;
    initX = 100;
    initY = 0;
    initZ = -100;
    scale = [1, 1,1 ];
    x = -50;
    y = 0;
    z = 50;
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
    damage = 0;
    background = 1;

}