import { Object } from "./object.js";
export class Spaceship extends Object {
    gltf_path = "./models/free_spaceship_unitron/scene.gltf";
    
    initX = 100;
    initY = 0;
    initZ = 100;
    
    x = 20;
    y = 20;
    z = 20;

    model = null;
    scale = [2, 2, 2];
}
