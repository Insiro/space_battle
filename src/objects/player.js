import { Object } from "./object.js";

export class Player extends Object {
    gltf_path = "./models/player/space.glb";
    scale = [0.3, 0.3, 0.3];
    /**@param {PlayerTextureInfo|undefined} modelInfo */
    constructor(modelInfo) {
        super();
        this.camera = new THREE.PerspectiveCamera(90, 1280 / 720, 0.1, 1000);

        this.modelInfo = modelInfo;
        this.reset();
    }
    reset() {
        this.height = 1.8;
        this.speed = 0.2;
        this.turnSpeed = Math.PI * 0.02;
        this.hSpeed = Math.PI * 0.005;
        this.canShoot = 0;
        this.hp = 3;
        this.Score = 0;
        this.inTime = 0;

        this.bullettime = 0; //damage that player can shoot ;

        this.x = 0;
        this.y = 0;
        this.z = 0;
        if (this.model) this.model.position.set(this.x, this.y, this.z);
    }
    update() {
        if (this.canShoot > 0) this.canShoot -= 1;
        if (this.bullettime > 0) this.bullettime -= 0.025;
        else {
            this.bullettime = 0;
        }
        if (this.inTime > 0) this.inTime -= 0.025;
        else {
            this.speed = 0.2;
            this.inTime = 0;
        }
    }
    key_w() {
        let diff_x = -Math.sin(-this.model.rotation.y) * 2 * this.speed;
        let diff_z = Math.cos(-this.model.rotation.y) * this.speed;
        this.update_position(diff_x, 0, diff_z);
    }
    key_s() {
        let diff_x = Math.sin(-this.model.rotation.y) * 0.5 * this.speed;
        let diff_z = -Math.cos(-this.model.rotation.y) * this.speed;
        this.update_position(diff_x, 0, diff_z);
    }
    key_a() {
        let diff_x = Math.sin(this.model.rotation.y + Math.PI / 1.5) * this.speed;
        let diff_z = -Math.cos(this.model.rotation.y + Math.PI / 2) * this.speed;
        this.update_position(diff_x, 0, diff_z);
    }
    key_d() {
        let diff_x = -Math.sin(this.model.rotation.y + Math.PI / 1.5) * this.speed;
        let diff_z = Math.cos(this.model.rotation.y + Math.PI / 2) * this.speed;
        this.update_position(diff_x, 0, diff_z);
    }

    /**
     *left key or right key
     * @param {boolean} left
     */
    key_lr(left) {
        const rotate = left ? this.turnSpeed : -this.turnSpeed;
        this.model.rotation.y -= rotate;
    }
    /**
     * up key or down key
     * @param {boolean} up
     */
    key_ud(up) {
        const rotate_up = up ? this.hSpeed : -this.hSpeed;
        this.model.rotation.x -= rotate_up;
    }
    update_position(diff_x, diff_y, diff_z) {
        this.x += diff_x;
        this.y += diff_y;
        this.z += diff_z;
        this.model.position.set(this.x, this.y, this.z);
        console.log(this.model.rotation);
        /**@type {THREE.PerspectiveCamera} */
        let camera = this.camera;
        console.log(this.camera);
        console.log(this.model.position);
    }
    async setModel(obj3d, model) {
        obj3d.add(model);
        this.camera.position.set(0, this.height, -10);
        this.camera.lookAt(new THREE.Vector3(0, this.height, 0));
        obj3d.add(this.camera);
        super.setModel(model);
        this.spm = this.model;
        this.model = obj3d;
        let modelInfo = this.modelInfo;
        console.log(modelInfo);
        let mtlInfo = { shininess: 10 };
        if (modelInfo.texture) {
            const loader = new THREE.TextureLoader();
            let txt = await loader.load(modelInfo.texture);
            txt.repeat.set(modelInfo.size[0], modelInfo.size[1], modelInfo.size[2]);
            txt.wrapS = THREE.RepeatWrapping;
            txt.wrapT = THREE.RepeatWrapping;
            mtlInfo["map"] = txt;
        } else mtlInfo["color"] = parseInt("0x" + modelInfo.color);

        this.model.traverse((o) => {
            if (o.isMesh && o.nameID == "Maquis_Raider") o.material = new THREE.MeshPhongMaterial(mtlInfo);
        });
    }
}
