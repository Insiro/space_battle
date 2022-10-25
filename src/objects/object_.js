export class Object {
    /**
     * @param {int} x
     * @param {int} y
     * @param {int} z
     * @param {int} reset
     * @param {int} timetokill
     * @param {int} hp
     * @param {int} itemcode
     * @param {float} rotation
     * @param {*} gltf
     * @param {*} camera
     * @param {*} player
     * @param { function(object) } collision_callback
     */
    constructor(x, y, z,reset, timetokill, hp, loader,rotation,gltf, camera ,player, collision_callback) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.reset = reset;
        this.timetokill = timetokill;
        this.hp = hp;
        this.rotation = rotation;
        this.gltf =     loader.load('./models/oil/scene.gltf', function(gltf){
        						  items.oil1.model = gltf.scene.children[0];
        						  items.oil1.model.scale.set(1,1,1);
        							items.oil1.model.position.set(planets.moon.x,planets.moon.y,planets.moon.z);
        						  scene.add(gltf.scene);
        						}, undefined, function (error) {
        							console.error(error);
        						});

        this.camera = camera; // prospectivecamera
        this.player = player; // player
        this.collision_callback = collision_callback;
    }
    /**
    /** object moving logic */
    move() {
      camera.updateMatrixWorld(); // Find player location

			this.gltf.rotation.x -= this.rotation
      if(timetokill == =1) // object like planets don't move.
    {

    }
    else
    {

  			if (this.timetokill >0)
  			this.timetokill -=0.05
  			if(this.timetokill <=0)
  			{

  				this.reset -=0.1
  				if(this.reset <0)
  				{
  								this.timetokill =  getRandomInt(15, 30)
  					this.initX = camera.position.x+ + getRandomInt(20, 100) * (getRandomInt(1, 2)==2? 1:-1)
  		//			this.y =  getRandomInt(100, 1000) * getRandomInt(1, 2)==2? 1:-1
  					this.initZ  =  camera.position.z+getRandomInt(20, 100) *( getRandomInt(1, 2)==2? 1:-1)
  					this.reset = 5
  				}
  			}
    }

			this.x = 	camera.position.x * this.timetokill //camera.position.x+ //5+ this.initX*this.timetokill
			this.y = camera.position.y //camera.position.y//+0-100*this.timetokill
			this.z = 	camera.position.y * this.timetokill  // camera.position.z+//5+this.initZ*this.timetokill
		  this.model.position.set(this.x,this.y,this.z)


        //TODO: HIT EFFECTs?
      }


    }
    /**
     * @param {Object} object
     * @returns {boolean}
     */
    checkCollision(object) {
        this.collision_callback();
        //TODO: collision check
        if(this.x-camera.position.x <5 && this.x-camera.position.x > -5  && this.z - camera.position.z > -5&& this.z - camera.position.z< 5)
        { // collision check
          console.log("Player get hit by meteor " + key +" !")
          if(this.timetokill !=-1)
          {
            this.reset = 0;
            this.timetokill = 0;
          }
          if( this.player.inTime <=0 || this.itemcode == -1) //meteor
          {
            this.player.inTime = 3;
            this.player.hp -=1;
          }
          if( this.player.inTime <=0 || this.itemcode == 1) //oil
          {
            this.player.inTime = 3;
            this.player.hp +=1;

          }

          if(this.player.hp <=0)
          {
            console.log("GAME OVER!")
            this.player.speed = 0;
          }

        return true;
    }
}
