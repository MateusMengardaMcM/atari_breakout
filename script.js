let gamestate = "serve";

let ball;
let maxSpeed = 12;

let paddle;

let bricks = [];
let rows = 4;
let cols = 8;
let brickWidth = 60;
let brickHeight = 20;
let spacing = 5;
let brickSpeed = 1;

let score = 0;
let lifes = 3;

function setup() {
    //criação do canvas
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

    //chamando a função para a criação dos tijolos
    createBricks();
}

function draw() {
    background(0);

    //condicional para antes do início do jogo(serve)
    if (gamestate === "serve") {
        fill (255);
        textSize(16);
        text("CLIQUE EM QUALQUER LUGAR PARA INICIAAR O JOGO", width / 2 - 220, height / 2);

        //desenho da bola
        ball.x = width / 2;
        ball.y = height - 250;
        ball.vx = 0;
        ball.vy = 0;
    }

    //condicional para durante o jogo(play)
    if (gamestate === "play") {
        //movimento da bola
        ball.x += ball.vx;
        ball.y += ball.vy;

        //colisão da bola com as paredes
        if (ball.x - ball.r < 0 || ball.x + ball.r > width) ball.vx *= -1;
        if (ball.y - ball.r < 0) ball.vy *= -1;

        //colisão da bola com a raquete
        if (ball.y + ball.r > paddle.y - paddle.h / 2 &&
            ball.y + ball.r < paddle.y + paddle.h / 2 &&
            ball.x > paddle.x - paddle.w / 2 &&
            ball.x < paddle.x + paddle.w / 2) {
            ball.vy *= -1;
            let diff = ball.x - paddle.x;
            ball.vx = diff * 0.1;
        }

        //colisão da bola com os tijolos
        for (let i = bricks.length - 1; i >= 0; i--) {
            let b = bricks[i];
            if (ball.x + ball.r > b.x &&
                ball.x - ball.r < b.x + b.w &&
                ball.y + ball.r > b.y &&
                ball.y - ball.r < b.y + b.h) {
                ball.vy *= -1;
                score += 5;
                bricks.splice(i, 1);
                ball.vx *= 1.05;
                ball.vy *= 1.05;
                ball.vx = constrain(ball.vx, -maxSpeed, maxSpeed);
                ball.vy = constrain(ball.vy, -maxSpeed, maxSpeed);
                    break;
            }
        }

        //caso a bola saia da tela
        if (ball.y - ball.r > height) {
            lifes--;
            if (lifes > 0) {
                gamestate = "serve";
            }
            else {
                gamestate = "over";
            }
        }
    }

    if (gamestate === "over") {
        textSize(24);
        text("Game Over!", width / 2 - 70, height / 2);
    }

    if (bricks.length === 0 && gamestate === "play") {
        ball.vx = 0;
        ball.vy = 0;
        gamestate = "end";
    }

    if (gamestate === "end") {
        textSize(24);
        text("Parabéns, você venceu!", width / 2 - 120, height / 2);
    }

    //pontuação do player
    fill (255);
    textSize(16);
    text("Score: " + score, 20, 20);

    //vidas restantes para o player
    fill ("red");
    textSize(16);
    text("Vidas restantes: " + lifes, 20, 40);
    
    //bola
    ellipseMode(RADIUS);
    fill("white");
    ellipse(ball.x, ball.y, ball.r);

    //raquete
    rectMode(CENTER);
    fill("yellow");
    rect(paddle.x, paddle.y, paddle.w, paddle.h);
    paddle.x = constrain(mouseX, paddle.w / 2, width - paddle.w / 2);

    //desenho dos tijolos
    for (let i = 0; i < bricks.length; i++) {
        bricks[i].y += brickSpeed; //faz os tijolos descerem
        fill (bricks[i].color);
        rect(bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h);
        if (bricks[i].y + bricks[i].h >= paddle.y - paddle.h/2) {
            lives = 0;
            gamestate = "over";
            brickSpeed = 0;
        }
    }
}

function mousePressed() {
    if (gamestate === "serve") {
        ball.vx = random(-4, 4);
        ball.vy = 4;
        gamestate = "play";
    }
}

function createBricks() {
    bricks = [];
    let totalWidth = cols * (brickWidth + spacing) - spacing;
    let startX = (width - totalWidth) - 15;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            bricks.push({
                x: startX + c * (brickWidth + spacing),
                y: 80 + r * brickHeight,
                w: brickWidth - spacing,
                h: brickHeight - 5,
                color: [random(100,255), random(100,255), random(100,255)]
            });
        }  
    }
}