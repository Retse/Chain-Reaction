'use strict'

function Game(parentElement) {
  var self = this;

  self.parentElement = parentElement;
  self.gameOverCallback = null;

  self._init();
  self._startLoop()
  // setTimeout(function() {
  //   self.gameOverCallback();
  // },3000);
}

Game.prototype._init = function () {
  var self = this;

  self.gameElement = buildDom(`
    <main class="game container">
      <header class="game__header">
        <div class="points">
          <span class="label">Total Points: </span>
          <span class="value"></span>
        </div>
        <h1>Chain Reaction</h1>
        <div class="balls">
          <span class="label">Balls Expanded: </span>
          <span class="value"></span>
        </div>
      </header>
      <div class="game__canvas">
        <canvas class="canvas"></canvas>
      </div>
    </main>
  `)

  self.parentElement.appendChild(self.gameElement);

  self.canvasParentElement = document.querySelector('.game__canvas');
  self.canvasElement = document.querySelector('.canvas');

  self.puntuacionElement = self.gameElement.querySelector('.puntuacion .value');
  self.explosionesElement = self.gameElement.querySelector('.explosiones .value');

  self.width = self.canvasParentElement.clientWidth;
  self.height = self.canvasParentElement.clientHeight;

  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);

  self.ctx = self.canvasElement.getContext('2d');

}

Game.prototype._startLoop = function() {
  var self = this;
  self.player = new Player (self.canvasElement, 100, 100);
  self.balls = [];

  self._createBalls();
    
  self.handleMouseMove = function(event) {
    var rect = self.canvasElement.getBoundingClientRect();
    self.player.x = event.clientX - rect.left;
    self.player.y = event.clientY - rect.top;
    }
    
  self.canvasElement.addEventListener('mousemove', self.handleMouseMove)
  
  self.handleMouseClick = function(event) {
    var rect = self.canvasElement.getBoundingClientRect();
    self.player.x = event.clientX - rect.left;
    self.player.y = event.clientY - rect.top;

    self.canvasElement.removeEventListener('mousemove', self.handleMouseMove)
    self.player.killMe();
  }

   self.canvasElement.addEventListener('click', self.handleMouseClick)
   
  function loop() {

    self._clearAll();
    self._updateAll();
    self._drawAll();
   
    if (self._isPlayerAlive()) {
      requestAnimationFrame(loop);
    } else {
      // game over
      self.gameOverCallback();
    }
    
  }

  requestAnimationFrame(loop);

}

Game.prototype._isPlayerAlive = function() {
  var self = this;

  return self.player.isAlive;
}

Game.prototype._clearAll = function () {
  var self = this;
  self.ctx.clearRect(0, 0, self.width, self.height);

}

Game.prototype._updateAll = function () {
  var self = this;

  self.balls.forEach(function(item){
    item.update();
    self.player.colision(item);
    if (self.player.colision(item)){
      
    }
  });

}

Game.prototype._drawAll = function () {
  var self = this;

  self.balls.forEach(function(item){
    item.draw();
  });

  if (self.player.isAlive) {
    self.player.draw();
  }
}

Game.prototype._createBalls = function () {
  var self = this;
  var directions = [-1,1];
  for (var i = 0; i < 15 ; i++){
    var randomX = Math.random() * self.width * 0.9;
    var randomY = Math.random() * self.height * 0.9;
    var randomDX = Math.floor(Math.random()*2);
    var randomDY = Math.floor(Math.random()*2);
    self.balls.push(new Ball(self.canvasElement, randomX, randomY, directions[randomDX], directions[randomDY]));
    
    }
  }

Game.prototype.destroy = function () {
  var self = this;
  self.gameElement.remove();
} 

Game.prototype.onOver = function (callback) {
  var self = this;
  self.gameOverCallback = callback;
}






