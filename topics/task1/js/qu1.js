"use strict";

function setup() {
    console.log("go")

    createCanvas(600, 600);

}

function draw() {
    background(0);

    push();
    fill('pink');
    noStroke();
    ellipse(25, 25, 35);
    pop();

    push();
    fill('hotpink');
    noStroke();
    ellipse(60, 60, 50);
    pop();

    push();
    fill(242, 10, 180);
    noStroke();
    ellipse(110, 110, 70);
    pop();


}