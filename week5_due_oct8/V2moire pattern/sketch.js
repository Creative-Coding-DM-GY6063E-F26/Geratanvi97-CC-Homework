
/*
  AFTERIMAGE / 02
  Moire Pattern Version 2

  Two layers of wavy circles overlap
  to create an optical illusion.

  P = Save PNG
  S = Save SVG for pen plotter
*/


// 1. VARIABLES

let ringCount = 30;
let ringSpacing = 8;

let waveSize = 10;
let waveCount = 5;

let rotation = 6;

let blueColor = "#2E61A5";
let redColor = "#B84B4A";


// 2. SETUP

function setup() {
  createCanvas(700, 700);
  angleMode(DEGREES);
  noLoop();
}


// 3. DRAW

function draw() {
  background(255);

  // First layer - blue
  drawRings(blueColor, 0);

  // Second layer - red
  drawRings(redColor, rotation);
}


// 4. CUSTOM FUNCTION - DRAW RINGS

function drawRings(penColor, turn) {

  noFill();
  stroke(penColor);
  strokeWeight(0.8);

  for (let i = 0; i < ringCount; i++) {

    let radius = 35 + i * ringSpacing;

    beginShape();

    for (let a = 0; a < 360; a += 3) {

      let point = ringPoint(a, radius, turn);

      vertex(point.x, point.y);
    }

    endShape(CLOSE);
  }
}


// 5. CUSTOM FUNCTION - RING POINT

function ringPoint(a, radius, turn) {

  let wave = sin(a * waveCount) * waveSize;

  let x = width / 2 + cos(a + turn) * (radius + wave);
  let y = height / 2 + sin(a + turn) * (radius + wave);

  return { x: x, y: y };
}


// 6. MAKE SVG LAYER

function makeLayer(name, color, turn) {

  let paths = "";

  for (let i = 0; i < ringCount; i++) {

    let radius = 35 + i * ringSpacing;

    let path = "";

    for (let a = 0; a < 360; a += 3) {

      let point = ringPoint(a, radius, turn);

      if (a === 0) {
        path += "M ";
      } else {
        path += "L ";
      }

      path += point.x.toFixed(2) + " ";
      path += point.y.toFixed(2) + " ";
    }

    path += "Z";

    paths += '<path d="' + path + '"/>\n';
  }

  return `
    <g
      id="${name}"
      inkscape:groupmode="layer"
      inkscape:label="${name}"
      fill="none"
      stroke="${color}"
      stroke-width="0.8">
      ${paths}
    </g>
  `;
}


// 7. SAVE SVG FILE

function saveSVG() {

  let blue = makeLayer("Blue_Layer", blueColor, 0);

  let red = makeLayer("Red_Layer", redColor, rotation);

  let svg = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
      width="180mm"
      height="180mm"
      viewBox="0 0 700 700">

      ${blue}
      ${red}

    </svg>
  `;

  let file = new Blob([svg], {
    type: "image/svg+xml"
  });

  let url = URL.createObjectURL(file);

  let link = document.createElement("a");

  link.href = url;
  link.download = "afterimage_02.svg";

  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}


// 8. KEYBOARD CONTROLS

function keyPressed() {

  // P saves a PNG image
  if (key === "p" || key === "P") {
    saveCanvas("afterimage_02", "png");
  }

  // S saves an SVG file
  if (key === "s" || key === "S") {
    saveSVG();
  }
}
