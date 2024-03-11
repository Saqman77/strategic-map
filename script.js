const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xbfefff,
});
// app.view itself canva h style css ki property h ap jo use kro
document.body.appendChild(app.view);

// / Create a container for the circle and text
const circleContainer = new PIXI.Container();
app.stage.addChild(circleContainer);

// Create a circle
const circle = new PIXI.Graphics();
circle.beginFill(0xffb6c1); // Set the fill color (red in this case)
circle.drawCircle(527, 124, 90); // x, y, radius
circle.endFill();

// Add the circle to the container
circleContainer.addChild(circle);

// Create text
const text = new PIXI.Text("A Vibrant Society", {
  fontFamily: "Arial",
  fontSize: 16,
  fill: 0xffffff, // Set the text color to white
});

// Set the text position
text.position.set(470, 120);

// Add text to the container
circleContainer.addChild(text);
