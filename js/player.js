class Player{
    constructor(scene, renderer){
        this.health = 100;
        this.speed = 0.5;
        this.score = 0;
        this.treasure = 0;
        this.scene = scene;
        const loader = new THREE.GLTFLoader();
        loader.load('models/player_ship.glb', (gltf) => {
            this.player = gltf.scene;
            this.player.position.set(0,0,-4);
            this.player.scale.set(0.8, 0.8, 0.8);

            // this.player.rotation.y = Math.PI;
            this.scene.add(this.player);
            this.player.add(camera);
            camera.lookAt(this.player.position);
        });
    }
}