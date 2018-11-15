import * as THREE from 'three';

import Material from '../helpers/material';
import Config from '../../data/config';
import { TweenMax, TimelineLite } from "gsap/TweenMax";

// Loads in a single object from the config file
export default class Unicorn {
    constructor(scene, bubbles) {
        this.scene = scene;
        this.bubbles = bubbles;
        this.tl = new TimelineLite();
        this.currentScene = 0;
    }

    create() {
        
        this.vAngle = this.hAngle = 0;
        this.clock = new THREE.Clock();
        this.shyAngles = { h: 0., v: 0.8 };
        this.intervalRunning = false;

        this.normalSkin = {r:251/255, g:236/255, b:221/255};
        this.shySkin = {r:249/255, g:110/255, b:99/255};
        this.color = {r:this.normalSkin.r, g:this.normalSkin.g, b:this.normalSkin.b};

        // materials
        var skinMat = new Material(this.normalSkin).lambert; //white
        var yellowMat = new Material(0xfff428).lambert; //horn and foot
        var hairMat1 = new Material(0xff5ee6).lambert; //rainbow pink
        var hairMat2 = new Material(0xd14cf7).lambert; //rainbow pink
        var hairMat3 = new Material(0xaa23ff).lambert; //purple
        var hairMat4 = new Material(0x541cff).lambert; //purple
        var blackMat = new Material(0x000000).lambert; //eye
        var whiteMat = new Material(0xffffff).lambert; //eye
        var pinkMat = new Material(0xf442e5).lambert;

        this.mesh = new THREE.Group();
        this.body = new THREE.Group();

        var torsoBodyGeom = new THREE.CylinderGeometry(2, 5, 20, 4);
        torsoBodyGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 15, 0));
        this.torsobody = new THREE.Mesh(torsoBodyGeom, skinMat);
        this.torsobody.rotation.x = Math.PI / 10;

        var torsoGeom = new THREE.CubeGeometry(10, 10, 15, 1);
        torsoGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 5, 0));
        this.torso = new THREE.Mesh(torsoGeom, skinMat);

        this.torso.add(this.torsobody);

        var headGeom = new THREE.CubeGeometry(20, 20, 30, 1);
        headGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 10));
        this.head = new THREE.Mesh(headGeom, skinMat);

        this.head.position.set(0, 30, 15);
       // this.head.rotation.x = Math.PI / 4;

        var headNoseGeom = new THREE.CubeGeometry(20, 20, 10, 1);
        this.headNose = new THREE.Mesh(headNoseGeom, pinkMat);
        this.headNose.position.z = 30;
        this.head.add(this.headNose);

        //HORN
        var hornGeom = new THREE.ConeBufferGeometry(3, 25, 10, 1);
        this.horn = new THREE.Mesh(hornGeom, yellowMat);
        this.horn.position.y = 20;
        this.horn.rotation.x = .2;
        this.horn.position.z = 10;
        this.head.add(this.horn);

        var mouthGeom = new THREE.CubeGeometry(10, 2, 20, 1);
        mouthGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, -2, 10));
        this.mouth = new THREE.Mesh(mouthGeom, skinMat);
        this.mouth.position.y = -8;
        this.mouth.rotation.x = .2;
        this.mouth.position.z = 4;

        var tongueGeometry = new THREE.CubeGeometry(6, 1, 14);
        tongueGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 7));

        this.tongue = new THREE.Mesh(tongueGeometry, pinkMat);
        this.tongue.position.z = 2;
        this.tongue.rotation.x = -.2;
        this.mouth.add(this.tongue);

        var noseGeom = new THREE.CubeGeometry(2, 2, 2, 1);
        this.nose = new THREE.Mesh(noseGeom, blackMat);
        this.nose.position.z = 35;
        this.nose.position.y = 5;
        this.nose.position.x = -2;

        this.nose2 = this.nose.clone();
        this.nose2.position.x = 2;

        this.head.add(this.nose);
        this.head.add(this.nose2);
        this.head.add(this.mouth);

        var eyeGeom = new THREE.CylinderGeometry(7, 7, 5, 32);

        this.eyeL = new THREE.Mesh(eyeGeom, whiteMat);
        this.eyeL.position.x = 10;
        this.eyeL.position.z = 10;
        this.eyeL.position.y = 2;
        this.eyeL.rotation.z = Math.PI / 2
        this.eyeL.castShadow = true;
        this.head.add(this.eyeL);

        var irisGeom = new THREE.CubeGeometry(2, 2, 5);
        this.irisL = new THREE.Mesh(irisGeom, blackMat);
        this.irisL.position.set(0, -3, 0);
        this.eyeL.add(this.irisL);

        this.eyeR = this.eyeL.clone();
        this.irisR = new THREE.Mesh(irisGeom, blackMat);
        this.irisR.position.set(0, 3, 0);
        this.eyeR.add(this.irisR);
        this.eyeR.position.x = -this.eyeL.position.x;
        this.head.add(this.eyeR);

        //HEARS
        var earGeom = new THREE.CubeGeometry(8, 6, 2, 1);
        earGeom.vertices[1].x -= 4;
        earGeom.vertices[4].x += 4;
        earGeom.vertices[5].x += 4;
        earGeom.vertices[5].z -= 2;
        earGeom.vertices[0].x -= 4;
        earGeom.vertices[0].z -= 2;

        earGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 3, 0));

        this.earL = new THREE.Mesh(earGeom, skinMat);
        this.earL.position.x = 6;
        this.earL.position.z = 1;
        this.earL.position.y = 10;
        this.earL.castShadow = true;
        this.head.add(this.earL);

        this.earR = this.earL.clone();
        this.earR.position.x = -this.earL.position.x;
        this.earR.rotation.z = -this.earL.rotation.z;
        this.head.add(this.earR);


        //HEAR
        var hairGeom = new THREE.CubeGeometry(15, 10, 3);
        hairGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 15, 0));
        this.hair1 = new THREE.Mesh(hairGeom, hairMat1);
        this.hair2 = new THREE.Mesh(hairGeom, hairMat2);
        this.hair3 = new THREE.Mesh(hairGeom, hairMat3);
        this.hair4 = new THREE.Mesh(hairGeom, hairMat4);
        // var headGeom = new THREE.CubeGeometry(20,20,30,1);
        this.hair1.position.set(0, -10, -15);
        this.hair1.rotation.x = Math.PI / 6;

        this.hair2.position.set(0, -15, -15);
        this.hair2.rotation.x = Math.PI / 6;

        this.hair3.position.set(0, -20, -15);
        this.hair3.rotation.x = Math.PI / 6;

        this.hair4.position.set(0, -25, -15);
        this.hair4.rotation.x = Math.PI / 6;

        this.head.add(this.hair1, this.hair2, this.hair3, this.hair4);


        var tailGeom = new THREE.CylinderGeometry(5, 2, 20, 4, 1);
        tailGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 10, 0));
        tailGeom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
        tailGeom.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI / 4));

        this.tail = new THREE.Mesh(tailGeom, hairMat2);
        this.tail.position.z = -10;
        this.tail.position.y = 4;
        this.torso.add(this.tail);

        var pawGeom = new THREE.CubeGeometry(4, 4, 4);
        pawGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, -5, 0));
        this.pawFL = new THREE.Mesh(pawGeom, yellowMat);
        this.pawFL.position.y = 0;
        this.pawFL.position.z = 8.5;
        this.pawFL.position.x = 5.5;
        this.torso.add(this.pawFL);

        this.pawFR = this.pawFL.clone();
        this.pawFR.position.x = - this.pawFL.position.x;
        this.torso.add(this.pawFR);

        this.pawBR = this.pawFR.clone();
        this.pawBR.position.z = - this.pawFL.position.z;
        this.torso.add(this.pawBR);

        this.pawBL = this.pawBR.clone();
        this.pawBL.position.x = this.pawFL.position.x;
        this.torso.add(this.pawBL);

        this.mesh.add(this.body);
        this.torso.add(this.head);
        this.body.add(this.torso);

        this.torso.castShadow = true;
        this.head.castShadow = true;
        this.head.renderReverseSided = true
        this.pawFL.castShadow = true;
        this.pawFR.castShadow = true;
        this.pawBL.castShadow = true;
        this.mesh.castShadow = true;
        this.pawBR.castShadow = true;
        this.mesh.scale.set(0.5, 0.5, 0.5);
        this.scene.add(this.mesh);
    }

    init() {
        var sp = 1;
        var ease = Power4.easeOut;
        var _this = this;
        TweenMax.to(this.mesh.rotation, sp * 2, { y: Math.PI * 2.2, ease: ease });
        TweenMax.to(this.mesh.scale, sp, { x: 5, ease: ease });
        TweenMax.to(this.mesh.scale, sp, { y: 5, ease: ease });
        TweenMax.to(this.mesh.scale, sp, { z: 5, ease: ease });
        setTimeout(this.sayHi.bind(_this), 2000);
    }

    sayHi() {
        var sp = 2;
        var _this = this;
        var ease = Power4.easeOut;

        TweenMax.to(this.shyAngles, sp, { h: -Math.PI / 8, ease: ease });
        TweenMax.to(this.shyAngles, sp, { v: -Math.PI / 8, ease: ease });

        setTimeout(this.talk.bind(_this), 2000);
        
    }

    talk() {
        var sp = 1;
        var _this = this;
        this.tl.to(this.mouth.rotation, sp / 4, { x: 0.6, ease: Power4.easeOut });
        this.tl.to(this.mouth.rotation, sp / 4, { x: 0, ease: Power4.easeIn, delay: sp / 4 });
        this.tl.to(this.mouth.rotation, sp / 4, { x: 0.8, ease: Power4.easeOut, delay: sp / 2 });
        this.tl.to(this.mouth.rotation, sp / 4, { x: 0.2, ease: Power4.easeIn, delay: sp, onComplete: _this.checkDialogComplete.bind(_this) });

        this.bubbles.showText();
    }

    checkDialogComplete() {
        if (!this.bubbles.dialogCompleted) {
            this.tl.restart();
        } else {
            return;
        }
    }

    look(hAngle, vAngle) {
        
        let chillAngle = ((this.status === "chilling") ? -Math.PI / 2 : Math.PI / 4);

        this.hAngle = hAngle;
        this.vAngle = vAngle;

        this.irisL.position.x = -this.vAngle * 2;
        this.irisL.position.z = -this.hAngle * 2;

        this.irisR.position.x = -this.vAngle * 2;
        this.irisR.position.z = this.hAngle * 2;

        this.head.rotation.y = this.hAngle;
        this.head.rotation.x = -chillAngle * 0.2 + this.vAngle * 0.5;

        this.torsobody.rotation.y = this.vAngle * 0.5;
        this.body.rotation.y = this.hAngle * 0.5;

        this.head.geometry.verticesNeedUpdate = true;
 
    }

    chill() {
        this.status = "chilling";
        var sp = 1;
        var ease = Power4.easeOut;

        TweenMax.to(this.torso.rotation, sp, { x: -1, ease: ease });
        TweenMax.to(this.torso.position, sp, { y: -1, ease: ease });

        TweenMax.to(this.tail.rotation, sp, { x: 2, y: Math.PI / 4, ease: ease });
        TweenMax.to(this.pawBL.rotation, sp, { x: -.1, ease: ease });
        TweenMax.to(this.pawBR.rotation, sp, { x: -.1, ease: ease });
        TweenMax.to(this.pawFL.rotation, sp, { x: 1, ease: ease });
        TweenMax.to(this.pawFR.rotation, sp, { x: 1, ease: ease });
        TweenMax.to(this.mouth.rotation, sp, { x: .3, ease: ease });
        TweenMax.to(this.eyeL.scale, sp, { y: 0.5, ease: ease });
        TweenMax.to(this.eyeR.scale, sp, { y: 0.5, ease: ease });
        
    }

   standUp(){
        if(this.status === "chilling"){
        var sp = 1;
        var ease = Power4.easeOut;

        TweenMax.to(this.torso.rotation, sp, { x: 0, ease: ease });
        TweenMax.to(this.torso.position, sp, { y: 0, ease: ease });

        TweenMax.to(this.tail.rotation, sp, { x: 0, y: Math.PI / 4, ease: ease });
        TweenMax.to(this.pawBL.rotation, sp, { x: 0, ease: ease });
        TweenMax.to(this.pawBR.rotation, sp, { x: 0, ease: ease });
        TweenMax.to(this.pawFL.rotation, sp, { x: 0, ease: ease });
        TweenMax.to(this.pawFR.rotation, sp, { x: 0, ease: ease });
        TweenMax.to(this.mouth.rotation, sp, { x: 0, ease: ease });
        TweenMax.to(this.eyeL.scale, sp, { y: 1, ease: ease });
        TweenMax.to(this.eyeR.scale, sp, { y: 1, ease: ease });
        this.status = "standing";

    } else {
        return;
    }
    
    }

    blink() {
        let sp = 0.4;
        TweenMax.to(this.irisR.scale, sp / 4, { x: 0.1, ease: Power4.easeOut });
        TweenMax.to(this.irisR.scale, sp / 4, { x: 1, ease: Power4.easeIn, delay: sp / 4 });
        TweenMax.to(this.irisR.scale, sp / 4, { x: 0.1, ease: Power4.easeOut, delay: sp / 2 });
        TweenMax.to(this.irisR.scale, sp / 4, { x: 1, ease: Power4.easeIn, delay: sp });


        TweenMax.to(this.irisL.scale, sp / 4, { x: 0.1, ease: Power4.easeOut });
        TweenMax.to(this.irisL.scale, sp / 4, { x: 1, ease: Power4.easeIn, delay: sp / 4 });
        TweenMax.to(this.irisL.scale, sp / 4, { x: 0.1, ease: Power4.easeOut, delay: sp / 2 });
        TweenMax.to(this.irisL.scale, sp / 4, { x: 1, ease: Power4.easeIn, delay: sp });
    }

    lookAway(fastMove){
        var speed = fastMove? .8: 2;
        var ease = fastMove? Strong.easeOut : Strong.easeInOut;
        var delay = fastMove? .2 : 0;
        var col = fastMove? this.shySkin : this.normalSkin;
        var tv = (-1 + Math.random()*2) * Math.PI/4;
        
         //if (this.side == "right"){
        var th = (-1 + Math.random()) * Math.PI/4;  
        //   }else{
        //var th = Math.random() * Math.PI/4; 
       //   }  

        TweenMax.killTweensOf(this.shyAngles);
        TweenMax.to(this.shyAngles, speed, {v:tv, h:th, ease:ease, delay:delay});
        TweenMax.to (this.color, speed, {r:col.r, g:col.g, b:col.b, ease:ease, delay:delay});
       
      }

    loop(){
        this.head.material.color.setRGB(this.color.r,this.color.g,this.color.b);
        this.look(this.shyAngles.h, this.shyAngles.v);
      
    }


    reset() {
        switch (this.currentScene) {
        case (2):
            this.lookAway(true);
            break;
        case (3):
            this.lookAway(false);
            this.standUp();
            break;
        case (5):
            this.standUp();
            break;
        default:
            this.lookAway(false);
            break;
        }
    }

    forceStop() {
        this.tl.kill();
        let sp = 0.4;
        TweenMax.to(this.mouth.rotation, sp, { x: 0.2, ease: Power4.easeOut });
    }

    playAnimation() {
        this.talk();
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
            case (4):
                this.chill();
                break;
        }

    }


}

