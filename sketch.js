var picture;
var canvasSize = 1000;
var figureSize = 800;
var margin = (canvasSize - figureSize)/2;
var numberOfTiles = 50;
// var rotation = 0;
// var rotation = 0.7853981; //  PI/4
var rotation = 1.57079632679; // PI/2
var translation;
var move = false;
var notifications = new Notifications();
var p;

function setup() {
    createCanvas(canvasSize, canvasSize);
    // createCanvas(figureSize,figureSize);
    // drawSquares();
    // save("picture.jpg");
    //picture = loadImage("picture.png", function() { pictureLoaded = true;});
    // resizeCanvas(canvasSize, canvasSize);
    setTimeout( function(){
        p = createP("Click to rotate");
        p.style("font-size", "22px");
        p.position(150, 25);
    }, 1000);
    setTimeout( function(){
        p.html("Shift + click to move");
    }, 5500);
    setTimeout( function(){
        p.remove();
    }, 11000);
    translation = createVector(-figureSize/2, -figureSize/2);
}

function draw() {
    background(255);
    translate (margin, margin);
    fill(0);
    drawSquares();
    push();
    translate(figureSize/2, figureSize/2);
    rotate(rotation);
    translate(translation.x,translation.y);
    fill(0);
    drawSquares();
    pop();
    notifications.display();
    // numberOfTiles +=0.1;
}

function drawSquares() {
    noStroke();
    var w = figureSize/numberOfTiles;
    var h = figureSize/numberOfTiles;
    for(var i=0; i<numberOfTiles; i++) {
        for (var j=0; j<numberOfTiles; j++) {
            if ((i+j)%2 == 0) {
                rect(i*w, j*h, w, h);
            }
        }
    }
}

function mouseDragged() {
    if (keyIsPressed && move) {
        var translateVector = createVector(mouseX-pmouseX, mouseY-pmouseY);
        translateVector.rotate(-rotation);
        translation.add(translateVector);
    }
    else {
        if (mouseY >= height/2) {
            rotation -= (mouseX-pmouseX)/figureSize;
        }
        else {
            rotation += (mouseX-pmouseX)/figureSize;
        }
        if (mouseX >= width/2) {
            rotation += (mouseY-pmouseY)/figureSize;
        }
        else {
            rotation -= (mouseY-pmouseY)/figureSize;
        }
    }
}

function keyPressed() {
    if (keyCode === SHIFT) {
        move = true;
    }
}

function keyReleased() {
    if (keyCode === SHIFT) {
        move = false;
    }
}
