var renderer;

if (Detector.webgl) {
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true // to allow screenshot
    });
} else {
    renderer = new THREE.CanvasRenderer();
}

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//lancement du jeu
var main = new Main();

function render() {
    window.requestAnimationFrame(render); 
    // on envoie main de type Main fils de THREE.Scene 
    renderer.render(main, main.camera);
    //main.controls.update();
    main.animate();
};

main.init();
render();

