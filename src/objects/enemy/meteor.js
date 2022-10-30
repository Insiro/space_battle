import { Enemy } from "./enemy.js";
export class Meteor extends Enemy {
    gltf_path = "./models/meteor2/scene.gltf";
        mesh = null;
        initX = 1000;
        initY = 0;
        initZ = 1000;
        scale = [0.15, 0.15, 0.15];
        x = 1000;
        y = 1000;
        z = 1000;
        disX = 100;
        disY = 100;
        disZ = 100;
        movX = 0;
        movY = 0;
        movZ = 0;
        hp = 3;
        rotation = 0.5;
        reset = -1;
        timetokill = 0;
        model = null;
        light = new THREE.PointLight(0xc4c4c4, 0.8);
        damage = 2;
        timeset = 0.00025;


            /**
             *
             * @param {THREE.Scene} scene
             * @param {*} player
             */
}
