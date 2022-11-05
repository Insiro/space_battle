import { Planet } from "./planet.js";
export class Moon extends Planet {
    gltf_path = "./models/moon/scene.gltf";
    initX = 100;
    initY = -50;
    initZ = 100;
    scale = [15, 15, 15];
    x = 50;
    y = 0;
    z = 50;
    hp = 3; 
}
