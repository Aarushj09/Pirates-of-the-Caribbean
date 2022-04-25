const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var start_time = Date.now();
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setClearColor('#00FFFF');

var camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000);
camera.position.set(0, 6, 0);

var light = new THREE.AmbientLight(0xFFFFFF, 0.5);
scene.add(light);
var scenery = new Scenery(scene,renderer);
scenery.updateSun(scene);
var player = new Player(scene,renderer,camera);

enemies = [];
chests = [];
bullets = [];
bullets_enemy = [];
var view = 0;   // 0 for third person and 1 for top view
var view_flag = 0;
// enemies.push(new Enemy(scene, renderer));


function onDocumentKeyDown(event) {
    var keyCode = event.which;
    // console.log(keyCode);
    if (keyCode == 87) { // up
        player.player.translateZ(-player.speed);
    } else if (keyCode == 83) { // down
        player.player.translateZ(player.speed);
    } else if (keyCode == 65) { // left
        player.player.rotation.y += 0.1;
    } else if (keyCode == 68) { // right
        player.player.rotation.y -= 0.1;
    }
    else if(keyCode == 32){
        // space: fire bullets on enemies
        bullets.push(new Bullet(scene, renderer, player));
    }
    else if(keyCode==84){
        // press T for camera toggle
        view = 1-view;
        view_flag=0;

    }
};

function updateHUD(){
    document.getElementById("score").innerHTML = "Score: " + player.score;
    document.getElementById("health").innerHTML = "Health: " + player.health;
    document.getElementById("treasure").innerHTML = "Treasure: " + player.treasure;
    document.getElementById("time").innerHTML = "Time: " + parseInt((Date.now()-start_time)/1000);
}

function checkBulletCollision_P(){
    for(let x = 0; x<bullets_enemy.length;x++){
        if(bullets_enemy[x].player.position.distanceTo(player.player.position)<3){
            scene.remove(bullets_enemy[x].player);
            player.health -= bullets_enemy[x].damage;
            bullets_enemy.splice(x,1);
        }
    }
}

function checkBulletCollision_E(){
    for(let x = 0; x<bullets.length;x++){
        for(let y=0;y<enemies.length;y++){
            if(bullets[x].player.position.distanceTo(enemies[y].player.position)<3){
                scene.remove(bullets[x].player);
                scene.remove(enemies[y].player);
                bullets.splice(x,1);
                enemies.splice(y,1);
                player.score+=1;
            }
        }
    }
}

function checkShipsCollision(){
    for(let x=0; x<enemies.length;x++){
        if(enemies[x].player.position.distanceTo(player.player.position)<3){
            scene.remove(enemies[x].player);
            enemies.splice(x,1);
            player.health -= 10;
        }
    }
}

function checkTreasure(){
    for(let x=0;x<chests.length;x++){
        if(chests[x].player.position.distanceTo(player.player.position)<3){
            scene.remove(chests[x].player);
            player.treasure+=chests[x].score;
            chests.splice(x,1);
        }
    }
}


function checkGameOver(){
    if(player.health<=0){
        player.health=0;
        document.getElementById("message").innerHTML = "Game Over!";
    }
    return;
}


current_time = start_time;
window.addEventListener('keydown', onDocumentKeyDown, false);
function render() {
    if(document.getElementById("message").innerHTML == "Game Over!")
        return;
    requestAnimationFrame(render);
    if(player != undefined){
        // console.log(player);
        delay = (Date.now()-current_time);
        // console.log(player.player.position.x);
        if(delay>10000){
            current_time=Date.now();
            enemies.push(new Enemy(scene, renderer, player));
            chests.push(new Treasure(scene, renderer, player));
            for(let i = 0; i < enemies.length; i++){
                bullets_enemy.push(new Bullet(scene, renderer, enemies[i]));
            }
        }
        for(var x=0;x<enemies.length;x++){
            enemies[x].player.lookAt(player.player.position);
            enemies[x].player.translateZ(enemies[x].speed);
        }
        
        for(var x=0;x<bullets.length;x++){
            bullets[x].player.translateZ(-bullets[x].speed);
            if(bullets[x].player.position.distanceTo(player.player.position)>100){
                scene.remove(bullets[x].player);
                bullets.splice(x,1);
            }
        }
        for(var x=0;x<bullets_enemy.length;x++){
            bullets_enemy[x].player.translateZ(bullets_enemy[x].speed);
            if(bullets_enemy[x].player.position.distanceTo(player.player.position)>100){
                scene.remove(bullets_enemy[x].player);
                bullets_enemy.splice(x,1);
            }
        }

        checkBulletCollision_P();
        checkBulletCollision_E();
        checkShipsCollision();
        checkTreasure();
        checkGameOver();
        scenery.waterObj.material.uniforms[ 'time' ].value += 1.0 / 60.0;
        if(view==1){
            camera.position.set(0,50,0.1);
        }
        if(view==0){
            camera.position.set(0,6,10);
        }
        camera.lookAt(player.player.position);
    }
    renderer.render(scene, camera);
    updateHUD();
}

render();