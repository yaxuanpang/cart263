class Target {
    constructor(size = 20) {
        this.parent = document.querySelector("#parent");
        this.size = size;
        this.targetElement = document.createElement("div");
        this.targetElement.classList.add("target");
        this.parent.appendChild(this.targetElement);

        this.randomPosition();
        this.renderTarget();
    }

    randomPosition() { // makes sure the target stays inside the grid
        const maxX = Math.floor(this.parent.clientWidth / this.size) - 1;
        const maxY = Math.floor(this.parent.clientHeight / this.size) - 1;

        this.x = Math.floor(Math.random() * maxX);
        this.y = Math.floor(Math.random() * maxY);
    }

    renderTarget() {
        this.targetElement.style.left = (this.x * this.size) + "px";
        this.targetElement.style.top = (this.y * this.size) + "px";
        this.targetElement.style.width = this.size + "px";
        this.targetElement.style.height = this.size + "px";
    }

    //relocates the target when the target is eaten
    relocate() {
        this.randomPosition();
        this.renderTarget();
    }
}