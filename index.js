/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

class Cardioid {
  constructor(canvas, ctx) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = ctx;
    this.pos;
    this.points = 200;
    this.radius = this.width / 2 - 15;
    this.factor = 0;
    this.angle;
    this.hue = 0
  }
  findPoints(num) {
    this.angle = mapRange(num, 0, this.points, 0, Math.PI * 2);
    this.x = this.radius * Math.cos(this.angle - Math.PI);
    this.y = this.radius * Math.sin(this.angle - Math.PI);
    this.pos = new Vector(this.x, this.y);
    return this.pos;
  }
  draw() {
    this.factor += 0.009;
    this.hue+= 0.5
    this.ctx.save()

    this.ctx.translate(this.width / 2, this.height / 2);
    this.ctx.beginPath();
    this.ctx.strokeStyle = `hsl(${this.hue}, 50%, 50%)`;
    this.ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    this.ctx.stroke();
   
    for (let i = 0; i < this.points; i++) {
      let a = this.findPoints(i)
      let b = this.findPoints(i * this.factor)
      this.ctx.beginPath()
      this.ctx.moveTo(a.x, a.y)
      this.ctx.lineTo(b.x, b.y)
      this.ctx.stroke()
    }
     this.ctx.restore();
  }
}

const cardioid = new Cardioid(canvas, ctx);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  cardioid.draw();

  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = canvas.width;
  canvas.height = canvas.height;
});
