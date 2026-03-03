class Grid {
    //constructor
    constructor(cellSize = 20) {
        this.parent = document.querySelector("#parent");
        this.cellSize = cellSize;

        this.columns = Math.floor(this.parent.clientWidth / this.cellSize); //height
        this.rows = Math.floor(this.parent.clientHeight / this.cellSize); //width
    }

    //render function, MAYBE do a grid CSS??? so no need to add these in here
    renderGrid() {
        for (let x = 0; x < this.columns; x++) {
            const vertical = document.createElement("div");
            vertical.style.position = "absolute";
            vertical.style.left = (x * this.cellSize) + "px";
            vertical.style.top = "0px";
            vertical.style.width = "1px";
            vertical.style.height = "100%";
            vertical.style.backgroundColor = "white";
            this.parent.appendChild(vertical);
        }
        for (let y = 0; y < this.rows; y++) {
            const horizontal = document.createElement("div");
            horizontal.style.position = "absolute";
            horizontal.style.left = "0px";
            horizontal.style.top = (y * this.cellSize) + "px";
            horizontal.style.width = "100%";
            horizontal.style.height = "1px";
            horizontal.style.backgroundColor = "white";
            this.parent.appendChild(horizontal);
        }
    }

};