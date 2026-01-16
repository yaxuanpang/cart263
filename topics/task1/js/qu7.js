"use strict";

let shapeSize = 90;   // diameter of each circle
let spacing = 100;      // distance between circle centers
let circleFill = [0, 150, 255];
let beRect = false;

function setup() {
    createCanvas(600, 600);
    rectMode(CENTER);
}

function draw() {
    background(220);

    drawShape();
}

function keyPressed() {
    switch (keyCode) {
        case 32: //Space Bar
            if (keyIsPressed) {
                circleFill = [random(255), random(255), random(255)]
            }
    }
}

function drawShape() {
    fill(circleFill);
    noStroke();

    for (let y = spacing; y < height; y += spacing) {
        for (let x = spacing; x < width; x += spacing) {

            if (beRect === true) {
                rect(x, y, shapeSize, shapeSize);
            } else {
                circle(x, y, shapeSize);
            }
        }
    }
}

function mouseClicked() {
    for (let y = spacing; y < height; y += spacing) {
        for (let x = spacing; x < width; x += spacing) {
            if (beRect === true) {
                beRect = false;
            } else {
                beRect = true;
            }
        }
    }
}