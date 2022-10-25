import { Object } from "./object.js";
export class Meteor extends Object {
    gltf_path = "./models/meteor/scene.gltf";
    mesh = null;
    initX = 100;
    initY = 0;
    initZ = 100;
    x = 50;
    y = 50;
    z = 50;
    hp = 3;
    rotation = 0.5;
    reset = 10;
    timetokill = 10;
    model = null;
    light = new THREE.PointLight(0xc4c4c4, 0.8);
}
