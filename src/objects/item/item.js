import { Object } from "../object.js";
export class Item extends Object {
    move(scene, player) {
        if (this.timetokill <= 0) {
            this.respawn(player);
            return;
        }
        player.camera.updateMatrixWorld();
        this.model.rotation.z -= this.rotation * this.timetokill * 0.6; //rotate item and stop rotate when timetokill almost over
        this.timetokill -= 0.0025;

        //set item doesn't move
        if (this.collisionCheck(player)) {
            console.log("Player get itemcode " + this.itemcode + " !");
            this.timetokill = -1;
            this.reset = -1;
            this.respawn(player);
            if (this.itemcode == 1) {
                // oil
                console.log("item1 obtained! hp +1 ");
                player.inTime = 3;
                player.hp += 1;
            } //todo : bullet but need bullet object

            //TODO: HIT EFFECT, collisionCheck bullet and if collision then need to respawn it.
            return;
        }
    }
    respawn(player) {
        // respawn
        this.reset -= 0.1;

        player.camera.updateMatrixWorld();
        if (this.reset < 0) {
            this.x = player.x + this.getRandomInt(20, 40) * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);
            this.y = player.y + this.getRandomInt(20, 40) * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);
            this.z = player.z + this.getRandomInt(20, 40) * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);

            this.model.position.set(this.x, this.y, this.z);
            this.reset = 1;
            this.timetokill = this.getRandomInt(10, 25) * 0.1;
        }
    }
}
