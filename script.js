class Particle {
  constructor() {
    this.pos = new Vector(
      Math.random() * w * 3 - w,
      Math.random() * h * 3 - h
    );
    this.vel = new Vector(0, 0);
  }
  applyForce(planet) {
    let diff = this.pos.sub(planet);
    let angle = diff.getAngle();
    let force = diff.multTo(0.004);
    force.setAngle(angle - Math.PI*1.4);
    this.vel.addTo(force);
  }
  move() {
    this.pos.addTo(this.vel);
    if(this.vel.getLength() > 0.6) {
      this.vel.setLength(0.6);
    }
  }
  draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.pos.x, this.pos.y, 2, 2);
  }
}

let canvas;
let ctx;
let w, h;
let particles;
let center;

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  resize();
  window.addEventListener("resize", () => {
    resize();
  });
  canvas.addEventListener("click", onClick);
  particles = [];
  let nrOfParticles = w * h * 0.01;
  for(let i = 0; i < nrOfParticles; i++) {
    let p = new Particle();
    particles.push(p);
  }
  center = new Vector(w / 2, h / 2);
}

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function onClick(event) {
  center.x = event.clientX;
  center.y = event.clientY;
}

function draw() {
  requestAnimationFrame(draw);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);

  console.log(particles.length);
  particles.forEach(particle => {
    particle.applyForce(center);
    particle.move();
    particle.draw();
  });
  ctx.fillStyle = "red";
  ctx.fillRect(center.x, center.y, 3, 3);
}

setup();
draw();