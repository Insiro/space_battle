import { Object } from "./object.js";
export class Spaceship extends Object {
    gltf_path = "./models/free_spaceship_unitron/scene.gltf";
    
    initX = 1;
    initY = 1;
    initZ = 1;
    
    x = 1;
    y = 1;
    z = 1;

    model = null;
    scale = [0.02, 0.02, 0.02];

    time = Date.now() * 0.0005;

    move(scene, camera) {

        // position the gun in front of the camera
        this.model.position.set(
            camera.position.x - Math.sin(camera.rotation.y + Math.PI / 6) * 0.75,
            camera.position.y - Math.sin(this.time * 4 + camera.position.x + camera.position.z) * 0.01,
            camera.position.z + Math.cos(camera.rotation.y + Math.PI / 6) * 0.75
        );

        this.model.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
    }
}
