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
      { name: '1', image: '1-1.png' },
      { name: '2', image: '1-2.png' },
      { name: '3', image: '1-3.png' },
      { name: '4', image: '1-4.png' },
      { name: '5', image: '1-5.jpg' },
      { name: '6', image: '2-1.png' },
      { name: '7', image: '2-2.png' },
      { name: '8', image: '2-3.png' },
      { name: '9', image: '2-4.png' },
      { name: '10', image: '2-5.jpg' },
      { name: '11', image: '3-1.png' },
      { name: '12', image: '3-2.png' },
      { name: '13', image: '3-3.png' },
      { name: '14', image: '3-4.png' },
      { name: '15', image: '3-5.jpg' },
      { name: '16', image: '4-1.png' },
      { name: '17', image: '4-2.png' },
      { name: '18', image: '4-3.png' },
      { name: '19', image: '4-4.png' },
      { name: '20', image: '4-5.png' },
      { name: '21', image: '5-1.png' },
      { name: '22', image: '5-2.png' },
      { name: '23', image: '5-3.png' },
      { name: '24', image: '5-4.jpg' },
      { name: '25', image: '5-5.jpg' },
      { name: '26', image: '6-1.png' },
      { name: '27', image: '6-2.png' },
      { name: '28', image: '6-3.png' },
      { name: '29', image: '6-4.jpg' },
      { name: '30', image: '6-5.jpg' },
      { name: '31', image: '7-1.png' },
      { name: '32', image: '7-2.png' },
      { name: '33', image: '7-3.png' },
      { name: '34', image: '7-4.jpg' },
      { name: '35', image: '7-5.jpg' },
      { name: '36', image: '8-1.png' },
      { name: '37', image: '8-2.png' },
      { name: '38', image: '8-3.png' },
      { name: '39', image: '8-4.png' },
      { name: '40', image: '8-5.jpg' },
      { name: '41', image: '9-1.png' },
      { name: '42', image: '9-2.png' },
      { name: '43', image: '9-3.png' },
      { name: '44', image: '9-4.jpg' },
      { name: '45', image: '9-5.jpg' },
      { name: '46', image: '10-1.png' },
      { name: '47', image: '10-2.png' },
      { name: '48', image: '10-3.png' },
      { name: '49', image: '10-4.jpg' },
      { name: '50', image: '10-5.jpg' },
      { name: '51', image: '11-1.png' },
      { name: '52', image: '11-2.png' },
      { name: '53', image: '11-3.png' },
      { name: '54', image: '11-4.jpg' },
      { name: '55', image: '11-5.jpg' },
      { name: '56', image: '12-1.png' },
      { name: '57', image: '12-2.png' },
      { name: '58', image: '12-3.png' },
      { name: '59', image: '12-4.jpg' },
      { name: '60', image: '12-5.jpg' },
      { name: '61', image: '13-1.png' },
      { name: '62', image: '13-2.png' },
      { name: '63', image: '13-3.png' },
      { name: '64', image: '13-4.jpg' },
      { name: '65', image: '13-5.jpg' }
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
    near: 0.0001
  },
  camera: {
    fov: 60,
    near: 1,
    far: 3000,
    aspect: 1,
    posX: 0,
    posY: 300,
    posZ: 1200
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
    intensity: 0.7,
    x: 300,
    y: 430,
    z: 700
  },

  shadow: {
    enabled: true,
    helperEnabled: true,
    bias: 0,
    mapWidth: 2048,
    mapHeight: 2048,
    near: 100,
    far: 1400,
    top: 700,
    right: 700,
    bottom: -700,
    left: -700,
    fov: 30,
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

  spotLight: {
    enabled: true,
    color: 0xffffff,
    intensity: 1,
    distance: 115,
    decay: 0,
    penumbra: 0.3,
    angle: 0.3,
    x: -300,
    y: 680,
    z: -100,
    near: 500,
    far: 2000,
    width: 2048,
    height: 2048
  },

  hemiLight: {
    enabled: true,
    color: 0xffffff,
    groundColor: 0xffffff,
    intensity: 0.2,
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
      { x: -60, y: 20, z: 0 }, //0 
      { x: 0, y: 20, z: 0 }, //1
      { x: 0, y: 20, z: 0 }, //2 train
      { x: 200, y: 20, z: -150 }, //3 trampolian
      { x: 100, y: 20, z: 0 }, //4 snow
      { x: 50, y: 20, z: 0 }, //5 snow2
      { x: 200, y: 20, z: 0 }, //6 green
      { x: 50, y: 20, z: 300 }, 
      { x: 50, y: 20, z: 0 }, //8 shanghai
      { x: 200, y: 20, z: -150  }, //9 
      { x: 80, y: 20, z: 0 }, //10 
      { x: 50, y:20, z: 0 }, //11
      { x: -200, y: 20, z: 0 }, //12
      { x: 50, y: 120, z: 0 }, //13
    ],

    
  // Model Pos for 12 Scenes
  modelPos: [
    {//0
      bird: { x: 600, y: 10, z: 0 },
      unicorn: { x: -200, y: 40, z: 0 }
    },
    {//1
      bird: { x: 800, y: 0, z: 0 },
      unicorn: { x: -175, y: 40, z: 0 }
    },
    {//2 train
      bird: { x: 800, y: 0, z: 0 },
      unicorn: { x: -100, y: 40, z: 0 }
    },
    {//3 bklynzoo
      bird: { x: 700, y: 0, z: -150 },
      unicorn: { x: -150, y: 40, z: -150 }
    },
    {//4 snow
      bird: { x: 700, y: 0, z: 0 },
      unicorn: { x: -100, y: 40, z: 0 }
    },
    {//5 snow2
      bird: { x: 500, y: 0, z: 0 },
      unicorn: { x: -100, y: 40, z: 0 }
    },
    {//6 bday
      bird: { x: 700, y: 0, z: 0 },
      unicorn: { x: 50, y: 40, z: 0 }
    },
    {//7 pink
      bird: { x: 700, y: 0, z: 300 },
      unicorn: { x: -100, y: 40, z: 300 }
    },
    {//8 shanghai
      bird: { x: 500, y: 0, z: 0 },
      unicorn: { x: -100, y: 40, z: 0 }
    },
    {//9 fireworks 
      bird: { x: 700, y: 0, z: -150 },
      unicorn: { x: -200, y: 40, z: -150 }
    },
    {//10 6flag
      bird: { x: 500, y: 0, z: 0 },
      unicorn: { x: -80, y: 40, z: 0 }
    },
    {//11
      bird: { x: 700, y: 0, z: 0 },
      unicorn: { x: -100, y: 40, z: 0 }
    },
    {//12
      bird: { x: 700, y: 0, z: 0 },
      unicorn: { x: -350, y: 40, z: 0 }
    },
    {//13
      bird: { x: 700, y: 0, z: 50 },
      unicorn: { x: -800, y: 40, z: 50 }
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
      unicorn: { x: 0, y: -1, z: 0 }
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
    },
    {//5
      bird: { x: 0, y: 0, z: 0 },
      unicorn: { x: 0, y: 0, z: 0 }
    },
    {//6
      bird: { x: 0, y: 0, z: 0 },
      unicorn: { x: 0, y: 0, z: 0 }
    },
    {//7
      bird: { x: 0, y: 0, z: 0 },
      unicorn: { x: 0, y: 0, z: 0 }
    },
    {//8
      bird: { x: 0, y: 0, z: 0 },
      unicorn: { x: 0, y: 0, z: 0 }
    },
    {//9
      bird: { x: 0, y: 0, z: 0 },
      unicorn: { x: 0, y: 0, z: 0 }
    },
    {//10
      bird: { x: 0, y: 0, z: 0 },
      unicorn: { x: 0, y: 0, z: 0 }
    },
    {//11
      bird: { x: 0, y: 0, z: 0 },
      unicorn: { x: 0, y: 0, z: 0 }
    },
    {//12
      bird: { x: 0, y: 0, z: 0 },
      unicorn: { x: 0, y: 0, z: 0 }
    },
    {//13
      bird: { x: 0, y: 0, z: 0 },
      unicorn: { x: 0, y: 0, z: 0 }
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
    ["5-1", "5-2", "5-3"],
    ["6-1", "6-2", "6-3"],
    ["7-1", "7-2", "7-3"],
    ["8-1", "8-2", "8-3"],
    ["9-1", "9-2", "9-3"],
    ["10-1", "10-2", "10-3"],
    ["11-1", "11-2", "11-3"],
    ["12-1", "12-2", "12-3"],
    ["13-1", "13-2", "13-3"],
  ],

  bgPresets: [
    { x: 1024, y: 512, z: -700 }, //1
    { x: 1200, y: 802, z: -700 }, //2
    { x: 970, y: 582, z: -700 }, //3
    { x: 1024, y: 512, z: -500 }, //4
    { x: 1512, y: 900, z: -800 }, //5
    { x: 1280, y: 720, z: -700 }, //6
    { x: 1512, y: 802, z: -800 }, //7 
    { x: 970, y: 800, z: -400 }, //8    
    { x: 1280, y: 864, z: -700 }, //9
    { x: 1024, y: 512, z: -700 }, //10
    { x: 1280, y: 720, z: -500 }, //11
    { x: 1280, y: 720, z: -700 },//12
    { x: 1280, y: 720, z: -700 },//13
    { x: 1280, y: 720, z: -700 },//14
  ],

  bgRot:[
    [Math.PI/4 , 0 , -Math.PI/4], //1
    [Math.PI/4 , 0 , -Math.PI/4], //2
    [Math.PI/4 , 0 , -Math.PI/4], //3
    [Math.PI/4 , 0 , -Math.PI/4], //4
    [Math.PI/4 , 0 , -Math.PI/4], //5
    [Math.PI/4 , 0 , -Math.PI/4], //6
    [Math.PI/4 , 0 , -Math.PI/4], //7
    [Math.PI/4 , 0 , -Math.PI/4], //8
    [Math.PI/4 , 0 , -Math.PI/4], //9
    [Math.PI/4 , 0 , -Math.PI/4], //10
    [Math.PI/4 , 0 , -Math.PI/4], //11
    [Math.PI/4 , 0 , -Math.PI/4], //12
    [Math.PI/4 , 0 , -Math.PI/4], //13
  ]
};
