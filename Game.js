'use strict'

function Game(parentElement) {
  var self = this;

  self.parentElement = parentElement;
  self.gameOverCallback = null;

  self.totalPoints = 0;
  self.sound = new Audio('boom.mp3');


  self._init();
  self._startLoop()
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
        <h1>Space Reaction</h1>
        <div class="time">
          <span class="label">Time Remaining: </span>
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

  self.pointsElement = self.gameElement.querySelector('.points .value');
  self.timeElement = self.gameElement.querySelector('.time .value');

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
  self.playerTimeToLive = 5000;
  self.isGameOver = false;

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
   
    if (!self.isGameOver) {
      requestAnimationFrame(loop);
    } else {
      // game over
      self.gameOverCallback();
    }
    
  }

  requestAnimationFrame(loop);

}

Game.prototype._clearAll = function () {
  var self = this;
  self.ctx.clearRect(0, 0, self.width, self.height);

}

Game.prototype._updateAll = function () {
  var self = this;

  self.balls.forEach(function(item){
    item.update();
  });

  self._updateUI();

  self._checkAllCollisions();
  self._checkIfGameIsOver();

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
  for (var i = 0; i < 20 ; i++){
    var randomX = Math.random() * self.width * 0.9;
    var randomY = Math.random() * self.height * 0.9;
    var randomDX = Math.floor(Math.random()*2);
    var randomDY = Math.floor(Math.random()*2);
    self.balls.push(new Ball(self.canvasElement, randomX, randomY, directions[randomDX], directions[randomDY],i));
  }
}

Game.prototype._updateUI = function () {
  var self = this;
  self.timeElement.innerText = self._getTime();
  self.pointsElement.innerText = self.totalPoints;
}

Game.prototype._getTime = function () {
  var self = this;
  if (self.player.isFixed) {  
    var currentTime = Date.now();
    var timeConsumed = currentTime - self.player.timestamp;
    var finalTime = self.playerTimeToLive - timeConsumed;
    return Math.floor(finalTime/1000);
  }
  return Math.floor(self.playerTimeToLive / 1000);
}


Game.prototype._checkAllCollisions = function () {
  var self = this;

  self.balls.forEach(function (item, idx) {
    if (self.player.colision(item)) {
      self.sound.currentTime = 0;
      self.balls.splice(idx, 1);
      self.playerTimeToLive += 1000;
      self.totalPoints += 50;
      self.sound.play();
    }
  });
}

Game.prototype._checkIfGameIsOver = function () {
  var self = this;
  var currentTime = Date.now();
  if (self.player.isFixed && (currentTime - self.player.timestamp > self.playerTimeToLive || self.balls.length === 0)) {
    self.isGameOver = true;

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






