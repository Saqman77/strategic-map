import { Assets, Application, Graphics, Container, TextStyle, Text, Texture, Sprite } from "pixi.js";

(async () => {
  // const Application = PIXI.Application;
  const app = new Application();
  await app.init({ backgroundColor: 0x23395d, resizeTo: window, antialias: true });

  // Append the application canvas to the document body
  document.body.appendChild(app.canvas);


  //   WE use absolute for complete window for not occur scrolldown
  app.canvas.style.position = "absolute";
  app.canvas.style.top = 0;
  app.canvas.style.left = 0;

  // Create a texture from the image file
  await Assets.load(['/public/images/bg_pattern2.png', '/public/images/Center.webp', '/public/images/Vignette.webp']);

const bgPattern_text = Texture.from("/public/images/bg_pattern2.png");
const bgPattern = new Sprite(bgPattern_text);
bgPattern.width = window.innerWidth;
bgPattern.height = window.innerHeight;
app.stage.addChild(bgPattern);

// Create a texture from the image file
const texture = Texture.from("/public/images/Center.webp");

// Create a sprite using the texture
const sprite = new Sprite(texture);

// Center the sprite
sprite.anchor.set(0.5, 0.5);
sprite.position.x = app.screen.width / 2; // Set X position to the center of the stage
sprite.position.y = app.screen.height / 2;
sprite.width = 706.03;
sprite.height = 606.03;
app.stage.addChild(sprite);

const bgVignette_text = Texture.from("/public/images/Vignette.webp");
// Create a sprite using the texture
const bgVignette = new Sprite(bgVignette_text);
bgVignette.width = window.innerWidth;
bgVignette.height = window.innerHeight;
app.stage.addChild(bgVignette);

  const stage = new Container();
app.stage.addChild(stage);

function createCircle(x, y, radius, text) {
  // Create a circle
  const circle = new Graphics();
  circle
    .lineStyle(1, 0x000000)
    .beginFill(0xffffff) // White fill color
    .drawCircle(0, 0, radius)
    .endFill();

  // Set the circle position
  circle.x = x;
  circle.y = y;

  // Add text to the circle
  const textStyle = new TextStyle({
    fontSize: 16,
    fill: 0x000000, // Black text color
    wordWrap: true,
    wordWrapWidth: radius * 2, // Wrap text within the circle
    align: "center",
  });

  const textObject = new Text(text, textStyle);
  textObject.anchor.set(0.5); // Center the text

  // Add the circle and text to the stage
  circle.addChild(textObject);
  stage.addChild(circle);
}
//  
// Create three circles with text at different positions
createCircle(527, 124,117.385, "A vibrant society");
createCircle(956, 220, 117.385 , "A thriving economy");
createCircle(536, 400, 117.385, "An ambitious nation");



  //  shapes are store in PIXI.Graphics
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