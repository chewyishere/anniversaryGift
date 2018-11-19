import * as THREE from 'three';
// Promise polyfill for IE
import { Promise } from 'es6-promise';

import Helpers from '../../utils/helpers';
import Config from '../../data/config';
import DomUI from '../managers/domUI';

// This class preloads all textures in the imageFiles array in the Config via ES6 Promises.
// Once all textures are done loading the model itself will be loaded after the Promise .then() callback.
// Using promises to preload textures prevents issues when applying textures to materials
// before the textures have loaded.
export default class Texture {
  constructor() {
    // Prop that will contain all loaded textures
    this.textures = {};
    this.domUI = new DomUI();
    this.loadingTime = 0;
  }

  load() {
    const loader = new THREE.TextureLoader();
    const maxAnisotropy = Config.maxAnisotropy;
    const imageFiles = Config.texture.imageFiles;
    const promiseArray = [];

    loader.setPath(Config.texture.path);

    imageFiles.forEach(imageFile => {
      // Add an individual Promise for each image in array
      promiseArray.push(new Promise((resolve, reject) => {
        // Each Promise will attempt to load the image file
        loader.load(imageFile.image,
          // This gets called on load with the loaded texture
          texture => {
            texture.anisotropy = maxAnisotropy;
            this.loadingTime += 100/70;
            let percent = Math.round(this.loadingTime);
            this.domUI.loaderPercent.text(percent + "%");
            // Resolve Promise with object of texture if it is instance of THREE.Texture
            const bgTextures = {};
            bgTextures[imageFile.name] = texture;
            if(bgTextures[imageFile.name] instanceof THREE.Texture)
              resolve(bgTextures);
          },
          Helpers.logProgress(),
          xhr => reject(new Error(xhr + 'An error occurred loading while loading ' + imageFile.image))
        )
      }));
    });

    // Iterate through all Promises in array and return another Promise when all have resolved or console log reason when any reject
    return Promise.all(promiseArray).then(textures => {
      // Set the textures prop object to have name be the resolved texture
      for(let i = 0; i < textures.length; i++) {
        this.textures[Object.keys(textures[i])[0]] = textures[i][Object.keys(textures[i])[0]];
      }
    }, reason => console.log(reason));
  }
}
