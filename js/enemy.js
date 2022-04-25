function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

class Enemy{
    constructor(scene, renderer, player){
        this.health = 100;
        this.speed = 0.05;
        this.score = 0;
        this.scene = scene;
        const loader = new THREE.GLTFLoader();
        loader.load('models/enemy_ship.glb', (gltf) => {
            this.player = gltf.scene;
            this.player.position.set(randomNumber(-50,50),0,randomNumber(-50,50));
            this.player.scale.set(0.8, 0.8, 0.8);
            // this.player.rotation.y = Math.PI;
            this.scene.add(this.player);
        });
    
    }
}