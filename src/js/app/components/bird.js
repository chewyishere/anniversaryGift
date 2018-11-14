import * as THREE from 'three';

import Material from '../helpers/material';
import Config from '../../data/config';
import TweenMax from "gsap/TweenMax";

// Loads in a single object from the config file
export default class Bird {
    constructor(scene) {
        this.scene = scene;
        this.mesh = null;
        this.currentScene = 0;
        this.keepJumping;
    }

    create() {
        this.rSegments = 4;
        this.hSegments = 3;
        this.cylRay = 120;
        this.bodyBirdInitPositions = [];
        this.vAngle = this.hAngle = 0;
        this.side = "right";
        this.speed = 6;
        this.maxSpeed = 20;
        this.delta = 0;
        this.clock = new THREE.Clock();

        this.shyAngles = { h: 0, v: 0 };
        this.intervalRunning = false;

        this.threegroup = new THREE.Group();
        this.mesh = this.threegroup;

        this.normalSkin = {r:255/255, g:222/255, b:121/255};
        this.shySkin = {r:255/255, g:157/255, b:101/255};
        this.color = {r:this.normalSkin.r, g:this.normalSkin.g, b:this.normalSkin.b};

        // materials
        this.yellowMat = new Material(0xE5CEB6).lambert;
        this.hairMat = new Material(0xEA7D02).lambert;
        this.hairMat2= new Material(0xDF5212).lambert;
        this.whiteMat = new Material(0xffffff).lambert;
        this.blackMat = new Material(0x000000).lambert;
        this.orangeMat = new Material(0xff5535).lambert;

        //WINGS

        this.wingLeftGroup = new THREE.Group();
        this.wingRightGroup = new THREE.Group();
        var wingGeom = new THREE.BoxGeometry(50, 30, 5);
        this.wingLeft = new THREE.Mesh(wingGeom, this.yellowMat);
        this.wingLeft.position.set(20,0,0);

        this.wingLeftGroup.add(this.wingLeft);
        this.wingLeftGroup.position.set(50,80,0);
        this.wingLeftGroup.rotation.y = Math.PI / 8;
        this.wingLeftGroup.rotation.x = - Math.PI / 2;

        this.wingRight = this.wingLeft.clone();
        this.wingRight.position.set(-20,0,0);
        this.wingRightGroup.add(this.wingRight);
        this.wingRightGroup.position.set(-50,80,0);
        this.wingRightGroup.rotation.x = Math.PI / 2;

        //BODY

        var bodyGeom = new THREE.CylinderGeometry(40, 70, 120, this.rSegments, this.hSegments);
        this.bodyBird = new THREE.Mesh(bodyGeom, this.yellowMat);
        this.bodyBird.position.y = 100;
    
        this.bodyVerticesLength = (this.rSegments + 1) * (this.hSegments);
        for (var i = 0; i < this.bodyVerticesLength; i++) {
            var tv = this.bodyBird.geometry.vertices[i];
            this.bodyBirdInitPositions.push({ x: tv.x, y: tv.y, z: tv.z });
        }

        this.threegroup.add(this.bodyBird);
        this.threegroup.add(this.wingLeftGroup);
        this.threegroup.add(this.wingRightGroup);


        // EYES

        this.face = new THREE.Group();
        var eyeGeom = new THREE.BoxGeometry(60, 60, 10);
        var irisGeom = new THREE.BoxGeometry(10, 10, 10);

        this.leftEye = new THREE.Mesh(eyeGeom, this.whiteMat);
        this.leftEye.position.x = -30;
        this.leftEye.position.y = 120;
        this.leftEye.position.z = 35;
        this.leftEye.rotation.y = -Math.PI/4;
        
        this.leftIris = new THREE.Mesh(irisGeom, this.blackMat);
        this.leftIris.position.x = -30;
        this.leftIris.position.y = 120;
        this.leftIris.position.z = 40;
        this.leftIris.rotation.y = -Math.PI/4;
        
        
        this.rightEye = new THREE.Mesh(eyeGeom, this.whiteMat);
        this.rightEye.position.x = 30;
        this.rightEye.position.y = 120;
        this.rightEye.position.z = 35;
        this.rightEye.rotation.y = Math.PI/4;
        
        this.rightIris = new THREE.Mesh(irisGeom, this.blackMat);
        this.rightIris.position.x = 30;
        this.rightIris.position.y = 120;
        this.rightIris.position.z = 40;
        this.rightIris.rotation.y = Math.PI/4;
        
        // BEAK
        
        var beakGeom = new THREE.CylinderGeometry(0,20,20, 4,1);
        this.beak = new THREE.Mesh(beakGeom, this.orangeMat);
        this.beak.position.z = 65;
        this.beak.position.y = 70;
        this.beak.rotation.x = Math.PI/2;
        
        this.face.add(this.rightEye);
        this.face.add(this.rightIris);
        this.face.add(this.leftEye);
        this.face.add(this.leftIris);
        this.face.add(this.beak);
  

        //FEATHERS

        let featherGeom = new THREE.BoxGeometry(5, 20, 5);
        this.feather1 = new THREE.Mesh(featherGeom, this.hairMat2);
        this.feather1.position.z = 45;
        this.feather1.position.y = 175;
        this.feather1.rotation.x = - Math.PI / 4;

        this.feather1.scale.set(1.5, 1.5, 1);

        this.feather2 = new THREE.Mesh(featherGeom,this.hairMat);
        this.feather2.position.set(20,170,45);
        this.feather2.rotation.x = - Math.PI / 4;
        this.feather2.rotation.y = Math.PI / 8;
        this.feather2.rotation.z = - Math.PI / 8;

        this.feather3 = new THREE.Mesh(featherGeom, this.hairMat);
        this.feather3.position.set(-20,170,45);
        this.feather3.rotation.x = - Math.PI / 4;
        this.feather3.rotation.y = - Math.PI / 8;
        this.feather3.rotation.z = Math.PI / 8;

        this.face.add(this.feather1);
        this.face.add(this.feather2);
        this.face.add(this.feather3);
        this.threegroup.add(this.face);
       
        // LEGS
        this.LeftLegGroup = new THREE.Group();
        this.LeftLegGroup.position.set(-30,20,0);

        let LegGeom = new THREE.BoxGeometry(5, 35, 5);
        this.LeftLeg = new THREE.Mesh(LegGeom , this.orangeMat);
        this.LeftLeg.position.set(0,0,0);

        this.LeftFeetGroup = new THREE.Group();
        this.LeftFeetGroup.position.set(0,-20,10);

        let FeetGeom = new THREE.BoxGeometry(5, 5, 20);
        let LeftFeet1 = new THREE.Mesh(FeetGeom , this.orangeMat);

        let LeftFeet2 = LeftFeet1.clone();
        LeftFeet2.rotation.y = - Math.PI / 4;
        LeftFeet2.position.x = -10;

        let LeftFeet3 = LeftFeet1.clone();
        LeftFeet3.rotation.y = Math.PI / 4;
        LeftFeet3.position.x = 10;

        this.LeftFeetGroup.add(LeftFeet1, LeftFeet2, LeftFeet3);

        this.LeftLegGroup.add(this.LeftLeg);
        this.LeftLegGroup.add(this.LeftFeetGroup);

        this.RightLegGroup = this.LeftLegGroup.clone();
        this.RightLegGroup.position.set(30,20,0);

        this.legs = new THREE.Group();
        this.legs.add(this.LeftLegGroup);
        this.legs.add(this.RightLegGroup);

        this.threegroup.add(this.legs);

        this.threegroup.traverse(function (object) {
            if (object instanceof THREE.Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
            }
        });
      
        this.status = "standing";
        this.mesh.scale.set(0.1,0.1,0.1);
        this.scene.add(this.mesh);
        
    }

