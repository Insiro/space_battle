import { Object } from "./object.js";

export class Player extends Object {
    /**
     * @param {int} x
     * @param {int} y
     * @param {*} gltf
     * @param { function(object) } collision_callback
     */
    constructor() {
        super(x, y, this.gltf);
    }
}
