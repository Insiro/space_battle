import { Object } from "./object.js";

export class Player extends Object {
    /**
     * @param {int} x
     * @param {int} y
     * @param {*} gltf
     * @param { function(object) } collision_callback
     */
    constructor(x, y, gltf, collision_callback) {
        super(x, y, gltf, collision_callback);
    }
    hit() {
        if (player.inTime <= 0) {
            player.inTime = 3;
            player.hp -= 1;
        }

        if (player.hp <= 0) {
            console.log("GAME OVER!");
            player.speed = 0;
        }
        //TODO: HIT EFFECT
    }
}
