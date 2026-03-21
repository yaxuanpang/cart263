function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

class DrawingBoard {
  /* Constructor */
  constructor(canvas, context, drawingBoardId) {
    this.canvas = canvas;
    this.context = context;
    this.objectsOnCanvas = [];
    let self = this;
    this.drawingBoardId = drawingBoardId;
    //each element has a mouse clicked and a mouse over
    this.canvas.addEventListener("click", function (e) {
      self.clickCanvas(e);
    });

    this.canvas.addEventListener("mousemove", function (e) {
      self.overCanvas(e);
    });

    window.addEventListener("keydown", function (e) {
      if (e.key === "a" && self.drawingBoardId === "partA") {
        if (self.objectsOnCanvas.length > 0) {
          self.objectsOnCanvas.pop();
        }
      }
    });
  }

  overCanvas(e) {
    //console.log("over");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
    console.log(this.mouseOffsetX, this.mouseOffsetY);
    //differentiate which canvas
    //you can remove the console.logs /// 
    if (this.drawingBoardId === "partA") {
      console.log("in A")
      const mx = this.mouseOffsetX;
      const my = this.mouseOffsetY;

      for (let i = 0; i < this.objectsOnCanvas.length; i++) {
        if (this.objectsOnCanvas[i].contains && this.objectsOnCanvas[i].contains(mx, my)) {
          this.objectsOnCanvas[i].fill_color = "rgb(255, 255, 255)";
        } else {
          this.objectsOnCanvas[i].fill_color = this.objectsOnCanvas[i].original_fill_color; // revert
        }
      }

    }
    if (this.drawingBoardId === "partB") {
      console.log("in B")
    }
    if (this.drawingBoardId === "partC") {
      console.log("in C")
    }
    if (this.drawingBoardId === "partD") {
      console.log("in D")
    }
  }

  clickCanvas(e) {
    // console.log("clicked");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
    //console.log(this.mouseOffsetX, this.mouseOffsetY);

    //differentiate which canvas
    //you can remove the console.logs /// 
    if (this.drawingBoardId === "partA") {
      console.log("in A")
      const mx = this.mouseOffsetX;
      const my = this.mouseOffsetY;

      for (let i = this.objectsOnCanvas.length - 1; i >= 0; i--) {
        if (this.objectsOnCanvas[i].contains && this.objectsOnCanvas[i].contains(mx, my)) {
          this.objectsOnCanvas.splice(i, 1);
          return;
        }
      }
      const r = Math.floor(Math.random() * 30) + 10;
      const fc = randomColor();
      const sc = randomColor();
      this.addObj(new CircularObj(mx, my, r, fc, sc, this.context));
    }
    if (this.drawingBoardId === "partB") {
      console.log("in B")
    }
    if (this.drawingBoardId === "partC") {
      console.log("in C")
    }
    if (this.drawingBoardId === "partD") {
      console.log("in D")
    }
  }
  /* method to add obj to canvas */
  addObj(objToAdd) {
    this.objectsOnCanvas.push(objToAdd);
  }

  /* method to add display objects on canvas */
  display() {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].display();
    }
  }

  /* method to add animate objects on canvas */
  animate() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      if (this.micData) {
        this.objectsOnCanvas[i].micData = this.micData;
      }
      this.objectsOnCanvas[i].update();
      this.objectsOnCanvas[i].display();
    }
  }

  run(videoElement) {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].update(videoElement);
      this.objectsOnCanvas[i].display();
    }

  }
  getAverage(average) {
    if (this.drawingBoardId === "partC") {
      for (let i = 0; i < this.objectsOnCanvas.length; i++) {
        this.objectsOnCanvas[i].giveAverage(average)

      }

    }
  }
}
