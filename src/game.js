
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
  var orden = [new Spawner(objetos), new Water(), new Home(), new Player()];

  boardIni = new GameBoard();
  boardIni.add(new Background());
  Game.setBoard(0,boardIni); //Pantalla de juego
  board = new GameBoard(); //Fondo para background y coches, tronco, rana...

  //Crea el fondo (nivel 2) que contendra la calavera si pierde y los mensajes win o lose
  boardLevel2 = new GameBoard();
  Game.setBoard(2,boardLevel2);//Resetea el fondo 2

 /* board.add(new Spawner(objetos));

  board.add(new Water());
  board.add(new Home());

  Game.frogP = new Player();
  board.add(Game.frogP);*/
  for(var i = 0, len = orden.length; i < len; i++)
    board.add(orden[i]);

  Game.setBoard(1,board);
  //Game.setBoard(2,new Spawner(coches,winGame)); //Crea el nivel con los enemigos  
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
