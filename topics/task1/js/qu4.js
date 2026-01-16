"use strict";

//VARIABLES
let fill1 = [114, 197, 242];
let fill2 = [58, 136, 232];
let fill3 = [20, 46, 79];


function setup() {
    console.log("go")

    createCanvas(600, 600);

}

function draw() {
    background(0);

    //rectangle 1
    push();
    noStroke();
    fill(fill1);
    rect(0, 0, 200, height);
    pop();

    //rectangle 2
    push();
    noStroke();
    fill(fill2);
    rect(200, 0, 200, height);
    pop();

    //rectangle 3
    push();
    noStroke();
    fill(fill3);
    rect(400, 0, 200, height);
    pop();
}


function mouseMoved() {
    /**IF-ELSE STATEMENT*/

    //rectangle 1
    if (mouseX >= 0 && mouseX <= 200) {
        fill1 = [255, 255, 255];
    }
    else {
        fill1 = [114, 197, 242];
    }

    //rectangle 2
    if (mouseX >= 200 && mouseX <= 400) {
        fill2 = [255, 255, 255];
    }
    else {
        fill2 = [58, 136, 232];
    }

    //rectangle 3
    if (mouseX >= 400 && mouseX <= 600) {
        fill3 = [255, 255, 255];
    }
    else {
        fill3 = [20, 46, 79];
    }
}