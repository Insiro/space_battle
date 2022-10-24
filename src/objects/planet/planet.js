import { Object } from "../object.js";
export class Planet extends Object {
    move() {
        this.model.rotation.x += 0.01;
    }
}
