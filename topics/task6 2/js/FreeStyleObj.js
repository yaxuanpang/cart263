class FreeStyleObj {
  constructor(x, y, length, f_color, s_color, context) {
    this.x = x;
    this.y = y;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.theta = 0;
    this.length = length;
    this.yOffset = 20;
    this.angularSpeed = 0.07;
    this.context = context;
    this.average = 0;
    this.number = 1;
  }

  display() {
    for (let r = 0; r < this.number; r++) {
      for (let c = 0; c < this.number; c++) {
        let linex = this.x + (r * 50);
        let liney = this.y + (c * 50);
        this.theta = 0;
        this.context.strokeStyle = this.stroke_color;
        this.context.beginPath();
        this.context.moveTo(linex, liney);              // ← was this.x, this.y
        for (let i = linex; i < linex + this.length; i++) {  // ← was this.x
          this.context.lineTo(i, (Math.sin(this.theta) * 5) + liney);              // ← was this.y
          this.context.lineTo(i, (Math.sin(this.theta) * 5) + liney + this.yOffset); // ← was this.y
          this.theta += this.angularSpeed;
        }
        this.context.stroke();
      }
    }
  }

  update() {
    // animation can go here
  }

  giveAverage(average) {
    this.average = average;
    this.length = Math.max(average * 4, 100);
    this.angularSpeed = Math.max(average * 0.05, 0.07);
    this.yOffset = Math.max(average * 2, 10);
    this.number = Math.max(Math.floor(average / 2), 1);
    // removed this.x and this.y — they were breaking the grid

    const canvasWidth = this.context.canvas.width;
    let gradient = this.context.createLinearGradient(
      canvasWidth / 2 - this.length / 2, 0,
      canvasWidth / 2 + this.length / 2, 0
    );
    gradient.addColorStop(0, "violet");
    gradient.addColorStop(0.125, "blue");
    gradient.addColorStop(0.25, "green");
    gradient.addColorStop(0.375, "yellow");
    gradient.addColorStop(0.5, "orange");
    gradient.addColorStop(0.625, "red");
    this.stroke_color = gradient;
  }
}