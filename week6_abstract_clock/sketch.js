
/*
  TIME GARDEN
  An Interactive Abstract Clock

  Hours = background
  Minutes = flower size
  Seconds = movement

  Mouse = glowing light
  Click = plant a new flower
*/

let flowers = [];

function setup() {
  createCanvas(700, 600);
  angleMode(DEGREES);
}

function draw() {

  let h = hour();
  let m = minute();
  let s = second();

  // 1. Background changes with hours

  if (h >= 6 && h < 18) {
    background(247, 219, 209);
  } else {
    background(35, 37, 72);
  }

  // 2. Minutes control flower size

  let flowerSize = map(m, 0, 59, 40, 100);

  // 3. Seconds control petal rotation

  let turn = s * 6;

  // Draw the main flower
  drawFlower(width / 2, height / 2, flowerSize, turn);

  // Draw flowers added by mouse clicks
  for (let i = 0; i < flowers.length; i++) {

    drawFlower(
      flowers[i].x,
      flowers[i].y,
      flowerSize * 0.5,
      turn + i * 15
    );
  }

  // Glowing mouse light
  noStroke();

  fill(255, 240, 180, 30);
  circle(mouseX, mouseY, 90);

  fill(255, 240, 180, 80);
  circle(mouseX, mouseY, 45);

  fill(255, 250, 220);
  circle(mouseX, mouseY, 12);

  // Instructions
  fill(h >= 6 && h < 18 ? 70 : 255);
  textAlign(CENTER);
  textSize(16);
  text("TIME GARDEN", width / 2, 40);
  textSize(12);
  text("Move your mouse · Click to grow flowers", width / 2, 570);
}


// CUSTOM FUNCTION: DRAW FLOWER

function drawFlower(x, y, size, turn) {

  push();
  translate(x, y);
  rotate(turn);

  noStroke();

  for (let i = 0; i < 10; i++) {

    rotate(36);

    fill(230, 140, 175, 170);
    ellipse(0, -size / 2, size / 3, size);
  }

  fill(255, 215, 125);
  circle(0, 0, size / 2);

  pop();
}


// MOUSE INTERACTION

function mousePressed() {

  if (mouseX >= 0 && mouseX <= width &&
      mouseY >= 0 && mouseY <= height) {

    flowers.push({
      x: mouseX,
      y: mouseY
    });
  }
}
