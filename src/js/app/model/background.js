import * as THREE from 'three';
import Config from '../../data/config';
import Material from '../helpers/material';

export default class Background {
  constructor(scene) {
    this.scene = scene;
    this.bg = null;
    this.floor = null;
    this.prevBg = null;
    this.prevFloor = null;
    this.bgSet = new THREE.Group();
   
  }

  init(){
    addLight();
    this.scene.add(this.bgSet);
  }

  removePrevBg(){
    // after shuffle
    this.scene.remove(this.bg);
    this.scene.remove(this.floor);
  }

  prepareBg(idx,tex){
    //bg
    let x = Config.bgPresets[idx].x;
    let y = Config.bgPresets[idx].y;
    let z = Config.bgPresets[idx].z;
    
    let bgGemo = new THREE.PlaneBufferGeometry(x,y);
    bgGemo.applyMatrix(new THREE.Matrix4().makeTranslation(0,y/2,0));
   
    let mat = new THREE.MeshBasicMaterial();
    mat.map = tex;

    this.bg = new THREE.Mesh(bgGemo, mat);
    this.bg.material.needsUpdate = true;
    this.bg.position.z = z;

    //floor
    this.floor = new THREE.Mesh(new THREE.PlaneGeometry(x,y), new THREE.MeshPhongMaterial({color: 0xbbbbbb}));
    this.floor.material.side = THREE.DoubleSide;
    this.floor.receiveShadow = true;
    this.floor.castShadow = true;
    this.floor.position.y = 0;
    this.floor.rotation.x =  Math.PI/2;

    //this.bgSet.position.z = 200;
    this.bgSet.add(this.bg);
    this.bgSet.add(this.floor);


  }

  addLight(){
    this.spot1 = new THREE.SpotLight(0xffffff);
    this.spot1.position.set(20, 20, 30);
    this.spot1.castShadow = true;
    this.spot1.shadow.bias = 0.0001;
    this.spot1.shadow.mapSize.width = 1024 * 2;
    this.spot1.shadow.mapSize.height = 1024 * 2;
    this.scene.add(this.spot1);
  }

  shuffleBg(){
    this.prevBg = this.bg;
    this.prevFloor = this.floor;
  }

  updateBg(idx,tex){
    console.log(idx);
    this.prepareBg(idx,tex);
   // this.shuffleBg();

  }

}