import TWEEN from 'tween.js';

// This object contains the state of the app
export default {
  isDev: false,
  isShowingStats: false,
  isLoaded: false,
  isTweening: true,
  isRotating: false,
  isMouseMoving: false,
  isMouseOver: true,
  maxAnisotropy: 1,
  dpr: 1,
  easing: TWEEN.Easing.Quadratic.InOut,
  duration: 500,
  texture: {
    path: './assets/textures/',
    imageFiles: [
      { name: '1', image: '1.jpg' },
      { name: '2', image: '2.jpg' },
      { name: '3', image: '3.jpg' },
      { name: '4', image: '4.jpg' }
    ]
  },
  mesh: {
    enableHelper: false,
    wireframe: false,
    translucent: false,
    material: {
      color: 0xffffff,
      emissive: 0xffffff
    }
  },
  fog: {
    color: 0xffffff,
    near: 0.0006
  },
  camera: {
    fov: 60,
    near: 1,
    far: 3000,
    aspect: 1,
    posX: 0,
    posY: 300,
    posZ: 1000
  },
  controls: {
    enabled: true,
    enableRotate: true,
    enablePan: true,
    autoRotate: false,
    autoRotateSpeed: -0.5,
    rotateSpeed: 0.5,
    zoomSpeed: 0.8,
    minDistance: 300,
    maxDistance: 1500,
    minPolarAngle: -Infinity, //Math.PI / 5,
    maxPolarAngle: Infinity, //Math.PI / 2,
    minAzimuthAngle: -Infinity,
    maxAzimuthAngle: Infinity,
    enableDamping: true,
    dampingFactor: 0.5,
    enableZoom: true,
    target: {
      x: 0,
      y: 0,
      z: 0
    }
  },
  ambientLight: {
    enabled: true,
    color: 0x141414
  },

  directionalLight: {
    enabled: true,
    color: 0xffffff,
    intensity: 0.5,
    x: 200,
    y: 200,
    z: 200
  },

  shadow: {
    enabled: true,
    helperEnabled: true,
    bias: 0,
    mapWidth: 2048,
    mapHeight: 2048,
    near: 100,
    far: 1200,
    top: 400,
    right: 400,
    bottom: -400,
    left: -400,
  },
  pointLight: {
    enabled: true,
    color: 0xffffff,
    intensity: 0.34,
    distance: 115,
    x: 0,
    y: 0,
    z: 0
  },

  hemiLight: {
    enabled: true,
    color: 0xffffff,
    groundColor: 0xffffff,
    intensity: 0.5,
    x: 0,
    y: 0,
    z: 0
  },

  //Default Pos for Models 
  birdPos: {
    x: 0,
    y: 0,
    z: 0
  },

  birdRot: {
    x: 0,
    y: 0,
    z: 0
  },

  unicornPos: {
    x: 0,
    y: 0,
    z: 0
  },

  unicornRot: {
    x: 0,
    y: 0,
    z: 0
  },

  //Spot pos
  spotPos: [
    { x: -100, y: 100, z: -100 }, //0 
    { x: 0, y: 100, z: 0 }, //1 
    { x: 0, y: 100, z: 0 }, //2 
    { x: 0, y: 100, z: 0 }, //3 
    { x: 0, y: 100, z: 0 }, //4 
    { x: 0, y: 100, z: 0 }, //5 
  ],

  bubblePos:[
    { x: "0%", y: "50%" }, //0 
    { x: 0, y: 100 }, //1 
    { x: 0, y: 100 }, //2 
    { x: 0, y: 100 }, //3 
    { x: 0, y: 100 }, //4 
    { x: 0, y: 100 }, //5 
  ],

  // Model Pos for 12 Scenes
  modelPos: [
    {//0
      bird: { x: 700, y: 20, z: -100 },
      unicorn: { x: -351, y: 40, z: -100 }
    },
    {//1
      bird: { x: 600, y: 0, z: 0 },
      unicorn: { x: -500, y: 50, z: 0 }
    },
    {//2
      bird: { x: 200, y: 0, z: 0 },
      unicorn: { x: -500, y: 0, z: 0 }
    },
    {//3
      bird: { x: 500, y: 0, z: 0 },
      unicorn: { x: -500, y: 0, z: 0 }
    },
    {//4
      bird: { x: 700, y: 0, z: 0 },
      unicorn: { x: -500, y: 0, z: 0 }
    }
  ],
  // Model Rotation for 12 Scenes
  modelRos: [
    {//0
      bird: { x: 0, y: 0, z: 0 },
      unicorn: { x: 0, y: 0, z: 0 }
    },
    {//1
      bird: { x: 0, y: 0, z: 0 },
      unicorn: { x: 0, y: 0, z: 0 }
    },
    {//2
      bird: { x: 0, y: 0, z: 0 },
      unicorn: { x: 0, y: 0, z: 0 }
    },
    {//3
      bird: { x: 0, y: 0, z: 0 },
      unicorn: { x: 0, y: 0, z: 0 }
    },
    {//4
      bird: { x: 0, y: 0, z: 0 },
      unicorn: { x: 0, y: 0, z: 0 }
    }
  ],

  // Model events for 12 Scenes when bird reaches goals
  modelAnime: [
    {//0
      bird: ["shy", "happy"],
      unicorn: ["wait", "happy"]
    },
    {//1
      bird: ["shy", "happy"],
      unicorn: ["wait", "happy"]
    },
    {//2
      bird: ["shy", "happy"],
      unicorn: ["wait", "happy"]
    },
    {//3
      bird: ["shy", "happy"],
      unicorn: ["wait", "happy"]
    },
    {//4
      bird: ["shy", "happy"],
      unicorn: ["wait", "happy"]
    }
  ],

  date: [
    { year: "2017", month: "NOV" },
    { year: "2017", month: "DEC" },
    { year: "2018", month: "JAN" },
    { year: "2018", month: "FEB" },
    { year: "2018", month: "MAT" },
    { year: "2018", month: "APL" },
    { year: "2018", month: "MAY" },
    { year: "2018", month: "JUN" },
    { year: "2018", month: "JUL" },
    { year: "2018", month: "AUG" },
    { year: "2018", month: "SEP" },
    { year: "2018", month: "OCT" },
    { year: "2018", month: "AUG" },
    { year: "2018", month: "NOV" }
  ],

  chat: [
    [
        "Oh Hey! It's You!", 
        "I know you",
        "I remember you from the first day we met",
        "you stand out from the crowd with your brightening energy",
        "and you gave me the warmist hug.",
        "Your eyes were full of excitments",
        "your charming smile brighten up my heart",
        "and I remember even more", 
        "click the arrow and come join me!"
    ],
    ["2-1", "2-2", "2-3"],
    ["3-1", "3-2", "3-3"],
    ["4-1", "4-2", "4-3"],
    ["5-1", "5-2", "5-3"]
  ],

  bgPresets: [
    { x: 1000, y: 500, z: -500 },
    { x: 1000, y: 700, z: -700 },
    { x: 2000, y: 1000, z: -800 },
    { x: 4000, y: 3000, z: -500 },
  ]
};
