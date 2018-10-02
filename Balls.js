'use strict'

function Ball(canvas, x, y, dx, dy, number) {
  var self = this;

  self.x = x;
  self.y = y;
  self.dx = dx;
  self.dy = dy;
  self.color;
  self.radius = 7;
  self.size = 7;
  self.speed = 1.5;
  self.canvas = canvas;
  self.maxHeight = canvas.height;
  self.maxWidth = canvas.width;
  self.ctx = canvas.getContext('2d');
  self.number = number;
      
}

Ball.prototype.draw = function() {
  var self = this;
  
  self.ctx.beginPath();
  self.ctx.strokeStyle = 'white';
  self.ctx.arc(self.x, self.y, self.radius, 0, 2 * Math.PI);
  self.ctx.stroke();
  self.ctx.fillStyle = 'white';
  self.ctx.fill();
} 

Ball.prototype.update = function () {
  var self = this;

  self.x = self.x + (self.speed * self.dx);
  self.y = self.y + (self.speed * self.dy);

  self._checkLimits();
}

Ball.prototype._checkLimits = function () {
var self = this;
  
  if (self.x + self.radius > self.maxWidth || self.x - self.radius < 0) {
    self.dx = self.dx * -1;
    
  } 

  if (self.y + self.radius > self.maxHeight || self.y - self.radius < 0 ) {
    self.dy = self.dy * -1;
  }
};


