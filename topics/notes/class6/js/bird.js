class Bird extends Animal {
    // Create a new bird object that moves to the right
    constructor(x, y, width, height) {
        super(x, y, width, height);
        // this.x = x;
        // this.y = y;
        // this.width = width;
        // this.height = height;
        this.vx = Math.random() * 5 + 1;
        this.vy = 0;
        this.animalBody = document.createElement("div");

        this.originalY = this.y;

        //ONLY in the Bird class : new variables
        this.angle = 0;
        this.sleepiness = 0.1;
    }

    // // Move the bird according to its velocity
    // move() {
    //     this.x += this.vx;
    //     this.y += this.vy;
    //     //update the actual div...
    //     this.animalBody.style.left = this.x + "px";
    //     this.animalBody.style.top = this.y + "px";
    // }

    move() {
        //console.log("go");

        this.y = this.originalY + Math.sin(this.angle) * 8
        this.angle += 0.05;
        this.veer();
        super.move();
    }

    veer() {
        let r = Math.random();
        //console.log("in veer "+r)
        if (r < this.sleepiness) {
            this.vy += randomRange(-.1, .1);
        }
    }

    wrap() {
        if (this.x > window.innerWidth) {
            //reset
            this.vy = 0;
        }
        super.wrap();
    }

    // // Wrap the bird if it reaches the right edge
    // wrap() {
    //     if (this.x > window.innerWidth) {
    //         this.x -= window.innerWidth;
    //     }
    // }

    // Display the bird as a ellipse
    renderAnimal() {
        super.renderAnimal();
        // this.animalBody.classList.add("animal");
        // this.animalBody.style.width = this.width + "px";
        // this.animalBody.style.height = this.height + "px";
        // this.animalBody.style.left = this.x + "px";
        // this.animalBody.style.top = this.y + "px";
        // this.animalBody.style.borderRadius = this.width + "px";
        this.animalBody.style.backgroundColor = `rgb(106, 90, 205)`;
        // //add to the DOM
        document.getElementsByClassName("sky")[0].appendChild(this.animalBody);
    }
}

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
