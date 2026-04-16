//importing three.js
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.182.0/build/three.module.js";

//variables
const scoreDisplay = document.getElementById("scoreDisplay");
let gameEnded = false;
const canvas = document.querySelector("#snakeGame");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

//lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 9);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let cameraRadius = 17;
let cameraAngleY = 0;
let cameraAngleX = 0.4;
updateCameraPosition();

function updateCameraPosition() {
    camera.position.x = cameraRadius * Math.sin(cameraAngleY) * Math.cos(cameraAngleX);
    camera.position.y = cameraRadius * Math.sin(cameraAngleX);
    camera.position.z = cameraRadius * Math.cos(cameraAngleY) * Math.cos(cameraAngleX);
    camera.lookAt(0, 0, 0);
}

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

//grid
const gridSize = 10;
const grid = new THREE.GridHelper(gridSize * 2, gridSize * 2);
scene.add(grid);

let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let score = 0 // score

//sound effects (eats, win, dies)
const collectSound = new Audio("./sounds/eat.mp3");
const gameOverSound = new Audio("./sounds/die.mp3");
const winSound = new Audio("./sounds/win.mp3");

//if the player clicks down on the mouse and drags it, the camera angle moves
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

//create stars
function createStarfield() {
    const count = 700;
    const stars = [];
    for (let i = 0; i < count; i++) {
        const geo = new THREE.BufferGeometry();
        //Creates an array of 3 numbers to store the star's x, y, z coordinates
        const pos = new Float32Array(3);
        //Creates an array of 3 numbers to store the star's x, y, z coordinates
        pos[0] = (Math.random() - 0.5) * 200;
        pos[1] = (Math.random() - 0.5) * 200;
        pos[2] = (Math.random() - 0.5) * 200;
        //Gives the position data to the geometry
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const mat = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.5,
            transparent: true,
            opacity: Math.random() // random starting opacity
        });
        const star = new THREE.Points(geo, mat);
        star.userData.speed = 0.0005 + Math.random() * 0.002; // each star flickers at its own speed
        star.userData.offset = Math.random() * Math.PI * 2; // each star starts at a different phase
        scene.add(star);
        stars.push(star);
    }
    return stars;
}
const stars = createStarfield();

// MICROPHONE SETUP
let audioContext, analyser, microphone;
let micActive = false;

async function setupMicrophone() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        micActive = true;
    } catch (err) {
        console.error("Microphone access denied:", err);
    }
}
function getVolume() {
    if (!analyser) return 0;
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    return data.reduce((a, b) => a + b, 0) / data.length;
}

setupMicrophone();

// SNAKE CLASS
class Snake {
    constructor(scene) {
        this.scene = scene;
        this.direction = { x: 0, y: 0, z: 0 };
        this.segments = [];
        this.meshes = [];
        this.resetPosition();
    }

    // snake's texture, direction, movements
    createSnake() {
        const geo = new THREE.BoxGeometry(1, 1, 1);
        const textureLoader = new THREE.TextureLoader();
        const snakeTexture = textureLoader.load("./textures/snake.jpg");
        const material = new THREE.MeshBasicMaterial({ map: snakeTexture });
        const cube = new THREE.Mesh(geo, material);
        this.scene.add(cube);
        this.meshes.push(cube);
    }

    setDirection(x, y, z) {
        this.direction = { x, y, z };
    }

    move() {
        if (this.direction.x === 0 && this.direction.z === 0) return;
        for (let i = this.segments.length - 1; i > 0; i--) {
            this.segments[i] = { ...this.segments[i - 1] };
        }
        this.segments[0].x += this.direction.x;
        this.segments[0].y += this.direction.y;
        this.segments[0].z += this.direction.z;
        const edge = this.segments[0];
        //checks for collisions with the grid
        if (
            edge.x < -gridSize || edge.x > gridSize ||
            edge.z < -gridSize || edge.z > gridSize
        ) {
            gameEnded = true;
            gameOverSound.play();
            document.getElementById("snakeGame").style.display = "none";
            document.getElementById("gameOver").style.display = "flex";
        }
    }

    // add a cube behind the snake when it grows
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

    //checks for collisions with the target
    checkCollision(target) {
        return (
            this.segments[0].x === target.x &&
            this.segments[0].y === target.y &&
            this.segments[0].z === target.z
        );
    }

