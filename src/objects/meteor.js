import { Object } from "./object.js";
export class Meteor extends Object {
    gltf_path = "./models/meteor/scene.gltf";
    mesh = null;
    initX = 100;
    initY = 0;
    initZ = 100;
    scale = [1, 1, 1];
    x = 50;
    y = 50;
    z = 50;
    hp = 3;
    rotation = 0.5;
    reset = 10;
    timetokill = 10;
    model = null;
    light = new THREE.PointLight(0xc4c4c4, 0.8);
    /**
     *
     * @param {*} camera
     * @param {THREE.Scene} scene
     * @param {*} player
     */
    move(camera, scene, player) {
        camera.updateMatrixWorld();
        this.model.rotation.z -= this.rotation * 0.05;
        if (this.timetokill > 0) this.timetokill -= 0.05;

        if (this.timetokill <= 0) {
            this.reset -= 0.1;

            this.model.scale.set(0, 0, 0);

            this.y = 1000;
            this.z = 1000;

            if (this.reset < 0) {
                this.initX = this.getRandomInt(0, 3) * 0.1 * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);
                this.initY = this.getRandomInt(0, 3) * 0.1 * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);
                this.initZ = this.getRandomInt(0, 3) * 0.1 * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);
                this.x = camera.position.x - 50 * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);
                this.y = camera.position.y - 50 * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);
                this.z = camera.position.z - 50 * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);

                this.model.scale.set(1, 1, 1);
                this.reset = 1;
                this.timetokill = this.getRandomInt(20, 30);
            }
        } else {
            this.x += this.initX + this.getRandomInt(-12, 12) * 0.1;

            this.y += this.initY + this.getRandomInt(-12, 12) * 0.1;
            this.z += this.initZ + this.getRandomInt(-12, 12) * 0.1;

            this.model.position.set(this.x, this.y, this.z);

            this.light.position.set(this.x + 25, this.y + 25, this.z + 25);

            scene.remove(this.light);
            scene.add(this.light);

            console.log(player.inTime, " ", player.hp);
            if (this.collisionCheck(camera)) {
                console.log("Player get hit by meteor " + key + " !");
                this.reset = 0;
                this.timetokill = 0;
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
    }
}
