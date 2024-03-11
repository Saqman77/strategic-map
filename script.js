const app = new PIXI.Application({
  backgroundColor: 0x1f2041,
});
// app.view itself canva h style css ki property h ap jo use kro
app.renderer.resize(window.innerWidth, window.innerHeight);
app.view.style.position = "absolute";
document.body.appendChild(app.view);
// Create a texture from the image file
const bgPattern_text = PIXI.Texture.from("bg_pattern2.png");
const bgPattern = new PIXI.Sprite(bgPattern_text);
bgPattern.width = window.innerWidth;
bgPattern.height = window.innerHeight;
app.stage.addChild(bgPattern);

// Create a texture from the image file
const texture = PIXI.Texture.from("Center.webp");

// Create a sprite using the texture
const sprite = new PIXI.Sprite(texture);

// Center the sprite
sprite.anchor.set(0.5, 0.5);
sprite.position.x = app.screen.width / 2; // Set X position to the center of the stage
sprite.position.y = app.screen.height / 2;
sprite.width = 706.03;
sprite.height = 606.03;
app.stage.addChild(sprite);

const bgVignette_text = PIXI.Texture.from("Vignette.webp");
// Create a sprite using the texture
const bgVignette = new PIXI.Sprite(bgVignette_text);
bgVignette.width = window.innerWidth;
bgVignette.height = window.innerHeight;
app.stage.addChild(bgVignette);
