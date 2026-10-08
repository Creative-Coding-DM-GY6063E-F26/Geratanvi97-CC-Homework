
/*
  AFTERIMAGE / 02
  Moire Pattern Version 2

  Two layers of wavy circles overlap
  to create an optical illusion.
*/


// VARIABLES

let ringCount = 30;
let ringSpacing = 8;

let waveSize = 10;
let waveCount = 5;

let rotation = 6;

let blueColor = "#2E61A5";
let redColor = "#B84B4A";


// SETUP

function setup() {
  createCanvas(700, 700);
  angleMode(DEGREES);
  noLoop();
}


// DRAW

function draw() {
  background(255);

  // First layer - blue
  drawRings(blueColor, 0);

  // Second layer - red, slightly rotated
  drawRings(redColor, rotation);
}


// MY CUSTOM FUNCTION

function drawRings(penColor, turn) {

  push();

  translate(width / 2, height / 2);
  rotate(turn);

  noFill();
  stroke(penColor);
  strokeWeight(0.8);

  // Draw 30 rings
  for (let i = 0; i < ringCount; i++) {

    let radius = 35 + i * ringSpacing;

    beginShape();

    // Draw each ring using small points
    for (let a = 0; a <= 360; a += 3) {

      // Make the circle slightly wavy
      let wave = sin(a * waveCount) * waveSize;

      let x = cos(a) * (radius + wave);
      let y = sin(a) * (radius + wave);

      vertex(x, y);
    }

    endShape(CLOSE);
  }

  pop();
}
