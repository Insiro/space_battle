export class Object {
    size = [1, 1, 1];
    timetokill = 0;
    reset = 10; // when be -1, respawn
    position = [50, 50, 50];
    rotation = 0.5;
    model = null;
    /**
     * @param {THREE.OBJLoader | THREE.GLTFLoader} loader
     * @param {THREE.scene} scene
     */
    constructor() {}
    init(loader, scene) {
        console.log(this.gltf_path);
        loader.load(
            this.gltf_path,
            (gltf) => {
                this.model = gltf.scene.children[0]; // set this.model to points gltf
                this.model.scale.set(this.size[0], this.size[1], this.size[2]);
                this.model.position.set(this.position[0], this.position[1], this.position[2]);
                scene.add(gltf.scene);
            },
            undefined,
            (error) => {
                console.error(error);
            }
        );
    }
    /**
    /** object moving logic */
    move() {
        this.camera.updateMatrixWorld();

        this.model.rotation.z -= this.rotation * this.timetokill * 0.06;
        if (this.timetokill > 0) this.timetokill -= 0.01;

        if (this.timetokill <= 0) {
            this.reset -= 0.1; // when reset became zero, respawn it.
            this.model.scale.set(0, 0, 0); //* (getRandomInt(1, 2)==2? 1:-1)//*2*( getRandomInt(1, 2)==2? 1:-1) //camera.position.x+ //10+ this.initX*this.timetokill
            this.y = 1000; //+0-100*this.timetokill
            this.z = this.camera.position.z + 1000; //* (getRandomInt(1, 2)==2? 1:-1)//this.initZ  + this.timetokill *2 *( getRandomInt(1, 2)==2? 1:-1)// camera.position.z+//10+this.initZ*this.timetokill
            // to not meet when it became respawn, set it uncontactable & unwatchable location and scale.
            if (this.reset < 0) {
                this.initX = getRandomInt(0, 3) * 0.1 * (getRandomInt(-2, 2) > 0 ? 1 : -1);
                this.initY = getRandomInt(0, 3) * 0.1 * (getRandomInt(-2, 2) > 0 ? 1 : -1);
                this.initZ = getRandomInt(0, 3) * 0.1 * (getRandomInt(-2, 2) > 0 ? 1 : -1);
                this.x = this.camera.position.x - 100 * (getRandomInt(-2, 2) > 0 ? 1 : -1); //*this.initX  //+getRandomInt(-2100, 2100) // * (getRandomInt(1, 2)==2? 1:-1)
                this.y = this.camera.position.y - 100 * (getRandomInt(-2, 2) > 0 ? 1 : -1); //this.initY =  camera.position.y + getRandomInt(10,20) * (getRandomInt(1, 2)==2? 1:-1)
                this.z = this.camera.position.z - 100 * (getRandomInt(-2, 2) > 0 ? 1 : -1); //*this.initZ// +   getRandomInt(-2100, 2100)// *( getRandomInt(1, 2)==2? 1:-1)
                //this.x =getRandomInt(-10, 10) 	//this.initX*(0.10-this.timetokill)  //* (getRandomInt(1, 2)==2? 1:-1)//*2*( getRandomInt(1, 2)==2? 1:-1) //camera.position.x+ //10+ this.initX*this.timetokill
                //	this.y = 	this.initY*(0.10-this.timetokill) //+0-100*this.timetokill
                //this.z =getRandomInt(-10, 10) 	//this.initZ* (0.10-this.timetokill) //* (getRandomInt(1, 2)==2? 1:-1)//this.initZ  + this.timetokill *2 *( getRandomInt(1, 2)==2? 1:-1)// camera.position.z+//10+this.initZ*this.timetokill

                this.model.scale.set(1, 1, 1); // re-set its scale, make it visible.
                this.reset = 1; // time to respawn
                this.timetokill = getRandomInt(20, 30); // set lifetime of it randomly. ///getRandomInt(10,11)
                console.log(key, "ini  ", this.initX, " ", this.initZ);
                console.log(
                    key +
                        "  x " +
                        (this.x - camera.position.x) +
                        " z " +
                        (this.z - camera.position.z) +
                        "COND 1 X " +
                        (this.x - camera.position.x < 10 && this.x - camera.position.x > -10) +
                        "COND Z : " +
                        (this.z - camera.position.z > -10 && this.z - camera.position.z < 10)
                );
            }
        } else {
            // Item is active : set it move on its own.

            this.x += this.initX + getRandomInt(-6, 6) * 0.1; // 	this.initX*(0.10-this.timetokill*0.10)  //* (getRandomInt(1, 2)==2? 1:-1)//*2*( getRandomInt(1, 2)==2? 1:-1) //camera.position.x+ //10+ this.initX*this.timetokill

            this.y += this.initY + getRandomInt(-6, 6) * 0.1; // 	this.initY*(0.10-this.timetokill*0.2) //+0-100*this.timetokill
            this.z += this.initZ + getRandomInt(-6, 6) * 0.1; // 	this.initZ* (0.10-this.timetokill*0.10) //* (getRandomInt(1, 2)==2? 1:-1)//this.initZ  + this.timetokill *2 *( getRandomInt(1, 2)==2? 1:-1)// camera.position.z+//10+this.initZ*this.timetokill

            this.model.position.set(this.x, this.y, this.z);

            this.light.position.set(this.x + 210, this.y + 210, this.z + 210);

            scene.add(this.light);

            console.log(player.inTime, " ", player.hp);

            // Can re-use this code to check bullet
            if (
                this.x - camera.position.x < 10 &&
                this.x - camera.position.x > -10 &&
                this.y - camera.position.y > -10 &&
                this.y - camera.position.y < 10 &&
                this.z - camera.position.z > -10 &&
                this.z - camera.position.z < 10
            ) {
                // collision check function : check on every move function.
                console.log("Player get hit by meteor " + key + " !");
                if (this.timetokill != -1) {
                    this.reset = 0;
                    this.timetokill = 0;
                }
                if (this.player.inTime <= 0 || this.itemcode == -1) {
                    //meteor
                    this.player.inTime = 3;
                    this.player.hp -= 1;
                } else if (this.player.inTime <= 0 || this.itemcode == 1) {
                    //oil
                    this.player.inTime = 3;
                    this.player.hp += 1;
                } else if (this.player.inTime <= 0 || this.itemcode == -2) {
                    // planet
                    this.player.hp = 0; //kill player immeaditly.
                }

                if (this.player.hp <= 0) {
                    console.log("GAME OVER!");
                    this.player.speed = 0;
                }
            }

            //TODO: HIT EFFECTs?
        }
    }
    /**
     * @param {Object} object
     * @returns {boolean}
     */
    checkCollision(object) {
        let diffx = this.x - object.position.x;
        let diffy = this.y - object.position.y;
        let diffz = this.z - object.position.z;
        if (diffx < 10 && diffx > -10 && diffy < 10 && diffy > -10 && diffz > -10 && diffz < 10) return true;
        return false;
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    reSpawn() {}
}
