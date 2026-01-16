"use strict";

let message = 'test';
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let numberz = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

function createMessage() {
    push();
    fill(255);
    text("test", 450, 450);
    textSize(28);
    textAlign(CENTER, CENTER);
    pop();
}


function setup() {
    console.log("go")

    createCanvas(900, 900);

}

function draw() {
    background(0);

    createMessage();

    for (let i = 0; i < 10; i++) {
        push();
        fill(255);
        text(numbers[i], 100 * (i + 1) / 2, 50);
        textSize(28);
        pop();
    }

    for (let i = 0; i < 15; i++) {
        push();
        fill(255);
        text(numberz[i], 50, 50 * (i + 2));
        textSize(28);
        pop();
    }



}