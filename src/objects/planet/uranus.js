import { Planet } from "./planet.js";
export class Uranus extends Planet {
    gltf_path = "./models/uranus/scene.gltf";
    initX = -100;
    initY = 0;
    initZ = -100;
    scale = [15, 15, 15];
    x = 200;
    y = 100;
    z = 50;
    hp = 3;
    damage = 15;
    background = 0;
}
