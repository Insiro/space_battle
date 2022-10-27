import { Object } from "./object.js";
export class Moon extends Object {
    gltf_path = "./models/moon/scene.gltf";
    initX = 100;
    initY = 0;
    initZ = 100;
    x = 20;
    y = 20;
    z = 20;
    model = null;
    scale = [2, 2, 2];

    /**
     *
     * @param {THREE.Scene} scene
     * @param {*} player
     */
    move(scene, player) {
        // moon doesn't move.
        this.model.rotation.x += 0.01;

        if (this.collisionCheck(player)) {
            console.log("Player get hit by moon!");
            this.reset = 0;
            this.timetokill = 0;
            if (player.inTime <= 0) {
                player.inTime = 3;
                player.hp -= 4; // instantly death
            }

            if (player.hp <= 0) {
                console.log("GAME OVER!");
                player.speed = 0;
            }
            //TODO: HIT EFFECT
        }
    }
}
