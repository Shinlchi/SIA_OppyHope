function SpaceShip(life, main){

    THREE.Group.call(this); // THREE.Group constructeur sur SpaceShip 

    // Variables
    this.path = 'src/medias/models/SpaceShip.dae';
    var _this = this;
    this.main = main;
    this.projectileTab = new Array();
    this.attenteTir = false;
    this.life = life;
    this.invincible = false;
    // chargement du modele grâce à LoadingManager()
    var loadingManager = new THREE.LoadingManager( function () {
        _this.add( obj );
    } );
    var loader = new THREE.ColladaLoader( loadingManager );
    loader.load( this.path, function ( collada ) {
        obj = collada.scene;
        obj.scale.set(1.5,1.5,1.5);
    } );
   
};

// Surcharge de la classe SpaceShip pour qu'elle soit consideree comme un groupe 
SpaceShip.prototype =  Object.create(THREE.Group.prototype); // heritage
SpaceShip.prototype.constructor = SpaceShip;

// ================================== Projectile =========================================//
SpaceShip.prototype.creerProjectile = function(){
    var _this = this;
    if(!this.attenteTir){
        // On impose une cadence
        this.attenteTir = true;
        // Bruitage
        this.main.audio.musique["bruitage_tir"].stop();
        this.main.audio.musique["bruitage_tir"].play();
        //Creation projectile
        var projectile = new Projectile(2, this, this.main);
        //Position 
        projectile.position.set(this.position.x , this.position.y, this.position.z);
        projectile.rotation.y = this.rotation.y;
        // Ajout au tableau
        this.projectileTab.push(projectile);
        // Ajout a la scene
        this.main.add(projectile);

        // Cadence de tir en ms
        setTimeout(function() {
            _this.attenteTir = false;
        }, (350));  
    }            
};

SpaceShip.prototype.deplacementProjectile = function(){
    for (var i = 0; i < this.projectileTab.length; i++){
        this.projectileTab[i].deplacer();
    }
};

// on supprime quand le projectile est au dela du board
SpaceShip.prototype.removeProjectile = function(projectile){
    var i = this.projectileTab.indexOf(projectile);
    this.main.remove(this.projectileTab[i]);
    this.projectileTab.splice(i,1);  
};
// ================================== DEPLACEMENT =================================================//
SpaceShip.prototype.forward = function(){
    this.translateZ(1.8);
    if (this.position.x>350){
        this.position.x = -350;
    }
    if (this.position.x<-350){
        this.position.x = 350;
    }
    if (this.position.z>180){
        this.position.z = -180;
    }
    if (this.position.z<-180){
        this.position.z = 180;
    }
};

SpaceShip.prototype.left = function(){
    this.rotation.y += 0.1;
};

SpaceShip.prototype.right = function(){
    this.rotation.y -= 0.1;
};

