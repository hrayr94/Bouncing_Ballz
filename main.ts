// Canvas setup
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

// Ball class
class Ball {
  constructor(
    public x: number,
    public y: number,
    public radius: number,
    public color: string,
    public velocityY: number,
    public gravity: number,
    public dampening: number
  ) {}

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update(canvas: HTMLCanvasElement) {
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
const balls: Ball[] = [];

// Function to create a new ball at click position
function createBall(event: MouseEvent) {
  const x = event.clientX - canvas.offsetLeft;
  const y = event.clientY - canvas.offsetTop;
  const radius = 30;
  const color = "#0095DD";
  const velocityY = 0;
  const gravity = 0.5;
  const dampening = 0.8;
  const newBall = new Ball(x, y, radius, color, velocityY, gravity, dampening);
  balls.push(newBall);
  console.log(balls);
}

// Event listener for mouse click to create a ball
canvas.addEventListener("click", createBall);

// Game loop
function tick(currentTime: number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw each ball
  balls.forEach((ball) => {
    ball.update(canvas);
  });

  // Request next frame
  requestAnimationFrame(tick);
}

// Start the game loop
requestAnimationFrame(tick);
