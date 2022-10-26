export class Object {
    light = null;
    setModel(model) {
        model.scale.set(this.scale[0], this.scale[1], this.scale[2]);
        model.position.set(this.x, this.y, this.z);
        this.model = model;
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    collisionCheck(camera) {
        let diffx = Math.abs(this.x - camera.position.x);
        let diffy = Math.abs(this.y - camera.position.y);
        let diffz = Math.abs(this.z - camera.position.z);
        return diffx < 10 && diffy < 10 && diffz < 10;
    }
}

