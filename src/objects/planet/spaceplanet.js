import { Planet } from "./planet.js";
export class SpacePlanet extends Planet {
    gltf_path = "./models/spaceplanet/scene.gltf";
    initX = 100;
    initY = 0;
    initZ = -100;
    scale = [1, 1, 1];
    x = -50;
    y = 0;
    z = 50;
    hp = 3;
    damage = 0;
    background = 1;
}
