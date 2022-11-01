import { Object } from "./object.js";
export class Spaceship extends Object {
    gltf_path = "./models/free_spaceship_unitron/scene.gltf";
    
    initX = 100;
    initY = 0;
    initZ = 100;
    
    x = 20;
    y = 20;
    z = 20;

    model = null;
    scale = [0.02, 0.02, 0.02];

    move(scene, player) {
        camera = player.camera;

        // position the gun in front of the camera
        this.model.position.set(
            camera.position.x - Math.sin(camera.rotation.y + Math.PI / 6) * 0.75,
            camera.position.y - Math.sin(time * 4 + camera.position.x + camera.position.z) * 0.01,
            camera.position.z + Math.cos(camera.rotation.y + Math.PI / 6) * 0.75
        );

        this.model.rotation.set(camera.rotation.x - 90, camera.rotation.y + 90, camera.rotation.z);
    }
}
