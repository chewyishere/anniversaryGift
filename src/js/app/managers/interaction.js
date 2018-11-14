import Keyboard from '../../utils/keyboard';
import Helpers from '../../utils/helpers';
import Config from '../../data/config';
import DomUI from './domUI';

// Manages all input interactions
export default class Interaction {
  constructor(main) {
    // Properties
    this.renderer = main.renderer.threeRenderer;
    this.scene = main.scene;
    this.camera = main.camera.threeCamera;
    this.mousePos = {x:0,y:0};
    this.windowSize = {width: window.innerWidth/2, height: window.innerHeight/2};
    this.timeout = null;
    this.triggerEvent = null;
    this.bird = main.bird;
    this.unicorn = main.unicorn;
    this.pageupdate = main.pageupdate;
    this.bubbles = main.bubbles;
    this.spot = main.spot.spot;

    // Instantiate keyboard helper and Dom UI helper
    this.keyboard = new Keyboard();
    this.domUI = new DomUI();

    // Listeners
    // Mouse events
    this.domUI.start.click(event => this.onMouseInit(event));
    this.domUI.start.on('touchstart', this.handleTouchInit);

    this.domUI.next.click(event => this.onMouseNext(event));
    this.domUI.next.on('touchstart', this.handleTouchStartNext);

    this.domUI.back.click(event => this.onMouseBack(event));
    this.domUI.back.on('touchstart', this.handleTouchStartBack);


    this.renderer.domElement.addEventListener('resize', (event) => this.onWindowResize, false);
    this.renderer.domElement.addEventListener('mousemove', (event) => Helpers.throttle(this.onMouseMove(event), 250), false);
    this.renderer.domElement.addEventListener('mouseleave', (event) => this.onMouseLeave(event), false);
    this.renderer.domElement.addEventListener('mouseover', (event) => this.onMouseOver(event), false);
    this.renderer.domElement.addEventListener('touchend', this.handleTouchEnd, false);
    this.renderer.domElement.addEventListener('touchmove',this.handleTouchMove, false);

    // Keyboard events
    this.keyboard.domElement.addEventListener('keydown', (event) => {
      // Only once
      if(event.repeat) {
        return;
      }
      if(this.keyboard.eventMatches(event, 'space')){
        console.log("debug start");
        this.domUI.loginField.fadeOut(300);
        this.domUI.appContainer.removeClass("fadeOut");
        this.pageupdate.initScene();
      }
      
      if (this.keyboard.eventMatches(event, "2")) {
        this.domUI.firstpage.fadeOut(300);
        this.pageupdate.startScene();
        this.domUI.showArrow();
      }
      if (this.keyboard.eventMatches(event, "s")) {
        this.bird.jump();
      }
  
    });                            
  }

 
  move(){
      if(this.keyboard.pressed('d')) {
        this.bird.moveRight();
      };
    
      if(this.keyboard.pressed('a')){
        this.bird.moveLeft();
      };

      this.pageupdate.detectDistance();

  }

  onWindowResize() {
    var HEIGHT = window.innerHeight;
    var WIDTH = window.innerWidth;
    this.windowSize = (WIDTH /2, HEIGHT / 2);
    this.renderer.setSize(WIDTH, HEIGHT);
    this.camera.aspect = WIDTH / HEIGHT;
    this.camera.updateProjectionMatrix();
  }

  onMouseInit(event){
    this.domUI.loginField.fadeOut(300);
    this.domUI.appContainer.removeClass("fadeOut");
    this.pageupdate.initScene();
  }

  handleTouchInit(event) {
    if (event.touches.length > 1) {
      event.preventDefault();
      this.mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY};
      this.pageupdate.initScene();
    }
  }

  handleTouchStart(event) {
    if (event.touches.length > 1) {
      event.preventDefault();
      this.mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY};
      
      this.pageupdate.startScene()
      this.domUI.firstpage.fadeOut(300);
    }

}
  
  onMouseNext(event) {
    if(!this.pageupdate.ready){
      this.domUI.firstpage.fadeOut(300);
      this.pageupdate.startScene();
    }else{
      this.pageupdate.nextScene();
    }
  }

  onMouseBack(event) {
    this.pageupdate.previousScene();
  }

  //init events
  onMouseOver(event) {
    event.preventDefault();
    Config.isMouseOver = true;
  }

  onMouseLeave(event) {
    event.preventDefault();
    Config.isMouseOver = false;
  }

  onMouseMove(event) {
    event.preventDefault();

    clearTimeout(this.timeout);
    this.timeout = setTimeout(function() {
      Config.isMouseMoving = false;
    }, 200);

    Config.isMouseMoving = true;
    this.mousePos = {x:event.clientX, y:event.clientY};
  }

   handleTouchNext(event) {
    if (event.touches.length > 1) {
      event.preventDefault();
      this.mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY};
      this.pageupdate.nextScene();
    }
  }
  
  handleTouchBack(event) {
    if (event.touches.length > 1) {
      event.preventDefault();
      this.mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY};
      this.pageupdate.previousScene();
    }
  }

   handleTouchEnd(event) {
      this.mousePos = {x:windowHalfX, y:windowHalfY};
  }
  
   handleTouchMove(event) {
    if (event.touches.length == 1) {
      event.preventDefault();
      this.mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY};
    }
  }

  loop(){
    if(this.pageupdate.ready && !this.pageupdate.meetTarget){
      this.move();
    }
  }

}
