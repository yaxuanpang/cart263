class VideoObj {
  constructor(x, y, w, h, videoElement, context) {
    this.videoElement = videoElement;
    this.context = context;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.shapeX = 10;
    this.shapeY = 10;
    this.shapeCol = "#000000";

    let filterButton_blur = document.getElementById("filter_button_blur");
    let blurInput = document.getElementById("blurnum");

    //ADDED THIS
    let filterButton_sepia = document.getElementById("filter_button_sepia");
    let sepiaInput = document.getElementById("sepianum");

    //ADDED THIS
    let filterButton_hue = document.getElementById("filter_button_hue");
    let hueInput = document.getElementById("huenum");

    //ADDED THIS
    let filterButton_invert = document.getElementById("filter_button_invert");
    let invertInput = document.getElementById("invertnum");


    this.userProvidedBlur = 0;
    this.userProvidedSepia = 0; //ADDED THIS
    this.userProvidedHue = 0; //ADDED THIS
    this.userProvidedInvert = 0; //ADDED THIS
    let self = this;

    filterButton_blur.addEventListener("click", function () {
      //get value from input field
      self.userProvidedBlur = blurInput.value;
      console.log(self.userProvidedBlur);
    });


    //ADDED THIS
    filterButton_sepia.addEventListener("click", function () {
      self.userProvidedSepia = sepiaInput.value;
    });
    //ADDED THIS
    filterButton_hue.addEventListener("click", function () {
      self.userProvidedHue = hueInput.value;
    });
    //ADDED THIS
    filterButton_invert.addEventListener("click", function () {
      self.userProvidedInvert = invertInput.value;
    });

  }

  display() {
    this.context.save();

    //ADDED HERE
    this.context.filter = `
  blur(${this.userProvidedBlur}px)
  sepia(${this.userProvidedSepia}%) 
  hue-rotate(${this.userProvidedHue}deg)
  invert(${this.userProvidedInvert}%)`;

    //this.context.filter = `blur(${this.userProvidedBlur}px)`;
    this.context.drawImage(this.videoElement, this.x, this.y, this.w, this.h);
    this.context.fillStyle = this.shapeCol;
    this.context.fillRect(this.shapeX, this.shapeY, 50, 50)
    this.context.restore();
  }

  //called when rectangle color is to be updated
  changeColor(newCol) {
    /** FILL IN */
    this.shapeCol = newCol; //ADDED THIS
  }
  //called when rectangle Pos is to be updated
  updatePositionRect(mx, my) {
    /** FILL IN */
    this.shapeX = mx; //ADDED THIS
    this.shapeY = my;//ADDED THIS 
  }
  update(videoElement) {
    this.videoElement = videoElement;
  }
}
