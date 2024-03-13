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
  document.body.appendChild(app.canvas);

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

  const defaultSprite1 = await createSprite(
    "./images/StateDefault.webp",
    { x: app.screen.width / 2, y: app.screen.height / 3 },
    { width: 200, height: 200 }
  );

  const hoverSprite = await createSprite(
    "./images/StateHover.webp",
    { x: app.screen.width / 2, y: app.screen.height / 3 + spriteHeight + 20 }, // Add space of 20 pixels
    { width: 200, height: 200 }
  );

  const brokenEclipSprite = await createSprite(
    "./images/BrokenEclipse.webp",
    {
      x: app.screen.width / 2,
      y: app.screen.height / 3 + (spriteHeight + 20) * 2.08,
    }, // Add space of 20 pixels
    { width: 200, height: 200 }
  );
})();
