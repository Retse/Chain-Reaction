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
  self.time = 0;
  self.img = new Image();
  self.isFixed = false;
  self.timestamp = 0;
}

Player.prototype.draw = function() {
  var self = this;

  self.ctx.beginPath();
  self.ctx.strokeStyle = 'transparent';
  self.ctx.arc(self.x, self.y, self.radius, 0, 2 * Math.PI);
  self.ctx.stroke();

  self.img.src = "imagenes/luna_ok.png"

  self.ctx.drawImage(self.img, self.x - self.radius, self.y - self.radius);
} 

Player.prototype.colision = function(myBall) {
  var self = this;

  if (self.isFixed) {
    var dx = (self.x) - (myBall.x );
    var dy = (self.y) - (myBall.y );
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < self.radius + myBall.radius) {
        return true;
    }
    return false;
  }
}

Player.prototype.killMe = function(){
  var self = this;

  self.isFixed = true;
  self.timestamp = Date.now();
}

Player.prototype.clearPlayer = function(){
  var self = this;
}





 








