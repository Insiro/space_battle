import { Object } from "../object.js";
export class Planet extends Object {
  move(scene, player) {

      this.model.rotation.z -= this.rotation * 0.05;
      this.model.position.set(this.x, this.y, this.z);
      this.light.position.set(this.x + 25, this.y + 25, this.z + 25);
      console.log(this.model.position)
      scene.remove(this.light);
      scene.add(this.light);

      if (this.collisionCheck(player)) {
          if (player.inTime <= 0) {
              player.inTime = 3;
              player.hp -= this.damage;
              console.log(player.hp + " " + this.damage);
          }
          //TODO: HIT EFFECT
      }
      else
      {
          let diffx = Math.abs(this.x - player.x);
          let diffy = Math.abs(this.y - player.y);
          let diffz = Math.abs(this.z - player.z);
        console.log( diffx+ " " + diffy + " "+ diffz);
      }
  }

}
