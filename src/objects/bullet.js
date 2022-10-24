import { Object } from "./object copy.js";
import { Player } from "./player.js";

export class Bullet extends Object {
    /**
     * @param {THREE.scene} scene
     * @param {Player} player
     */
    model;
    position = [0, 0, 0];
    alive = true;
    constructor(scene, player) {
        this.model = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        this.position = player.position;
        this.model.position.set(this.position[0], this.position[1], this.position[2]);
        this.velocity = [-Math.sin(camera.rotation.y), 0, Math.cos(camera.rotation.y)];

        scene.add(this.model);
    }
    move() {
        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
        this.position[2] += this.velocity[2];
        this.model.position.set(this.position[0], this.position[1], this.position[2]);
    }
}
