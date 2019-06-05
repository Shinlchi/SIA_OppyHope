function GestionNiveau(niveau, main){

    THREE.Group.call(this);
    this.niveau = niveau;
    this.main = main;
    this.asteroidTab = new Array();
    this.spaceShipEnnemiTab = new Array();
    this.isComplete = false;
    this.nombreEnnemi=0;
};

// On surcharge la classe gestionNiveau
GestionNiveau.prototype = Object.create(THREE.Group.prototype);
GestionNiveau.prototype.constructor = GestionNiveau;

GestionNiveau.prototype.init = function(){
    if (this.niveau == 1 ){ //First meeting
        this.creerAsteroid(1, 3);
    }
    if (this.niveau == 2 ){ // Asteroid Chain
        this.creerAsteroid(1, 3);
        this.creerAsteroid(1, 3);
    }   
    if (this.niveau == 3 ){ // UFO
        this.creerEnnemi(1);
    }
    if (this.niveau == 4 ){ // Close to Oppy
        this.creerAsteroid(1, 3);
        this.creerEnnemi(1);
    }
    if (this.niveau == 5 ){ //Mars Attack
        this.creerAsteroid(1, 3);
        this.creerEnnemi(1);
    }
    if (this.niveau == 6 ){
        //show victory
    }
};

GestionNiveau.prototype.creerAsteroid = function(size, life, asteroidPere){
    
    if (life == 3){
        for (var i=0; i < 3; i++){
            var asteroid = new Asteroid(life, size, this.main);

            //Position aléatoire dans la skybox [-250, 250]
            asteroid.position.x = Math.floor(Math.random() * (250 + 250 +1)) - 250;
            asteroid.position.z = Math.floor(Math.random() * (250 + 250 +1)) - 250;
            asteroid.position.normalize();
            asteroid.position.multiplyScalar( 200 );

            //Trajectoire aleatoire entre [0, 2PI]
            asteroid.rotation.y = Math.random() * (Math.PI*2);

            this.asteroidTab.push(asteroid);
            this.main.add(this.asteroidTab[this.asteroidTab.length-1]);

            this.nombreEnnemi ++;
        }
    }
    if (life <3){
        for (var i=0; i < 3; i++){
        var asteroid = new Asteroid(life, size, this.main);
        //Position du père
        asteroid.translateX( asteroidPere.position.x+15);
        asteroid.translateY(asteroidPere.position.y);
        asteroid.translateZ( asteroidPere.position.z);
        
        //Trajectoire eclatee
        if (i==0){
            asteroid.rotation.y = 2*Math.PI / 3;
        }
        if (i==1){
            asteroid.rotation.y = 4*Math.PI / 3;
        }
        if (i==2){
            asteroid.rotation.y = 2*Math.PI;
        }
        
        this.asteroidTab.push(asteroid);
        this.main.add(this.asteroidTab[this.asteroidTab.length-1]);

        this.nombreEnnemi ++;
        }
    }
};

GestionNiveau.prototype.deplacementAsteroid = function(){
    for (var i = 0; i < this.asteroidTab.length; i++){
        this.asteroidTab[i].deplacer();       
    }
};

GestionNiveau.prototype.detruireToutAsteroid = function(){
    for (var i = 0; i <= this.main.gestionNiveau.asteroidTab.length; i++){
        this.main.remove(this.asteroidTab[i]);       
        this.nombreEnnemi = 0;
    }
    this.main.gestionNiveau.asteroidTab =[];
};

GestionNiveau.prototype.creerEnnemi = function(life){
      
    var spaceShipEnnemi = new SpaceShipEnnemi(life, this.main);
    
    //Position aléatoire dans la skybox [-250, 250]
    spaceShipEnnemi.position.x = Math.floor(Math.random() * (250 + 250 +1)) - 250;
    spaceShipEnnemi.position.z = Math.floor(Math.random() * (250 + 250 +1)) - 250;
    spaceShipEnnemi.position.normalize();
    spaceShipEnnemi.position.multiplyScalar( 200 );

    //Trajectoire aleatoire entre [0, 2PI]
    spaceShipEnnemi.rotation.y = Math.random() * (Math.PI*2);

    this.spaceShipEnnemiTab.push(spaceShipEnnemi);
    this.main.add(this.spaceShipEnnemiTab[this.spaceShipEnnemiTab.length-1]);

    this.nombreEnnemi ++;
    
};

GestionNiveau.prototype.deplacementSpaceShipEnnemi = function(){
    for (var i = 0; i < this.spaceShipEnnemiTab.length; i++){
        this.spaceShipEnnemiTab[i].deplacer();     
        this.spaceShipEnnemiTab[i].creerProjectile(); 
        this.spaceShipEnnemiTab[i].deplacementProjectile();
    }
};

GestionNiveau.prototype.detruireToutSpaceShipEnnemi = function(){
    for (var i = 0; i < this.main.gestionNiveau.spaceShipEnnemiTab.length; i++){
        this.main.remove(this.spaceShipEnnemiTab[i]);       
        this.nombreEnnemi = 0;
        this.spaceShipEnnemiTab[i].removeAllProjectile();
    }
    this.main.gestionNiveau.spaceShipEnnemiTab =[];
};

