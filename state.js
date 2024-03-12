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

  // Call the function to create images with text

  async function createImagesWithText() {
    const loadImage = async (path, x, y, labelText, fontSize, fontWeight) => {
      const texture = await Assets.load(path);
      const sprite = new Sprite(texture);
      sprite.x = x;
      sprite.y = y;
      sprite.anchor.set(0.5);

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

    const SpriteVectdefult = await loadImage(
      "./images/Vectordefault.png",
      521.04,
      205,
      "",
      14,
      500
    );
    const SpriteEllipdefult = await loadImage(
      "./images/Ellipsedefault.png",
      521.04,
      205,
      "A vibrant \n  society",
      14,
      500
    );
    const SpriteVecthover = await loadImage(
      "./images/Vectorhover.png",
      521.04,
      425,
      "",
      8,
      500
    );
    const SpriteElliphover = await loadImage(
      "./images/Ellipsehover.png",
      521.04,
      425,
      "A vibrant society",
      8,
      500
    );
    const SpriteVectpressed = await loadImage(
      "./images/VectorPressed.png",
      521.04,
      645,
      "",
      8,
      500
    );
    const SpriteEllippreesed = await loadImage(
      "./images/EllipsePressed.png",
      521.04,
      645,
      "A vibrant society",
      8,
      500
    );

    app.stage.addChild(
      SpriteVectdefult,
      SpriteEllipdefult,
      SpriteVecthover,
      SpriteElliphover,
      SpriteVectpressed,
      SpriteEllippreesed
    );
  }

  createImagesWithText();
})();
