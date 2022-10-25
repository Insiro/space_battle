import { Object } from "../object.js";
export class Item extends Object {
    move(camera, player) {
        camera.updateMatrixWorld();
        this.model.rotation.z -= this.rotation * this.timetokill * 0.06;
        if (this.timetokill > 0) this.timetokill -= 0.05;
        if (this.timetokill <= 0) {
            this.reset -= 0.1;
            if (this.reset < 0) {
                this.timetokill = this.getRandomInt(15, 30);
                this.initX = camera.position.x + +this.getRandomInt(20, 100) * (this.getRandomInt(1, 2) == 2 ? 1 : -1);
                this.initZ = camera.position.z + this.getRandomInt(20, 100) * (this.getRandomInt(1, 2) == 2 ? 1 : -1);
                this.reset = 5;
            }
        }

        this.x = this.initX;
        this.y = camera.position.y;
        this.z = this.initZ;
        this.model.position.set(this.x, this.y, this.z);
        if (this.collisionCheck(camera)) {
            console.log("Player get item " + key + " !");
            this.timetokill = 0;
            this.reset = 0;
            if (key == "oil1") {
                console.log("item1 obtained! hp +1 ");
                player.inTime = 3;
                player.speed = player.speed * 2;
                player.hp += 1;
            }

            //TODO: HIT EFFECT
        }
    }
}
