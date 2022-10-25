import { Object } from "./object.js";

export class Player extends Object {
    height = 1.8;
    speed = 0.2;
    turnSpeed = Math.PI * 0.02;
    canShoot = 0;
    hp = 3;
    Score = 0;
    inTime = 0;
    camera = null;
    /**
     * @param {int} x
     * @param {int} y
     * @param {*} gltf
     * @param { function(object) } collision_callback
     */
    move() {
        if (this.inTime > 0) {
            this.inTime -= 0.05;
        } else {
            this.speed = 0.2;
            this.inTime = 0;
        }
    }
    key_w() {
        this.camera.position.x -= Math.sin(this.camera.rotation.y) * 2 * this.speed;
        this.camera.position.z -= -Math.cos(this.camera.rotation.y) * this.speed;
    }
    key_s() {
        this.camera.position.x -= Math.sin(this.camera.rotation.y) * 0.5 * this.speed;
        this.camera.position.z -= -Math.cos(this.camera.rotation.y) * this.speed;
    }
    key_a() {
        this.camera.position.x -= Math.sin(this.camera.rotation.y) * 2 * this.speed;
        this.camera.position.x += Math.sin(this.camera.rotation.y + Math.PI / 2) * this.speed;
        this.camera.position.z += -Math.cos(this.camera.rotation.y + Math.PI / 2) * this.speed;
    }
    key_d() {
        this.camera.position.x -= Math.sin(this.camera.rotation.y) * 2 * this.speed;
        this.camera.position.x += Math.sin(this.camera.rotation.y - Math.PI / 2) * this.speed;
        this.camera.position.z += -Math.cos(this.camera.rotation.y - Math.PI / 2) * this.speed;
    }
    /**
     *left key or right key
     * @param {boolean} left
     */
    key_lr(left) {
        rotate = left ? -this.turnSpeed : this.turnSpeed;
        this.camera.rotation.y -= rotate;
    }
}
