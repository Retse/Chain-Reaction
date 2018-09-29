function Game(parentElement) {
  var self = this;

  self.parentElement = parentElement;
  self.gameOverCallback = null;

  self._init();
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

  self.pointsElement = self.gameElement.querySelector('.total points .value');
  self.ballsElement = self.gameElement.querySelector('.balls expanded .value');

  self.width = self.canvasParentElement.clientWidth;
  self.height = self.canvasParentElement.clientHeight;

  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);

  self.ctx = self.canvasElement.getContext('2d');
}


