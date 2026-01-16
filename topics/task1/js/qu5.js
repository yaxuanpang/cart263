"use strict";

let counter = 0;
let square1;
let square2;
let circ1;
let radius = 50;
let ellipseAlpha = 50;
let changeColor = false;
let changeColor2 = false;

let fill1 = [242, 160, 17];
let fill2 = [255, 255, 255, ellipseAlpha];
let fill3 = [245, 56, 27];

function createSquare() {
    let square = {
        x: 50,
        y: 50,
        size: 100,
    };

    return square;
}

function createSquare2() {
    let square2 = {
        x: 160,
        y: 50,
        size: 100,
    };

    return square2;
}

function createCirc() {
    let circ = {
        x: width / 2,
        y: height / 2,
        size: radius,
    };

    return circ;
}

//draw buttons
function displaySquare(square) {
    push();
    noStroke();
    fill(fill1);
    rect(square.x, square.y, square.size);
    pop();

}

function displaySquare2(square2) {
    push();
    noStroke();
    fill(fill3);
    rect(square2.x, square2.y, square2.size);
    pop();

}

function displayCirc(circ) {
    push();
    noStroke();
    fill(fill2);
    ellipse(circ.x, circ.y, circ.size);
    pop();
}

function setup() {
    console.log("go")

    createCanvas(600, 600);
    //create the button
    square1 = createSquare();
    square2 = createSquare2();
    circ1 = createCirc();

}

function draw() {
    background(0);

    checkCollisionWithSquare();
    change();

    displaySquare(square1);
    displaySquare2(square2);


    let i = 0;
    while (i < counter) {
        push();
        noStroke();
        fill(fill2);

        let currentSize = radius + (i * 50);
        ellipse(width / 2 + i, height / 2, currentSize);

        pop();

        i++;
    }

}

function checkCollisionWithSquare() {
    if (mouseX >= 50 && mouseX <= 150 && mouseY >= 50 && mouseY <= 150) {
        changeColor = true;
    }
    else {
        changeColor = false;
    }

    if (mouseX >= 160 && mouseX <= 260 && mouseY >= 50 && mouseY <= 150) {
        changeColor2 = true;
    }
    else {
        changeColor2 = false;
    }
}

function change() {
    if (changeColor === true) {
        fill1 = [237, 200, 135];
    }
    else {
        fill1 = [242, 160, 17];
    }

    if (changeColor2 === true) {
        fill3 = [252, 132, 114];
    }
    else {
        fill3 = [245, 56, 27];
    }
}

function mouseClicked() {
    if (mouseX >= 50 && mouseX <= 150) {
        counter++;
        if (counter >= 10) {
            counter = 10
        }
    }
    else if (mouseX >= 160 && mouseX <= 260) {
        counter--;
        if (counter <= 0) {
            counter = 0;
        }
    }
}