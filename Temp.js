const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xaaaaaa,
});

document.body.appendChild(app.view);

const stage = new PIXI.Container();
app.stage.addChild(stage);

function createCircle(x, y, radius, text) {
  // Create a circle
  const circle = new PIXI.Graphics();
  circle
    .lineStyle(1, 0x000000)
    .beginFill(0xffffff) // White fill color
    .drawCircle(0, 0, radius)
    .endFill();

  // Set the circle position
  circle.x = x;
  circle.y = y;

  // Add text to the circle
  const textStyle = new PIXI.TextStyle({
    fontSize: 16,
    fill: 0x000000, // Black text color
    wordWrap: true,
    wordWrapWidth: radius * 2, // Wrap text within the circle
    align: "center",
  });

  const textObject = new PIXI.Text(text, textStyle);
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
