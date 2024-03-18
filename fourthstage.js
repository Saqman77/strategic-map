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
  const app = new Application({
    backgroundColor: 0x1f2041,
    resizeTo: window,
    antialias: true,
  });
  document.body.appendChild(app.view);

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

  const image1_4thstage = await createSprite(
    "./images/4level_img1.webp",
    { x: app.screen.width / 2, y: app.screen.height / 3 },
    { width: 200, height: 200 }
  );
  const polygan15 = await createSprite(
    //4level_img1_polygon1.webp
    "./images/4level_img1_polygon1.webp",
    { x: app.screen.width / 2, y: app.screen.height / 3 },
    { width: 52, height: 52 }
  );
  const polygan16 = await createSprite(
    //4level_img1_polygon2.webp
    "./images/4level_img1_polygon2.webp",
    { x: app.screen.width / 2, y: app.screen.height / 3 },
    { width: 21, height: 21 }
  );
  const image2_4thstage = await createSprite(
    "./images/4level_img2.webp",
    { x: app.screen.width / 2, y: app.screen.height / 3 + spriteHeight + 20 }, // Add space of 20 pixels
    { width: 200, height: 200 }
  );
  const polygan17 = await createSprite(
    "./images/4level_img1_polygon1.webp",
    { x: app.screen.width / 2, y: app.screen.height / 3 + spriteHeight + 20 }, // Add space of 20 pixels
    { width: 52, height: 52 }
  );
  const polygan18 = await createSprite(
    "./images/4level_img1_polygon2.webp",
    { x: app.screen.width / 2, y: app.screen.height / 3 + spriteHeight + 20 }, // Add space of 20 pixels
    { width: 21, height: 21 }
  );

  const image3_4thstage  = await createSprite(
    "./images/4level_img3.webp",
    {
      x: app.screen.width / 2,
      y: app.screen.height / 3 + (spriteHeight + 20) * 2.08,
    }, // Add space of 20 pixels
    { width: 200, height: 200 }
  );
  const polygan19 = await createSprite(
    "./images/4level_img1_polygon1.webp",
    {
      x: app.screen.width / 2,
      y: app.screen.height / 3 + (spriteHeight + 20) * 2.08,
    }, // Add space of 20 pixels
    { width: 52, height: 52 }
  );
  const polygan20 = await createSprite(
    "./images/4level_img1_polygon2.webp",
    {
      x: app.screen.width / 2,
      y: app.screen.height / 3 + (spriteHeight + 20) * 2.08,
    }, // Add space of 20 pixels
    { width: 21, height: 21 }
  );
})();
