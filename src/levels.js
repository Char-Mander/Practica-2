
//Start: cuando sale el primer coche
//End: cuando sale el ultimo (en tiempo)
//end deberia ser un booleano, mientras no gane o pierda sigue
//Gap: tiempo de espera entre uno y otro
var objetos = [
 // Start,    End, Gap,  Type,   Override
  [ 0,       4000, 7000, 'cblue' ],
  [ 0,   13000, 6000, 'cgreen' ],
  [ 0,  16000, 8000, 'cyellow' ],
  [ 0,  20000, 5000, 'vwhite'],
  [ 0,  20000, 7500, 'vbrown'],
  [ 0,   4000, 4000, 'swood' ],
  [ 0,   13000, 7000, 'mwood' ],
  [ 0,  16000, 8500, 'lwood' ],
  [ 0,  20000, 4500, 'turtle1'],
  [ 0,  20000, 8000, 'turtle2']
];



var Spawner = function(levelData) {
  this.levelData = [];

  for(var i = 0; i < levelData.length; i++) {
    this.levelData.push(Object.create(levelData[i]));//clona los datos
  }
  this.t = 0;
}

Spawner.prototype.draw = function(ctx) { }

Spawner.prototype.step = function(dt) {
  var idx = 0, remove = [], curShip = null;
 
 // Update the current time offset
  this.t += dt * 1000;

  //  Example levelData 
  //   Start, End,  Gap, Type,   Override
  // [[ 0,     4000, 500, 'step', { x: 100 } ]
  while((curShip = this.levelData[idx]) && 
        (curShip[0] < this.t + 2000)) {
   
    if(curShip[0] < this.t) {

      // Get the enemy definition blueprint
     if(idx < 5){ //Si va de 0-4 muestra tronco y tortuga
      var enemy = cars[curShip[3]],
          override = curShip[4];

      // Add a new enemy with the blueprint and override
      this.board.add(new Car(enemy,override));
    }else{
       var enemy = trunks[curShip[3]],
          override = curShip[4];

      this.board.add(new Trunk(enemy,override));
    }

      // Increment the start time by the gap
        curShip[0] += curShip[2]; 
    }
    idx++;
  }
  // Remove any objects from the levelData that have passed
  for(var i = 0, len = remove.length; i < len; i++) {
    var idx = this.levelData.indexOf(remove[i]);
    if(idx != -1) this.levelData.splice(idx,1);
  }
}