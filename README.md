# a 3D lil game using Three.js.

### Used this Three.js Webpack ES6 Boilerplate but modified so does NOT follow all the scripts and controls
https://github.com/paulmg/ThreeJS-Webpack-ES6-Boilerplate/
A basic boilerplate for a Three.js project including the use of Webpack and ES6 syntax via Babel.

## Game Controls
* Move: a d
* Jump: s
* Scrollwheel: zoom
* Drag: pan and rotate
* Control settings: Config.js

## Project Structure
```
build - Directory for built and compressed files from the npm build script
src - Directory for all dev files
├── css - Contains all SCSS files, that are compiled to `src/public/assets/css`
├── js - All the Three.js app files, with `app.js` as entry point. Compiled to `src/public/assets/js` with webpack
│   ├── app
│   │   ├── components - Three.js components that get initialized in `main.js`
│   │   ├── helpers - Classes that provide ideas on how to set up and work with defaults
│   │   ├── managers - Manage complex tasks such as GUI or input
│   │   └── model - Classes that set up the model object
│   ├── data - Any data to be imported into app
│   └── utils - Various helpers and vendor classes
└── public - Used by webpack-dev-server to serve content and is copied over to build folder with build command. Place external vendor files here.
```

## Getting started
Install dependencies:

```
npm install
```

Then run dev script:

```
npm run dev
```

Spins up a webpack dev server at localhost:8080 and keeps track of all js and sass changes to files. Only reloads automatically upon save of js files.

## Build
```
npm run build
```

Cleans existing build folder while linting js folder and then copies over the public folder from src. Then sets environment to production and compiles js and css into build.


