'use strict'

function Player(canvas, x, y) {
  var self = this;

  self.x = x;
  self.y = y;
  self.radius = 10;
  self.size = 10;
  self.canvas = canvas;
  self.ctx = canvas.getContext('2d');

}

Player.prototype.draw = function() {
  var self = this;

  self.ctx.arc(self.x, self.y, self.radius, 0, 2 * Math.PI);
  self.ctx.stroke();
 
} 

// Player.prototype.mouseMoveHandler = function(){
//   var self = this;

//   var relativeX = e.clientX - canvas.offsetLeft;
//     if(relativeX > 0 && relativeX < canvas.width) {
//         playerX = relativeX - playerWidth/2;
//     }

//     document.addEventListener("mousemove", mouseMoveHandler, false);
// }


 








