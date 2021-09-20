var canvas;
var playerPaddle;
var computerPaddle;
var ball;
var ball_velocityX = 0;
var ball_velocityY = 0;
var gameState = "start";
var multiplayer = false;
var playerScore = 0;
var computerScore = 0;

function setup() 
{
  canvas = createCanvas(windowWidth, windowHeight);
  playerPaddle = new Paddle();
  computerPaddle = new Paddle();
  ball = new Ball();
  
  ball.xPosition = canvas.width/2;
  ball.yPosition = canvas.height/2;
  
  playerPaddle.xPosition = canvas.width/2 - 50;
}

function draw() 
{
  // Background
  background("darkGray");
  
  drawnet();
  
  // Draw Scores
  textSize(16);
  text(playerScore, canvas.width - 100, 100);
  text(computerScore, 100, 100);
  
  // Start, Multiplayer & Game Over
  if(gameState === "start"){
    text("Tap to Serve", canvas.width/2-40, windowHeight/4*2.7);
    if(touches.length > 0 && touches.length < 10){
      serve();
    }
    if(multiplayer === false){
      if(keyIsDown(81)){
        computerScore = 0;
        playerScore = 0;
        multiplayer = true;
      }
    }
    else{
      text("Press E for single player", canvas.width/2-75, windowHeight/4*3);
      
      if(keyIsDown(69)){
        computerScore = 0;
        playerScore = 0;
        multiplayer = false;
      }
    }
  }
  else if (gameState === "end"){
    text("Game Over! Tap to restart", canvas.width/2-80, windowHeight/4*2.7);
    
    if(touches.length > 0){
      playerScore = 0;
      computerScore = 0;
      gameState = "start";
    }
  }
  
  // P1
  playerPaddle.yPosition = canvas.height - 10;
  playerMovement();
  playerPaddle.display();
  
  // P2
  computerPaddle.yPosition = 0;
  computerMovement();
  computerPaddle.display();
  
  // Ball
  ball.display();
  
  ball.xPosition += ball_velocityX;
  ball.yPosition += ball_velocityY;
  
  bounceBall();
  
  // Add Score
  if(ball.yPosition > canvas.height){
    computerScore += 1;
    gameState = "start";
    reset();
  }
  else if (ball.yPosition < 0){
    playerScore += 1;
    gameState = "start";
    reset();
  }
  
  if(playerScore === 5 || computerScore === 5){
    gameState = "end";
  }
}

function drawnet(){
  for (var num = 5; num < canvas.width; num=num+20) {
    line(num, canvas.height/2, num + 10, canvas.height/2);
  }
}

function serve(){
  ball_velocityX = random(2,5);
  ball_velocityY = random(2,5);
  gameState = "play";
}

function reset(){
  ball_velocityX = 0;
  ball_velocityY = 0;
  ball.xPosition = canvas.width/2;
  ball.yPosition = canvas.height/2;
}

function bounceBall(){
  // Bounce with Paddles
  if(ball.yPosition > canvas.height -15 && ball.xPosition > playerPaddle.xPosition && ball.xPosition < playerPaddle.xPosition + 100 && ball.yPosition < canvas.height){
    ball_velocityY = ball_velocityY * -1.03;
  }
  else if(ball.yPosition < 15 && ball.xPosition > computerPaddle.xPosition && ball.xPosition < computerPaddle.xPosition + 100 && ball.yPosition > 0){
    ball_velocityY = ball_velocityY * -1.03;
  }
  
  // Bounce with Edges
  if(ball.xPosition > canvas.width - 10 || ball.xPosition < 10){
    ball_velocityX = ball_velocityX * -1.03;
  }
}

function playerMovement(){
  if(keyIsDown(RIGHT_ARROW) && playerPaddle.xPosition < canvas.width - 100)
  {
    playerPaddle.xPosition += 5;
  }
  
  if(keyIsDown(LEFT_ARROW) && playerPaddle.xPosition > 0)
  {
    playerPaddle.xPosition -= 5;
  }
  
  if(touches.length > 0){
    playerPaddle.xPosition = mouseX - 50;
  }
}

function computerMovement(){
  if(multiplayer === false){
    if(ball.xPosition > 50 && ball.xPosition < canvas.width - 50){
      computerPaddle.xPosition = ball.xPosition - 50;
    }
  }
  else{
    if(keyIsDown(83) && computerPaddle.yPosition < canvas.height - 100)
    {
        computerPaddle.yPosition += 5;
    }
  
    if(keyIsDown(87) && computerPaddle.yPosition > 0)
    {
      computerPaddle.yPosition -= 5;
    }
  }
}