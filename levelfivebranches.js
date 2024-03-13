import {
  Assets,
  Application,
  Graphics,
  Container,
  TextStyle,
  Text,
  Texture,
  Sprite,
} from "pixi.js";

(async () => {
  // const Application = Application;
  const app = new Application();
  await app.init({
    backgroundColor: 0x1f2041,
    resizeTo: window,
    antialias: true,
  });
  await Assets.load(["/images/Center.webp", "/images/Vignette.webp"]);
  app.canvas.style.position = "absolute";
  app.canvas.style.top = 0;
  app.canvas.style.left = 0;
  const starTexture = await Assets.load("/images/bg-star.png");

  const starAmount = 1000;
  let cameraZ = 0;
  const fov = 20;
  const baseSpeed = 0.025;
  let speed = 0;

  // Create the stars
  const stars = [];

  for (let i = 0; i < starAmount; i++) {
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
  function randomizeStar(star, initial) {
    star.z = initial
      ? Math.random() * 2000
      : cameraZ + Math.random() * 1000 + 2000;

    // Calculate star positions with radial random coordinate so no star hits the camera.
    const deg = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 1;

    star.x = Math.cos(deg) * distance;
    star.y = Math.sin(deg) * distance;
  }

  // Listen for animate update
  app.ticker.add((time) => {
    // Simple easing. This should be changed to proper easing function when used for real.
    speed += speed / 20;
    cameraZ += time.deltaTime * 10 * (speed + baseSpeed);
    for (let i = 0; i < starAmount; i++) {
      const star = stars[i];

      if (star.z < cameraZ) randomizeStar(star);

      // Map star 3d position to 2d with really simple projection
      const z = star.z - cameraZ;

      star.sprite.x =
        star.x * (fov / z) * app.renderer.screen.width +
        app.renderer.screen.width / 2;
      star.sprite.y =
        star.y * (fov / z) * app.renderer.screen.width +
        app.renderer.screen.height / 2;

      // Calculate star scale & rotation.
      const dxCenter = star.sprite.x - app.renderer.screen.width / 2;
      const dyCenter = star.sprite.y - app.renderer.screen.height / 2;
      // const distanceCenter = Math.sqrt(
      //   dxCenter * dxCenter + dyCenter * dyCenter
      // );

      star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
    }
  });
  const text1 = new Text("Strategic Objectives", {
    fontFamily: "Arial",
    fontSize: 45,
    fill: 0xffffff,
    wordWrap: true,
    wordWrapWidth: 300,
  });
  text1.x = 76;
  text1.y = 196;
  app.stage.addChild(text1);

  const text3 = new Text(
    "The vision was cascaded into strategic objectives to enable effective implementation through vision  realization programs.",
    {
      fontFamily: "Arial",
      fontSize: 20,
      fill: 0xffffff,
      wordWrap: true,
      wordWrapWidth: 430,
    }
  );
  text3.x = 76;
  text3.y = 300;
  app.stage.addChild(text3);

  function createText(content, fontFamily, fontSize, fill, x, y) {
    const text = new Text(content, {
      fontFamily: fontFamily,
      fontSize: fontSize,
      fill: fill,
    });
    text.x = x;
    text.y = y;
    return text;
  }

  // Usage example:
  const text4 = createText(
    "6       Overarching Objectives",
    "Arial",
    15,
    0xffffff,
    window.innerWidth - 300,
    196
  );
  app.stage.addChild(text4);

  const line = new Graphics();
  line.lineStyle(1, 0xffffff, 0.4); // Set line style: thickness and color
  line.moveTo(window.innerWidth - 300, 196); // Move to the end of text1
  line.lineTo(window.innerWidth - 120, 196); // Draw a line to the start of text2
  line.y = 30;
  app.stage.addChild(line);

  const text5 = createText(
    "27           Branch   Objectives",
    "Arial",
    15,
    0xffffff,
    window.innerWidth - 300,
    236
  );
  app.stage.addChild(text5);
  const line1 = new Graphics();
  line1.lineStyle(1, 0xffffff, 0.4); // Set line style: thickness and color
  line1.moveTo(window.innerWidth - 300, 196); // Move to the end of text1
  line1.lineTo(window.innerWidth - 120, 196); // Draw a line to the start of text2
  line1.y = 70;
  app.stage.addChild(line1);
  const text6 = createText(
    "96          Strategic Objectives",
    "Arial",
    15,
    0xffffff,
    window.innerWidth - 300,
    276
  );
  app.stage.addChild(text6);
  const imageTexturebtnplus = await Assets.load("./images/buttonminus.png");
  const imageSpritebtnplus = new Sprite(imageTexturebtnplus);
  imageSpritebtnplus.x = 62;
  imageSpritebtnplus.y = 952;
  imageSpritebtnplus.anchor.set(0.5);
  app.stage.addChild(imageSpritebtnplus);

  // Load the second image
  const imageTexturebtnminus = await Assets.load("./images/buttonplus.png");
  const imageSpritebtnminus = new Sprite(imageTexturebtnminus);
  imageSpritebtnminus.x = 130;
  imageSpritebtnminus.y = 952;
  imageSpritebtnminus.anchor.set(0.5);
  app.stage.addChild(imageSpritebtnminus);
  document.body.appendChild(app.canvas);

  const levelfive_img1 = await Assets.load("./images/5thlevel.png");
  const Spritedefaultinner = new Sprite(levelfive_img1);
  Spritedefaultinner.x = 1350;
  Spritedefaultinner.y = 520;
  Spritedefaultinner.anchor.set(0.5);
  app.stage.addChild(Spritedefaultinner);

  const levelfive_img2 = await Assets.load("./images/4level_img3.webp");
  const Spritelevel52 = new Sprite(levelfive_img2);
  Spritelevel52.x = 960; //960
  Spritelevel52.y = 520;
  Spritelevel52.anchor.set(0.5);
  Spritelevel52.width = 144.48;
  Spritelevel52.height = 144.48;
  app.stage.addChild(Spritelevel52);

  const levelfive_img3 = await Assets.load("./images/BrokenEclipse.webp");
  const Spritelevel53 = new Sprite(levelfive_img3);
  Spritelevel53.x = 330;
  Spritelevel53.y = 970;
  Spritelevel53.anchor.set(0.5);
  Spritelevel53.width = 284.14;
  Spritelevel53.height = 284.14;
  app.stage.addChild(Spritelevel53);

  const levelfive_img4 = await Assets.load("./images/level4img.webp");
  const Spritelevel54 = new Sprite(levelfive_img4);
  Spritelevel54.x = 700;
  Spritelevel54.y = 1129;
  Spritelevel54.anchor.set(0.5);
  Spritelevel54.width = 144.48;
  Spritelevel54.height = 144.48;
  app.stage.addChild(Spritelevel54);
})();
