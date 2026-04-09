//importing three.js library
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.182.0/build/three.module.js";

//scene
const canvas = document.querySelector("#snakeGame");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let cameraRadius = 15;
let cameraAngleY = Math.PI / 4; //horizontal rotation
let cameraAngleX = Math.PI / 6; //vertical rotation
updateCameraPosition();

//function to define how the camera moves
function updateCameraPosition() {
    camera.position.x = cameraRadius * Math.sin(cameraAngleY) * Math.cos(cameraAngleX);
    camera.position.y = cameraRadius * Math.sin(cameraAngleX);
    camera.position.z = cameraRadius * Math.cos(cameraAngleY) * Math.cos(cameraAngleX);
    camera.lookAt(0, 0, 0);
}

//render
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

//resize canvas when the window is resized
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

//white stroked grid
const gridSize = 10;
const grid = new THREE.GridHelper(gridSize * 2, gridSize * 2);
scene.add(grid);

//movement of mouse to be able to drag along on the canvas
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;

//event listeners to define the interactions of user dragging the canvas
canvas.addEventListener("mousedown", (e) => {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    canvas.style.cursor = "grabbing";
});

canvas.addEventListener("mouseup", () => {
    isDragging = false;
    canvas.style.cursor = "grab";
});

canvas.addEventListener("mouseleave", () => {
    isDragging = false;
    canvas.style.cursor = "grab";
});

canvas.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const dragX = e.clientX - dragStartX;
    const dragY = e.clientY - dragStartY;

    cameraAngleY -= dragX * 0.005;
    cameraAngleX -= dragY * 0.005;
    cameraAngleX = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, cameraAngleX));

    dragStartX = e.clientX;
    dragStartY = e.clientY;

    updateCameraPosition();
});

//SNAKE CLASSS
class Snake {
    constructor(scene) {
        this.scene = scene;
        this.direction = { x: 0, y: 0, z: 0 }; //starts being still
        this.segments = [];
        this.meshes = [];
        this.resetPosition();
    }

    //creating snake which is a cube
    createSnake() {
        const snakee = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
        const cube = new THREE.Mesh(snakee, material);
        this.scene.add(cube);
        this.meshes.push(cube);
    }

    setDirection(x, y, z) {
        this.direction = { x, y, z };
    }

    move() {
        if (this.direction.x === 0 && this.direction.z === 0) return; //no movement if no direction is given to it

        for (let i = this.segments.length - 1; i > 0; i--) { //makes the cubes that make up the snake move all coordinated
            this.segments[i] = { ...this.segments[i - 1] };
        }
        this.segments[0].x += this.direction.x;
        this.segments[0].y += this.direction.y;
        this.segments[0].z += this.direction.z;

        //check grid boundaries
        const edge = this.segments[0];
        if (
            edge.x < -gridSize || edge.x > gridSize ||
            edge.z < -gridSize || edge.z > gridSize
        ) {
            this.resetPosition();
        }
    }

    grow() {
        const tail = this.segments[this.segments.length - 1];
        this.segments.push({ ...tail });
        this.createSnake();
    }

    render() {
        this.segments.forEach((seg, i) => {
            if (!this.meshes[i]) this.createSnake();
            this.meshes[i].position.set(seg.x, seg.y, seg.z);
        });
    }

    checkCollision(target) {
        return (
            this.segments[0].x === target.x &&
            this.segments[0].y === target.y &&
            this.segments[0].z === target.z
        );
    }

    resetPosition() {
        //reset at random position
        const x = Math.floor(Math.random() * (gridSize * 2 + 1) - gridSize);
        const z = Math.floor(Math.random() * (gridSize * 2 + 1) - gridSize);
        const y = 0;

        //removing extras
        this.segments = [{ x, y, z }];
        this.meshes.forEach((m) => this.scene.remove(m));
        this.meshes = [];

        this.direction = { x: 0, y: 0, z: 0 };
    }
}

//TARGET CLASSSS
class Target {
    constructor(scene) {
        this.scene = scene;
        const targett = new THREE.SphereGeometry(0.5, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0x87ceeb });
        this.mesh = new THREE.Mesh(targett, material);
        this.scene.add(this.mesh);
        this.relocate();
    }

    relocate() {
        this.x = Math.floor(Math.random() * (gridSize * 2 + 1) - gridSize);
        this.y = 0;
        this.z = Math.floor(Math.random() * (gridSize * 2 + 1) - gridSize);
        this.mesh.position.set(this.x, this.y, this.z);
    }
}

//creating new objecys for snake and target
const snake = new Snake(scene);
const target = new Target(scene);

//user controlling the snake direction with keyboard arrows
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp": snake.setDirection(0, 0, -1); break;
        case "ArrowDown": snake.setDirection(0, 0, 1); break;
        case "ArrowLeft": snake.setDirection(-1, 0, 0); break;
        case "ArrowRight": snake.setDirection(1, 0, 0); break;
    }
});

let lastMove = 0;
const speed = 200;

//animate functionn
function animate(time) {
    requestAnimationFrame(animate);

    if (time - lastMove > speed) {
        snake.move();

        if (snake.checkCollision(target)) {
            snake.grow();
            target.relocate();
        }
        lastMove = time;
    }
    snake.render();
    renderer.render(scene, camera);
}
animate();