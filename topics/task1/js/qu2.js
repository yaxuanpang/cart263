"use strict";

function setup() {
    console.log("go")


    createCanvas(600, 600);
    background(0);

    drawEllipse(25, 25, 35, 247, 158, 224);
    drawEllipse(60, 60, 50, 242, 114, 209);
    drawEllipse(110, 110, 70, 242, 10, 180);

}

function draw() {
}

function drawEllipse(x, y, w, r, g, b) {
    push();
    fill(r, g, b);
    noStroke();
    ellipse(x, y, w);
    pop();
}