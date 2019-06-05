function Asteroid(life, size, main){
    
    THREE.Group.call(this); // THREE.Group constructeur sur Asteroid
    this.main = main;
    this.life = life;
    this.size = size;

    // Creation asteroid
    var geometrySphere = new THREE.SphereGeometry( 30 / this.size, 32, 32 );
    var materialSphere = new THREE.MeshToonMaterial( {color: 0xaaaaaa} );
    var sphere = new THREE.Mesh( geometrySphere, materialSphere );
    this.add(sphere); 

   
};

// Surcharge de la classe asteroid en Group
Asteroid.prototype = Object.create(THREE.Group.prototype);
Asteroid.prototype.constructor = Asteroid;

Asteroid.prototype.deplacer = function(){
   
    if (this.position.x>400){
        this.position.x = -400;
    }
    if (this.position.x<-400){
        this.position.x = 400;
    }
    if (this.position.z>200){
        this.position.z = -200;
    }
    if (this.position.z<-200){
        this.position.z = 200;
    }
    this.translateZ(1.5);
    this.gestionCollision();
};

Asteroid.prototype.gestionCollision = function(){

    if(this.position.distanceTo(this.main.spaceShip.position) < 20 && this.main.spaceShip.invincible == false)
    {
        console.log("Un astéroid vous a touché");
        this.main.spaceShip.position.x = 0;
        this.main.spaceShip.position.z = 0
        this.main.spaceShip.life -= 1;
        this.main.spaceShip.invincible = true;
        

        for(var i=0; i<26; i++){
            if (i%2 == 0){
                setTimeout(function (){
                    this.main.spaceShip.visible = false;
                }, 170*i);
            }else{
                setTimeout(function (){
                    this.main.spaceShip.visible = true;
                }, 170*i);
            }
        }
        setTimeout(function (){
            this.main.spaceShip.invincible = false;
        }, 4500);
      
    }
}