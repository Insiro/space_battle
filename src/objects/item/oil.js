import { Item } from "./item.js";
export class Oil extends Item {
    gltf_path = "./models/oil/scene.gltf";
    initX = 100;
    initY = 0;
    initZ = 100;
    x = 50;
    y = 50;
    z = 50;
    inittime = 5;
    timeleft = 5;
    rotation = 0.1;
    reset = 10;
    timetokill = 0;
    model = null;
    itemcode = 1;
    scale = [1, 1, 1];

    onCollision(player) {
        player.inTime = 3;
        if (player.hp < 3) {
            player.hp += 1;
        }
    }
}
