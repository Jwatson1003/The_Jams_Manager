function setup() {

  // put setup code here

  createCanvas(900,600);
  background(20);
  textFont("Courier New");

}

function draw() {

  // put drawing code here

  background(20);
  var displayText = "Would you like to play a game?";

  push();
  fill("#ff0072");
  textSize(40);
  textAlign(CENTER);
  for (var i = 0; i < displayText.length; i++) {
    var floatyHeight = sin(i*0.1+(millis()*0.001)) * 50;
    text(displayText[i], (width/displayText.length-1)*(i+1), (height/2) + floatyHeight);
  }
  pop();

}
