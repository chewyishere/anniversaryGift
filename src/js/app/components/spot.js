import * as THREE from 'three';
import Config from '../../data/config';
import TweenMax from "gsap/TweenMax";

// Sets up and places all lights in scene
export default class Spot {
  constructor(scene) {
    this.scene = scene;
    var spotGeo = new THREE.ConeGeometry( 5, 20, 5 );
    var spotMat = new THREE.MeshPhongMaterial( {color: 0xff0000, shininess: 80} );
    var light = new THREE.PointLight( 0xff0000, 1, 100 );
    light.position.set( 0, 0, 0 );
    this.spot = new THREE.Mesh(spotGeo, spotMat );
    this.spot.position.y = 0;
    this.spot.add(light);
    this.spot.scale.set(0.1,0.1,0.1);
    this.spot.rotation.x = Math.PI;
    this.scene.add(this.spot);
}

  init() {
    this.jump();
  }

  jump(){
    var sp = 2;

    TweenMax.to(this.spot.scale, sp/2, {x:2, y:2, z:2, ease:Power3.easeOut});
    TweenMax.to(this.spot.scale, sp/2, {x:1, y:1, z:1, ease:Power3.easeIn, delay:sp/2});

  }

  spin(){
      this.spot.rotation.y += 0.02;
  }
  
}
