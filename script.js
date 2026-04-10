let ball;
let paddle;

function setup() {
    createCanvas(600, 600);

    //bola
    ball = { 
        x: width / 2,
        y: height / 2,
        r: 10,
        vx: 2,
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
    vx 

    //raquete
    rectMode(CENTER);
    fill("yellow");
    rect(paddle.x, paddle.y, paddle.w, paddle.h);
}