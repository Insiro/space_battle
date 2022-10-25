export class Object {
    setModel(model) {
        model.scale.set(this.scale[0], this.scale[1], this.scale[2]);
        model.position.set(this.x, this.y, this.z);
        this.model = model;
    }
}
/**
 * @param {[Object]} objs
 * @param {THREE.GLTFLoader} loader
 * @param {THREE.Scene} scene
 */
export async function loadObjects(objs, loader, scene) {
    for (const obj of objs) {
        await loader.load(
            obj.gltf_path,
            function (gltf) {
                let model = gltf.scene.children[0];
                obj.setModel(model);
                scene.add(gltf.scene);
            },
            undefined,
            (error) => console.error(error)
        );
    }
}
