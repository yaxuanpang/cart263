class FreeStyleObj {
  constructor(x, y, length, f_color, s_color, context) {
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = x;
    this.y = y;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.theta = 0;
    this.length = length;
    this.yOffset = 20;
    this.angularSpeed = .07;
    this.context = context;
    this.average = 0;
    this.number = 1;

  }

  display() {
    //make grid 
    for (let r = 0; r < this.number; r++) {
      for (let c = 0; c < this.number; c++) {
        let linex = this.x + (r * 50);
        let liney = this.y + (c * 50);

        this.theta = 0; //reset everytime
        this.context.fillStyle = this.fill_color; // change the color we are using
        this.context.strokeStyle = this.stroke_color; // change the color we are using
        this.context.beginPath();
        this.context.moveTo(this.x, this.y)
        for (let i = this.x; i < this.x + this.length; i++) {
          this.context.lineTo(i, (Math.sin(this.theta) * 5) + this.y)
          this.context.lineTo(i, (Math.sin(this.theta) * 5) + this.y + this.yOffset)
          this.theta += this.angularSpeed;
        }
      }
    }
    this.context.stroke(); //set the stroke
  }

  update() {
    //update freestyle
    // console.log("free style update")
    // this.x+=1;
  }
  giveAverage(average) {
    this.average = average;
    //console.log(this.average)
    this.length = this.average * 4;

    // changing color
    //this.stroke_color = "orange";
    /** Changing colors if greater than 100*/
    // if (this.average > 100) {
    //  this.stroke_color = "orange";
    // }

    this.angularSpeed = this.average * 50;
    this.x = this.average * 4;
    this.y = this.average * 4;
    this.yOffset = this.average * 2;
    //changing to gradient 
    let gradient = this.context.createLinearGradient(0, 0, 600, 0);
    gradient.addColorStop(0, "violet");
    gradient.addColorStop(0.125, "blue");
    gradient.addColorStop(0.25, "green");
    gradient.addColorStop(0.375, "yellow");
    gradient.addColorStop(0.5, "orange");
    gradient.addColorStop(0.625, "red");
    this.stroke_color = gradient;

    //change number so the grid have more colums and row depending on the sound
    this.number = this.average / 2;
    this.linex = this.average * 20;
    this.liney = this.average * 20;


  }
}
