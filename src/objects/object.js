export class Object {
    setModel(model) {
        model.scale.set(2, 2, 1);
        model.position.set(50, 0, 5);
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
            function (error) {
                console.error(error);
            }
        );
    }
}