    //resets the position of the snake and removes extra cubes
    resetPosition() {
        const x = Math.floor(Math.random() * (gridSize * 2 + 1) - gridSize);
        const z = Math.floor(Math.random() * (gridSize * 2 + 1) - gridSize);
        this.segments = [{ x, y: 0, z }];
        this.meshes.forEach((m) => this.scene.remove(m));
        this.meshes = [];
        this.direction = { x: 0, y: 0, z: 0 };
    }
    //checks if the snake collides with itself
    checkSelfCollision() {
        const head = this.segments[0];
        for (let i = 1; i < this.segments.length; i++) {
            if (head.x === this.segments[i].x &&
                head.y === this.segments[i].y &&
                head.z === this.segments[i].z) {
                return true;
            }
        }
        return false;
    }
}

// TARGET CLASS
class Target {
    constructor(scene) {
        this.scene = scene;
        const geo = new THREE.SphereGeometry(0.5, 16, 16);
        const textureLoader = new THREE.TextureLoader();
        const targetTexture = textureLoader.load("./textures/target.jpg");
        const material = new THREE.MeshStandardMaterial({
            map: targetTexture,
            roughness: 0.9,
            metalness: 0.1
        });
        this.mesh = new THREE.Mesh(geo, material);
        this.scene.add(this.mesh);
        this.relocate();
    }

    //relocates the target when it gets eaten
    relocate() {
        this.x = Math.floor(Math.random() * (gridSize * 2 + 1) - gridSize);
        this.y = 0;
        this.z = Math.floor(Math.random() * (gridSize * 2 + 1) - gridSize);
        this.mesh.position.set(this.x, this.y, this.z);
    }
}

//particles (confettis)
function createParticles(x, y, z) {
    const particles = [];

    for (let i = 0; i < 10; i++) {
        const geo = new THREE.SphereGeometry(0.2, 5, 5);
        const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
        const particle = new THREE.Mesh(geo, material);

        particle.position.set(x, y, z);

        //when particles burst, it spawns in random directions
        particle.userData.velocity = {
            x: (Math.random() - 0.5) * 0.3,
            y: Math.random() * 0.3,
            z: (Math.random() - 0.5) * 0.3
        };
        scene.add(particle);
        particles.push(particle);
    }

    let life = 20;

    function animateParticles() {
        life--;

        particles.forEach(p => {
            p.position.x += p.userData.velocity.x;
            p.position.y += p.userData.velocity.y;
            p.position.z += p.userData.velocity.z;
        });
        if (life > 0) {
            requestAnimationFrame(animateParticles);
        } else {
            particles.forEach(p => scene.remove(p));
        }
    }
    animateParticles();
}

const snake = new Snake(scene);
const targets = [new Target(scene)];

//arrows make the snake move
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp": snake.setDirection(0, 0, -1); break;
        case "ArrowDown": snake.setDirection(0, 0, 1); break;
        case "ArrowLeft": snake.setDirection(-1, 0, 0); break;
        case "ArrowRight": snake.setDirection(1, 0, 0); break;
    }
});

let lastMove = 0;
let lastCircleSpawn = 0;
let speed = 200;

function animate(time) {
    stars.forEach(star => {
        star.material.opacity = 0.3 + Math.sin(time * star.userData.speed + star.userData.offset) * 0.7;
    });

    if (gameEnded) return;
    requestAnimationFrame(animate);

    //if the mic captures a certain volume threshold, it makes more targets
    if (micActive) {
        const volume = getVolume();
        const desired = 1 + Math.floor(volume / 20);

        if (targets.length < desired && time - lastCircleSpawn > 200) {
            targets.push(new Target(scene));
            lastCircleSpawn = time;
        }
        while (targets.length > desired && targets.length > 1) {
            const t = targets.pop();
            scene.remove(t.mesh);
        }
    }

    //if the snake collides with itself, it dies
    if (time - lastMove > speed) {
        snake.move();
        if (snake.checkSelfCollision()) {
            gameEnded = true;
            gameOverSound.play();
            document.getElementById("snakeGame").style.display = "none";
            document.getElementById("gameOver").style.display = "flex";
            document.getElementById("scoreDisplay").style.display = "none";
            return;
        }

        // if the snake eats 20 target, the player wins
        //every time it eats a target, particles, the snake will speed up
        for (let i = targets.length - 1; i >= 0; i--) {
            if (snake.checkCollision(targets[i])) {
                createParticles(targets[i].x, targets[i].y, targets[i].z);
                snake.grow();
                score++;
                scoreDisplay.textContent = "Score: " + score;
                speed = Math.max(80, speed - 40);
                collectSound.play();

                if (score >= 20) {
                    gameEnded = true;
                    document.getElementById("snakeGame").style.display = "none";
                    document.getElementById("gameWin").style.display = "flex";
                    document.getElementById("scoreDisplay").style.display = "none";
                    winSound.play();
                    winSound.volume = 0.5;
                } else {
                    targets[i].relocate();
                }
            }
        }
        lastMove = time;
    }
    snake.render();
    renderer.render(scene, camera);

}

animate();