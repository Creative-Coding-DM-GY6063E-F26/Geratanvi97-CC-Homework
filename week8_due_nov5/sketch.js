
let vid;
let handPose;
let hands = [];

// Gesture settings
let isPinching = false;
let pinchFrames = 0;
let releaseFrames = 0;

// Tree movement
let bloomAmount = 0;
let targetBloom = 0;

let sideBias = 0;
let targetSideBias = 0;

// Wave detection
let previousX = null;
let waveCooldown = 0;

// Freeze the drawing
let frozen = false;

// Color themes
let themeIndex = 0;

let themes = [
  {
    name: 'Cherry Blossom',
    bg: '#14171C',
    trunk: '#765B4D',
    branch: '#B78C91',
    blossom: '#E7AFC2',
    highlight: '#F8DDE5'
  },
  {
    name: 'Winter Blue',
    bg: '#101923',
    trunk: '#536C7C',
    branch: '#86AFC2',
    blossom: '#B5D9E9',
    highlight: '#E2F3FA'
  },
  {
    name: 'Golden Hour',
    bg: '#201A17',
    trunk: '#805C40',
    branch: '#BE9268',
    blossom: '#E8B76F',
    highlight: '#F9DEAC'
  },
  {
    name: 'Lavender Night',
    bg: '#191620',
    trunk: '#67586F',
    branch: '#A68BAE',
    blossom: '#C7ACD8',
    highlight: '#EBDAF2'
  }
];

// Load ml5 HandPose
function preload() {
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  // Start webcam
  vid = createCapture(VIDEO);
  vid.size(320, 240);
  vid.hide();

  // Start hand tracking
  handPose.detectStart(vid, gotHands);
}

function draw() {
  background(themes[themeIndex].bg);

  // Read hand gestures
  if (!frozen) {
    detectGestures();

    // Smooth tree movement
    bloomAmount = lerp(bloomAmount, targetBloom, 0.06);
    sideBias = lerp(sideBias, targetSideBias, 0.08);
  }

  drawTree();
  drawUI();

  if (waveCooldown > 0) {
    waveCooldown--;
  }
}

// Detect pinching and waving
function detectGestures() {

  if (hands.length > 0) {
    let hand = hands[0];

    let thumb = hand.keypoints[4];
    let index = hand.keypoints[8];
    let wrist = hand.keypoints[0];
    let middle = hand.keypoints[9];

    // PINCH DETECTION
    let pinchDistance = dist(
      thumb.x, thumb.y,
      index.x, index.y
    );

    // Measure the hand for better detection
    let handSize = dist(
      wrist.x, wrist.y,
      middle.x, middle.y
    );

    let pinchRatio = pinchDistance / max(handSize, 1);

    if (pinchRatio < 0.35) {
      pinchFrames++;
      releaseFrames = 0;
    } else if (pinchRatio > 0.55) {
      releaseFrames++;
      pinchFrames = 0;
    }

    if (pinchFrames >= 3) {
      isPinching = true;
    }

    if (releaseFrames >= 3) {
      isPinching = false;
    }

    // Pinching opens the tree
    if (isPinching) {
      targetBloom = 1;
    } else {
      targetBloom = 0;
    }

    // WAVE DETECTION
    // Track the wrist instead of the fingertip
    // to avoid confusing pinching with waving

    let currentX = width - map(
      wrist.x, 0, 320, 0, width
    );

    if (previousX !== null && waveCooldown === 0 && !isPinching) {
      let movement = currentX - previousX;

      if (movement > 25) {
        targetSideBias = 1;
        waveCooldown = 20;
      }

      if (movement < -25) {
        targetSideBias = -1;
        waveCooldown = 20;
      }
    }

    previousX = currentX;

  } else {
    // No hand detected
    isPinching = false;
    pinchFrames = 0;
    releaseFrames = 0;
    targetBloom = 0;
    previousX = null;
  }
}

