import Config from '../../data/config';
import DomUI from './domUI';

// Manages all dat.GUI interactions
export default class PageUpdate {
    constructor(main, textures) {
        this.bird = main.bird;
        this.unicorn = main.unicorn;
        this.camera = main.camera.threeCamera;
        this.scene = main.scene;
        this.textures = textures;
        this.light = main.light;
        this.background = main.background;
        this.currentScene = 0;
        this.bubbles = main.bubbles;
        this.spot = main.spot;
        this.ready = false;
        this.domUI = new DomUI();
        this.meetTarget = false;
    }

    getCurrentScene() {
      return this.currentScene;
    }

    initScene(){
      this.unicorn.init();
      this.uniBlinkInterval = setInterval(this.unicorn.blink.bind(this.unicorn), 3500);
      this.currentScene = 0;
  
    }

    startScene(){
      this.stopAll();
      this.bird.init();
      this.spot.init();
      this.background.init(this.textures);
      this.light.spotLight.target = this.bird.mesh;
      this.updateScene();
      this.domUI.startScene();
      this.spotInterval = setInterval(this.spot.jump.bind(this.spot), 2000);
      this.birdBlinkInterval = setInterval(this.bird.blink.bind(this.bird), 3000);
      this.ready = true;
    }

    nextScene() {
        if(this.currentScene < 13){
            this.currentScene += 1;
            this.stopAll();
            this.updateScene();
        }
  
      }

      previousScene() {
        if(this.currentScene > 0){
            this.currentScene -= 1;
            this.stopAll()
            this.updateScene();
        }
    
      }

      updateScene(){
         this.assignScenes();
         this.resetGoals();
         this.updateBg(); 
         this.updateCSSBg(); 
         this.updateModelPos();
         this.updateSpotPos();
         this.updateDate();
      }

      assignScenes(){
        this.bird.currentScene = this.currentScene;
        this.unicorn.currentScene = this.currentScene;
        this.background.currentScene = this.currentScene;
        this.domUI.currentScene = this.currentScene;
        this.bubbles.currentScene = this.currentScene + 1;

      }

      updateBg(){
        this.background.updateBg();
      }

      updateCSSBg(){
        this.domUI.updateBg();
      }

    
      updateModelPos() {
        let x = Config.modelPos[this.currentScene].bird.x;
        let y = Config.modelPos[this.currentScene].bird.y;
        let z = Config.modelPos[this.currentScene].bird.z;
    
        let ux = Config.modelPos[this.currentScene].unicorn.x;
        let uy = Config.modelPos[this.currentScene].unicorn.y;
        let uz = Config.modelPos[this.currentScene].unicorn.z;
    
        this.bird.mesh.position.set(x,y,z);
        this.unicorn.mesh.position.set(ux,uy,uz);

      }

      updateSpotPos(){
        let x = Config.spotPos[this.currentScene].x;
        let y = Config.spotPos[this.currentScene].y;
        let z = Config.spotPos[this.currentScene].z;
        this.spot.spot.position.set(x,y,z);
      }

      updateDate(){
        this.domUI.updateCal();
      }

      resetGoals(){
           this.bubbles.reset();
           this.bird.reset();
           this.unicorn.reset();
           //this.domUI.hideArrow();
           this.meetTarget = false;
          if(this.uniBlinkInterval === null && this.birdBlinkInterval === null){
            this.uniBlinkInterval = setInterval(this.unicorn.blink.bind(this.unicorn), 3500);
            this.birdBlinkInterval = setInterval(this.bird.blink.bind(this.bird), 3000);
          }
      }


      detectDistance(){
        let distX = Math.abs(this.bird.mesh.position.x - this.spot.spot.position.x);
        let distY = Math.abs(this.bird.mesh.position.y - this.spot.spot.position.y);
        if(distX < 20 && distY <= 100){
          this.meetTarget = true;
          this.bird.playAnimation();
          this.unicorn.playAnimation();
          if(this.currentScene === 4) {
            clearInterval(this.uniBlinkInterval);
            clearInterval(this.birdBlinkInterval);
            this.uniBlinkInterval = null;
            this.birdBlinkInterval = null;
          } else {
          
          //this.domUI.showArrow();
          }
        }
      }

      stopAll(){
        this.unicorn.forceStop();
        this.bubbles.forceStop();
      }


}