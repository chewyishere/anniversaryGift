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
      this.spotInterval = setInterval(this.spot.jump.bind(this.spot), 2000);
      this.birdBlinkInterval = setInterval(this.bird.blink.bind(this.bird), 3000);
      this.domUI.removeFirstPage();
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
         this.resetGoals();
         this.updateBg(); 
         this.updateModelPos();
         this.updateSpotPos();
         this.updateDate();
         this.updateDialogBubble();
      }

      updateBg(){
        this.background.updateBg(this.currentScene);
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
        console.log("spotPos x:");
        console.log(Config.spotPos[this.currentScene].x);
        this.spot.spot.position.set(x,y,z);
      }

      updateDate(){
        this.domUI.year.innerHTML = Config.date[this.currentScene].year;
        this.domUI.month.innerHTML = Config.date[this.currentScene].month;

      }

      updateDialogBubble(){
          this.bubbles.textLines = Config.chat[this.currentScene+1];
          setTimeout(this.domUI.updateBubblePos(Config.bubblePos[this.currentScene], 2000));
      }

      resetGoals(){
           this.bubbles.reset();
           this.bird.reset();
           this.unicorn.reset();
           this.meetTarget = false;
      }


      detectDistance(){
        let dist = Math.abs(this.bird.mesh.position.x - this.spot.spot.position.x);

        if(dist < 20){
          this.meetTarget = true;
          this.bird.playAnimation(this.currentScene);
          this.unicorn.playAnimation(this.currentScene);
        }
      }

      stopAll(){
        this.unicorn.forceStop();
        this.bubbles.forceStop();
      }


}