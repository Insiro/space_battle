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
        if (this.model) {
            this.model.position.set(this.x, this.y, this.z);
            this.model.rotation.set(this.x, this.y, this.z);
        }
    }
    update() {
        if (this.canShoot > 0) this.canShoot -= 1;
        if (this.bullettime > 0) this.bullettime -= 0.025;
        else this.bullettime = 0;
        if (this.inTime > 0) this.inTime -= 0.025;
        else {
            this.speed = 0.2;
            this.inTime = 0;
        }
    }
    angle() {
        return [-Math.sin(-this.model.rotation.y), 0, Math.cos(-this.model.rotation.y)];
    }
    //#region keyaction
    key_ws(w_key = true) {
        let speed = (w_key ? 2 : -0.5) * this.speed;
        let diff_x = -Math.sin(-this.model.rotation.y) * speed;
        let diff_z = Math.cos(-this.model.rotation.y) * speed;
        this.update_position(diff_x, 0, diff_z);
    }
    key_ad(a_key = true) {
        let speed = (a_key ? 1 : -1) * this.speed;
        let diff_x = -Math.sin(this.model.rotation.y) * speed;
        let diff_z = Math.cos(this.model.rotation.y) * speed;
        this.update_position(diff_z, 0, diff_x);
    }
    key_lr(left_key = true) {
        const rotate = left_key ? this.turnSpeed : -this.turnSpeed;
        this.model.rotation.y -= rotate;
    }
    key_ud(up = true) {
        let up_or_down;

        if (up) up_or_down = 1;
        else up_or_down = -1;

        this.update_position(0, up_or_down * this.speed, 0);
    }
    //#endregion
    update_position(diff_x, diff_y, diff_z) {
        this.x += diff_x;
        this.y += diff_y;
        this.z += diff_z;
        this.model.position.set(this.x, this.y, this.z);
    }
    async setModel(obj3d, model) {
        this.camera.position.set(0, this.height, -10);
        this.camera.lookAt(new THREE.Vector3(0, this.height, 0));
        if (this.modelInfo !== undefined) await this.set_texture(model);
        obj3d.add(model);
        obj3d.add(this.camera);
        super.setModel(model);
        this.model = obj3d;
    }
    async set_texture(model) {
        let modelInfo = this.modelInfo;
        let mtlInfo = { shininess: 10 };
        if (modelInfo.texture) {
            const loader = new THREE.TextureLoader();
            let txt = await loader.load(modelInfo.texture);
            txt.repeat.set(modelInfo.size[0], modelInfo.size[1], modelInfo.size[2]);
            txt.wrapS = THREE.RepeatWrapping;
            txt.wrapT = THREE.RepeatWrapping;
            mtlInfo["map"] = txt;
        } else mtlInfo["color"] = parseInt("0x" + modelInfo.color);
        model.material = new THREE.MeshPhongMaterial(mtlInfo);
    }
}