    init(){
        var sp = 1.2;
        var ease = Power4.easeOut;
        TweenMax.to(this.mesh.scale, sp, { x: 1, ease: ease });
        TweenMax.to(this.mesh.scale, sp, { y: 1, ease: ease });
        TweenMax.to(this.mesh.scale, sp, { z: 1, ease: ease });
      }


    look(hAngle,vAngle){
        this.hAngle = hAngle;
        this.vAngle = vAngle;

        this.leftIris.position.y = 120 - this.vAngle*30;
        this.leftIris.position.x = -30 + this.hAngle*10;
        this.leftIris.position.z = 40 + this.hAngle*10;
        
        this.rightIris.position.y = 120 - this.vAngle*30;
        this.rightIris.position.x = 30 + this.hAngle*10;
        this.rightIris.position.z = 40 - this.hAngle*10;
        
        this.leftEye.position.y = this.rightEye.position.y = 120 - this.vAngle*10;
        
        this.beak.position.y = 70 - this.vAngle*20;
        this.beak.rotation.x = Math.PI/2 + this.vAngle/3;
        
        this.feather1.rotation.x = (Math.PI/4) + (this.vAngle/2);
        this.feather1.position.y = 185 - this.vAngle*10;
        this.feather1.position.z = 55 + this.vAngle*10;
        
        this.feather2.rotation.x = (Math.PI/4) + (this.vAngle/2);
        this.feather2.position.y = 180 - this.vAngle*10;
        this.feather2.position.z = 50 + this.vAngle*10;
        
        this.feather3.rotation.x = (Math.PI/4) + (this.vAngle/2);
        this.feather3.position.y = 180 - this.vAngle*10;
        this.feather3.position.z = 50 + this.vAngle*10;
        
        
        for (var i=0;i<this.bodyVerticesLength; i++){
          var line = Math.floor(i/(this.rSegments+1));
          var tv = this.bodyBird.geometry.vertices[i];
          var tvInitPos = this.bodyBirdInitPositions[i];
          var a, dy;
          if (line >= this.hSegments-1){
            a = 0;
          }else{
            a = this.hAngle/(line+1); 
          }
          var tx = tvInitPos.x*Math.cos(a) + tvInitPos.z*Math.sin(a);
          var tz = -tvInitPos.x*Math.sin(a) + tvInitPos.z*Math.cos(a);
          tv.x = tx;
          tv.z = tz;
        }
        this.face.rotation.y = this.hAngle;
        this.bodyBird.geometry.verticesNeedUpdate = true;
        
      }

