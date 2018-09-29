function buildDom(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

function main() {

  var mainContainerElement = document.querySelector('#main-container');
  
  // -- Splash
  var splashElement = null;
  var splashButton = null;

  var handleSplashClick = function () {
    destroySplash();
    buildGame();
  }

  function buildSplash() {
    splashElement = buildDom(`
      <main class="splash container">
        <h1 class="splash__title">Chain Reaction</h1>
        <button>Start</button>
      </main>
    `)
    mainContainerElement.appendChild(splashElement);
    
    splashButton = document.querySelector('button');
    splashButton.addEventListener('click', handleSplashClick)

  }
  function destroySplash() {
    splashButton.removeEventListener('click', handleSplashClick);
    splashElement.remove();
  }

  // -- Game
  var game = null;
  var handleGameOver = function () {
    destroyGame();
    buildGameover();
  };

  function buildGame() {
    game = new Game(mainContainerElement)
  }

  function destroyGame() {
  }

  
  // -- Gameover
  var gameoverElement = null;
  var gameoverButton = null;

  var handleGameoverClick = function () {
    destroyGameover();
    buildGame();
  }

  function buildGameover() {
    gameoverElement = buildDom(`
      <main class="gameover container">
        <h1>Game Over</h1>
        <button>Restart</button>
      </main>
    `);
    mainContainerElement.appendChild(gameoverElement);

    gameoverButton = document.querySelector('button');
    gameoverButton.addEventListener('click', handleGameoverClick);

  }

  function destroyGameover() {
    gameoverButton.removeEventListener('click', handleGameoverClick);
    gameoverElement.remove();
  }

  buildSplash();
}

document.addEventListener('DOMContentLoaded', main);