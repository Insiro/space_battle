import { Object } from "../object.js";
export class Item extends Object {
    move(scene, player) {
        const camera = player.camera;
        camera.updateMatrixWorld();
        this.model.rotation.z -= this.rotation * this.timetokill * 0.6; //rotate item and stop rotate when timetokill almost over
        if (this.timetokill > 0) this.timetokill -= 0.0025;
        this.respawn(player);
        if (this.collisionCheck(player)) {
            console.log("Player get itemcode " + this.itemcode + " !");
            this.timetokill = -1;
            this.reset = -1;
            this.respawn(player);
            this.onCollision(player);
        }
    }
    /**
     * @param {*} player
     */
    onCollision(player) {}
    respawn(player) {
        if (this.timetokill <= 0) {
            // respawn
            this.reset -= 0.1;
            player.camera.updateMatrixWorld();
            if (this.reset < 0) {
                this.x = player.x + this.getRandomInt(50, 200) * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);
                this.y = player.y + this.getRandomInt(50, 100) * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);
                this.z = player.z + this.getRandomInt(50, 200) * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);

                this.model.position.set(this.x, this.y, this.z);
                this.reset = 1;
                this.timetokill = this.getRandomInt(20, 35) * 0.1;
            }
        }
    }
}
