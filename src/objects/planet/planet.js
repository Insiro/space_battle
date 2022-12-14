import { Object } from "../object.js";
export class Planet extends Object {
    rotation = 0.5;
    reset = -1;
    timetokill = 0;
    light = new THREE.PointLight(0xc4c4c4, 0.8);

    move(scene, player) {
        if (this.collisionCheck(player, 15)) {
            if (player.inTime <= 0) {
                player.inTime = 0;
                player.hp -= 3;
            }
            return;
        }
        this.model.rotation.z -= this.rotation * 0.05;
        this.model.position.set(this.x, this.y, this.z);
        this.light.position.set(this.x + 25, this.y + 25, this.z + 25);
        scene.remove(this.light);
        scene.add(this.light);
    }
}
