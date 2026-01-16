"use strict";


//Squares
let square1 = undefined;
let square2 = undefined;
let square3 = undefined;

//The values of the squares
function createSquares() {
    let square = {
        x: random(0, 500),
        y: random(0, 500),
        size: random(50, 150),
        fill: {
            r: random(0, 255),
            g: random(0, 255),
            b: random(0, 255),
        },
    };

    return square;
}

//Draw the squares
function drawSquares(square) {
    push();
    noStroke();
    fill(square.fill.r, square.fill.g, square.fill.b);
    rect(square.x, square.y, square.size);
    pop();
}

function setup() {
    console.log("go")

    createCanvas(600, 600);
    background(0);

    //Create the squares
    square1 = createSquares();
    square2 = createSquares();
    square3 = createSquares();
}

function draw() {

    background(0);
    //display the squares
    drawSquares(square1);
    drawSquares(square2);
    drawSquares(square3);

    moveSquare(square3);
}

function mouseClicked(square) {
    //the first square appears
    push();
    background(0);
    square1.x = random(0, 500);
    square1.y = random(0, 500);
    pop();
}

function keyPressed() {
    switch (keyCode) {
        case 32: //Space Bar
            if (keyIsPressed) {
                background(0);
                square2.x = random(0, 500);
                square2.y = random(0, 500);
            }
    }
}

function moveSquare(square3) {
    //move the square up and down
    square3.y += 5;

    if (square3.y >= 500) {
        square3.y = -50;
    }
}