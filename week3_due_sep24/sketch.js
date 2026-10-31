let circleX = 170;
let circleY = 180;
let circleSize = 45;

let triangleX = 390;
let triangleY = 230;
let triangleSize = 35;
let triangleAngle = 0;

let lineX = 300;
let lineY = 380;
let lineAngle = 0;

let circleColor;
let triangleColor;
let lineColor;

function setup() {
  let canvas = createCanvas(600, 600);

  // this makes sure clicking the canvas changes the drawing
  canvas.mousePressed(changeComposition);

  circleColor = color(255, 180, 0);
  triangleColor = color(255, 70, 70);
  lineColor = color(0, 150, 160);
}

function draw() {
  background(242);

  // frame
  noFill();
  stroke(30);
  strokeWeight(2);
  rect(40, 40, 520, 520);


  // background line 1
  stroke(60);
  strokeWeight(1);

  line(
    90,
    330,
    500,
    250
  );


  // background line 2
  line(
    130,
    430,
    480,
    350
  );


  // MAIN CIRCLE
  push();

  translate(circleX, circleY);

  noStroke();
  fill(circleColor);

  circle(
    0,
    0,
    circleSize
  );

  pop();


  // SMALL CIRCLE
  noStroke();
  fill(0, 90, 220);

  circle(
    330,
    310,
    18
  );


  // MAIN TRIANGLE
  push();

  translate(triangleX, triangleY);
  rotate(triangleAngle);

  noStroke();
  fill(triangleColor);

  triangle(
    -triangleSize,
    triangleSize,

    triangleSize,
    triangleSize,

    0,
    -triangleSize
  );

  pop();


  // SMALL TRIANGLE
  noStroke();
  fill(255, 120, 0);

  triangle(
    180,
    360,

    215,
    360,

    198,
    325
  );


  // MAIN MOVING LINE
  push();

  translate(lineX, lineY);
  rotate(lineAngle);

  stroke(lineColor);
  strokeWeight(4);

  line(
    -160,
    0,

    160,
    0
  );

  pop();


  // crossing line
  stroke(255, 60, 80);
  strokeWeight(3);

  line(
    140,
    420,

    430,
    300
  );


  // small dots
  noStroke();
  fill(20);

  circle(220, 400, 8);
  circle(260, 390, 6);
  circle(410, 420, 7);


  // instruction
  fill(50);
  textSize(13);

  text(
    "click inside the square",
    45,
    580
  );
}


// THIS FUNCTION RUNS WHEN YOU CLICK
function changeComposition() {

  // move circle
  circleX = random(100, 500);
  circleY = random(100, 430);

  // change circle size
  circleSize = random(25, 75);


  // move triangle
  triangleX = random(120, 480);
  triangleY = random(130, 450);

  // rotate triangle
  triangleAngle = random(-1, 1);

  // change triangle size
  triangleSize = random(25, 55);


  // move line
  lineX = random(170, 430);
  lineY = random(260, 480);

  // rotate line
  lineAngle = random(-0.8, 0.8);


  // change circle color
  circleColor = color(
    random(100, 255),
    random(80, 220),
    random(0, 100)
  );


  // change triangle color
  triangleColor = color(
    random(180, 255),
    random(30, 150),
    random(20, 120)
  );


  // change line color
  lineColor = color(
    random(0, 80),
    random(100, 200),
    random(150, 255)
  );
}