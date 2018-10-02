'use strict'

function Player (canvas, x, y) {
  var self = this;

  self.x = x;
  self.y = y;
  self.radius = 45;
  self.size = 10;
  self.canvas = canvas;
  self.ctx = canvas.getContext('2d');
  self.isAlive = true;
 
}

Player.prototype.draw = function() {
  var self = this;

  self.ctx.beginPath();
  self.ctx.strokeStyle = 'white';
  self.ctx.arc(self.x, self.y, self.radius, 0, 2 * Math.PI);
  self.ctx.stroke();
} 

Player.prototype.colision = function(myBall) {
  var self = this;

  var dx = (self.x + self.radius) - (myBall.x + myBall.radius);
  var dy = (self.y + self.radius) - (myBall.y + myBall.radius);
  var distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < self.radius + myBall.radius) {
      return true;
  }
  return false;
}

Player.prototype.killMe = function(){
  var self = this;

  setTimeout(function(){ 
    self.isAlive = false;
  }, 5000);
  }

  

Player.prototype.clearPlayer = function(){
  var self = this;



}





 








