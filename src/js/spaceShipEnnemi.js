function SpaceShipEnnemi(life, main){

    THREE.Group.call(this); // THREE.Group constructeur sur SpaceShip 

    // Variables
    this.path = 'src/medias/models/SpaceShipEnnemi.dae';
    var _this = this;
    this.main = main;
    this.projectileTab = new Array();
    this.attenteTir = false;
    this.life = life;
    this.tourne = false;
    this.invincible = false;
    this.orientation = 1;
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
SpaceShipEnnemi.prototype =  Object.create(THREE.Group.prototype); // heritage
SpaceShipEnnemi.prototype.constructor = SpaceShipEnnemi;

// ================================== Projectile =========================================//
SpaceShipEnnemi.prototype.creerProjectile = function(){
    var _this = this;
    if(!this.attenteTir){
        // On impose une cadence
        this.attenteTir = true;
        // Bruitage
        this.main.audio.musique["bruitage_tir"].stop();
        this.main.audio.musique["bruitage_tir"].play();
        //Creation projectile
        var projectile = new Projectile(5, this, this.main);
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
        }, (500));  
    }            
};

SpaceShipEnnemi.prototype.deplacementProjectile = function(){
    for (var i = 0; i < this.projectileTab.length; i++){
        this.projectileTab[i].deplacer();
    }
};

// on supprime quand le projectile est au dela du board
SpaceShipEnnemi.prototype.removeProjectile = function(projectile){
    var i = this.projectileTab.indexOf(projectile);
    this.main.remove(this.projectileTab[i]);
    this.projectileTab.splice(i,1);  
};

SpaceShipEnnemi.prototype.removeAllProjectile = function(){
    for(var i=0; i<this.projectileTab.length; i++){
        this.main.remove(this.projectileTab[i]);
    }
    this.projectileTab = [];;
};

// ================================== DEPLACEMENT =================================================//
SpaceShipEnnemi.prototype.deplacer = function(){
    var _this = this;
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
    var tmp = Math.floor(Math.random() * Math.floor(2));
    

    if (tmp == 0 && this.tourne == false){
        this.tourne = true;
        this.orientation = 1;
        setTimeout(function() {_this.tourne = false;}, (3000));  
    }else if(tmp == 1 && this.tourne == false){
        this.tourne = true;
        this.orientation = 0;
        setTimeout(function() {_this.tourne = false;}, (3000));  
    }
    if (this.orientation == 1){
        this.rotation.y += 0.01;
    }
    if (this.orientation == 0) {
        this.rotation.y -= 0.01;
    }
    this.gestionCollision();
};

SpaceShipEnnemi.prototype.gestionCollision = function(){

    if(this.position.distanceTo(this.main.spaceShip.position) < 20 && this.main.spaceShip.invincible == false)
    {
        console.log("Un ennemi vous a touché");
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