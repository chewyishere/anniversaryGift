import * as THREE from 'three';
import Config from '../../data/config';
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
    for(var i=0; i < Config.bgPresets.length; i++){
      this.prepareBg(i, tex[i*5+1], tex[i*5+2], tex[i*5+3],tex[i*5+4], tex[i*5+5]);
    }
  }
 
  prepareBg(idx, tex1, tex2, tex3, texBG, texFloor){

    let x = Config.bgPresets[idx].x;
    let y = Config.bgPresets[idx].y;
    let z = Config.bgPresets[idx].z;
    
    let bgGemo = new THREE.PlaneBufferGeometry(x,y);
    bgGemo.applyMatrix(new THREE.Matrix4().makeTranslation(0,y/2,0));

    let mat = new THREE.MeshBasicMaterial();
    mat.blending = THREE.NormalBlending;
    mat.transparent = true;
    mat.side = THREE.DoubleSide;

    let mat2 = mat.clone();
    let mat3 = mat.clone();
    let matBG = mat.clone();

    mat.map = tex1;
    mat2.map = tex2;
    mat3.map = tex3;
    matBG.map = texBG;

    var bg1 = new THREE.Mesh(bgGemo, mat);
    bg1.material.needsUpdate = true;
    bg1.material.side = THREE.DoubleSide;
    bg1.position.z = 0 - z/2;
    bg1.position.x = 0;
    bg1.receiveShadow = false;
    bg1.rotation.x = Math.PI/2;
    bg1.name = "bg1";


    var bg2 = new THREE.Mesh(bgGemo, mat2);
    bg2.material.needsUpdate = true;
    bg2.material.map = tex2;
    bg2.position.z = 0 - z/3;
    bg2.rotation.x = Math.PI/2;
    bg2.name = "bg2";

    var bg3 = new THREE.Mesh(bgGemo, mat3);
    bg3.material.needsUpdate = true;
    bg3.material.map = tex3;
    bg3.position.z = z/4;
    bg3.rotation.x = Math.PI/2;
    bg3.name = "bg3";

    var bg = new THREE.Mesh(bgGemo, matBG);
    bg.material.map = texBG;
    bg.position.z = z/2;
    bg.name = "bg4";

    //floor
    let floor = new THREE.Mesh(new THREE.PlaneGeometry(x,y), new THREE.MeshPhongMaterial({color: 0xbbbbbb}));
    floor.material.side = THREE.DoubleSide;
    floor.receiveShadow = true;
    floor.position.y = -5;
    floor.position.x = 0;
    floor.position.z = 0;
    floor.rotation.x =  Math.PI/2;
    floor.name = "floor";
    floor.material.map = texFloor;

    var bgSet = new THREE.Group();
    bgSet.position.set (this.screenWidth * idx, 0, 0);
    bgSet.add(bg1, bg2, bg3, bg);
    bgSet.add(floor);
    bgSet.Id = idx;

    console.log(bgSet.Id);

    this.allBackgrounds.add(bgSet);

  }

  updateBg(idx){
    console.log(idx);
    let isNext = (idx >= this.currentBg) ? true : false;
    let speed = 0.8;
    let dis = this.screenWidth.toString();
    let moveX = isNext? ( "-=" + dis)  : ( "+=" + dis);
    let lastSet, thisSet, bg1, bg2, bg3;
    

    TweenMax.to(this.allBackgrounds.position, speed, {x:moveX, ease:Back.easeOut});
   
     this.allBackgrounds.children.forEach((el) => {

       if(el.Id === this.currentBg ){
          lastSet = el;
          console.log(lastSet);
       }

       if(el.Id === idx){
          thisSet = el;
          bg1 = thisSet.getObjectByName('bg1');
          bg2 = thisSet.getObjectByName('bg2');
          bg3 = thisSet.getObjectByName('bg3');
          
       }
    });

    TweenMax.to(bg1.rotation, speed, {x:0, ease:Back.easeOut,delay: getRandomFloat(0.5,1)});
    TweenMax.to(bg2.rotation, speed, {x:0, ease:Back.easeOut, delay: getRandomFloat(0.5,1)});
    TweenMax.to(bg3.rotation, speed, {x:0, ease:Back.easeOut,delay: getRandomFloat(0.5,1)});
    
    if(this.currentBg >= 0){
      TweenMax.to(lastSet.getObjectByName('bg1').rotation, speed, {x:Math.PI/2.2, ease:Back.easeOut});
      TweenMax.to(lastSet.getObjectByName('bg2').rotation, speed, {x:Math.PI/2.2, ease:Back.easeOut});
      TweenMax.to(lastSet.getObjectByName('bg3').rotation, speed, {x:Math.PI/2.2, ease:Back.easeOut});
    }

    this.currentBg = idx; 

  }
  
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}