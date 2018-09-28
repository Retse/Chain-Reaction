# CHAIN REACTION

## Description
Chain Reaction es un sencillo y adictivo juego en el que tendrás como objetivo encadenar el máximo de bolas.
Al inicio del juego, podrás mover libremente un circulo a través de toda la pantalla. Cuando hayas decidido el punto más estratégico, simplemente haz click con el botón izquierdo del ratón y el circulo quedará fijo en la pantalla durante 5 segundos. Pasado este tiempo, desaparecerá! 
Simultáneamente, habrán 15 bolitas moviéndose aleatoriamente por la pantalla. Tienes que intentar que al menos una de las bolitas colisione con el circulo inicial antes de que este desaparezca. Si consigues esto, la bolita se expandirá y también quedará fija durante 5 segundos, esperando que otras bolitas colisionen con ella también. De esta forma podrás ir creando una reacción en cadena que tendrás que procurar que sea lo más larga posible! 

## MVP (DOM - CANVAS)
- Circulo con movimiento a través del mouse (controlado por el player).
- Click con el mouse = Circulo fijo en un punto.
- Circulo = tiempo de 5 segundos y después desaparezca.
- 15 bolitas con movimiento aleatorio diagonal.
- Colisión entre el circulo inicial y las bolitas.
- Pasados 5 segundos, cuando desaparezca el circulo inicial, se acaba el juego.

## Backlog
- Asignar colores a bolitas.
- Si colisión, bolita = características del circulo inicial (expansión + duración de 5 segundos).
- Colisión entre bolitas que ya tienen las características del circulo inicial.
- Añadir puntos bolitas expandidas (dependiendo de colores) (
- Fin del juego cuando no hay más colisiones antes de que finalicen los 5 segundos de la última bolita en expansión o cuando se hayan encadenado todas las bolitas y la pantalla esté vacía. 

## Data structure

### GAME.JS

#### Constructor

- function Game(ctx, canvas) {

#### Propiedades del constructor

self.callBack

self.ctx

self.canvas

self.balls

self.player

#### Metodos

- Game.prototype.start = function () 
- Game.prototype._startLoop = function () 
- Game.prototype._updateAll = function ()
- Game.prototype._renderAll = function ()
- Game.prototype._clearAll = function ()
- Game.prototype._checkBallColisionWithPlayer = function()
- Game.prototype._drawPlayer ()
- Game.prototype._isPlayerAlive = function ()
- Game.prototype.isBallAlive = function ()
- Game.prototype.destroy = function ()

### BALLS.JS
- Ball(canvas, x, y, color, speed) { 
  self.x

  self.y

  self.radius

  self.direction 0 (cambiará)

  self.speed

  self.canvas

  self.ctx

  self.color

}

- Ball.prototype.update()
- Ball.prototype.draw()
- Ball.prototype.clear()

### PLAYER.JS
- Player(canvas, x, y) {

  self.x

  self.y

  self.radius

  self.canvas

  self.ctx

}

- Player.prototype.update()
- Player.prototype.draw()
- Player.prototype.clear()
- Player.prototype.alive()


## States y States Transitions
- splashScreen:  destroySplash + buildGame  
- gameScreen: destroyGame + setTimeout(buildGameOver) = 2’’ 
- gameoverScreen: destroyGameOver + buildGame 

## Task

- Crear Splash Screen
- Crear Game Screen
- Crear Game Over Screen
- Destroy Splash
- Build Game
- Destroy Game
- Build Game Over
- Build Game
- Destroy Game Over
- Game Screen: head & Canvas
- Head: title game, total points & balls expanded
- Game Over Screen: Game Over button & total points button
- Detect click (addEventListener)
- Canvas: Create player 
- Clear player
- Create ball
- Colision
- Time player
- Game - gameOver
- Game - loop
- Game - gameOver


## Links

Trello
[Link url](https://trello.com)

## Git
URls for the project repo and deploy
[Link Repo](http://github.com)
[Link Deploy](http://github.com)

## Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)