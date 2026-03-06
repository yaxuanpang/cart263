class Target {
    //constructor for the targets
    constructor(size = 20) { // parameters
        this.parent = document.querySelector("#parent");
        this.size = size;
        this.targetElement = document.createElement("div");
        this.targetElement.classList.add("target");
        this.parent.appendChild(this.targetElement); // appends it to the background

        //renders the targets in a random position
        this.randomPosition();
        this.renderTarget();
    }

    randomPosition() { // makes sure the target stays inside the grid
        const maxX = Math.floor(this.parent.clientWidth / this.size) - 1;
        const maxY = Math.floor(this.parent.clientHeight / this.size) - 1;

        this.x = Math.floor(Math.random() * maxX);
        this.y = Math.floor(Math.random() * maxY);
    }

    renderTarget() { // renders the targets
        this.targetElement.style.left = (this.x * this.size) + "px";
        this.targetElement.style.top = (this.y * this.size) + "px";
        this.targetElement.style.width = this.size + "px";
        this.targetElement.style.height = this.size + "px";
    }

    //relocates the target when the target is eaten and the target reappears somewhere else
    relocate() {
        this.randomPosition();
        this.renderTarget();
    }
}