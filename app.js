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
    backgroundColor: 0x23395d,
    resizeTo: window,
    antialias: true,
  });

  // Create a texture from the image file
  await Assets.load(["/images/Center.webp", "/images/Vignette.webp"]);

  // Create a texture from the image file
  const texture = Texture.from("/images/Center.webp");

  // Create a sprite using the texture
  const sprite = new Sprite(texture);

  // Center the sprite
  sprite.anchor.set(0.5, 0.5);
  sprite.position.x = app.screen.width / 2; // Set X position to the center of the stage
  sprite.position.y = app.screen.height / 2;
  sprite.width = 1213;
  sprite.height = 1080;
  app.stage.addChild(sprite);

  // Append the application canvas to the document body
  document.body.appendChild(app.canvas);

  //   WE use absolute for complete window for not occur scrolldown
  app.canvas.style.position = "absolute";
  app.canvas.style.top = 0;
  app.canvas.style.left = 0;

  // Load the star texture
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

  // Create a texture from the image file
  await Assets.load(["/images/Center.webp", "/images/Vignette.webp"]);

  // Create a texture from the image file
  const texture = Texture.from("/images/Center.webp");

  // Create a sprite using the texture
  const sprite = new Sprite(texture);

  // Center the sprite
  sprite.anchor.set(0.5, 0.5);
  sprite.position.x = app.screen.width / 2; // Set X position to the center of the stage
  sprite.position.y = app.screen.height / 2;
  sprite.width = 1213;
  sprite.height = 1080;
  app.stage.addChild(sprite);

  const bgVignette_text = Texture.from("/images/Vignette.webp");
  // Create a sprite using the texture
  const bgVignette = new Sprite(bgVignette_text);
  bgVignette.width = window.innerWidth;
  bgVignette.height = window.innerHeight;

  // const bgPattern_text = Texture.from("/images/bg_pattern2.png");
  // const bgPattern = new Sprite(bgPattern_text);
  // bgPattern.width = window.innerWidth;
  // bgPattern.height = window.innerHeight;
  // app.stage.addChild(bgPattern);

  const stage = new Container();
  app.stage.addChild(stage);

  // function createCircle(x, y, radius, text) {
  //   // Create a circle
  //   const circle = new Graphics();
  //   circle
  //     .lineStyle(1, 0x000000)
  //     .beginFill(0xffffff) // White fill color
  //     .drawCircle(0, 0, radius)
  //     .endFill();

  //   // Set the circle position
  //   circle.x = x;
  //   circle.y = y;

  //   // Add text to the circle
  //   const textStyle = new TextStyle({
  //     fontSize: 16,
  //     fill: 0x000000, // Black text color
  //     wordWrap: true,
  //     wordWrapWidth: radius * 2, // Wrap text within the circle
  //     align: "center",
  //   });

  //   const textObject = new Text(text, textStyle);
  //   textObject.anchor.set(0.5); // Center the text

  //   // Add the circle and text to the stage
  //   stage.addChild(circle);
  //   circle.addChild(textObject);
  // }
  // const torusShape = new Graphics();
  // torusShape
  //   .strokeStyle(0x000000);
  //   .

  // const ellipsesContainer = new Container();

  function createEllipse(ellipseTexture, x, y, width, height, text) {
    // Create a circle
    const circleContainer = new Container();
    const ellipseSprite = new Sprite(ellipseTexture);

    ellipseSprite.anchor.set(0.5);
    ellipseSprite.position.x = x;
    ellipseSprite.position.y = y;

    // Ellipse's width and height
    ellipseSprite.width = width;
    ellipseSprite.height = height;

    // Add text to the circle
    const textStyle = new TextStyle({
      fontSize: 16,
      fill: 0x000000, // Black text color
      wordWrap: true,
      // wordWrapWidth: radius * 2, // Wrap text within the circle
      align: "center",
    });

    // Enable the Ellipse to be interactive... this will allow it to respond to mouse and touch events
    ellipseSprite.eventMode = 'static';

    // This button mode will mean the hand cursor appears when you roll over the Ellipse with your mouse
    ellipseSprite.cursor = 'pointer';

    // Setup events for mouse + touch using the pointer events
    ellipseSprite.on('pointerdown', onDragStart, ellipseSprite);

    // Move the sprite to its designated position
    ellipseSprite.x = x;
    ellipseSprite.y = y;

    const textObject = new Text({ text: text, textStyle: textStyle });
    textObject.anchor.set(0.5); // Center the text

    // Add the circle and text to the stage
    circleContainer.addChild(ellipseSprite);
    circleContainer.addChild(textObject);
    stage.addChild(circleContainer);
  }
  //
  // Create three circles with text at different positions
  // createCircle(527, 124, 117.385, "A vibrant society");
  // createCircle(window.innerWidth - 612, 220, 117.385, "A thriving economy");
  // createCircle(536, 400, 117.385, "An ambitious nation");

  const ellipseTexture = await Assets.load("/images/Ellipse-18.png");
  createEllipse(
    ellipseTexture,
    (window.innerWidth / 100) * 27.5 + 117.385,
    (window.innerHeight / 100) * 11.5 + 117.385,
    234.77,
    234.77,
    "A vibrant society"
  );
  createEllipse(
    ellipseTexture,
    (window.innerWidth / 100) * 28 + 117.385,
    (window.innerHeight / 100) * 75.8 + 117.385,
    234.77,
    234.77,
    "A thriving economy"
  );
  createEllipse(
    ellipseTexture,
    (window.innerWidth / 100) * 68.12 + 117.385,
    (window.innerHeight / 100) * 33.2 + 117.385,
    234.77,
    234.77,
    "An ambitious nation"
  );

  // Enable Dragging on ellipses
  let dragTarget = null;

    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage.on('pointerup', onDragEnd);
    app.stage.on('pointerupoutside', onDragEnd);

    function onDragMove(event)
    {
        if (dragTarget)
        {
            dragTarget.parent.toLocal(event.global, null, dragTarget.position);
        }
    }

    function onDragStart()
    {
        // Store a reference to the data
        // * The reason for this is because of multitouch *
        // * We want to track the movement of this particular touch *
        this.alpha = 0.5;
        dragTarget = this;
        app.stage.on('pointermove', onDragMove);
    }

    function onDragEnd()
    {
        if (dragTarget)
        {
            app.stage.off('pointermove', onDragMove);
            dragTarget.alpha = 1;
            dragTarget = null;
        }
    }

  
  // Create a new Text object
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

  // Load the first image
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
    const imageTexturecursor = await Assets.load("./images/cursor.png");
    const imageSpritecursor = new Sprite(imageTexturecursor);
    imageSpritecursor.x = 1474;
    imageSpritecursor.y = 817;
    imageSpritecursor.anchor.set(0.5);
    app.stage.addChild(imageSpritecursor);

  // const ellipseSprite = new Sprite(ellipseTexture);

  // const circle1Container = new Container();
  // // ellipseSprite.anchor.set(0.5);
  // ellipseSprite.position.x = window.innerWidth / 100 * 27.5;
  // ellipseSprite.position.y = window.innerHeight / 100 * 6.5;

  // ellipseSprite.width = 234.77;
  // ellipseSprite.height = 234.77;

  // stage.addChild(ellipseSprite);

  //  shapes are store in Graphics
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