      moveRight(){

            let speed = 0.8;
            let t = speed * this.delta;
            let amp = 10;

            TweenMax.to(this.mesh.rotation, speed, {y:Math.PI/2, ease:Back.easeOut});
            TweenMax.to(this.mesh.position, speed, {x:"+=20", ease:Back.easeOut});
        
            this.LeftLegGroup.rotation.x = Math.sin(t/0.05)*Math.PI/4;
            this.LeftLegGroup.position.y = 20 + Math.cos(t/0.05)*amp;
            this.LeftLegGroup.position.z = Math.cos(t/0.1)*amp;
        
            this.RightLegGroup.rotation.x = Math.cos(t/0.05)*Math.PI/4;
            this.RightLegGroup.position.y = 20 + Math.sin(t/0.05)*amp;
            this.RightLegGroup.position.z = Math.sin(t/0.1)*amp;

            this.wingLeftGroup.rotation.y = Math.PI / 8 + Math.cos(t/0.1) * 0.5;
            this.wingLeftGroup.rotation.z = Math.PI / 8 + Math.cos(t/0.1) * 0.5;
            this.wingRightGroup.rotation.y = Math.PI / 8 + Math.sin(t/0.1)* 0.5;
            this.wingRightGroup.rotation.z = Math.PI / 8 + Math.sin(t/0.1) * 0.5;

    }

    moveLeft(){
            let speed = 0.8;
            let t = speed * this.delta;
            let amp = 10;

            TweenMax.to(this.mesh.rotation, speed, {y:-Math.PI/2, ease:Back.easeOut});
            TweenMax.to(this.mesh.position, speed, {x:"-=20", ease:Back.easeOut});

            this.LeftLegGroup.rotation.x = Math.sin(t/0.05)*Math.PI/4;
            this.LeftLegGroup.position.y = 20 + Math.cos(t/0.05)*amp;
            this.LeftLegGroup.position.z = Math.cos(t/0.1)*amp;
        
            this.RightLegGroup.rotation.x = Math.cos(t/0.05)*Math.PI/4;
            this.RightLegGroup.position.y = 20 + Math.sin(t/0.05)*amp;
            this.RightLegGroup.position.z = Math.sin(t/0.1)*amp;

            this.wingLeftGroup.rotation.y = Math.PI / 8 + Math.sin(t/0.1) * 0.5;
            this.wingLeftGroup.rotation.z = Math.PI / 8 + Math.sin(t/0.1) * 0.5;
            this.wingRightGroup.rotation.y = Math.PI / 8 + Math.cos(t/0.1)* 0.5;
            this.wingRightGroup.rotation.z = Math.PI / 8 + Math.cos(t/0.1) * 0.5;       
    }

