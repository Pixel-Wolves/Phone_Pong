class Paddle
{
  constructor()
  {
    this.xPosition=390;
    this.yPosition=160;
    this.widht=100;
    this.height=10;
  }
  
  display()
  {
    rect(this.xPosition, this.yPosition, this.widht, this.height);
  }
}