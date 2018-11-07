import Config from '../../data/config';

// Manages all dat.GUI interactions
export default class DatGUI {
  constructor(main, mesh) {
    const gui = new dat.GUI();

    this.camera = main.camera.threeCamera;
    this.controls = main.controls.threeControls;
    this.light = main.light;
    this.birdPos = main.bird.mesh.position;
    this.birdRot = main.bird.mesh.rotation;
    this.unicornPos = main.unicorn.mesh.position;
    this.unicornRot = main.unicorn.mesh.rotation;

    /* Global */
    //gui.close();

    console.log(gui);

    /* Model */
    const modelFolder = gui.addFolder('Model Pos');
    const birdPosXGui = modelFolder.add(Config.birdPos, 'x', -1000, 1000).name('bird posX');
    birdPosXGui.onChange((value) => {
     this.birdPos.x = value;
   });

    const birdPosYGui = modelFolder.add(Config.birdPos, 'y', -500, 500).name('bird posY');
    birdPosYGui.onChange((value) => {
      this.birdPos.y = value;
    });

    const birdPosZGui = modelFolder.add(Config.birdPos, 'z', -500, 500).name('bird posZ');
    birdPosZGui.onChange((value) => {
      this.birdPos.z = value;
   });

   const birdRotateXGui = modelFolder.add(Config.birdRot, 'x', -6, 6).name('bird rotateX');
   birdRotateXGui.onChange((value) => {
    this.birdRot.x = value;
  });

   const birdRotateYGui = modelFolder.add(Config.birdRot, 'y', -6,6).name('bird rotateY');
   birdRotateYGui.onChange((value) => {
    this.birdRot.y = value;
   });

   const birdRotateZGui = modelFolder.add(Config.birdRot, 'z', -6,6).name('bird rotateZ');
   birdRotateZGui.onChange((value) => {
    this.birdRot.z = value;
  });

  const unicornRotateXGui = modelFolder.add(Config.unicornRot, 'x', -6,6).name('unicorn rotateX');
  unicornRotateXGui.onChange((value) => {
   this.unicornRot.x = value;
 });

  const unicornRotateYGui = modelFolder.add(Config.unicornRot, 'y', -6,6).name('unicorn rotateY');
  unicornRotateYGui.onChange((value) => {
   this.unicornRot.y = value;
  });

  const unicornRotateZGui = modelFolder.add(Config.unicornRot, 'z', -6,6).name('unicorn rotateZ');
  unicornRotateZGui.onChange((value) => {
   this.unicornRot.z = value;
 });


   const unicornPosXGui = modelFolder.add(Config.unicornPos, 'x', -1000, 1000).name('unicorn posX');
   unicornPosXGui.onChange((value) => {
    this.unicornPos.x = value;
  });

   const unicornPosYGui = modelFolder.add(Config.unicornPos, 'y', -500, 500).name('unicorn posY');
   unicornPosYGui.onChange((value) => {
     this.unicornPos.y = value;
   });

   const unicornPosZGui = modelFolder.add(Config.unicornPos, 'z', -500, 500).name('unicorn posZ');
   unicornPosZGui.onChange((value) => {
     this.unicornPos.z = value;
  });

    /* Camera */
    const cameraFolder = gui.addFolder('Camera');
    
    //CAM POSX
    const camPosXGui = cameraFolder.add(Config.camera, 'posX', -1000, 1000).name('cam posX');
     camPosXGui.onChange((value) => {
      this.camera.position.x = value;
    });
    camPosXGui.onFinishChange(() => {
      this.camera.updateProjectionMatrix();
    });

    //CAM POSY
    const camPosYGui = cameraFolder.add(Config.camera, 'posY', -1000, 1000).name('cam posY');
    camPosYGui.onChange((value) => {
      this.camera.position.y = value;
      
    });
    camPosYGui.onFinishChange(() => {
      this.camera.updateProjectionMatrix();
    });

    //CAM POSZ
    const camPosZGui = cameraFolder.add(Config.camera, 'posZ', -1000, 1000).name('cam posZ');
    camPosZGui.onChange((value) => {
      this.camera.position.z = value;
    });
    camPosZGui.onFinishChange(() => {
      this.camera.updateProjectionMatrix();
    });

    const cameraFOVGui = cameraFolder.add(Config.camera, 'fov', 0, 180).name('Camera FOV');
    cameraFOVGui.onChange((value) => {
      this.controls.enableRotate = false;
      this.camera.fov = value;
      
    });
    cameraFOVGui.onFinishChange(() => {
      this.camera.updateProjectionMatrix();
      this.controls.enableRotate = true;
    });
    const cameraAspectGui = cameraFolder.add(Config.camera, 'aspect', 0, 4).name('Camera Aspect');
    cameraAspectGui.onChange((value) => {
      this.controls.enableRotate = false;
      this.camera.aspect = value;
    });
    cameraAspectGui.onFinishChange(() => {
      this.camera.updateProjectionMatrix();
      this.controls.enableRotate = true;
    });

    const cameraFogColorGui = cameraFolder.addColor(Config.fog, 'color').name('Fog Color');
    cameraFogColorGui.onChange((value) => {
      main.scene.fog.color.setHex(value);
    });

    const cameraFogNearGui = cameraFolder.add(Config.fog, 'near', 0.000, 0.010).name('Fog Near');
    cameraFogNearGui.onChange((value) => {
      this.controls.enableRotate = false;
      main.scene.fog.density = value;
    });

    cameraFogNearGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });

    /* Controls */
    const controlsFolder = gui.addFolder('Controls');
    controlsFolder.add(Config.controls, 'autoRotate').name('Auto Rotate').onChange((value) => {
      this.controls.autoRotate = value;
    });
    const controlsAutoRotateSpeedGui = controlsFolder.add(Config.controls, 'autoRotateSpeed', -1, 1).name('Rotation Speed');
    controlsAutoRotateSpeedGui.onChange((value) => {
      this.controls.enableRotate = false;
      this.controls.autoRotateSpeed = value;
    });
    controlsAutoRotateSpeedGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });


    /* Mesh */
    const meshFolder = gui.addFolder('Mesh');
    meshFolder.add(Config.mesh, 'translucent', true).name('Translucent').onChange((value) => {
      if(value) {
        mesh.material.transparent = true;
        mesh.material.opacity = 0.5;
      } else {
        mesh.material.opacity = 1.0;
      }
    });
    meshFolder.add(Config.mesh, 'wireframe', true).name('Wireframe').onChange((value) => {
      mesh.material.wireframe = value;
    });


    /* Lights */
    // Ambient Light
    const ambientLightFolder = gui.addFolder('Ambient Light');
    ambientLightFolder.add(Config.ambientLight, 'enabled').name('Enabled').onChange((value) => {
      this.light.ambientLight.visible = value;
    });
    ambientLightFolder.addColor(Config.ambientLight, 'color').name('Color').onChange((value) => {
      this.light.ambientLight.color.setHex(value);
    });


    // Directional Light
    const directionalLightFolder = gui.addFolder('Directional Light');
    directionalLightFolder.add(Config.directionalLight, 'enabled').name('Enabled').onChange((value) => {
      this.light.directionalLight.visible = value;
    });
    directionalLightFolder.addColor(Config.directionalLight, 'color').name('Color').onChange((value) => {
      this.light.directionalLight.color.setHex(value);
    });
    const directionalLightIntensityGui = directionalLightFolder.add(Config.directionalLight, 'intensity', 0, 2).name('Intensity');
    directionalLightIntensityGui.onChange((value) => {
      this.controls.enableRotate = false;
      this.light.directionalLight.intensity = value;
    });
    directionalLightIntensityGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const directionalLightPositionXGui = directionalLightFolder.add(Config.directionalLight, 'x', -1000, 1000).name('Position X');
    directionalLightPositionXGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.directionalLight.position.x = value;
    });
    directionalLightPositionXGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const directionalLightPositionYGui = directionalLightFolder.add(Config.directionalLight, 'y', -1000, 1000).name('Position Y');
    directionalLightPositionYGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.directionalLight.position.y = value;
    });
    directionalLightPositionYGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const directionalLightPositionZGui = directionalLightFolder.add(Config.directionalLight, 'z', -1000, 1000).name('Position Z');
    directionalLightPositionZGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.directionalLight.position.z = value;
    });
    directionalLightPositionZGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });

    // Shadow Map
    const shadowFolder = gui.addFolder('Shadow Map');
    shadowFolder.add(Config.shadow, 'enabled').name('Enabled').onChange((value) => {
      this.light.directionalLight.castShadow = value;
    });
    shadowFolder.add(Config.shadow, 'helperEnabled').name('Helper Enabled').onChange((value) => {
      this.light.directionalLightHelper.visible = value;
    });
    const shadowNearGui = shadowFolder.add(Config.shadow, 'near', 0, 400).name('Near');
    shadowNearGui.onChange((value) => {
      this.controls.enableRotate = false;
      this.light.directionalLight.shadow.camera.near = value;
    });
    shadowNearGui.onFinishChange(() => {
      this.controls.enableRotate = true;
      this.light.directionalLight.shadow.map.dispose();
      this.light.directionalLight.shadow.map = null;
      this.light.directionalLightHelper.update();
    });
    const shadowFarGui = shadowFolder.add(Config.shadow, 'far', 0, 1200).name('Far');
    shadowFarGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.directionalLight.shadow.camera.far = value;
    });
    shadowFarGui.onFinishChange(() => {
      this.controls.enableRotate = true;
      this.light.directionalLight.shadow.map.dispose();
      this.light.directionalLight.shadow.map = null;
      this.light.directionalLightHelper.update();
    });
    const shadowTopGui = shadowFolder.add(Config.shadow, 'top', -400, 400).name('Top');
    shadowTopGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.directionalLight.shadow.camera.top = value;
    });
    shadowTopGui.onFinishChange(() => {
      this.controls.enableRotate = true;
      this.light.directionalLight.shadow.map.dispose();
      this.light.directionalLight.shadow.map = null;
      this.light.directionalLightHelper.update();
    });
    const shadowRightGui = shadowFolder.add(Config.shadow, 'right', -400, 400).name('Right');
    shadowRightGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.directionalLight.shadow.camera.right = value;
    });
    shadowRightGui.onFinishChange(() => {
      this.controls.enableRotate = true;
      this.light.directionalLight.shadow.map.dispose();
      this.light.directionalLight.shadow.map = null;
      this.light.directionalLightHelper.update();
    });
    const shadowBottomGui = shadowFolder.add(Config.shadow, 'bottom', -400, 400).name('Bottom');
    shadowBottomGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.directionalLight.shadow.camera.bottom = value;
    });
    shadowBottomGui.onFinishChange(() => {
      this.controls.enableRotate = true;
      this.light.directionalLight.shadow.map.dispose();
      this.light.directionalLight.shadow.map = null;
      this.light.directionalLightHelper.update();
    });
    const shadowLeftGui = shadowFolder.add(Config.shadow, 'left', -400, 400).name('Left');
    shadowLeftGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.directionalLight.shadow.camera.left = value;
    });
    shadowLeftGui.onFinishChange(() => {
      this.controls.enableRotate = true;
      this.light.directionalLight.shadow.map.dispose();
      this.light.directionalLight.shadow.map = null;
      this.light.directionalLightHelper.update();
    });
    const shadowBiasGui = shadowFolder.add(Config.shadow, 'bias', -0.000010, 1).name('Bias');
    shadowBiasGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.directionalLight.shadow.bias = value;
    });
    shadowBiasGui.onFinishChange(() => {
      this.controls.enableRotate = true;
      this.light.directionalLight.shadow.map.dispose();
      this.light.directionalLight.shadow.map = null;
      this.light.directionalLightHelper.update();
    });


    // Point Light
    const pointLightFolder = gui.addFolder('Point Light');
    pointLightFolder.add(Config.pointLight, 'enabled').name('Enabled').onChange((value) => {
      this.light.pointLight.visible = value;
    });
    pointLightFolder.addColor(Config.pointLight, 'color').name('Color').onChange((value) => {
      this.light.pointLight.color.setHex(value);
    });
    const pointLightIntensityGui = pointLightFolder.add(Config.pointLight, 'intensity', 0, 2).name('Intensity');
    pointLightIntensityGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.pointLight.intensity = value;
    });
    pointLightIntensityGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const pointLightDistanceGui = pointLightFolder.add(Config.pointLight, 'distance', 0, 1000).name('Distance');
    pointLightDistanceGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.pointLight.distance = value;
    });
    pointLightDistanceGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const pointLightPositionXGui = pointLightFolder.add(Config.pointLight, 'x', -1000, 1000).name('Position X');
    pointLightPositionXGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.pointLight.position.x = value;
    });
    pointLightPositionXGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const pointLightPositionYGui = pointLightFolder.add(Config.pointLight, 'y', -1000, 1000).name('Position Y');
    pointLightPositionYGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.pointLight.position.y = value;
    });
    pointLightPositionYGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const pointLightPositionZGui = pointLightFolder.add(Config.pointLight, 'z', -1000, 1000).name('Position Z');
    pointLightPositionZGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.pointLight.position.z = value;
    });
    pointLightPositionZGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });


    // Hemi Light
    const hemiLightFolder = gui.addFolder('Hemi Light');
    hemiLightFolder.add(Config.hemiLight, 'enabled').name('Enabled').onChange((value) => {
      this.light.hemiLight.visible = value;
    });
    hemiLightFolder.addColor(Config.hemiLight, 'color').name('Color').onChange((value) => {
      this.light.hemiLight.color.setHex(value);
    });
    hemiLightFolder.addColor(Config.hemiLight, 'groundColor').name('ground Color').onChange((value) => {
      this.light.hemiLight.groundColor.setHex(value);
    });
    const hemiLightIntensityGui = hemiLightFolder.add(Config.hemiLight, 'intensity', 0, 2).name('Intensity');
    hemiLightIntensityGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.hemiLight.intensity = value;
    });
    hemiLightIntensityGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const hemiLightPositionXGui = hemiLightFolder.add(Config.hemiLight, 'x', -1000, 1000).name('Position X');
    hemiLightPositionXGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.hemiLight.position.x = value;
    });
    hemiLightPositionXGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const hemiLightPositionYGui = hemiLightFolder.add(Config.hemiLight, 'y', -500, 1000).name('Position Y');
    hemiLightPositionYGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.hemiLight.position.y = value;
    });
    hemiLightPositionYGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
    const hemiLightPositionZGui = hemiLightFolder.add(Config.hemiLight, 'z', -1000, 1000).name('Position Z');
    hemiLightPositionZGui.onChange((value) => {
      this.controls.enableRotate = false;

      this.light.hemiLight.position.z = value;
    });
    hemiLightPositionZGui.onFinishChange(() => {
      this.controls.enableRotate = true;
    });
  }
}
