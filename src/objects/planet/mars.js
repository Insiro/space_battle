import { Planet } from "./planet.js";
export class Mars extends Planet {
    gltf_path = "./models/mars/scene.gltf";
    initX = 300;
    initY = 0;
    initZ = 50;
    scale = [10, 10, 10];
    x = 50;
    y = 0;
    z = -50;
    hp = 3;
    damage = 0;
    background = 1;
}
