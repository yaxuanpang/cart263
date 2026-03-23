class RectangularObj {
  constructor(x, y, w, h, f_color, s_color, context) {
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2; //full rotation
    this.context = context;
  }

  display() {
    this.context.fillStyle = this.fill_color; // change the color we are using
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.strokeStyle = this.stroke_color; // change the color we are using
    this.context.lineWidth = 2; //change stroke
    this.context.strokeRect(this.x, this.y, this.width, this.height);
  }

  update() {
    //MICROPHONE
    if (this.micData) {
      let sum = 0;
      for (let i = 0; i < this.micData.length; i++) {
        sum += this.micData[i];
      }

      let volume = sum / this.micData.length;

      //volume and movement
      volume *= 2;
      this.width = 50 + volume;
      this.height = 70 + volume;

    }
    //ANIMATION
    // movement, left/right
    this.x += Math.sin(Date.now() * 0.002) * 2;
    //update freestyle
    // this.x+=1;
    //console.log("rectangle update")
  }


}
