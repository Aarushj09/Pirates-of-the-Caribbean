class Bullet{
    constructor(scene, renderer, player){
        this.speed = 0.5;
        this.damage = 10;
        // this.direction = player.player.position;
        this.scene = scene;
        const loader = new THREE.GLTFLoader();
        loader.load('models/bullet.glb', (gltf) => {
            this.player = gltf.scene;
            this.player.position.set(player.player.position.x,player.player.position.y,player.player.position.z);
            this.player.scale.set(0.4, 0.4, 0.4);
            this.player.rotation.y = player.player.rotation.y;
            this.scene.add(this.player);
        });
    }
}