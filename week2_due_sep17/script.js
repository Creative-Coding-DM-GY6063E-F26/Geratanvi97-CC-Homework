// change the quotes in this array. Be mindful of the quotation marks!
// this is the only part of the file you need to edit!
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
    text: "Creative coding is a type of computer programming that focuses on the generation of visual or auditory output. It involves using code to create interactive art, animations, simulations, and other multimedia projects.",
    source: "Jerwood Visual Arts"
  },
  {
    text: "Creative coding is a process, based on exploration, iteration, reflection and discovery, where code is used as the primary medium to create a wide range of media artifacts.",
    source: "Tim Rodenbröker"
  },
  {
    text: "Creative coding involves using programming languages to create expressive artworks and interactives, often blurring the line between art and technology.",
    source: "VAIA"
  },
  {
    text: "Creative coding is a specialty that utilizes code and programming to create more expressive, designed, and custom web designs, using programming languages for a solely artistic purpose.",
    source: "Wix Studio"
  },
  {
    text: "Creative coding encompasses a variety of code-based artistic practices, basically, everything that is considered original and creative and is created using code.",
    source: "Kunstplaza"
  }
];
// no need to edit anything below this line! 
// if you have made an error, you can check your history to see what might have gone wrong

// a variable tht holds the current quote
let current = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  randomSeed(millis());
  pickQuote(); // calls the function to pick a quote
}

current = quotes[floor(random(quotes.length))];
}

function draw() {
  background(255, 20, 250);
  drawQuote(); // draw the quote on screen
}

function drawQuote() {
  // draw text
  fill(10, 255, 10);
  textAlign(CENTER, CENTER);
  text("Creative Coding is.....", width / 2, height / 2 - 48);
  textSize(32);
  textStyle(BOLD);
  text("“" + current.text + "”", width / 2, height / 2);
  textAlign(RIGHT, CENTER);
  text("-" + current.source, width - 100, height - 100);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newQuote() {
  pickQuote();
  redraw();
}

function mousePressed() {
  newQuote(); /
}
