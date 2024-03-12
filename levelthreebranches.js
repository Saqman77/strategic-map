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

  // adding cursor
  //   const imageTexturecursor = await Assets.load("./images/cursor.png");
  //   const imageSpritecursor = new Sprite(imageTexturecursor);
  //   imageSpritecursor.x = 1474;
  //   imageSpritecursor.y = 817;
  //   imageSpritecursor.anchor.set(0.5);
  //   app.stage.addChild(imageSpritecursor);

  ///////////////////////////////////
  //changes in code below

  const marginEllipse = 1000.55; // Right side margin in Figma

  // Calculate the x position of the element within the container
  const containerWidth = window.innerWidth; // Width of the container

  const elementEllipse = containerWidth - marginEllipse;

  /////////////////////////////////////

  async function createImagesWithText() {
    const loadImage = async (
      path,
      x,
      y,
      labelText,
      fontSize,
      fontWeight,
      width,
      height
    ) => {
      const texture = await Assets.load(path);
      const sprite = new Sprite(texture);
      sprite.x = x;
      sprite.y = y;
      sprite.anchor.set(0.5);
      sprite.width = width;
      sprite.height = height;

      if (labelText !== "") {
        const style = new TextStyle({
          fontFamily: "bukra", // Use a default system font for testing
          fontSize: fontSize || 16,
          fontWeight: fontWeight || "normal",
          fill: "white",
        });

        const text = new Text(labelText, style);
        text.anchor.set(0.5);
        text.x = x;
        text.y = y;

        const container = new Container();
        container.addChild(sprite, text);

        return container;
      }

      return sprite;
    };

    const SpriteVectpressed = await loadImage(
      "./images/VectorPressed.png",
      elementEllipse,
      500,
      "",
      8,
      500,
      298.45,
      298.45
    );
    const SpriteEllippreesed = await loadImage(
      "./images/EllipsePressed.png",
      elementEllipse,
      500,
      "A vibrant society",
      8,
      500,
      167.13,
      168.57
    );

    app.stage.addChild(SpriteVectpressed, SpriteEllippreesed);
  }

  createImagesWithText();
  //////////////////////////////////////

  document.body.appendChild(app.canvas);

  const margin = 522; // Right side margin in Figma
  const containerWidthx = window.innerWidth; // Width of the container
  // Calculate the x position of the element within the container
  const elementX = containerWidthx - margin; //1920-522

  async function createSprite(texturePath, position, size) {
    const texture = await Assets.load(texturePath);
    const sprite = new Sprite(texture);
    sprite.anchor.set(0.5, 0.5);
    sprite.position.set(position.x, position.y);
    sprite.width = size.width;
    sprite.height = size.height;
    app.stage.addChild(sprite);
    return sprite;
  }
  const spriteHeight = 200; // Adjust as needed

  const stateDefault = await createSprite(
    "./images/StateDefault.webp",
    { x: elementX, y: 250 },
    { width: 200, height: 200 }
  );

  const text = new Text(
    "  Develop Human Capital in line with labor market needs",
    {
      fontFamily: "Arial",
      fontSize: 16,
      fill: 0xffffff,
      wordWrap: true,
      wordWrapWidth: 210,
    }
  );
  text.x = 1300;
  text.y = 365;
  app.stage.addChild(text);
})();
