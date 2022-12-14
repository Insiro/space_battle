export class Object {
    light = null;
    async setModel(model) {
        model.scale.set(this.scale[0], this.scale[1], this.scale[2]);
        model.position.set(this.x, this.y, this.z);
        this.model = model;
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    collisionCheck(object, distance = 5) {
        let diffx = Math.abs(this.x - object.x);
        let diffy = Math.abs(this.y - object.y);
        let diffz = Math.abs(this.z - object.z);
        return diffx < distance && diffy < distance && diffz < distance;
    }
    respawn(player) {}
}
