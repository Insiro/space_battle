import { Object } from "../object.js";
export class Item extends Object {
    move(scene, player) {
        const camera = player.camera;
        camera.updateMatrixWorld();
        this.model.rotation.z -= this.rotation * this.timetokill*0.6; //rotate item and stop rotate when timetokill almost over

        if (this.timetokill > 0)
        {
          this.timetokill -= 0.0025;
        }

        this.respawn(player);

        //set item doesn't move
        //this.x = this.initX;
        //this.y = this.initY;
        //this.z = this.initZ;
        //this.model.position.set(this.x, this.y, this.z);
        if (this.collisionCheck(camera)) {
            console.log("Player get itemcode " + this.itemcode + " !");
            this.timetokill = -1;
            this.reset = -1;
            this.respawn(player);
            if (this.itemcode == 1) { // oil
                console.log("item1 obtained! hp +1 ");
                player.inTime = 3;
                player.hp += 1;
            }//todo : bullet but need bullet object

            //TODO: HIT EFFECT, collisionCheck bullet and if collision then need to respawn it.
        }
    }
    respawn(player){
      const camera = player.camera;
      if (this.timetokill <= 0) { // respawn
          this.reset -= 0.1;

          camera.updateMatrixWorld();
                      if (this.reset < 0) {

                            this.x = camera.position.x+this.getRandomInt(20, 40) * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);
                            this.y =camera.position.y+ this.getRandomInt(20, 40) * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);
                            this.z =camera.position.z+this.getRandomInt(20, 40) * (this.getRandomInt(-2, 2) > 0 ? 1 : -1);

                              this.model.position.set(this.x, this.y, this.z);
                          this.reset = 1;
                          this.timetokill = this.getRandomInt(10, 25)*0.1;
                      }
      }
    }
}
