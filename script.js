let ball;
let paddle;

function setup() {
    createCanvas(600, 600);

    //bola
    ball = { 
        x: width / 2,
        y: height / 2,
        r: 10,
        vx: 0,
        vy: 0
    }

    //raquete
    paddle = {
        x: width / 2,
        y: height - 20,
        w: 100,
        h: 10
    }
}

function draw() {
    background(0);
    
    //bola
    ellipseMode(RADIUS);
    fill("white");
    ellipse(ball.x, ball.y, ball.r);
    ball.vx = random(-4, 4);
    ball.vy = 4;
    ball.x += ball.vx;
    ball.y += ball.vy;

    //raquete
    rectMode(CENTER);
    fill("yellow");
    rect(paddle.x, paddle.y, paddle.w, paddle.h);
    paddle.x = constrain(mouseX, paddle.w / 2, width - paddle.w / 2);
}