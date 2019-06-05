// ============================ PROJECTILE ================================== //
function Projectile(size, tireur,main){
    this.size = size;
    THREE.Group.call(this); // THREE.Group constructeur sur Projectile
    this.main = main;
    this.tireur = tireur;
    //Creation projectile
    var geometryCynlinder = new THREE.CylinderGeometry(size, size, size*3, 35);
    var materialCylinder = new THREE.MeshPhongMaterial( {color: 0xaaaaaa, shininess: 80} );
    var cylinder = new THREE.Mesh(geometryCynlinder, materialCylinder);
    cylinder.rotation.x = Math.PI / 2;                  
    //Ajout au Group
    this.add(cylinder);
    
};

// Surcharge de la classe projectile en Group
Projectile.prototype = Object.create(THREE.Group.prototype);
Projectile.prototype.constructor = Projectile;


Projectile.prototype.deplacer = function(){
    
    if (this.tireur instanceof SpaceShip && this.position.distanceTo(this.tireur.position)>250){
        this.tireur.removeProjectile(this);
    }
    this.translateZ(8);
    this.gestionCollision();
    this.gestionCollisionEnnemi();
    this.gestionCollisionAlliee();
};

Projectile.prototype.gestionCollision = function(){
    for (var i=0 ; i < this.main.gestionNiveau.asteroidTab.length; i++){
        
        // Un asteroid est touche
        if (this.tireur  instanceof SpaceShip  && this.position.distanceTo(this.main.gestionNiveau.asteroidTab[i].position) < 25 ){
            
            //On recupere ses informations
            var asteroid = this.main.gestionNiveau.asteroidTab[i];
            var lifeAsteroid = this.main.gestionNiveau.asteroidTab[i].life;
            var sizeAsteroid = this.main.gestionNiveau.asteroidTab[i].size;

            //Si il a de la vie on en creer 3 autres de taille et vie inferieur
            if (lifeAsteroid-1 > 0){
                this.main.gestionNiveau.creerAsteroid(sizeAsteroid+1, lifeAsteroid-1, asteroid);
            }

            // On le supprime de la scene et du tableau
            this.main.remove(this.main.gestionNiveau.asteroidTab[i]);
            this.main.gestionNiveau.asteroidTab.splice(i,1);
            this.main.gestionNiveau.nombreEnnemi = this.main.gestionNiveau.nombreEnnemi -1;
        }
    } 

};
Projectile.prototype.gestionCollisionEnnemi = function(){
    
            if (this.main.spaceShip.invincible== false && this.tireur instanceof SpaceShipEnnemi && this.position.distanceTo(this.main.spaceShip.position) < 15){
                 // On supprime le projectile qui a touche
                 this.tireur.removeProjectile(this);
                console.log("Un tir ennemi vous a touché");
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
        
    
};
Projectile.prototype.gestionCollisionAlliee = function(){
    for (var i=0; i<this.main.gestionNiveau.spaceShipEnnemiTab.length; i++){
       
        if (this.main.gestionNiveau.spaceShipEnnemiTab[i].invincible == false && this.tireur instanceof SpaceShip && this.position.distanceTo(this.main.gestionNiveau.spaceShipEnnemiTab[i].position) < 15){
           
            // On supprime le projectile qui a touche
            this.tireur.removeProjectile(this);

            console.log("Ennemi perd un pv");
            this.main.gestionNiveau.spaceShipEnnemiTab[i].life -= 1;

            // Si il n'a plus de point de vie il disparait sinon il clignote 
           if (this.main.gestionNiveau.spaceShipEnnemiTab[i].life == 0){
                
                this.main.gestionNiveau.spaceShipEnnemiTab[i].removeAllProjectile();
                this.main.remove(this.main.gestionNiveau.spaceShipEnnemiTab[i]);
                this.main.gestionNiveau.spaceShipEnnemiTab.splice(i,1);
                this.main.gestionNiveau.nombreEnnemi --;
            }
           
       }
    }
};

