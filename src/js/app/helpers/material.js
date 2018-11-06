import * as THREE from 'three';

import Config from '../../data/config';

// USe this class as a helper to set up some default materials
export default class Material {
  constructor(color) {
    this.basic = new THREE.MeshBasicMaterial({
      color,
      side: THREE.DoubleSide
    });

    this.standard = new THREE.MeshStandardMaterial({
      color,
      flatShading: true,
      roughness: 1,
      metalness: 0,
      side: THREE.DoubleSide
    });

    this.lambert = new THREE.MeshLambertMaterial({
      color,
      flatShading: true
    });

    this.wire = new THREE.MeshBasicMaterial({wireframe: true});
  }
}

