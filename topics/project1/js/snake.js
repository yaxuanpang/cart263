class Snake {
    //constructor
    constructor(x, y, size = 20) {
        this.parent = document.querySelector("#parent");
        this.size = size;
        this.speedX = 0;
        this.speedY = 0;
        this.segments = [{ x, y }];
        this.elements = []; // array of boxes for the snake body

        this.addSegmentElement(); // added a segment element for the snake

        //animate function
        this.animate();
    }

    // append this to the box
    addSegmentElement() {
        const div = document.createElement("div");
        div.classList.add("box");
        this.parent.appendChild(div);
        this.elements.push(div);
    }

    grow() {
        const tail = this.segments[this.segments.length - 1];
        this.segments.push(Object.assign({}, tail));
        this.addSegmentElement();
    }


    //move function
    move() {
        for (let i = this.segments.length - 1; i > 0; i--) {
            this.segments[i] = Object.assign({}, this.segments[i - 1]);
        }

        this.segments[0].x += this.speedX;
        this.segments[0].y += this.speedY;

        //makes sure the snakes stays within the borders and resets if the snake 
        //gets out of the borders
        const maxX = Math.floor(this.parent.clientWidth / this.size) - 1;
        const maxY = Math.floor(this.parent.clientHeight / this.size) - 1;

        if (this.segments[0].x < 0 || this.segments[0].x > maxX ||
            this.segments[0].y < 0 || this.segments[0].y > maxY) {
            this.reset();
        }
    }

    // snake's original position
    reset() {
        this.segments = [{ x: 10, y: 10 }];
        this.elements.slice(1).forEach(el => el.remove());
        this.elements = [this.elements[0]];
        this.speedX = 0;
        this.speedY = 0;
    }

    //checks for the collision between the snake and the targets
    checkCollision(target) {
        if (this.segments[0].x === target.x && this.segments[0].y === target.y) {
            this.grow();
            target.relocate();
        }
    }

    //function animate that handles the event listeners
    animate() {
        //Event listener to move the snake
        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight" && this.speedX !== -1) { this.speedX = 1; this.speedY = 0; }
            if (e.key === "ArrowLeft" && this.speedX !== 1) { this.speedX = -1; this.speedY = 0; }
            if (e.key === "ArrowUp" && this.speedY !== 1) { this.speedX = 0; this.speedY = -1; }
            if (e.key === "ArrowDown" && this.speedY !== -1) { this.speedX = 0; this.speedY = 1; }
        });
    }

    //render function
    renderSnake() {
        this.segments.forEach((seg, i) => {
            this.elements[i].style.left = (seg.x * this.size) + "px";
            this.elements[i].style.top = (seg.y * this.size) + "px";
            this.elements[i].style.width = this.size + "px";
            this.elements[i].style.height = this.size + "px";
        });
    }

}
