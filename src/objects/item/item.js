import { Object } from "../object.js";
export class Item extends Object {
    move(scene, player) {
        const camera = player.camera;
        camera.updateMatrixWorld();
        this.model.rotation.z -= this.rotation * this.timetokill * 0.6; //rotate item and stop rotate when timetokill almost over

        if (this.timetokill > 0) {
            this.timetokill -= 0.0025;
        }

        this.respawn(player);

        //set item doesn't move
        //this.x = this.initX;
        //this.y = this.initY;
        //this.z = this.initZ;
        //this.model.position.set(this.x, this.y, this.z);
        if (this.collisionCheck(player)) {
            console.log("Player get itemcode " + this.itemcode + " !");
            this.timetokill = -1;
            this.reset = -1;
            this.respawn(player);
            if (this.itemcode == 1) {
                // oil
                player.inTime = 3;
                if (player.hp < 3) {
                    player.hp += 1;
                }
            } else if (this.itemcode == 2) {
                // oil
                player.bullettime = 15;
                player.inTime = 3;
            }
            //TODO: HIT EFFECT, collisionCheck bullet and if collision then need to respawn it.
        } else {
            if (this.itemcode == 2) {
                // console.log(this.model.position.x + " "+this.model.position.y + " "+this.model.position.z)
                // console.log("PC "+player.camera.position.x+ " "+ player.camera.position.y + " "+player.camera.position.z)
            }
        }
    }
    respawn(player) {
        const camera = player.camera;
        if (this.timetokill <= 0) {
            // respawn
            this.reset -= 0.1;

            camera.updateMatrixWorld();
            if (this.reset < 0) {
                this.x = player.x + this.getRandomInt(50, 200) * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);
                this.y = player.y - 2;
                this.z = player.z + this.getRandomInt(50, 200) * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);

                this.model.position.set(this.x, this.y, this.z);
                this.reset = 1;
                this.timetokill = this.getRandomInt(20, 35) * 0.1;
            }
        }
    }
}
