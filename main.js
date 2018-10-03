'use strict'

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

  function handleSplashClick () {
    destroySplash();
    buildGame();
  }

  function buildSplash() {
    splashElement = buildDom(`
      <main class="splash container">
        <h1 class="splash__title">Space Reaction</h1>
        <p>Leave the moon at a fixed point on the screen, where it would make the maximum collisions before the counter reaches 0.
        <b>Good luck!</b></p>
        <button>START</button>
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
    buildGameover(game.sumatorio);
  };

  function buildGame() {
    game = new Game(mainContainerElement)
    game.onOver(handleGameOver)

  }

  function destroyGame() {
    game.destroy();
  }

    
  // -- Gameover
  var gameoverElement = null;
  var gameoverButton = null;

  var handleGameoverClick = function () {
    destroyGameover();
    buildGame();
  }

  function buildGameover(puntuacion) {
    gameoverElement = buildDom(`
      <main class="gameover container">
        <h1>Game Over</h1>
        <p>Total Points: <span class="puntuacion"></span></p>
        <button>PLAY AGAIN</button>
      </main>
    `);
    mainContainerElement.appendChild(gameoverElement);

    gameoverButton = document.querySelector('button');
    gameoverButton.addEventListener('click', handleGameoverClick);

    var puntuacionElement = document.querySelector('.puntuacion');
    puntuacionElement.innerText = game.totalPoints;

    }

  function destroyGameover() {
    gameoverButton.removeEventListener('click', handleGameoverClick);
    gameoverElement.remove();
  }

  buildSplash();
}

document.addEventListener('DOMContentLoaded', main);