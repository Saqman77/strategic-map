const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1f2041,
});
app.view.style.position = "absolute";
document.body.appendChild(app.view);

// Create a new PIXI.Text object
const text1 = new PIXI.Text("Strategic Objectives", {
  fontFamily: "Arial",
  fontSize: 45,
  fill: 0xffffff,
  wordWrap: true,
  wordWrapWidth: 300,
});
text1.x = 76;
text1.y = 196;
app.stage.addChild(text1);

const text3 = new PIXI.Text(
  "The vision was cascaded into strategic objectives to enable effective implementation through vision  realization programs.",
  {
    fontFamily: "Arial",
    fontSize: 20,
    fill: 0xffffff,
    wordWrap: true,
    wordWrapWidth: 430,
  }
);
text3.x = 76;
text3.y = 300;
app.stage.addChild(text3);

function createText(content, fontFamily, fontSize, fill, x, y) {
  const text = new PIXI.Text(content, {
    fontFamily: fontFamily,
    fontSize: fontSize,
    fill: fill,
  });
  text.x = x;
  text.y = y;
  return text;
}

// Usage example:
const text4 = createText(
  "6       Overarching Objectives",
  "Arial",
  15,
  0xffffff,
  window.innerWidth - 300,
  196
);
app.stage.addChild(text4);

const line = new PIXI.Graphics();
line.lineStyle(1, 0xffffff, 0.4); // Set line style: thickness and color
line.moveTo(window.innerWidth - 300, 196); // Move to the end of text1
line.lineTo(window.innerWidth - 120, 196); // Draw a line to the start of text2
line.y = 30;
app.stage.addChild(line);

const text5 = createText(
  "27           Branch   Objectives",
  "Arial",
  15,
  0xffffff,
  window.innerWidth - 300,
  236
);
app.stage.addChild(text5);
const line1 = new PIXI.Graphics();
line1.lineStyle(1, 0xffffff, 0.4); // Set line style: thickness and color
line1.moveTo(window.innerWidth - 300, 196); // Move to the end of text1
line1.lineTo(window.innerWidth - 120, 196); // Draw a line to the start of text2
line1.y = 70;
app.stage.addChild(line1);
const text6 = createText(
  "96          Strategic Objectives",
  "Arial",
  15,
  0xffffff,
  window.innerWidth - 300,
  276
);
app.stage.addChild(text6);
