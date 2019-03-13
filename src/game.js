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
  board.add(new Car(cars.cgreen));
  board.add(new Car(cars.cyellow));
  board.add(new Car(cars.cblue));
  board.add(new Car(cars.swood));
  board.add(new Car(cars.mwood));
  board.add(new Car(cars.lwood));
  board.add(new Car(cars.swood, {y: 250}));
  board.add(new Car(cars.mwood, {y: 200}));
  board.add(new Car(cars.vwhite));
  board.add(new Car(cars.vbrown));



/*
//Pruebas
  board.add(new Car(cars.floor, {x:150})); //Cuidado con la config de x,y aqui, hay conflicto con lo ya definido
  board.add(new Car(cars.mosca, {x:250}));
  board.add(new Car(cars.turtle_, {x:350}));
*/


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
