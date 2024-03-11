const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x23395d,
});

document.body.appendChild(app.view);
// Load the first image
const imageTexture1 = PIXI.Texture.from("./images/buttonminus.png"); // Replace with the path to your first image
const imageSprite1 = new PIXI.Sprite(imageTexture1);
imageSprite1.x = 62;
imageSprite1.y = 500;
imageSprite1.anchor.set(0.5);
app.stage.addChild(imageSprite1);

// Load the second image
const imageTexture2 = PIXI.Texture.from("./images/buttonplus.png"); // Replace with the path to your second image
const imageSprite2 = new PIXI.Sprite(imageTexture2);
imageSprite2.x = 130;
imageSprite2.y = 500;
imageSprite2.anchor.set(0.5);
app.stage.addChild(imageSprite2);
