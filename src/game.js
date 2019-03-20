
var board; //Board de fondo nivel 1
var boardLevel2; //Variable para guardar el objeto del tablero que muestra los titlescreen y la calavera

// Especifica lo que se debe pintar al cargar el juego
var startGame = function() {  
  Game.setBoard(0,new TitleScreen("Frogger", 
                                  "Press space to start playing",
                                  playGame));
}


var playGame = function() {

  board = new GameBoard(); //Fondo para background y coches, tronco, rana...

  /*### Crea el fondo (nivel 2) que contendra la calavera si pierde y los mensajes win o lose ###*/
  boardLevel2 = new GameBoard();
  Game.setBoard(2,boardLevel2);//Resetea el fondo 2

  Game.setBoard(0,new Background()); //Pantalla de juego
  board.add(new Car(cars.cgreen));
  board.add(new Car(cars.cyellow));
  board.add(new Car(cars.cblue));
  board.add(new Car(cars.vwhite));
  board.add(new Car(cars.vbrown));
  board.add(new Water());
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

var winGame = function() {
  boardLevel2.add(new TitleScreen("You win!", 
                                  "Press space to play again",
                                  playGame));
    Game.setBoard(2,boardLevel2);
};



var loseGame = function() {
  boardLevel2.add(new TitleScreen("You lose!", 
                                  "Press space to play again",
                                  playGame));

  Game.setBoard(2,boardLevel2);
};


// Indica que se llame al método de inicialización una vez
// se haya terminado de cargar la página HTML
// y este después de realizar la inicialización llamará a
// startGame
window.addEventListener("load", function() {
  Game.initialize("game",sprites,startGame);
});
