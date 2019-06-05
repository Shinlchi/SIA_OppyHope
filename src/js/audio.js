function Audio() {

    // liste 
    this.musique = new Array();
   
    // Etat de la musique 
    this.musiqueON = true;
};

Audio.prototype.init = function() {

    /* =================== MUSIQUE =================== */

    this.musique["musiqueAcceuil"] = new Howl({
        src: ['src/medias/musique/musiqueAcceuil.mp3'],
        volume: 0.7,
        preload: true
    });

    this.musique["musiquePremierNiveau"] = new Howl({
        src: ['src/medias/musique/tuto.mp3'],
        volume: 0.2,
        preload: true
    });

    this.musique["musiqueIntermediaireNiveau"] = new Howl({
        src: ['src/medias/musique/asteroid.mp3'],
        volume: 0.2,
        preload: true
    });

    this.musique["musiqueDernierNiveau"] = new Howl({
        src: ['src/medias/musique/danger.mp3'],
        volume: 0.2,
        preload: true
    });

    this.musique["musiqueGameOver"] = new Howl({
        src: ['src/medias/musique/gameOver.mp3'],
        volume: 0.2,
        preload: true
    });

    this.musique["musiqueVictory"] = new Howl({
        src: ['src/medias/musique/victory.mp3'],
        volume: 0.2,
        preload: true
    });
    
    this.musique["bruitage_tir"] = new Howl({
        src: ['src/medias/musique/bruitage_tir.mp3'],
        volume: 0.2,
        preload: true
    });

};

// Mute
Audio.prototype.mute = function() {

    if (this.uneMusiqueON === true) {
        this.uneMusiqueON = false;
    } else {
        this.uneMusiqueON = true;
    }

    if (this.uneMusiqueON) {
        for (var m in this.musique) {
            this.musique[m].mute(false);
            console.log("Musique : ON");
        }
    } else {
        for (var m in this.musique) {
            this.musique[m].mute(true);
            console.log("Musique : OFF");
        }
    }
};