import TWEEN from "tween.js";

// This object contains the state of the app
export default {
  isDev: false,
  isGuest: false,
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
    path: "./assets/textures/",
    imageFiles: [
      { name: "1", image: "1-1.png" },
      { name: "2", image: "1-2.png" },
      { name: "3", image: "1-3.png" },
      { name: "4", image: "1-4.png" },
      { name: "5", image: "1-5.jpg" },
      { name: "6", image: "2-1.png" },
      { name: "7", image: "2-2.png" },
      { name: "8", image: "2-3.png" },
      { name: "9", image: "2-4.png" },
      { name: "10", image: "2-5.jpg" },
      { name: "11", image: "3-1.png" },
      { name: "12", image: "3-2.png" },
      { name: "13", image: "3-3.png" },
      { name: "14", image: "3-4.png" },
      { name: "15", image: "3-5.jpg" },
      { name: "16", image: "4-1.png" },
      { name: "17", image: "4-2.png" },
      { name: "18", image: "4-3.png" },
      { name: "19", image: "4-4.png" },
      { name: "20", image: "4-5.png" },
      { name: "21", image: "5-1.png" },
      { name: "22", image: "5-2.png" },
      { name: "23", image: "5-3.png" },
      { name: "24", image: "5-4.jpg" },
      { name: "25", image: "5-5.jpg" },
      { name: "26", image: "6-1.png" },
      { name: "27", image: "6-2.png" },
      { name: "28", image: "6-3.png" },
      { name: "29", image: "6-4.jpg" },
      { name: "30", image: "6-5.jpg" },
      { name: "31", image: "7-1.png" },
      { name: "32", image: "7-2.png" },
      { name: "33", image: "7-3.png" },
      { name: "34", image: "7-4.jpg" },
      { name: "35", image: "7-5.jpg" },
      { name: "36", image: "8-1.png" },
      { name: "37", image: "8-2.png" },
      { name: "38", image: "8-3.png" },
      { name: "39", image: "8-4.png" },
      { name: "40", image: "8-5.jpg" },
      { name: "41", image: "9-1.png" },
      { name: "42", image: "9-2.png" },
      { name: "43", image: "9-3.png" },
      { name: "44", image: "9-4.jpg" },
      { name: "45", image: "9-5.jpg" },
      { name: "46", image: "10-1.png" },
      { name: "47", image: "10-2.png" },
      { name: "48", image: "10-3.png" },
      { name: "49", image: "10-4.jpg" },
      { name: "50", image: "10-5.jpg" },
      { name: "51", image: "11-1.png" },
      { name: "52", image: "11-2.png" },
      { name: "53", image: "11-3.png" },
      { name: "54", image: "11-4.jpg" },
      { name: "55", image: "11-5.jpg" },
      { name: "56", image: "12-1.png" },
      { name: "57", image: "12-2.png" },
      { name: "58", image: "12-3.png" },
      { name: "59", image: "12-4.jpg" },
      { name: "60", image: "12-5.jpg" },
      { name: "61", image: "13-1.png" },
      { name: "62", image: "13-2.png" },
      { name: "63", image: "13-3.png" },
      { name: "64", image: "13-4.jpg" },
      { name: "65", image: "13-5.jpg" },
      { name: "66", image: "14-1.png" },
      { name: "67", image: "14-2.png" },
      { name: "68", image: "14-3.png" },
      { name: "69", image: "14-4.png" },
      { name: "70", image: "14-5.png" }
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
    posY: 500,
    posZ: 1000
  },
  controls: {
    enabled: true,
    enableRotate: true,
    enablePan: true,
    autoRotate: false,
    autoRotateSpeed: -0.5,
    rotateSpeed: 1,
    zoomSpeed: 1.3,
    minDistance: 400,
    maxDistance: 2000,
    minPolarAngle: -Infinity, //Math.PI / 5,
    maxPolarAngle: Infinity, //Math.PI / 2,
    minAzimuthAngle: -Infinity,
    maxAzimuthAngle: Infinity,
    enableDamping: true,
    dampingFactor: 0.7,
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
    fov: 30
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
  unicornPos: {
    x: 0,
    y: 0,
    z: 0
  },
  //Spot pos
  spotPos: [
    { x: 0, y: 0, z: 0 }, //0
    { x: 100, y: 0, z: 0 }, //1
    { x: -700, y: 0, z: 0 }, //2 train
    { x: 200, y: 150, z: -150 }, //3 trampolian
    { x: 50, y: 0, z: 0 }, //4 snow need to fix
    { x: 0, y: 0, z: 300 }, //5 snow2
    { x: 100, y: 0, z: -50 }, //6 green
    { x: -50, y: 0, z: 0 }, //pink
    { x: 50, y: 0, z: 0 }, //8 shanghai
    { x: 200, y: 0, z: -150 }, //9
    { x: 80, y: 0, z: 0 }, //10
    { x: -50, y: 0, z: 0 }, //11 nathan
    { x: -200, y: 150, z: 0 }, //12
    { x: 50, y: 0, z: 0 } //13
  ],

  // Model Pos for 12 Scenes
  modelPos: [
    {
      //0
      bird: { x: 600, y: -100, z: 0 },
      unicorn: { x: -200, y: -70, z: 0 }
    },
    {
      //1
      bird: { x: 800, y: -100, z: 0 },
      unicorn: { x: -175, y: -70, z: 0 }
    },
    {
      //2 train
      bird: { x: -50, y: -100, z: 0 },
      unicorn: { x: 50, y: -70, z: 0 }
    },
    {
      //3 bklynzoo
      bird: { x: 700, y: -100, z: -150 },
      unicorn: { x: -150, y: -70, z: -150 }
    },
    {
      //4 snow
      bird: { x: 700, y: -100, z: 0 },
      unicorn: { x: -100, y: -70, z: 0 }
    },
    {
      //5 snow2
      bird: { x: -450, y: -100, z: 300 },
      unicorn: { x: 0, y: -70, z: -150 }
    },
    {
      //6 bday
      bird: { x: 400, y: -100, z: -50 },
      unicorn: { x: -100, y: -70, z: -50 }
    },
    {
      //7 pink
      bird: { x: -700, y: -60, z: 0 },
      unicorn: { x: 100, y: -70, z: 0 }
    },
    {
      //8 shanghai
      bird: { x: 600, y: -100, z: 0 },
      unicorn: { x: -150, y: -70, z: 0 }
    },
    {
      //9 fireworks
      bird: { x: 700, y: -100, z: -150 },
      unicorn: { x: -200, y: -70, z: -150 }
    },
    {
      //10 6flag
      bird: { x: 800, y: -100, z: 0 },
      unicorn: { x: -80, y: -70, z: 0 }
    },
    {
      //11 nathan
      bird: { x: -700, y: -100, z: 0 },
      unicorn: { x: 100, y: -70, z: 0 }
    },
    {
      //12
      bird: { x: 700, y: -100, z: 0 },
      unicorn: { x: -350, y: -70, z: 0 }
    },
    {
      //13
      bird: { x: 700, y: -100, z: 50 },
      unicorn: { x: -100, y: -70, z: 50 }
    },
    {
      //14
      bird: { x: 700, y: -100, z: 0 },
      unicorn: { x: -100, y: -70, z: 0 }
    }
  ],

  date: [
    { year: "2017", month: "NOV" },
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
    { year: "2018", month: "NOV" },
    { year: "2090", month: "" }
  ],
  chat: [
    [
      "Oh Hey!",
      "Here you are!",
      "Can you belive it's been a year already?",
      "Actually, can you believe it's only been a year?",
      "Feels like been forever",
      "Anyways, Thanks for sticking around!",

      "Thanks for caring me and loving me,",
      "Thanks for always making me laugh,",
      "I feel lucky, and I'm very grateful!",
      "You know I'm forgetful, but I remember a lot of beautiful things,",
      "Click the arrow so I can show you!"
    ],
    [
      "I remember seeing you the first time,",
      "You stood out from the crowd with your brightest smile,",
      "then you gave me the biggiest hug,",
      "Your big eyes were sparkled with excitements!",
      "What a blessing gift for the coming winter!"
    ],
    [
      "We spent the first 5 dates looking for the best hot chocolate,",
      "but you were allergic to 3/4 cups I got cuz I loved Almond milk.",
      "(btw I hate it now..)",
      "You said you enjoy talking to me, so am I,",
      "I felt so refreshing everytime when I hang out with you."
    ],
    [
      "You did the sneaky thing, and ran away like a rat king,",
      "left me alone with all the people, awkward!",
      "but honestly what other ways would you do to make your first move?",
      "so let's just say it was the best one you could have ever done :)"
    ],
    [
      "We can all agree this is a life changing one,",
      "I'm so glad I brought you to the zoo!",
      "Watching you flipping gives me goosebumps,",
      "You motivates me too, even tho my bones are old like grandma now.",
      "You always so active, like your cute lil brain, can't stop moving!"
    ],
    [
      "Life has never been the same after our first trip together,",
      "I felt like a kid again, immersed in pure happiness and goofniess,",
      "Chinese songs, snowboards, waterparks, hot tubs..",
      "and finally, I recieved my first Totally-Not-Valentines-Day gift!"
    ],
    [
      "There were days I only hang out with no-face and big-bird every day,",
      "and you were so supportive!",
      "But then you got sick, you were sick 3 out of the 4 weeks,",
      "it wasn't easy, but all the hard times we went through only brought us closer!"
    ],
    [
      "My favorite time of the year!",
      "You already know,",
      "I'm so happy you finally got to see all my crazy friends,",
      "They are all of places, sometimes weird af,",
      "but arent we all?",
      "Pretty sure that's why I love you."
    ],
    [
      "Sometimes you have to give props to those over-priced pop-up stores,",
      "The shots we took deserve to be hanged on our future house!",
      "Spring is full of colors,",
      "and we all painters that lives in our own Dream Machines."
    ],
    [
      "You never failed at surprising me,",
      "especially on the things that I hope to have but can't eaxpect to come true.",
      "You brought the best 3 days of Shanghai,",
      "the city where my heart roots,",
      "now you are part of it!"
    ],
    [
      "Sometimes we dive into our own worlds,",
      "schools, works, making things, gigs",
      "but you still made effort come to my boring shows or plan for a perfect night,",
      "I don't need it perfect,",
      "because everyday is perfect with you."
    ],
    [
      "again you were so good at suprising me.",
      "It was cute that you tried so hard to hide it,",
      "I think you were way happier than myself when I told you the visa news,",
      "all the love and joy you gave me",
      "made me believe all the hard work worthes it!"
    ],
    [
      "I never thought I'd able to ride a bike",
      "or find a good reason to go Governand Island.",
      "or watch Nathan-For-You the second time,",
      "or make beats with a bear paw,",
      "dear god you made everything possible!"
    ],
    [
      "We spent weeks as Kenta's slaves,",
      "but it felt good to help and we all had fun in the end.",
      "we both so kind, easily overcommited but can't help it",
      "and loooove the things we do.",
      "That's why we are perfect for each other :p"
    ],
    [
      "You made it!",
      "Thanks for joining me this far!",
      "and thank you for bringing me to your home.",
      "it feels so real,",
      "and natural,",
      "maybe cuz you've already become my home.",
      "You are the best thing ever happened to me,",
      "I love everything we've been through,",
      "and thrilled to start our new chapter.",
      "I Love You.",
      "You are my favorite.",
      "HAPPY ANNIVERSARY!"
    ]
  ],

  bgPresets: [
    { x: 1024, y: 512, z: -700 }, //1
    { x: 1200, y: 802, z: -700 }, //2
    { x: 970, y: 582, z: -700 }, //3
    { x: 1024, y: 512, z: -700 }, //4
    { x: 1512, y: 900, z: -700 }, //5
    { x: 1280, y: 720, z: -700 }, //6
    { x: 1512, y: 802, z: -800 }, //7
    { x: 1280, y: 800, z: -800 }, //8
    { x: 1280, y: 864, z: -700 }, //9
    { x: 1280, y: 720, z: -700 }, //10
    { x: 1280, y: 720, z: -700 }, //11
    { x: 1280, y: 720, z: -700 }, //12
    { x: 1280, y: 720, z: -700 }, //13
    { x: 1400, y: 1368, z: -1400 } //14
  ]
};
