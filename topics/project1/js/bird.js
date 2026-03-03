class Bird {
    constructor(size = 20) {
        this.parent = document.querySelector("#parent");
        this.size = size;
        this.birdElement = document.createElement("div");
        this.birdElement.classList.add("bird");
        this.parent.appendChild(this.birdElement);

        this.randomPosition();
        this.renderBird();
    }

    randomPosition() { //make sure the bird does not go outside of the grid
        const maxX = Math.floor(this.parent.clientWidth / this.size) - 1;
        const maxY = Math.floor(this.parent.clientHeight / this.size) - 1;

        this.x = Math.floor(Math.random() * maxX);
        this.y = Math.floor(Math.random() * maxY);
    }

    renderBird() {
        this.birdElement.style.left = (this.x * this.size) + "px";
        this.birdElement.style.top = (this.y * this.size) + "px";
        this.birdElement.style.width = this.size + "px";
        this.birdElement.style.height = this.size + "px";
    }

    //relocates the target when the target is eaten
    relocate() {
        this.randomPosition();
        this.renderBird();
    }
}