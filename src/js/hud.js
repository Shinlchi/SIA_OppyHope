function Hud(main){
    this.main = main;
};



Hud.prototype.hideHome = function(){
    document.getElementById("home").style.visibility = "hidden";
};

Hud.prototype.showHome = function(){
    document.getElementById("home").style.visibility = "visible";
};

Hud.prototype.showLevelTitle = function(i){
    var title;
    if (i==1){
        title = "<span>Niveau 1 </br> Out of atmosphere</span>";
    }else if (i==2){
        title = "<span>Niveau 2 </br> First meeting</span>";
    }else if (i==3){
        title = "<span>Niveau 3 </br> Asteroid chain</span>";
    }else if (i==4){
        title = "<span>Niveau 4 </br> U.F.O. !</span>";
    }else if (i==5){
        title = "<span>Niveau 5 </br> Close to Oppy ..</span>";
    }else if (i==6){
        title = "<span>Niveau 6 </br> Mars Attack !!</span>";
    }else if (i==7){
        title = "<span>VICTORY !!</span>"; 
    }
    document.getElementById('levelOne').innerHTML = title;
    document.getElementById('levelOne').style.visibility = "visible";
}
Hud.prototype.hideLevelTitle = function(){

    document.getElementById('levelOne').style.visibility = "hidden";
};
    

Hud.prototype.showGameOver = function(){
    var increase = 0;
    var img ="<img src=\"src/medias/game_over.jpg\" >";
    document.getElementById('game-over').innerHTML = img;
    document.getElementById('game-over').style.visibility = "visible";
    for(var i=0; i<5000; i++){
        setTimeout(function (){
            increase = increase + 0.0002; 
            document.getElementById('game-over').style.opacity = increase;       
        }, i);  
    }
};
Hud.prototype.hideGameOver = function(){

    document.getElementById('game-over').style.visibility = "hidden";
    
};
Hud.prototype.showVictory = function(){
    var img ="<img src=\"src/medias/victory.jpg\"  >";
    document.getElementById('victory').innerHTML = img;
    document.getElementById('victory').style.visibility = "visible";
    for(var i=0; i<5000; i++){
        setTimeout(function (){
            increase = increase + 0.0002; 
            document.getElementById('victory').style.opacity = increase;       
        }, i);  
    }
};

Hud.prototype.hideVictory = function(){
    document.getElementById('victory').style.visibility = "hidden";
};

Hud.prototype.showInfo = function() {
    document.getElementById("life").innerHTML = this.main.spaceShip.life;
    document.getElementById('info').style.visibility = "visible";
}
Hud.prototype.hideInfo = function(){
    document.getElementById('info').style.visibility = "hidden";
}
Hud.prototype.showInstruction = function(){
    document.getElementById("instruction").style.visibility = "visible";
}
Hud.prototype.hideInstruction = function(){
    document.getElementById("instruction").style.visibility = "hidden";
}