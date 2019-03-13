/*
// Especifica lo que se debe pintar al cargar el juego
var startGame = function() {
  Game.setBoard(0,new TitleScreen("Frogger", 
                                  "Press fire to start playing",
                                  playGame));
}
*/

var playGame = function() {

  var board = new GameBoard();
  Game.setBoard(0,new Background()); //Pantalla de juego
  board.add(new Player()); //Pantalla de juego
  board.add(new Car(cars.cgreen, {x:100}));
  board.add(new Car(cars.swood, {x:200}));
  board.add(new Car(cars.cyellow, {x:300})); //Probar con esto que tenemos las dimensiones bien cogidas!!!!

  Game.setBoard(1,board);
  //Game.setBoard(2,new Level(level1,winGame)); //Crea el nivel con los enemigos  

}

var winGame = function() {
  Game.setBoard(3,new TitleScreen("You win!", 
                                  "Press fire to play again",
                                  playGame));
};



var loseGame = function() {
  Game.setBoard(3,new TitleScreen("You lose!", 
                                  "Press fire to play again",
                                  playGame));
};


// Indica que se llame al método de inicialización una vez
// se haya terminado de cargar la página HTML
// y este después de realizar la inicialización llamará a
// startGame
window.addEventListener("load", function() {
  Game.initialize("game",sprites,playGame);
});
