
var boardIni; //Board nivel 0
var board; //Board de fondo nivel 1
var boardLevel2; //Variable para guardar el objeto del tablero que muestra los titlescreen y la calavera

// Especifica lo que se debe pintar al cargar el juego
var startGame = function() { 

  boardIni = new GameBoard();
  boardIni.add(new TitleScreen("", 
                                  "Press fire to start playing",
                                  playGame));
  boardIni.add(new Title(150,150)); //Pinta sprite del titulo

  Game.setBoard(0,boardIni);
}


var playGame = function() {

  boardIni = new GameBoard();
  boardIni.add(new Background());
  Game.setBoard(0,boardIni); //Pantalla de juego
  board = new GameBoard(); //Fondo para background y coches, tronco, rana...

  //Crea el fondo (nivel 2) que contendra la calavera si pierde y los mensajes win o lose
  boardLevel2 = new GameBoard();
  Game.setBoard(2,boardLevel2);//Resetea el fondo 2

  /*board.add(new Car(cars.cgreen));
  board.add(new Car(cars.cyellow));
  board.add(new Car(cars.cblue));
  board.add(new Car(cars.vwhite));
  board.add(new Car(cars.vbrown));*/
  board.add(new Trunk(trunks.swood));
  board.add(new Trunk(trunks.mwood));
  board.add(new Trunk(trunks.lwood));
  board.add(new Trunk(trunks.turtle1));
  board.add(new Trunk(trunks.turtle2));

  board.add(new Water());
  board.add(new Home());

  Game.frogP = new Player();
  board.add(Game.frogP);

  Game.setBoard(1,board);
  //Game.setBoard(2,new Level(level1,winGame)); //Crea el nivel con los enemigos  
}

var winGame = function() {
  boardLevel2.add(new TitleScreen("You win!", 
                                  "Press fire to play again",
                                  playGame));
    Game.setBoard(2,boardLevel2);
};



var loseGame = function() {
  boardLevel2.add(new TitleScreen("You lose!", 
                                  "Press fire to play again",
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
