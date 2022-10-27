import { Object } from "./object.js";

export class Player extends Object {
    constructor() {
        super();
        this.camera = new THREE.PerspectiveCamera(90, 1280 / 720, 0.1, 1000);
        this.reset();
    }
    reset() {
        this.height = 1.8;
        this.speed = 0.2;
        this.turnSpeed = Math.PI * 0.02;
        this.canShoot = 0;
        this.hp = 3;
        this.Score = 0;
        this.inTime = 0;

        this.x = 0;
        this.y = this.height;
        this.z = -5;
        this.camera.position.set(0, this.height, -5);
        this.camera.lookAt(new THREE.Vector3(0, this.height, 0));
    }
    update() {
        if (this.canShoot > 0) this.canShoot -= 1;
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
        this.x = this.camera.position.x;
        this.y = this.camera.position.y;
    }
    key_s() {
        this.camera.position.x += Math.sin(this.camera.rotation.y) * 0.5 * this.speed;
        this.camera.position.z += -Math.cos(this.camera.rotation.y) * this.speed;
        this.x = this.camera.position.x;
        this.z = this.camera.position.z;
    }
    key_a() {
        this.camera.position.x -= Math.sin(this.camera.rotation.y) * 2 * this.speed;
        this.camera.position.x += Math.sin(this.camera.rotation.y + Math.PI / 2) * this.speed;
        this.camera.position.z += -Math.cos(this.camera.rotation.y + Math.PI / 2) * this.speed;
        this.x = this.camera.position.x;
        this.z = this.camera.position.z;
    }
    key_d() {
        this.camera.position.x -= Math.sin(this.camera.rotation.y) * 2 * this.speed;
        this.camera.position.x += Math.sin(this.camera.rotation.y - Math.PI / 2) * this.speed;
        this.camera.position.z += -Math.cos(this.camera.rotation.y - Math.PI / 2) * this.speed;
        this.x = this.camera.position.x;
        this.z = this.camera.position.z;
    }
    /**
     *left key or right key
     * @param {boolean} left
     */
    key_lr(left) {
        const rotate = left ? -this.turnSpeed : this.turnSpeed;
        this.camera.rotation.y -= rotate;
    }
}
