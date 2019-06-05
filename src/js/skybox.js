function Skybox (main){

    THREE.Group.call(this); 
    this.main = main;
}

// On surcharge la classe Decor
Skybox.prototype = Object.create(THREE.Group.prototype); // heritage
Skybox.prototype.constructor = Skybox;

Skybox.prototype.init = function(){
    var geometry = new THREE.CubeGeometry(1000,1000,1000);
    var cubeMaterials = 
    [
       /* new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("src/medias/skybox/front.png"),side: THREE.DoubleSide}),
       new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("src/medias/skybox/back.png"),side: THREE.DoubleSide}),
       new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("src/medias/skybox/top.png"),side: THREE.DoubleSide}),
       new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("src/medias/skybox/bottom.png"),side: THREE.DoubleSide}),
       new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("src/medias/skybox/right.png"),side: THREE.DoubleSide}),
       new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("src/medias/skybox/left.png"),side: THREE.DoubleSide}),
       
     */
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("src/medias/skybox/sky.png"),side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("src/medias/skybox/sky.png"),side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("src/medias/skybox/sky.png"),side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("src/medias/skybox/sky.png"),side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("src/medias/skybox/sky.png"),side: THREE.DoubleSide}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("src/medias/skybox/sky.png"),side: THREE.DoubleSide}),
];
    
    var cubeMaterials = new THREE.MeshFaceMaterial(cubeMaterials);
    var cube = new THREE.Mesh(geometry,cubeMaterials);
    this.main.add(cube);
};