      jump(){
        if (this.status == "jumping" && this.currentScene !== 3 ) return;
        this.status = "jumping";
        let _this = this;
        let totalSpeed = 1;
        let jumpHeight = 70;

        TweenMax.to(this.LeftLegGroup.rotation, totalSpeed/2, {x:"+=.5", ease:Back.easeOut});
        TweenMax.to(this.LeftLegGroup.rotation, totalSpeed/2, {x:"-=.5", ease:Power4.easeIn, delay:totalSpeed/2});
        
        TweenMax.to(this.RightLegGroup.rotation, totalSpeed/2, {x:"-=.5", ease:Back.easeOut});
        TweenMax.to(this.RightLegGroup.rotation, totalSpeed/2, {x:"+=.5", ease:Power4.easeIn, delay:totalSpeed/2});

        TweenMax.to(this.legs.position, totalSpeed/2, {y:"+=10", ease:Back.easeOut});
        TweenMax.to(this.legs.position, totalSpeed/2, {y:"-=10", ease:Power4.easeIn, delay:totalSpeed/2});

        TweenMax.to(this.wingLeftGroup.rotation, totalSpeed/1.5, {y:"-=1", ease:Back.easeOut});
        TweenMax.to(this.wingLeftGroup.rotation, totalSpeed/2, {y:"+=1", ease:Power4.easeIn, delay:totalSpeed/1.5});

        TweenMax.to(this.wingRightGroup.rotation, totalSpeed/1.5, {y:"-=1", ease:Back.easeOut});
        TweenMax.to(this.wingRightGroup.rotation, totalSpeed/2, {y:"+=1", ease:Power4.easeIn, delay:totalSpeed/1.5});
        
        TweenMax.to(this.mesh.position, totalSpeed/2, {y:jumpHeight, ease:Power2.easeOut});
        TweenMax.to(this.mesh.position, totalSpeed/2, {y:-100, ease:Power4.easeIn, delay:totalSpeed/2, onComplete: function(){
            _this.status="standing";
        }});
    }


    lookAway(fastMove){
      var speed = fastMove? .8: 2;
      var ease = fastMove? Strong.easeOut : Strong.easeInOut;
      var delay = fastMove? .2 : 0;
      var col = fastMove? this.shySkin : this.normalSkin;
      var tv = (-1 + Math.random()*2) * Math.PI/3;
      var beakScaleX = .75 + Math.random()*.25;
      var beakScaleZ = .5 + Math.random()*.5;
      
      if (this.side == "right"){
        var th = (-1 + Math.random()) * Math.PI/4;  
      }else{
        var th = Math.random() * Math.PI/4; 
      }  

      TweenMax.killTweensOf(this.shyAngles);
      TweenMax.to(this.shyAngles, speed, {v:tv, h:th, ease:ease, delay:delay});
      TweenMax.to (this.color, speed, {r:col.r, g:col.g, b:col.b, ease:ease, delay:delay});
      TweenMax.to(this.beak.scale, speed, {z:beakScaleZ, x:beakScaleX, ease:ease, delay:delay});
      TweenMax.to(this.mesh.rotation, speed*2, {y: Math.PI/10, ease:ease, delay:delay});
      
    }

    takePhoto(){
      var _this = this;
      let sp = 1;  
      var ease = Strong.easeOut;  
      TweenMax.to(this.mesh.rotation, sp, {y: Math.PI, ease:ease});
      TweenMax.killTweensOf(this.shyAngles);
      TweenMax.to(this.shyAngles, sp, {v:0, h:0, ease:ease});
    }

    blink(){
        let sp = 0.3;
        TweenMax.to(this.leftIris.scale, sp/2, {y:0.3, ease:Power4.easeOut});
        TweenMax.to(this.leftIris.scale, sp/2, {y:1, ease:Power4.easeIn, delay:sp/2});
        
        TweenMax.to(this.rightIris.scale, sp/2, {y:0.3, ease:Power4.easeOut});
        TweenMax.to(this.rightIris.scale, sp/2, {y:1, ease:Power4.easeIn, delay:sp/2});
    }

    loop(){
        this.delta = this.clock.getElapsedTime();
        this.look(this.shyAngles.h, this.shyAngles.v);
        this.bodyBird.material.color.setRGB(this.color.r,this.color.g,this.color.b);
  
    }

      playAnimation(){
        var _this = this;
        switch (this.currentScene) {
          case (0):
             this.lookAway(true);
              break;
          case (1):
             this.lookAway(true);
              break;
          case (2):
             this.lookAway(false);
              break;
          case (3):
              this.lookAway(false);     
              this.keepJumping = setInterval(this.jump.bind(_this), 1200);
              break;
          case (5):
              this.takePhoto();
              break;
          case (12):
              this.keepJumping = setInterval(this.jump.bind(_this), 1200);
              break;
              
        }

      }

      reset(){
        switch (this.currentScene) {
          case (2):
              this.lookAway(true);
              clearInterval(this.keepJumping);
              break;
          case (4):
              clearInterval(this.keepJumping);
              break;
          case (11):
              clearInterval(this.keepJumping);
              break;
          case (13):
              clearInterval(this.keepJumping);
              break;
          default:
              this.lookAway(false);
              break;    
        }

      }

}

