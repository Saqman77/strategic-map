import { Application, Graphics, Assets, Sprite } from "pixi.js";

(async () => {
  // const Application = PIXI.Application;
  const app = new Application();
  await app.init({ backgroundColor: 0x23395d, resizeTo: window, antialias: true });

  // Append the application canvas to the document body
  document.body.appendChild(app.canvas);


  //   WE use absolute for complete window for not occur scrolldown
  app.canvas.style.position = "absolute";
  app.canvas.style.top = 0;
  app.canvas.style.left = 0;

   // Load the star texture
   const starTexture = await Assets.load('/public/images/bg-star.png');

   const starAmount = 1000;
   let cameraZ = 0;
   const fov = 20;
   const baseSpeed = 0.025;
   let speed = 0

   // Create the stars
   const stars = [];

   for (let i = 0; i < starAmount; i++)
    {
        const star = {
            sprite: new Sprite(starTexture),
            z: 0,
            x: 0,
            y: 0,
        };

        star.sprite.anchor.x = 0.5;
        star.sprite.anchor.y = 0.7;
        randomizeStar(star, true);
        app.stage.addChild(star.sprite);
        stars.push(star);
    }

    function randomizeStar(star, initial)
    {
        star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000;

        // Calculate star positions with radial random coordinate so no star hits the camera.
        const deg = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 1;

        star.x = Math.cos(deg) * distance;
        star.y = Math.sin(deg) * distance;
    }

    // Listen for animate update
    app.ticker.add((time) =>
    {
        // Simple easing. This should be changed to proper easing function when used for real.
        speed += speed / 20;
        cameraZ += time.deltaTime * 10 * (speed + baseSpeed);
        for (let i = 0; i < starAmount; i++)
        {
            const star = stars[i];

            if (star.z < cameraZ) randomizeStar(star);

            // Map star 3d position to 2d with really simple projection
            const z = star.z - cameraZ;

            star.sprite.x = star.x * (fov / z) * app.renderer.screen.width + app.renderer.screen.width / 2;
            star.sprite.y = star.y * (fov / z) * app.renderer.screen.width + app.renderer.screen.height / 2;

            // Calculate star scale & rotation.
            const dxCenter = star.sprite.x - app.renderer.screen.width / 2;
            const dyCenter = star.sprite.y - app.renderer.screen.height / 2;
            const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
          
           
            star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
        }
    });


  //  shapes are store in PIXI.Graphics
  // const Graphics = Graphics;
  // const rectangle = new Graphics();
  // const circle = new Graphics();



  // rectangle
  // .setStrokeStyle(2, 0x000000)
  // .rect(200, 200, 100, 120)
  // .fill(0xaa33bb);
  // app.stage.addChild(rectangle);

  // circle
  //   .setStrokeStyle(2, 0x2bdb8a)
  //   .circle(200, 400, 50)
  //   .fill(0x464646);

  // app.stage.addChild(circle);
})();