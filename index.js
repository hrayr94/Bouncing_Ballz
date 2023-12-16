"use strict";
// Canvas setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth - 25;
canvas.height = innerHeight - 25;

let mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

let randomColor = () => {
  let colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];
  return colors[Math.floor(Math.random() * colors.length)];
};

addEventListener("mousemove", function (evt) {
  mouse.x = evt.clientX;
  mouse.y = evt.clientY;
});

addEventListener("resize", function () {
  canvas.width = this.innerWidth - 25;
  canvas.height = this.innerHeight - 25;
});

// Ball class
class Ball {
  constructor(x, y, radius, /* color,*/ velocityY, gravity, dampening) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = randomColor();
    this.velocityY = velocityY;
    this.gravity = gravity;
    this.dampening = dampening;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  update(canvas) {
    // Apply gravity
    this.velocityY += this.gravity;
    this.y += this.velocityY;
    // Check collision with bottom
    if (this.y + this.radius > canvas.height) {
      this.y = canvas.height - this.radius;
      this.velocityY = -this.velocityY * this.dampening; // Dampening effect
    }
    this.draw();
  }
}
// Array to store balls
const balls = [];
// Function to create a new ball at click position
function createBall(event) {
  const x = event.clientX - canvas.offsetLeft;
  const y = event.clientY - canvas.offsetTop;
  const radius = 30;
  //   const color = "#7ECEFD";
  const velocityY = 9.8;
  const gravity = 0.9;
  const dampening = 0.9;
  const newBall = new Ball(
    x,
    y,
    radius,
    /*color,*/ velocityY,
    gravity,
    dampening
  );

  //   commented because with the chain, the code did not work very well
  //   balls.length < 15 ? balls.push(newBall) : balls.shift().push(newBall);
  if (balls.length === 15) {
    balls.shift();
    balls.push(newBall);
  } else if (balls.length <= 15) {
    balls.push(newBall);
  }
}
// Event listener for mouse click to create a ball
canvas.addEventListener("click", createBall);
// Game loop
function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Update and draw each ball
  balls.forEach((ball) => {
    ball.update(canvas);
  });
  // Request next frame
  requestAnimationFrame(tick);
}
// Start the game loop

// tick();

// or

requestAnimationFrame(tick);
