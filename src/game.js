/*
// Especifica lo que se debe pintar al cargar el juego
var startGame = function() {
  Game.setBoard(0,new TitleScreen("Frogger", 
                                  "Press fire to start playing",
                                  playGame));
}
*/

var frog;

var playGame = function() {

  var board = new GameBoard();
  
  Game.setBoard(0,new Background()); //Pantalla de juego
  board.add(new Car(cars.cgreen));
  board.add(new Car(cars.cyellow));
  board.add(new Car(cars.cblue));
  board.add(new Car(cars.vwhite));
  board.add(new Car(cars.vbrown));
  board.add(new Trunk(trunks.swood));
  board.add(new Trunk(trunks.mwood));
  board.add(new Trunk(trunks.lwood));
  board.add(new Trunk(trunks.turtle1));
  board.add(new Trunk(trunks.turtle2));

  Game.frogP = new Player();
  board.add(Game.frogP);

 
  Game.setBoard(1,board);
  //Game.setBoard(2,new Level(level1,winGame)); //Crea el nivel con los enemigos  
}

//var createPlayer = function(){ Game.frogP = new Player();};


var winGame = function() {
  Game.setBoard(3,new TitleScreen("You win!", 
                                  "Press space to play again",
                                  playGame));
};



var loseGame = function() {
  Game.setBoard(3,new TitleScreen("You lose!", 
                                  "Press space to play again",
                                  playGame));
};


// Indica que se llame al método de inicialización una vez
// se haya terminado de cargar la página HTML
// y este después de realizar la inicialización llamará a
// startGame
window.addEventListener("load", function() {
  Game.initialize("game",sprites,playGame);
});
