function Main (){

    THREE.Scene.call(this); // THREE.SCENE constructeur sur Main

    // initilisation des objets 
    this.spaceShip;
    this.camera;
    this.skybox = new Skybox (this);
    this.hud = new Hud(this);
    this.niveau = 0;
    this.controls;
    this.gestionNiveau;
    this.audio = new Audio ();

    this.state;
    this.stateGame={
        HOME: 1,
        INGAMEONE: 2,
        READY: 3,
        GAMEOVER: 4,
        VICTORY: 5,
        TUTO: 6,
        PAUSE: 7,
        TUTOEND:8,
    };
    
};

    // Surcharge de la classe Main afin qu'elle creer la scene
    Main.prototype = Object.create(THREE.Scene.prototype); // heritage
    Main.prototype.constructor = Main;

    //============================Initialisation========= ==================//
    Main.prototype.init = function() {

        // SpaceShip
        this.spaceShip = new SpaceShip(3, this);
        this.add(this.spaceShip);

        // Skybox
        this.skybox.init();
        
        // Camera
        this.creerCamera();

        // Controle
        this.control();
        
        // GestionNiveau
        this.gestionNiveau = new GestionNiveau(1,this);
        this.state = this.stateGame.HOME;
        
        // Audio
        this.audio.init();
        this.audio.musique["musiqueAcceuil"].loop(true);
        this.audio.musique["musiqueAcceuil"].play();

        // Interface
        this.hud.hideInfo();
        this.hud.hideInstruction();
        light = new THREE.DirectionalLight( 0xdddddd, 0.8 );
        light.position.set( 0, 80, 0 );
        this.add(light);
    };

    // ============================= Animation ==============================//
    Main.prototype.animate = function(){

        // Tuto termine ou plus d'ennemi 
        // On charge le niveau suivant a l'aide de GestionNiveau
        if (this.state == this.stateGame.READY){
            this.spaceShip.position.set(0,0,0);
            this.niveau = this.niveau + 1;
            this.hud.showLevelTitle(this.niveau);
            this.gestionNiveau = new GestionNiveau(this.niveau, this);
            this.gestionNiveau.init();

            // Fin du jeu
            if (this.niveau ==7){
                this.state = this.stateGame.VICTORY;
                this.hud.showVictory();
                this.hud.hideInfo();
                this.camera.position.set(-8000, -80, 8000); 
                this.niveau = 0;
                this.audio.musique["musiqueDernierNiveau"].fade(0.8, 0.0, 1000);
                this.audio.musique["musiqueVictory"].fade(0.0, 0.8, 1000);
                this.audio.musique["musiqueVictory"].loop(true);
                this.audio.musique["musiqueVictory"].play();
            }
            // Fin du niveau
            else{
                this.state = this.stateGame.PAUSE;
            }
            if (this.niveau == 3){
                this.audio.musique["musiquePremierNiveau"].fade(0.8, 0.0, 1000);
                this.audio.musique["musiqueIntermediaireNiveau"].fade(0.0, 0.8, 1000);
                this.audio.musique["musiqueIntermediaireNiveau"].loop(true);
                this.audio.musique["musiqueIntermediaireNiveau"].play();
            }
            if (this.niveau == 5){
                this.audio.musique["musiqueIntermediaireNiveau"].fade(0.8, 0.0, 1000);
                this.audio.musique["musiqueDernierNiveau"].fade(0.0, 0.8, 1000);
                this.audio.musique["musiqueDernierNiveau"].loop(true);
                this.audio.musique["musiqueDernierNiveau"].play();
            }
        }

        // On attend que le joueur soit pret
        if (this.state == this.stateGame.PAUSE){
            this.hud.showLevelTitle(this.niveau+1);
        }

        // En jeu animation des objets de la scene
            // Lorsqu'un element bouge il verifie si il est mort 
        if (this.state == this.stateGame.INGAME){
            this.hud.showInfo();
            this.spaceShip.deplacementProjectile();
            this.gestionNiveau.deplacementAsteroid();
            this.gestionNiveau.deplacementSpaceShipEnnemi();
            
            // Verifie si on a terminee le niveau
            if (this.gestionNiveau.nombreEnnemi == 0){
                this.gestionNiveau.detruireToutSpaceShipEnnemi();
                this.spaceShip.position.set(0,0,0);
                this.state = this.stateGame.READY;
            }
            // Verifie si on a perdu
            if (this.spaceShip.life == 0){
                // Reset setting
                this.state = this.stateGame.GAMEOVER;
                this.camera.position.set(-8000,-80,8000);
                this.hud.hideInfo();
                this.hud.showGameOver();
                this.spaceShip.position.set(0,0,0);
                this.gestionNiveau.detruireToutAsteroid();
                this.gestionNiveau.detruireToutSpaceShipEnnemi();
                this.niveau = 0;
                
                // Cut audio
                this.audio.musique["musiquePremierNiveau"].fade(0.8, 0.0, 1000);
                this.audio.musique["musiquePremierNiveau"].stop();
                this.audio.musique["musiqueIntermediaireNiveau"].fade(0.8, 0.0, 1000);
                this.audio.musique["musiqueIntermediaireNiveau"].stop();
                this.audio.musique["musiqueDernierNiveau"].fade(0.8, 0.0, 1000);
                this.audio.musique["musiqueDernierNiveau"].stop();
                // Load game over audio
                this.audio.musique["musiqueGameOver"].fade(0.0, 0.8, 1000);
                this.audio.musique["musiqueGameOver"].loop(true);
                this.audio.musique["musiqueGameOver"].play();
            }
        }
       
      
        kd.tick();
    };
    // ============================== Camera ================================//
    Main.prototype.creerCamera = function(){
        this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 3000 );
        this.camera.position.set(-8000, -80, 8000);
        //this.controls = new THREE.OrbitControls( this.camera );
        this.add(this.camera);
    };

    // ============================== CONTROLE ==============================//
    Main.prototype.control = function(){

        var _this = this;

        // ================== TOUCHE ENTREE =============================//
        kd.ENTER.press(function (){  

            // Si on souhaite recommencer 
            if (_this.state == _this.stateGame.GAMEOVER){
                _this.hud.hideGameOver();
                _this.hud.hideLevelTitle();
                _this.hud.showHome();
                _this.audio.musique["musiqueGameOver"].fade(0.8, 0.0, 1000);
                _this.audio.musique["musiqueGameOver"].stop();
                _this.audio.musique["musiqueAcceuil"].fade(0.0, 0.8, 1000);
                _this.audio.musique["musiqueAcceuil"].loop(true);
                _this.audio.musique["musiqueAcceuil"].play();
                _this.spaceShip.life = 3;
                _this.state = _this.stateGame.HOME;
                return;
            }
            if (_this.state == _this.stateGame.VICTORY){
                _this.hud.hideVictory();
                _this.hud.hideLevelTitle();
                _this.hud.showHome();
                _this.audio.musique["musiqueVictory"].fade(0.8, 0.0, 1000);
                _this.audio.musique["musiqueVictory"].stop();
                _this.audio.musique["musiqueAcceuil"].fade(0.0, 0.8, 1000);
                _this.audio.musique["musiqueAcceuil"].loop(true);
                _this.audio.musique["musiqueAcceuil"].play();
                _this.spaceShip.life = 3;
                _this.state = _this.stateGame.HOME;
                return;
            }
            // Si on est en pause on reprend le jeu et on cache le titre et information
            if (_this.state == _this.stateGame.PAUSE){
                _this.hud.hideLevelTitle();
                _this.state = _this.stateGame.INGAME;
                return;
            }     
            // Si on est dans le premier niveau on continue 
            if (_this.state == _this.stateGame.TUTO){
                _this.hud.hideLevelTitle();
                _this.hud.showInstruction();
                _this.state = _this.stateGame.TUTOEND;
                return;    
            }  
            // On on a fini le tutoriel on commence a charge des ennemis
            if (_this.state == _this.stateGame.TUTOEND){
                _this.hud.hideInstruction();
                _this.state = _this.stateGame.READY;
                return;    
            }  
            // Si on est dans l'acceuil on deplace la camera et on commence a jouer
            if (_this.state == _this.stateGame.HOME){
                //camera
                _this.camera.position.set(0, 400, 0);
                _this.camera.rotation.x = -Math.PI / 2; 
                
                //effacement de l'interface et de musique
                _this.hud.hideHome();
                _this.hud.showLevelTitle(1);
                _this.audio.musique["musiqueAcceuil"].fade(0.8, 0.0, 1000);
                _this.audio.musique["musiquePremierNiveau"].fade(0.0, 0.8, 1000);
                _this.audio.musique["musiquePremierNiveau"].loop(true);
                _this.audio.musique["musiquePremierNiveau"].play();
                //changement d'etat
                _this.state = _this.stateGame.TUTO;
                return;
            } 
        });

        //======================= CONTROLE VAISSEAU ===========================//
        kd.UP.down(function () {
            if (_this.state == _this.stateGame.INGAME || _this.state == _this.stateGame.TUTOEND){
                _this.spaceShip.forward();
            }
        });
        kd.RIGHT.down(function (){
            if (_this.state == _this.stateGame.INGAME || _this.state == _this.stateGame.TUTOEND){
                _this.spaceShip.right();
            }
        });
        kd.LEFT.down(function (){
            if (_this.state == _this.stateGame.INGAME || _this.state == _this.stateGame.TUTOEND){
                _this.spaceShip.left();
            }
        });
        kd.SPACE.press(function (){
            if (_this.state == _this.stateGame.INGAME ){
                _this.spaceShip.creerProjectile();
            }
        });

        //================== CONTROLE ADDITIONNEL ============================//
        // Kill them all
        kd.K.press(function (){
            if (_this.state == _this.stateGame.INGAME ){
                _this.gestionNiveau.detruireToutAsteroid();
                _this.gestionNiveau.detruireToutSpaceShipEnnemi();
            }
        });
        // Auto loose
        kd.L.press(function (){
            if (_this.state == _this.stateGame.INGAME ){
                _this.spaceShip.life = 0;
            }
        });
        // Mute
        kd.M.press(function() {
            _this.audio.mute();
        })
        // Invincible
        kd.I.press(function(){
            if(_this.spaceShip.invincible == true){
                _this.spaceShip.invincible = false;
                console.log("Invincible : OFF");
            }else{
                _this.spaceShip.invincible = true;
                console.log("Invincible : ON");
            }
        });
        // Pause
        kd.P.press(function() {
            if (_this.state === _this.stateGame.INGAME) {
                _this.hud.showInstruction();
                _this.state = _this.stateGame.PAUSE;
                console.log("Oppy vous attend !");
            } else if (_this.state === _this.stateGame.PAUSE) {
                _this.state = _this.stateGame.INGAME;
                _this.hud.hideLevelTitle();
                _this.hud.hideInstruction();
                console.log("Oppy compte sur vous !");
            }
        });
  
    };

