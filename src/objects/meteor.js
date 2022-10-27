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
    disX = 0;
    disY = 0;
    disZ = 0;
    movX = 0;
    movY = 0;
    movZ = 0;
    hp = 3;
    rotation = 0.5;
    reset = -1;
    timetokill = 0;
    model = null;
    light = new THREE.PointLight(0xc4c4c4, 0.8);
    /**
     * @param {THREE.Scene} scene
     * @param {*} player
     */
    move(scene, player) {
        if (this.timetokill <= 0) {
            this.reset -= 0.1;
            if (this.reset < 0) this.respawn(player);
            return;
        }

        this.model.rotation.z -= this.rotation * 0.05;
        this.timetokill -= 0.0025;
        console.log(this.timetokill);

        if (this.timetokill % 0.5 == 0.0) {
            this.movX = this.getRandomInt(-20, 20) * 0.1;
            this.movY = this.getRandomInt(-20, 20) * 0.1;
            this.movZ = this.getRandomInt(-20, 20) * 0.1;
        }
        this.x = this.disX + this.initX * (1 - this.timetokill) + this.movX * this.timetokill;
        this.y = this.disY + this.initY * (1 - this.timetokill) + this.movY * this.timetokill;
        this.z = this.disZ + this.initZ * (1 - this.timetokill) + this.movZ * this.timetokill;
        this.model.position.set(this.x, this.y, this.z);
        this.light.position.set(this.x + 25, this.y + 25, this.z + 25);

        scene.remove(this.light);
        scene.add(this.light);

        if (this.collisionCheck(player)) {
            console.log(player.inTime, " ", player.hp);
            console.log("Player get hit by meteor  !");
            this.reset = 0;
            this.respawn(player);
            if (player.inTime <= 0) {
                player.inTime = 3;
                player.hp -= 1;
            }
            //TODO: HIT EFFECT
        }
    }

    respawn(player) {
        // respawn
        player.camera.updateMatrixWorld();
        this.initX = this.getRandomInt(200, 400) * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);
        this.initY = this.getRandomInt(200, 400) * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);
        this.initZ = this.getRandomInt(200, 400) * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);
        this.disX = player.x;
        this.disY = player.y;
        this.disZ = player.z;
        this.x = this.initX + this.disX;
        this.y = this.initY + this.disY;
        this.z = this.initZ + this.disZ;
        this.hp = 3;
        this.reset = 1;
        this.timetokill = this.getRandomInt(10, 25) * 0.1;
    }
}
