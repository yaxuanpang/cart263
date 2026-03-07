class Background {
    constructor() {
        this.canvas = document.getElementById("bgAnimation");
        this.animation = this.canvas.getContext("2d"); //canvas 2D API

        this.resize(); //cals the resize function
        window.addEventListener("resize", () => this.resize()); // to fit canvas size despite browser size changes

        //array that contains our shapes
        this.shapes = [];

        // creating shapes - 20 shapes
        for (let i = 0; i < 20; i++) {
            this.shapes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 60 + 40,
                vx: (Math.random() - 0.5) * 0.9,
                vy: (Math.random() - 0.5) * 0.9,
                type: Math.random() > 0.5 ? "circle" : "square" //randomize between circle or squares
            });
        }
        //calling animate function
        this.animate();
    }

    //function that resizes canvas depending on the parent container
    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    move(shape) {
        shape.x += shape.vx;
        shape.y += shape.vy;

        if (shape.x < 0 || shape.x + shape.size > this.canvas.width) { //to bounce off if shapes touches the canvas edges
            shape.vx *= -1;
        }

        if (shape.y < 0 || shape.y + shape.size > this.canvas.height) {
            shape.vy *= -1;
        }
    }

    draw(shape) {
        this.animation.globalAlpha = 0.2;
        this.animation.lineWidth = 5;

        if (shape.type === "square") { //draw square
            this.animation.strokeStyle = "blue";
            this.animation.strokeRect(shape.x, shape.y, shape.size, shape.size);
        } else {
            this.animation.strokeStyle = "red"; //draw circle
            this.animation.beginPath();
            this.animation.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
            this.animation.stroke();
            this.animation.closePath();
        }
    }

    animate() {
        this.animation.clearRect(0, 0, this.canvas.width, this.canvas.height); //to clear after each frame, so that shape + alpha dosent get stretched

        this.shapes.forEach(shape => {
            this.move(shape);
            this.draw(shape);
        });

        requestAnimationFrame(() => this.animate());
    }
}

window.addEventListener("load", () => { //to run the background animation as soon as window is loaded
    new Background();
});