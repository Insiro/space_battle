import { Object } from "../object.js";
export class Item extends Object {
    timeleft = 5;
    rotation = 0.1;
    reset = 10;
    inittime = 5;

    move() {
        if (this.timetokill <= 0) {
            this.reSpawn();
            return;
        }
        this.model.rotation.z -= this.rotation * this.timetokill * 0.06;
        this.timetokill -= 0.05;

        this.model.position.set(this.x, this.y, this.z);
    }
    reSpawn() {
        this.reset -= 0.1;
        if (this.reset < 0) {
            this.timetokill = getRandomInt(15, 30);
            this.initX = camera.position.x + +getRandomInt(20, 100) * (getRandomInt(1, 2) == 2 ? 1 : -1);
            //			this.y =  getRandomInt(100, 1000) * getRandomInt(1, 2)==2? 1:-1
            this.initZ = camera.position.z + getRandomInt(20, 100) * (getRandomInt(1, 2) == 2 ? 1 : -1);
            this.reset = 5;
        }
    }
    checkCollision(player) {
        if (super.checkCollision(player)) {
            this.reSpawn();
            this.buff();
        }
    }
    buff() {}
}
