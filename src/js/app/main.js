// Global imports -
import * as THREE from 'three';
import TWEEN from 'tween.js';

// Local imports -
// Components
import Renderer from './components/renderer';
import Camera from './components/camera';
import Light from './components/light';
import Controls from './components/controls';

// Helpers
import Geometry from './helpers/geometry';
import Stats from './helpers/stats';

// Model
import Texture from './model/texture';
import Background from './model/background'

// Managers
import Interaction from './managers/interaction';
import DatGUI from './managers/datGUI';
import PageUpdate from './managers/pageUpdate';

// data
import Config from './../data/config';
// -- End of imports

import Bird from './components/bird';
import Unicorn from './components/unicorn';
import Bubbles from './components/bubbles';
import Spot from './components/spot';

// This class instantiates and ties all of the components together, starts the loading process and renders the main loop
export default class Main {
  constructor(container) {
    // Set container property to container element
    this.container = container;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(Config.fog.color, Config.fog.near);

    // Get Device Pixel Ratio first for retina
    if (window.devicePixelRatio) {
      Config.dpr = window.devicePixelRatio;
    }

    // Main renderer constructor
    this.renderer = new Renderer(this.scene, container);

    // Components instantiations
     this.camera = new Camera(this.renderer.threeRenderer);
     this.controls = new Controls(this.camera.threeCamera, container);
     this.light = new Light(this.scene);


    // Set up rStats if dev environment
    if (Config.isDev && Config.isShowingStats) {
      this.stats = new Stats(this.renderer);
      this.stats.setUp();
    }

    // Instantiate texture class
    this.texture = new Texture();

    // Start loading the textures and then go on to load the model after the texture Promises have resolved
    this.texture.load().then(() => {
      this.manager = new THREE.LoadingManager();

      // onProgress callback
      this.manager.onProgress = (item, loaded, total) => {
        console.log(`${item}: ${loaded} ${total}`);
      };

      // All loaders done now
      //this.manager.onLoad = () => {
      // Set up interaction manager with the app now that the model is finished loading

      // Add dat.GUI controls if dev
      if (Config.isDev) {
        new DatGUI(this);
      }

      // Everything is now fully loaded
      Config.isLoaded = true;
      this.container.querySelector('#loading').style.display = 'none';


    });

     this.bubbles = new Bubbles();
     this.background = new Background(this.scene);
     this.unicorn = new Unicorn(this.scene, this.bubbles);
     this.bird = new Bird(this.scene);
     this.spot = new Spot(this.scene);
     this.unicorn.create();
     this.bird.create();

     this.pageupdate = new PageUpdate(this,this.texture.textures);
     this.interaction = new Interaction(this);
    
      this.light.place('bird');
      this.light.placeTargetLight(this.unicorn.mesh);

    // this.light.placeTargetLight(this.unicorn);

    this.render();
  }

  render() {
    // Render rStats if Dev
    if (Config.isDev && Config.isShowingStats) {
      Stats.start();
    }

    // Call render function and pass in created scene and camera
    this.renderer.render(this.scene, this.camera.threeCamera);

    // rStats has finished determining render call now
    if (Config.isDev && Config.isShowingStats) {
      Stats.end();
    }

    // if(!this.pageupdate.meetTarget){
    //   var tempHA = (this.interaction.mousePos.x - this.interaction.windowSize.width) / 200;
    //   var tempVA = (this.interaction.mousePos.y - this.interaction.windowSize.height) / 200;
    //   var userHAngle = Math.min(Math.max(tempHA, -Math.PI / 3), Math.PI / 3);
    //   var userVAngle = Math.min(Math.max(tempVA, -Math.PI / 3), Math.PI / 3);
    //   this.unicorn.loop(true, userHAngle, userVAngle);
    // } else {
    this.unicorn.loop();
    this.bird.loop();
    this.spot.spin();
    this.interaction.loop();
  
    // RAF
    requestAnimationFrame(this.render.bind(this)); // Bind the main class instead of window object
  }
}


//-----------------