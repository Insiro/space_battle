import { Planet } from "./planet.js";
export class Sun extends Planet {
    gltf_path = "./models/sun/scene.gltf";
    initX = 300;
    initY = 0;
    initZ = 50;
    scale = [0.01, 0.01, 0.01];
    x = -50;
    y = 0;
    z = -50;
    hp = 3;
}
