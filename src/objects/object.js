export class Object {
    /**
     * @param {int} x
     * @param {int} y
     * @param {*} gltf
     * @param { function(object) } collision_callback
     */
    constructor(x, y, gltf, collision_callback) {
        this.x = x;
        this.y = y;
        this.gltf = gltf;
        this.collision_callback = collision_callback;
    }
    /**
    /** object moving logic */
    move() {}
    /**
     * @param {Object} object
     * @returns {boolean}
     */
    checkCollision(object) {
        this.collision_callback();
        //TODO: collision check
        return true;
    }
}
