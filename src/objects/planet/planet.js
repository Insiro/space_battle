import { Object } from "../object.js";
export class Planet extends Object {
    rotation = 0.5;
    reset = -1;
    timetokill = 0;
    light = new THREE.PointLight(0xc4c4c4, 0.8);

    move(scene, player) {
        if (this.collisionCheck(player, 15) && this.damage > 0) {
            if (player.inTime <= 0) {
                player.inTime = 3;
                player.hp -= this.damage;
            }
            return;
        }
        this.model.rotation.z -= this.rotation * 0.05;
        if (this.background == 0) this.model.position.set(this.x, this.y, this.z);
        else if (this.background == 1) {
            this.model.position.set(this.x + player.x, this.y + player.y, this.z + player.z);
        }
        this.light.position.set(this.x + 25, this.y + 25, this.z + 25);
        scene.remove(this.light);
        scene.add(this.light);
    }
}
