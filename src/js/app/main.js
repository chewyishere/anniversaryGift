// Global imports -
import * as THREE from "three";

// Local imports -
// Components
import Renderer from "./components/renderer";
import Camera from "./components/camera";
import Light from "./components/light";
import Controls from "./components/controls";

// Helpers
import Stats from "./helpers/stats";

// Model
import Texture from "./model/texture";
import Background from "./model/background";

// Managers
import Interaction from "./managers/interaction";
import PageUpdate from "./managers/pageUpdate";
import DomUI from "./managers/domUI";

// data
import Config from "./../data/config";
// -- End of imports

import Bird from "./components/bird";
import Unicorn from "./components/unicorn";
import Bubbles from "./components/bubbles";
import Spot from "./components/spot";

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
    this.domUI = new DomUI();

    // Instantiate texture class
    this.texture = new Texture();

    // Start loading the textures and then go on to load the model after the texture Promises have resolved
    this.texture.load().then(() => {
      this.domUI.doneLoading();
    });

    this.bubbles = new Bubbles();
    this.background = new Background(this.scene);
    this.unicorn = new Unicorn(this.scene, this.bubbles);
    this.bird = new Bird(this.scene);
    this.spot = new Spot(this.scene);
    this.unicorn.create();
    this.bird.create();

    this.pageupdate = new PageUpdate(this, this.texture.textures);
    this.interaction = new Interaction(this);

    this.light.place("bird");
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

    this.unicorn.loop();
    this.bird.loop();
    this.spot.spin();
    this.interaction.loop();

    // RAF
    requestAnimationFrame(this.render.bind(this)); // Bind the main class instead of window object
  }
}

//-----------------
