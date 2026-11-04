
let vid;
let handPose;
let hands = [];

// Flower colors
let colors = ['pink', 'plum', 'coral', 'lightblue'];
let colorIndex = 0;

// Last flower position
let lastX = -100;
let lastY = -100;

// Load hand tracking
function preload() {
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Start camera
  vid = createCapture(VIDEO);
  //KEVINS ADDITION, replace the above line 
  // vid = createCapture(VIDEO, { flipped: true });// this flips the mirror for webcams
  vid.size(320, 240);
  vid.hide();

  // Start hand detection
  handPose.detectStart(vid, gotHands);

  clearDrawing();
}

function draw() {

  // Check if a hand is detected
  if (hands.length > 0) {
    let hand = hands[0];
   
    // Finger positions
    let finger = hand.keypoints[8];
    let thumb = hand.keypoints[4];
    let pinky = hand.keypoints[20];
    //KEVINS ADDITION
    //let indexFinger = hand.index_finger_tip;//directly access the index finger
    
    // Reverse X to fix mirror movement
    let x = map(finger.x, 0, 320, width, 0);
    let y = map(finger.y, 0, 240, 0, height);

    // Distance between thumb and pinky
    let fingerDistance = dist(
      thumb.x, thumb.y,
      pinky.x, pinky.y
    );

    // Change flower size with hand opening
    let flowerSize = map(fingerDistance, 30, 180, 12, 30);
    flowerSize = constrain(flowerSize, 12, 30);

    // Distance from last flower
    let moveDistance = dist(x, y, lastX, lastY);

    // Draw flowers when finger moves
    if (moveDistance > 40) {
      drawFlower(x, y, flowerSize);

      lastX = x;
      lastY = y;
    }
  } else {
    // Reset when no hand is detected
    lastX = -100;
    lastY = -100;
  }

  // Draw camera preview and status
  drawCameraPreview();
}

// Pixelated flower
function drawFlower(x, y, size) {
  noStroke();

  // Stem
  fill('seagreen');
  rect(x - 4, y + size, 8, size * 2);

  // Leaves
  fill('mediumseagreen');
  rect(x - size, y + size * 2, size, 10);
  rect(x, y + size * 1.5, size, 10);

  // Petals
  fill(colors[colorIndex]);
  
  ////KEVINS ADDITION, consider consolidating repeated code as a final polish 
  //let _x_left = x-size / 2;
  // Top petal
  rect(x-size / 2, y - size * 2, size, size * 1.5);

  // Bottom petal
  rect(x-size / 2, y + size / 2, size, size);

  // Left petal
  rect(x - size * 2, y - size / 2, size * 1.5, size);

  // Right petal
  rect(x + size / 2, y - size / 2, size * 1.5, size);

  // Center
  fill('gold');
  rect(x - size / 2, y - size / 2, size, size);

  fill('orange');
  rect(x - 3, y - 3, 6, 6);
}

// Camera preview
function drawCameraPreview() {
  // Cover previous preview
  noStroke();
  fill('papayawhip');
  rect(10, height - 155, 190, 155);

  // Display camera, mirrored to match movement
  push();
  translate(180, 0);
  scale(-1, 1);
  image(vid, 10, height - 145, 160, 120);
  pop();

  // Hand detection status
  fill('black');
  textSize(12);
  textAlign(LEFT);

  if (hands.length > 0) {
    text('Hand detected', 10, height - 10);
  } else {
    text('Show your hand to camera', 10, height - 10);
  }
}

// Receive hand data
function gotHands(results) {
  hands = results;
}

// Clear drawing
function clearDrawing() {
  background('papayawhip');

  fill('black');
  textAlign(CENTER);
  textSize(22);
  text('PIXEL BLOOM', width / 2, 40);

  textSize(14);
  text('Move your index finger to plant flowers', width / 2, 65);
  text('Open your hand to change flower size', width / 2, 85);
  text('K = color | SPACE = clear | S = save', width / 2, 105);

  lastX = -100;
  lastY = -100;
}

// Keyboard controls
//KEVINS SUGGESTION: use keyboard for exporting, saving and clearing interactions, but everything else
//use gesture control
function keyPressed() {
  if (key === 'k') {
    colorIndex = (colorIndex + 1) % colors.length;
  }

  if (keyCode === 32) {
    clearDrawing();
    return false;
  }

  if (key === 's') {
    saveCanvas('pixel-bloom', 'png');
    //KEVINS ADDITION
    //either do this with millis() or the javascript Date() object
    //saveCanvas('pixel-bloom_'+new Date().UTC(), 'png');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  clearDrawing();
}
