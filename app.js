import { Application, Graphics } from "pixi.js";

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


  //  shapes are store in PIXI.Graphics
  // const Graphics = Graphics;
  const rectangle = new Graphics();
  const circle = new Graphics();

  rectangle
  .setStrokeStyle(2, 0x000000)
  .rect(200, 200, 100, 120)
  .fill(0xaa33bb);
  app.stage.addChild(rectangle);

  circle
    .setStrokeStyle(2, 0x2bdb8a)
    .circle(200, 400, 50)
    .fill(0x464646);

  app.stage.addChild(circle);
})();