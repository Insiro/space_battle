import { BulletBase } from "./bulletbase.js";
export class SuperBullet extends BulletBase {
    scale = [20, 20, 20];
    alive_time = 200;
    damage = 3;
    color = 0xff0000;
    constructor(player) {
        super(player);
        this.setModel(player);
    }
}
