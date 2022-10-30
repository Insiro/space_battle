import { Object } from "./object.js";

export class Player extends Object {
    gltf_path = "./models/player/space.glb";
    scale = [0.8, 0.8, 0.8];
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
        this.canShoot = 0;
        this.hp = 3;
        this.Score = 0;
        this.inTime = 0;

        this.x = 0;
        this.y = this.height;
        this.z = -5;
        this.camera.position.set(0, this.height, -5);
        this.camera.lookAt(new THREE.Vector3(0, this.height, 0));
    }
    update() {
        if (this.canShoot > 0) this.canShoot -= 1;
        if (this.inTime > 0) {
            this.inTime -= 0.05;
        } else {
            this.speed = 0.2;
            this.inTime = 0;
        }
    }
    key_w() {
        this.camera.position.x -= Math.sin(this.camera.rotation.y) * 2 * this.speed;
        this.camera.position.z -= -Math.cos(this.camera.rotation.y) * this.speed;
        this.x = this.camera.position.x;
        this.y = this.camera.position.y;
    }
    key_s() {
        this.camera.position.x += Math.sin(this.camera.rotation.y) * 0.5 * this.speed;
        this.camera.position.z += -Math.cos(this.camera.rotation.y) * this.speed;
        this.x = this.camera.position.x;
        this.z = this.camera.position.z;
    }
    key_a() {
        this.camera.position.x -= Math.sin(this.camera.rotation.y) * 2 * this.speed;
        this.camera.position.x += Math.sin(this.camera.rotation.y + Math.PI / 2) * this.speed;
        this.camera.position.z += -Math.cos(this.camera.rotation.y + Math.PI / 2) * this.speed;
        this.x = this.camera.position.x;
        this.z = this.camera.position.z;
    }
    key_d() {
        this.camera.position.x -= Math.sin(this.camera.rotation.y) * 2 * this.speed;
        this.camera.position.x += Math.sin(this.camera.rotation.y - Math.PI / 2) * this.speed;
        this.camera.position.z += -Math.cos(this.camera.rotation.y - Math.PI / 2) * this.speed;
        this.x = this.camera.position.x;
        this.z = this.camera.position.z;
    }
    /**
     *left key or right key
     * @param {boolean} left
     */
    key_lr(left) {
        const rotate = left ? -this.turnSpeed : this.turnSpeed;
        this.camera.rotation.y -= rotate;
    }
    async setModel(model) {
        super.setModel(model);
        let modelInfo = this.modelInfo;
        console.log(modelInfo);
        let mtlInfo = { shininess: modelInfo.shininess ? modelInfo.shininess : 10 };
        if (modelInfo.texture) {
            /**@type {THREE.TextureLoader} */
            const loader = new THREE.TextureLoader();
            let txt = await loader.load(modelInfo.texture);
            txt.repeat.set(modelInfo.size[0], modelInfo.size[1], modelInfo.size[2]);
            txt.wrapS = THREE.RepeatWrapping;
            txt.wrapT = THREE.RepeatWrapping;
            mtlInfo["map"] = txt;
        } else mtlInfo["color"] = parseInt("0x" + modelInfo.color);

        this.model.traverse((o) => {
            if (o.isMesh && o.nameID != null) if (o.nameID == type) o.material = new THREE.MeshPhongMaterial(mtlInfo);
        });
    }
}
