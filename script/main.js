var gameElement = document.getElementById("game");
gameElement.focus();

var gameMessageElement = document.getElementById("game-message");

var game = new Game(gameElement, gameMessageElement);
game.start();
