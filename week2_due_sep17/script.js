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
    text: "Creative coding sits at the intersection of programming and visual art. It's about using code as a tool for expression.",
    source: "Lumitree"
  },
  {
    text: "Creative coding is a type of computer programming that focuses on the generation of visual or auditory output.",
    source: "Jerwood Visual Arts"
  },
  {
    text: "Creative coding is a process based on exploration, iteration, reflection and discovery, where code is used as the primary medium.",
    source: "Tim Rodenbroeker"
  },
  {
    text: "Creative coding involves using programming languages to create expressive artworks and interactives.",
    source: "VAIA"
  },
  {
    text: "Creative coding utilizes code and programming to create expressive and designed digital experiences.",
    source: "Wix Studio"
  },
  {
    text: "Creative coding encompasses a variety of code-based artistic practices.",
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
  text("Creative Coding is...", width / 2, height / 2 - 100);

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
