class Oil {
    gltf_path = "models/oil/scene.gltf";
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
    constructor(loader, scene) {
        loader.load(
            this.gltf_path,
            function (gltf) {
                this.model = gltf.scene.children[0];
                this.model.scale.set(1, 1, 1);
                this.model.position.set(this.x, this.y, this.z);
                scene.add(gltf.scene);
            },
            undefined,
            (error) => console.error(error)
        );
    }
}