// Draw the tree
function drawTree() {
  push();

  // Tree starts at bottom center
  translate(width / 2, height - 40);

  // Main trunk
  stroke(themes[themeIndex].trunk);
  strokeWeight(10);

  line(0, 0, 0, -140);
  translate(0, -140);

  // Pinching controls branch spread
  let spread = map(bloomAmount, 0, 1, 12, 42);

  // Waving changes branching direction
  let leftAngle = spread - sideBias * 12;
  let rightAngle = spread + sideBias * 12;

  branch(140, 0, leftAngle, rightAngle);

  pop();
}

// Recursive branches
function branch(len, level, leftAngle, rightAngle) {

  // Each branch gets shorter
  let newLen = len * 0.68;

  // Draw blossom at the end
  if (newLen < 7) {
    drawBlossom();
    return;
  }

  // Make branches thinner as they grow
  stroke(themes[themeIndex].branch);

  let thickness = map(len, 7, 140, 1, 7);
  strokeWeight(thickness);

  // Right branch
  push();

  rotate(rightAngle);
  line(0, 0, 0, -newLen);
  translate(0, -newLen);

  branch(newLen, level + 1, leftAngle, rightAngle);

  pop();

  // Left branch
  push();

  rotate(-leftAngle);
  line(0, 0, 0, -newLen);
  translate(0, -newLen);

  branch(newLen, level + 1, leftAngle, rightAngle);

  pop();
}

// Blossoms at branch tips
function drawBlossom() {
  noStroke();

  // Blossoms grow during pinch
  let blossomSize = map(bloomAmount, 0, 1, 2, 9);

  fill(themes[themeIndex].blossom);
  circle(0, 0, blossomSize);

  fill(themes[themeIndex].highlight);
  circle(-2, -2, blossomSize * 0.5);
}

// Interface
function drawUI() {
  noStroke();
  fill('#F1ECE8');
  textAlign(CENTER);

  textSize(26);
  text('BLOOM TREE', width / 2, 42);

  textSize(14);
  text('Pinch to bloom | Wave to change direction',
       width / 2, 68);

  text('P = Pink   B = Blue   G = Gold   L = Lavender',
       width / 2, 90);

  text('C = Cycle   F = Freeze   S = Save   R = Reset',
       width / 2, 110);

  textSize(13);

  // Current color theme
  text(themes[themeIndex].name,
       width / 2, 140);

  // Hand detection status
  if (frozen) {
    text('Composition frozen', width / 2, height - 25);
  } else if (hands.length === 0) {
    text('Show your hand to the camera', width / 2, height - 25);
  } else if (isPinching) {
    text('Pinch detected - Tree blooming',
         width / 2, height - 25);
  } else {
    text('Hand detected', width / 2, height - 25);
  }
}

// Receive hand tracking results
function gotHands(results) {
  hands = results;
}

// Keyboard controls
function keyPressed() {

  // Pink
  if (key === 'p' || key === 'P') {
    themeIndex = 0;
  }

  // Blue
  if (key === 'b' || key === 'B') {
    themeIndex = 1;
  }

  // Gold
  if (key === 'g' || key === 'G') {
    themeIndex = 2;
  }

  // Lavender
  if (key === 'l' || key === 'L') {
    themeIndex = 3;
  }

  // Cycle themes
  if (key === 'c' || key === 'C') {
    themeIndex = (themeIndex + 1) % themes.length;
  }

  // Freeze the tree
  if (key === 'f' || key === 'F') {
    frozen = !frozen;
  }

  // Save image
  if (key === 's' || key === 'S') {
    saveCanvas('bloom-tree', 'png');
  }

  // Reset
  if (key === 'r' || key === 'R') {
    frozen = false;

    isPinching = false;
    pinchFrames = 0;
    releaseFrames = 0;

    bloomAmount = 0;
    targetBloom = 0;

    sideBias = 0;
    targetSideBias = 0;

    previousX = null;
    waveCooldown = 0;

    themeIndex = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
