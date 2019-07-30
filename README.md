# a little 3D game using Three.js Webpack ES6.

## Game Controls
- Move: a d
- Jump: s
- Scrollwheel: zoom
- Drag: pan and rotate
- Control settings: Config.js

## Guest player
WIP

## Developments

``` 

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
```
