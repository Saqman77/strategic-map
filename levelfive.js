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
  const app = new Application();
  await app.init({
    backgroundColor: 0x23395d,
    resizeTo: window,
    antialias: true,
  });
  document.body.appendChild(app.canvas);
  // level five cricle opecity and images
  async function createCircle(
    x,
    y,
    radius,
    innerImagePath,
    ellipseImagePath = null,
    innerWidth = 100,
    innerHeight = 100
  ) {
    const circle = new Graphics();
    circle.circle(x, y, radius).fill(0xffffff, 0.1);

    const innerImage = await Assets.load(innerImagePath);
    const spriteInner = new Sprite(innerImage);
    spriteInner.x = x;
    spriteInner.y = y;
    spriteInner.anchor.set(0.5);
    spriteInner.width = innerWidth; // Set the desired width
    spriteInner.height = innerHeight; // Set the desired height

    if (ellipseImagePath) {
      const ellipseImage = await Assets.load(ellipseImagePath);
      const spriteEllipse = new Sprite(ellipseImage);
      spriteEllipse.x = x;
      spriteEllipse.y = y;
      spriteEllipse.anchor.set(0.5);
      spriteEllipse.width = 150; // Set the desired width
      spriteEllipse.height = 150; // Set the desired height

      return { circle, spriteInner, spriteEllipse };
    }

    return { circle, spriteInner };
  }

  async function levelFiveCicrle() {
    const circlesData = [
      {
        x: 1533,
        y: 205,
        radius: 80,
        innerImagePath: "./images/defaultinner.png",
        innerWidth: 120,
        innerHeight: 120,
      },
      {
        x: 1533,
        y: 425,
        radius: 55,
        innerImagePath: "./images/defaultinner.png",
        ellipseImagePath: "./images/Ellipselevelfive.png",
        innerWidth: 70,
        innerHeight: 70,
      },
      {
        x: 1533,
        y: 645,
        radius: 55,
        innerImagePath: "./images/defaultinner.png",
        ellipseImagePath: "./images/Ellipselevelfive.png",
        innerWidth: 70,
        innerHeight: 70,
      },
    ];

    const sprites = circlesData.map(
      async (data) =>
        await createCircle(
          data.x,
          data.y,
          data.radius,
          data.innerImagePath,
          data.ellipseImagePath,
          data.innerWidth,
          data.innerHeight
        )
    );

    const levelFiveSprites = await Promise.all(sprites);

    // Add all the circles and images to the stage
    app.stage.addChild(
      ...levelFiveSprites.flatMap(({ circle, spriteInner, spriteEllipse }) =>
        spriteEllipse
          ? [circle, spriteInner, spriteEllipse]
          : [circle, spriteInner]
      )
    );
  }

  levelFiveCicrle();
})();
