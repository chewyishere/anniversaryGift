import * as THREE from 'three';
import Config from '../../data/config';
import Material from '../helpers/material';

export default class Background {
  constructor(scene) {
    this.scene = scene;
    this.bg = null;
    this.floor = null;

  }

  updateBg(x,y,z,texture){
    this.scene.remove(this.bg);
    this.scene.remove(this.floor);
    
    var mat = new THREE.MeshBasicMaterial();
    mat.map = texture;
    var bgGemo = new THREE.PlaneBufferGeometry(x,y);
    bgGemo.applyMatrix(new THREE.Matrix4().makeTranslation(0,y/2,0));
    this.bg = new THREE.Mesh(bgGemo, mat);
    this.bg.material.needsUpdate = true;
    this.bg.position.z = z;
    this.bg.castShadow = true;
    this.bg.receiveShadow = true;
    this.scene.add(this.bg);

    this.floor = new THREE.Mesh(new THREE.PlaneGeometry(x,y), new THREE.MeshPhongMaterial({color: 0xbbbbbb}));
    this.floor.material.side = THREE.DoubleSide;
    this.floor.receiveShadow = true;
    this.floor.castShadow = true;
    this.floor.position.y = 0;
    this.floor.rotation.x =  -Math.PI/2;


    this.spot1 = new THREE.SpotLight(0xffffff);
    this.spot1.position.set(20, 20, 30);
    this.spot1.castShadow = true;
    this.spot1.shadow.bias = 0.0001;
    this.spot1.shadow.mapSize.width = 1024 * 2;
    this.spot1.shadow.mapSize.height = 1024 * 2;
    this.scene.add(this.spot1);

    this.scene.add(this.floor);

  }

}