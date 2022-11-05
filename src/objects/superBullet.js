import { Object } from "./object.js";

export class SuperBullet extends Object {
    x = 20;
    y = 20;
    z = 20;
    model = null;
    scale = [12, 12, 12];
    alive_time = 200;
    damage = 3;
    constructor(player) {
        super();

        this.model = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
        this.x = player.x;
        this.y = player.y;
        this.z = player.z;
        this.model.scale.set(20, 20, 20);
        this.model.position.set(player.x, player.y, player.z);
        const angle = player.angle();
        this.velocity = new THREE.Vector3(angle[0], 0, angle[2]);
    }
    move(meteros) {
        console.log(this.velocity);
        this.model.position.add(this.velocity);
        this.x = this.model.position.x;
        this.y = this.model.position.y;
        this.z = this.model.position.z;
        this.alive_time--;
        for (const meteor of meteros)
            if (this.collisionCheck(meteor)) {
                this.alive_time = 0;
                meteor.hp -= this.damage;
                break;
            }
    }
}
