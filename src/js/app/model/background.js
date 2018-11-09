import * as THREE from 'three';
import Config from '../../data/config';
import Material from '../helpers/material';
import TweenMax from "gsap/TweenMax";

export default class Background {
  constructor(scene) {
    this.scene = scene;
    this.allBackgrounds = new THREE.Group();
    this.currentBg = 0;
    this.screenWidth = window.innerWidth * 2.5;
  
  }

  init(tex){
    this.allBackgrounds.position.set(this.screenWidth,0,0);
    this.scene.add(this.allBackgrounds);
    for(var i=0; i < Config.bgPresets.length; i++ ){
      this.prepareBg(i,tex[i+1]);
    }
  }
 
  prepareBg(idx,tex){
    let x = Config.bgPresets[idx].x;
    let y = Config.bgPresets[idx].y;
    let z = Config.bgPresets[idx].z;
    
    let bgGemo = new THREE.PlaneBufferGeometry(x,y);
    bgGemo.applyMatrix(new THREE.Matrix4().makeTranslation(0,y/2,0));
   
    let mat = new THREE.MeshPhongMaterial();
    mat.map = tex;

    let bg = new THREE.Mesh(bgGemo, mat);
    bg.material.needsUpdate = true;
    bg.material.side = THREE.DoubleSide;
    bg.position.z = z/2;
    bg.position.x = 0;
    bg.receiveShadow = true;

    //floor
    let floor = new THREE.Mesh(new THREE.PlaneGeometry(x,y), new THREE.MeshPhongMaterial({color: 0xbbbbbb}));
    floor.material.side = THREE.DoubleSide;
    floor.receiveShadow = true;
    floor.position.y = 0;
    floor.position.x = 0;
    floor.position.z = 0;
    floor.rotation.x =  Math.PI/2;

    let bgSet = new THREE.Group();
    bgSet.position.set (this.screenWidth * idx, 0, 0);
    bgSet.add(bg);
    bgSet.add(floor);

    this.allBackgrounds.add(bgSet);

  }

  updateBg(idx){
    let isNext = (idx >= this.currentBg) ? true : false;
    let speed = 0.8;
    let dis = this.screenWidth.toString();
    let moveX = isNext? ( "-=" + dis)  : ( "+=" + dis);
     
    TweenMax.to(this.allBackgrounds.position, speed, {x:moveX, ease:Back.easeOut, onComplete: function(){
      console.log(this.target.x);
    }});
    this.currentBg = idx; 
   
  }

}