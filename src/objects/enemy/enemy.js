import { Object } from "../object.js";
export class Enemy extends Object {
    move(scene, player) {
        if (this.timetokill <= 0) {
            this.reset -= 0.1;
            if (this.reset < 0) this.respawn(player);
            return;
        }

        this.model.rotation.z -= this.rotation * 0.05;
        this.timetokill -= this.timeset;

        if (this.timetokill % 0.05 == 0.0) {
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
            this.reset = 0;
            this.timeset = 0.00125;
            this.respawn(player);
            if (player.inTime <= 0) {
                player.inTime = 3;
                player.hp -= this.damage;
                console.log(player.hp + " " + this.damage);
            }
            //TODO: HIT EFFECT
        }
    }

    respawn(player) {
        // respawn
        player.camera.updateMatrixWorld();
        this.initX = this.getRandomInt(200, 300) * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);
        this.initY = this.getRandomInt(200, 300) * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);
        this.initZ = this.getRandomInt(200, 300) * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);
        this.disX = player.x;
        this.disY = player.y;
        this.disZ = player.z;
        this.x = this.initX + this.disX;
        this.y = this.initY + this.disY;
        this.z = this.initZ + this.disZ;
        this.hp = this.getRandomInt(1, 5);
        this.reset = 1;
        this.timeset = this.timeset + 0.00001 > 0.0016 ? 0.00125 : this.timeset + 0.00001;
        this.timetokill = this.getRandomInt(15, 25) * 0.1;
    }
}
