function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

class Treasure{
    constructor(scene, renderer, player){
        this.score = randomNumber(1,10);
        this.scene = scene;
        const loader = new THREE.GLTFLoader();
        loader.load('models/treasure_chest.glb', (gltf) => {
            this.player = gltf.scene;
            this.player.position.set(randomNumber(-50,50),0,randomNumber(-50,50));
            this.player.scale.set(0.8, 0.8, 0.8);
            // this.player.rotation.y = Math.PI;
            this.scene.add(this.player);
        });
    
    }
}