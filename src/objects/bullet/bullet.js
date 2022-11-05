import { BulletBase } from "./bulletbase.js";
export class Bullet extends BulletBase {
    scale = [2, 2, 2];
    alive_time = 100;
    damage = 1;
    color = 0xffffff;
    constructor(player) {
        super(player);
        this.setModel(player);
    }
}
