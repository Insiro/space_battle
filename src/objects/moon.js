import { Object } from "./object.js";
export class Moon extends Object {
    gltf_path = "./models/moon/scene.gltf";
    initX = 100;
    initY = 0;
    initZ = 100;
    x = 20;
    y = 20;
    z = 20;
    model = null;
    scale = [2, 2, 2];
}
