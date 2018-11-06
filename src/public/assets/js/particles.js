particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 250,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "shape": {
        "type": "image",
        "image": {
          "src": "https://www.pngarts.com/files/3/Blue-Snowflakes-PNG-Picture.png",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 1,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 10,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 1,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 50,
        "color": "#ffffff",
        "opacity": 0.6,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 5,
        "direction": "bottom",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": true,
          "rotateX": 300,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode":  "bubble"
        },
          "onclick": {
            "enable": true,
            "mode": "repulse"
          },
          "resize": true
      },
      "modes": {
        "repulse": {
          "distance": 150,
          "duration": 0.5
        },
        "bubble": {
            "distance": 200,
            "size": 30,
            "duration": 3,
            "opacity": .8,
            "speed": 3
          },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });