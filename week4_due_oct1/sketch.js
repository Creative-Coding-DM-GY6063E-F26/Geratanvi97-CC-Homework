let spacing = 12;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
}

function draw() {
  background(255);
  noFill();
  strokeWeight(1);

  // blue wave layer
  stroke(40, 90, 180);

  for (let x = 60; x < 540; x += spacing) {

    beginShape();

    for (let y = 60; y < 540; y += 8) {
      let wave = sin(y * 2) * 12;
      vertex(x + wave, y);
    }

    endShape();
  }

  // red rotated wave layer
  push();

  translate(width / 2, height / 2);
  rotate(8);

  stroke(210, 60, 70);

  for (let x = -240; x < 240; x += spacing) {

    beginShape();

    for (let y = -240; y < 240; y += 8) {
      let wave = sin(y * 2) * 12;
      vertex(x + wave, y);
    }

    endShape();
  }

  pop();
}