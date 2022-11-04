export class Planet  {
    light = null;
    setModel(model) {
        model.scale.set(this.scale[0], this.scale[1], this.scale[2]);
        model.position.set(this.x, this.y, this.z);
        this.model = model;
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    collisionCheck(object) {
        let diffx = Math.abs(this.x - object.x);
        let diffy = Math.abs(this.y - object.y);
        let diffz = Math.abs(this.z - object.z);
        return diffx < 20 && diffy < 20 && diffz < 20;
    }
    respawn(player) {}

  move(scene, player) {

      this.model.rotation.z -= this.rotation * 0.05;
      if(this.background ==0)
      this.model.position.set(this.x, this.y, this.z);
      else if(this.background==1)
      {
      this.model.position.set(this.x+player.x, this.y+ player.y,this.z+ player.z);
      }
      this.light.position.set(this.x + 25, this.y + 25, this.z + 25);
      scene.remove(this.light);
      scene.add(this.light);

      if (this.collisionCheck(player) && this.damage>0) {
          if (player.inTime <= 0) {
              player.inTime = 3;
              player.hp -= this.damage;
          }
          //TODO: HIT EFFECT
      }
      else
      {
          let diffx = Math.abs(this.x - player.x);
          let diffy = Math.abs(this.y - player.y);
          let diffz = Math.abs(this.z - player.z);
      }
  }

}
