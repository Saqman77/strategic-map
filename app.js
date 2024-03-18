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
import { Viewport } from "pixi-viewport";
import { gsap } from "gsap";

(async () => {
  // const Application = Application;
  const app = new Application({
    backgroundColor: 0x1f2041,
    resizeTo: window,
    antialias: true,
  });

  // Append the application canvas to the document body
  document.body.appendChild(app.view);
  const stage = new Container({ isRenderGroup: true });
  app.stage.addChild(stage);

  //   WE use absolute for complete window for not occur scrolldown
  app.view.style.position = "absolute";
  app.view.style.top = 0;
  app.view.style.left = 0;

  // create viewport
  const viewport = new Viewport({
    events: app.renderer.events, // the events module is important for wheel to work properly when renderer.view is placed or scaled
  });
  viewport.screenWidth = window.innerWidth;
  viewport.screenHeight = window.innerHeight;
  viewport.worldWidth = window.innerWidth;
  viewport.worldHeight = window.innerHeight;

  // add the viewport to the stage
  app.stage.addChild(viewport);

  // activate plugins
  viewport.pinch().wheel().decelerate().drag();

  //  create a global Container
  const worldContainer = new Container();
  worldContainer.pivot.x = worldContainer.width / 2;
  worldContainer.pivot.y = worldContainer.height / 2;
  worldContainer.width = window.innerWidth;
  worldContainer.height = window.innerHeight;
  viewport.addChild(worldContainer);

  // create a Centered Container for the Circles
  const centeredContainer = new Container();
  centeredContainer.pivot.x = centeredContainer.width / 2;
  centeredContainer.pivot.y = centeredContainer.height / 2;
  centeredContainer.x = window.innerWidth / 2;
  centeredContainer.y = window.innerHeight / 2;
  centeredContainer.width = 1213;
  centeredContainer.height = window.innerHeight;
  centeredContainer.eventMode = "static";

  worldContainer.addChild(centeredContainer);

  // // Load the star texture
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
    star.zIndex = 1;
    randomizeStar(star, true);
    worldContainer.addChild(star.sprite);
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
  const CenterImagetexture = await Assets.load("/images/Center.webp");

  // Create a sprite using the texture
  const centerImageSprite = new Sprite(CenterImagetexture);

  // Center the sprite
  centerImageSprite.anchor.set(0.5, 0.5);
  // centerImageSprite.x = app.screen.width / 2; // Set X position to the center of the stage
  // centerImageSprite.y = app.screen.height / 2;
  centerImageSprite.width = 1213;
  centerImageSprite.height = 1080;
  centeredContainer.addChild(centerImageSprite);

  // Function to create Ellipse containing text inside
  function createEllipseWithTextInside(
    ellipseTexture,
    x,
    y,
    width,
    height,
    text
  ) {
    // Create a circle
    const circleContainer = new Container();
    circleContainer.x = x;
    circleContainer.y = y;
    circleContainer.width = width;
    circleContainer.height = height;
    circleContainer.pivot.x = circleContainer.width / 2;
    circleContainer.pivot.y = circleContainer.height / 2;
    circleContainer.eventMode = "static";

    const ellipseSprite = new Sprite(ellipseTexture);

    ellipseSprite.anchor.set(0.5);

    // Ellipse's width and height
    ellipseSprite.width = width;
    ellipseSprite.height = height;

    // Add text to the circle
    const textStyle = new TextStyle({
      fontSize: 16.43,
      fill: 0xffffff, // Black text color
      wordWrap: true,
      wordWrapWidth: ellipseSprite.width - 50,
      align: "center",
    });

    // Enable the Ellipse to be interactive... this will allow it to respond to mouse and touch events
    circleContainer.eventMode = "static";

    // This button mode will mean the hand cursor appears when you roll over the Ellipse with your mouse
    circleContainer.cursor = "pointer";

    // Setup events for mouse + touch using the pointer events
    // circleContainer.on("pointerdown", onDragStart, circleContainer);
    circleContainer.on("pointerdown", activateNextLevel);

    // Move the sprite to its designated position
    circleContainer.x = x;
    circleContainer.y = y;

    const textObject = new Text(text, textStyle);
    textObject.anchor.set(0.5); // Center the text
    textObject.x = ellipseSprite.x;
    textObject.y = ellipseSprite.y;

    // Add the circle and text to the stage
    ellipseSprite.addChild(textObject);
    circleContainer.addChild(ellipseSprite);
    // worldContainer.addChild(circleContainer);
    return circleContainer;
  }

  const level1EllipseTexture = await Assets.load("/images/Ellipse18.png");

  const circleLevel1a = createEllipseWithTextInside(
    level1EllipseTexture,
    (window.innerWidth / 100) * 27.5 + 117.385,
    (window.innerHeight / 100) * 11.5 + 117.385,
    234.77,
    234.77,
    "A vibrant society"
  );
  const circleLevel1b = createEllipseWithTextInside(
    level1EllipseTexture,
    (window.innerWidth / 100) * 28 + 117.385,
    (window.innerHeight / 100) * 75.8 + 117.385,
    234.77,
    234.77,
    "A thriving economy"
  );
  const circleLevel1c = createEllipseWithTextInside(
    level1EllipseTexture,
    (window.innerWidth / 100) * 68.12 + 117.385,
    (window.innerHeight / 100) * 33.2 + 117.385,
    234.77,
    234.77,
    "An ambitious nation"
  );

  worldContainer.addChild(circleLevel1a, circleLevel1b,circleLevel1c);

  // Enable Dragging on ellipses
  let dragTarget = null;

  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;
  app.stage.on("pointerup", onDragEnd);
  app.stage.on("pointerupoutside", onDragEnd);

  function onDragMove(event) {
    if (dragTarget) {
      dragTarget.parent.toLocal(event.global, null, dragTarget.position);
    }
  }

  function onDragStart() {
    // Store a reference to the data
    // * The reason for this is because of multitouch *
    // * We want to track the movement of this particular touch *
    this.alpha = 0.5;
    dragTarget = this;
    app.stage.on("pointermove", onDragMove);
  }

  function onDragEnd() {
    if (dragTarget) {
      app.stage.off("pointermove", onDragMove);
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

  const zoomButtonsContainer = new Container();

  zoomButtonsContainer.width = 128;
  zoomButtonsContainer.height = 56;
  zoomButtonsContainer.x = (window.innerWidth / 100) * 3.75;
  zoomButtonsContainer.y = (window.innerHeight / 100) * 88.15;

  // Load the first image
  const imageTexturebtnplus = await Assets.load("./images/buttonplus.png");
  const imageSpritebtnplus = new Sprite(imageTexturebtnplus);
  imageSpritebtnplus.x = 72;

  // Load the second image
  const imageTexturebtnminus = await Assets.load("./images/buttonminus.png");
  const imageSpritebtnminus = new Sprite(imageTexturebtnminus);
  zoomButtonsContainer.addChild(imageSpritebtnminus);
  zoomButtonsContainer.addChild(imageSpritebtnplus);
  app.stage.addChild(zoomButtonsContainer);

  // enable interactivity with buttons
  imageSpritebtnminus.eventMode = "static";
  imageSpritebtnplus.eventMode = "static";
  // add Zoomin and Zoomout event listeners to buttons
  imageSpritebtnminus.on("pointerdown", () => {
    viewport.zoomPercent(-0.1, true);
  });
  imageSpritebtnplus.on("pointerdown", () => {
    viewport.zoomPercent(0.1, true);
  });
  // adding cursor
  const imageTexturecursor = await Assets.load("./images/cursor.png");
  const imageSpritecursor = new Sprite(imageTexturecursor);
  imageSpritecursor.x = (window.innerWidth / 100) * 76.88;
  imageSpritecursor.y = (window.innerHeight / 100) * 75.65;
  imageSpritecursor.anchor.set(0.5);
  worldContainer.addChild(imageSpritecursor);

  /////////////////////////////////////////////////////////////////////////////////
  // Level 2
  // async function createSprite(texturePath, position, size) {
  //   const texture = await Assets.load(texturePath);
  //   const sprite = new Sprite(texture);
  //   sprite.anchor.set(0.5, 0.5);
  //   sprite.position.set(position.x, position.y);
  //   sprite.width = size.width;
  //   sprite.height = size.height;
  //   return sprite;
  // }

  const level2EllipseTexture = await Assets.load("/images/2ndlevel-circle.png");

  const circleLevel2a = createEllipseWithTextInside(
    level2EllipseTexture,
    250,
    -250,
    227.74,
    227.74,
    "Grow and diversify the economy"
  );

  const circleLevel2b = createEllipseWithTextInside(
    level2EllipseTexture,
    350,
    200,
    227.74,
    227.74,
    "Increase employment"
  );
  circleLevel2a.visible = false;
  circleLevel2b.visible = false;

  circleLevel1c.addChild(circleLevel2a, circleLevel2b);

  /////////////////////////////////////////////////////////////////////////////////
  // Level 3

  // Function to create Ellipse containing text outside
  function createEllipseWithTextOutside(
    ellipseTexture,
    x,
    y,
    width,
    height,
    text
  ) {
    // Create a circle
    const circleContainer = new Container();
    circleContainer.x = x;
    circleContainer.y = y;
    circleContainer.width = width;
    circleContainer.height = height;
    circleContainer.pivot.x = circleContainer.width / 2;
    circleContainer.pivot.y = circleContainer.height / 2;
    circleContainer.eventMode = "static";

    const ellipseSprite = new Sprite(ellipseTexture);

    ellipseSprite.anchor.set(0.5);

    // Ellipse's width and height
    ellipseSprite.width = width;
    ellipseSprite.height = height;

    // Add text to the circle
    const textStyle = new TextStyle({
      fontSize: 16.43,
      fill: 0xffffff, // Black text color
      wordWrap: true,
      wordWrapWidth: 250,
      align: "center",
    });

    // Enable the Ellipse to be interactive... this will allow it to respond to mouse and touch events
    circleContainer.eventMode = "static";

    // This button mode will mean the hand cursor appears when you roll over the Ellipse with your mouse
    circleContainer.cursor = "pointer";

    // Setup events for mouse + touch using the pointer events
    // circleContainer.on("pointerdown", onDragStart, circleContainer);
    circleContainer.on("pointerdown", activateNextLevel);

    // Move the sprite to its designated position
    circleContainer.x = x;
    circleContainer.y = y;

    const textObject = new Text(text, textStyle);
    textObject.anchor.set(0.5); // Center the text
    textObject.x = ellipseSprite.x;
    textObject.y = ellipseSprite.y + 140;

    // Add the circle and text to the stage
    ellipseSprite.addChild(textObject);
    circleContainer.addChild(ellipseSprite);
    return circleContainer;
  }

  const level3EllipseTexture = await Assets.load(
    "/images/3rdlevel-circle.webp"
  );
  const circleLevel3a = createEllipseWithTextOutside(
    level3EllipseTexture,
    330,
    -210,
    200,
    200,
    "Develop Human Capital in line with labor market needs"
  );
  const circleLevel3b = createEllipseWithTextOutside(
    level3EllipseTexture,
    400,
    60,
    160,
    160,
    "Ensuring equal access to job opportunities"
  );
  const circleLevel3c = createEllipseWithTextOutside(
    level3EllipseTexture,
    310,
    300,
    180,
    180,
    "Enable job creation through SMEs and Micro-enterprises"
  );
  const circleLevel3d = createEllipseWithTextOutside(
    level3EllipseTexture,
    -50,
    300,
    160,
    160,
    "Attract relevant foreign talents for the economy"
  );
  circleLevel2b.addChild(
    circleLevel3a,
    circleLevel3b,
    circleLevel3c,
    circleLevel3d
  );
  circleLevel3a.visible = false;
  circleLevel3b.visible = false;
  circleLevel3c.visible = false;
  circleLevel3d.visible = false;

  // ====================== Level 3 End ======================
  // ====================== Level 4 Start ======================
  const level4EllipseTexture = await Assets.load("/images/4thlevel-circle.png");
  const circleLevel4a = createEllipseWithTextOutside(
    level4EllipseTexture,
    150,
    -260,
    132.21,
    132.21,
    "Improve readiness of youth to enter the labor market"
  );
  const circleLevel4b = createEllipseWithTextOutside(
    level4EllipseTexture,
    475,
    -30,
    132.21,
    132.21,
    "Increase women participation in the labor market"
  );
  const circleLevel4c = createEllipseWithTextOutside(
    level4EllipseTexture,
    170,
    300,
    132.21,
    132.21,
    "Enable integration of people with disabilities in the labor market"
  );
  circleLevel3b.addChild(circleLevel4a, circleLevel4b, circleLevel4c);
  circleLevel4a.visible = false;
  circleLevel4b.visible = false;
  circleLevel4c.visible = false;

  // ====================== Level 4 End ======================
  // ====================== Level 5 Start======================
  const level5EllipseTexture = await Assets.load("/images/5thlevel-circle.png");
  const circleLevel5a = createEllipseWithTextOutside(
    level5EllipseTexture,
    338.2,
    0,
    200,
    200,
    "National Transformation Program"
  );
  circleLevel4b.addChild(circleLevel5a);
  circleLevel5a.visible = false;
  // ====================== Level 5 End======================
  // ================================
  //=============== Activate Next Level on Click ===============
  let activeLevel = 1;

  // Handle CLick function for circles
  function activateNextLevel(e) {
    e.stopPropagation();
    const target = this;

    if (activeLevel === 1) {
      activateLevel2(target);
    } else if (activeLevel === 2) {
      activateLevel3(target);
    } else if (activeLevel === 3) {
      activateLevel4(target);
    } else if (activeLevel === 4) {
      activateLevel5(target);
    }
  }
  
  function activateLevel2(target) {
    // Hide previous children
    circleLevel1a.visible = false;
    circleLevel1b.visible = false;
    circleLevel1c.visible = false;
    // Show Parent and new children
    target.visible = true;
    circleLevel2a.visible = true;
    circleLevel2b.visible = true;

    activeLevel = 2;
    gsap.to(target, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      duration: 1,
    });
    gsap.to(centerImageSprite, { x: -400, y: 300 , duration: 1 });
    viewport.animate({scale: 1.2});
  }

  function activateLevel3(target) {
    // Hide previous children
    circleLevel2a.visible = false;
    circleLevel2b.visible = false;
    // Show Parent and new children
    target.visible = true;
    circleLevel3a.visible = true;
    circleLevel3b.visible = true;
    circleLevel3c.visible = true;
    circleLevel3d.visible = true;
    activeLevel = 3;
    gsap.to(target, { x: 410, y: -310, duration: 1 });
    gsap.to(circleLevel1c, { x: 555, y: 865, duration: 1 });
    gsap.to(centerImageSprite, { x: -800, y: 600, duration: 1 });
    viewport.animate({scale: 1.3});
  }
  function activateLevel4(target) {
    // Hide previous children
    circleLevel3a.visible = false;
    circleLevel3b.visible = false;
    circleLevel3c.visible = false;
    circleLevel3d.visible = false;
    // Show Parent and new children
    target.visible = true;
    circleLevel4a.visible = true;
    circleLevel4b.visible = true;
    circleLevel4c.visible = true;
    activeLevel = 4;
    gsap.to(target, { x: 410, y: -280, duration: 1 });
    gsap.to(circleLevel1c, { x: 155, y: 1165, duration: 1 });
    gsap.to(centerImageSprite, { x: -1200, y: 900, duration: 1 });
    viewport.animate({scale: 1.4});

  }
  function activateLevel5(target) {
    // Show Parent and new children
    circleLevel4a.visible = false;
    circleLevel4b.visible = false;
    circleLevel4c.visible = false;
    // Show Parent and new children
    target.visible = true;
    circleLevel5a.visible = true;
    activeLevel = 5;
    gsap.to(target, { x: 550, y: -340, duration: 1 });
    gsap.to(circleLevel1c, { x: -355, y: 1465, duration: 1 });
    gsap.to(centerImageSprite, { x: -1600, y: 1200, duration: 1 });
    viewport.animate({scale: 1.5});
  }
  //=============== Activate Next Level on Click END ===============
})();
