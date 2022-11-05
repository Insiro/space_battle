import { Planet } from "./planet.js";
export class Earth extends Planet {
    gltf_path = "./models/earth/scene.gltf";
    initX = 300;
    initY = 100;
    initZ = -300;
    scale = [0.2, 0.2, 0.2];
    x = -150;
    y = 0;
    z = 150;
    hp = 3;
}
