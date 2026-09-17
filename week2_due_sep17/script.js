const quotes = [
  {
    text: "Creative coding is a type of computer programming in which the goal is to create something expressive instead of something functional.",
    source: "Wikipedia"
  },
  {
    text: "Creative coding is the practice of combining programming techniques with artistic expression in order to create aesthetically pleasing and optimized interactive digital experiences.",
    source: "SMU Meadows School of the Arts"
  },
  {
    text: "Creative coding sits at the intersection of programming and visual art. It's not about shipping products or optimizing algorithms. It's about using code as a paintbrush, a chisel, a musical instrument, a tool for expression.",
    source: "Lumitree"
  },
  {
    text: "Creative coding is a type of computer programming that focuses on the generation of visual or auditory output.",
    source: "Jerwood Visual Arts"
  },
  {
    text: "Creative coding is a process based on exploration, iteration, reflection and discovery, where code is used as the primary medium to create a wide range of media artifacts.",
    source: "Tim Rodenbroeker"
  },
  {
    text: "Creative coding involves using programming languages to create expressive artworks and interactives, often blurring the line between art and technology.",
    source: "VAIA"
  },
  {
    text: "Creative coding is a specialty that utilizes code and programming to create more expressive, designed, and custom web designs.",
    source: "Wix Studio"
  },
  {
    text: "Creative coding encompasses a variety of code-based artistic practices and original work created using code.",
    source: "Kunstplaza"
  }
];

let current;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pickQuote();
}

function pickQuote() {
  current = random(quotes);
}

function draw() {
  background(255, 20, 250);
  drawQuote();
}

function drawQuote() {
  fill(10, 255, 10);
  textAlign(CENTER, CENTER);

  textSize(20);
  textStyle(NORMAL);
  text("Creative Coding is.....", width / 2, height / 2 - 90);

  textSize(32);
  textStyle(BOLD);
  text(
    "“" + current.text + "”",
    width / 2,
    height / 2,
    width - 200,
    300
  );

  textSize(18);
  textStyle(NORMAL);
  textAlign(RIGHT, CENTER);
  text("- " + current.source, width - 100, height - 100);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  pickQuote();
}
