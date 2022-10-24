import { Object } from "./object.js";

export class Meteor extends Object {
    gltf_path = "./models/meteor/scene.gltf";
    size = [2, 2, 1];
    position = [50, 0, 5];
    hp = 3;
    rotation = 10;
    reset = 10;
    /**
     * @param {THREE.OBJLoader | THREE.GLTFLoader} loader
     * @param {THREE.scene} scene
     */
    constructor(loader, scene) {
        super();
        this.init(loader, scene);
    }
    reSpawn() {
        this.reset -= 0.1;

        this.y = 1000;
        this.z = 1000;

        if (this.reset < 0) {
            this.x = this.getRandomInt(0, 3) * 0.1 * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);
            this.y = this.getRandomInt(0, 3) * 0.1 * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);
            this.z = this.getRandomInt(0, 3) * 0.1 * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);
            this.reset = 1;
            this.timetokill = this.getRandomInt(20, 30);
        }
    }
    move() {
        if (this.timetokill <= 0) {
            this.reSpawn();
            return;
        }
        this.model.rotation.z -= this.rotation * 0.05;
        this.timetokill -= 0.05;

        this.x += this.x + this.getRandomInt(-12, 12) * 0.1;
        this.y += this.y + this.getRandomInt(-12, 12) * 0.1;
        this.z += this.z + this.getRandomInt(-12, 12) * 0.1;

        this.model.position.set(this.x, this.y, this.z);

        this.light.position.set(this.x + 25, this.y + 25, this.z + 25);
    }
    checkCollision(player, bulltes) {
        if (super.checkCollision(player)) {
            this.reSpawn();
            player.hit();
        }
    }
}
