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
  document.body.appendChild(app.canvas);
  const containerWidth = window.innerWidth; // Width of the container
  const margin = 522; // Right side margin in Figma

  // Calculate the x position of the element within the container
  const elementX = containerWidth - margin;

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
    { x: elementX, y: 175 },
    { width: 200, height: 200 }
  );

  const text = new Text("Develop Human Capital in line with labor market needs", {
    fontFamily: "Arial",
    fontSize: 20,
    fill: 0xffffff,
    wordWrap: true,
    wordWrapWidth: 250,
  });
  app.stage.addChild(text);
})();
