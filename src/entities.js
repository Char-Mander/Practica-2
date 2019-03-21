var sprites = {
  blue_car: { sx: 8, sy: 6, w: 90, h: 49, frames: 1 },
  green_car: { sx: 108, sy: 4, w: 95, h: 51, frames: 1 },
  yellow_car: { sx: 213, sy: 6, w: 95, h: 49, frames: 1 },

  white_van: { sx: 6, sy: 62, w: 125, h: 46, frames: 1 },
  brown_van: { sx: 148, sy: 62, w: 199, h: 47, frames: 1 },

  yellow_skull: { sx: 211, sy: 128, w: 46, h: 35, frames: 1 },
  orange_skull: { sx: 259, sy: 128, w: 46, h: 35, frames: 1 },
  grey_skull: { sx: 307, sy: 128, w: 46, h: 35, frames: 1 },
  green_skull: { sx: 355, sy: 128, w: 46, h: 35, frames: 1 },

  medium_wood: { sx: 9, sy: 122, w: 191, h: 39, frames: 1 },
  large_wood: { sx: 9, sy: 171, w: 248, h: 39, frames: 1 },
  small_wood: { sx: 270, sy: 171, w: 131, h: 39, frames: 1 },

  leaf: { sx: 4, sy: 234, w: 44, h: 40, frames: 1 },
  fly: { sx: 58, sy: 239, w: 31, h: 34, frames: 1 },

  green_floor: { sx: 95, sy: 225, w: 58, h: 57, frames: 1 },
  blue_floor: { sx: 158, sy: 225, w: 58, h: 57, frames: 1 },
  black_floor: { sx: 221, sy: 225, w: 58, h: 57, frames: 1 },
  grass_floor: { sx: 284, sy: 225, w: 58, h: 57, frames: 1 },
  leaf_floor: { sx: 348, sy: 225, w: 58, h: 57, frames: 1 },

  turtle_dive: { sx: 5, sy: 288, w: 50, h: 47, frames: 9 },
  frog_move: { sx: 0, sy: 339, w: 40, h: 40, frames: 7 },
  turtle: { sx: 281, sy: 344, w: 49, h: 43, frames: 2 },

  title: { sx: 8, sy: 395, w: 261, h: 164, frames: 1 },
  background: { sx: 421, sy: 0, w: 550, h: 625, frames: 1 },

  water: { sx: -150, sy: 563, w: 550, h: 242, frames: 1 }, //Sprite transparente
  winner: { sx: -150, sy: 563, w: 550, h: 20, frames: 1 } //Sprite transparente
};

var OBJECT_PLAYER = 1,
  OBJECT_DEATH = 2,
  OBJECT_CAR = 4,
  OBJECT_BACKGROUND = 8,
  OBJECT_TRUNK = 16,
  OBJECT_WATER = 32;

//Se resetea el valor al final de step de Player
//var enTronco = false; //Para saber si esta en el tronco


/// CLASE PADRE SPRITE
var Sprite = function () { }

Sprite.prototype.setup = function (sprite, props) {
  this.sprite = sprite;
  this.merge(props);
  this.frame = this.frame || 0;
  this.w = SpriteSheet.map[sprite].w;
  this.h = SpriteSheet.map[sprite].h;
}

Sprite.prototype.merge = function (props) {
  if (props) {
    for (var prop in props) {
      this[prop] = props[prop];
    }
  }
}
Sprite.prototype.draw = function (ctx) {
  SpriteSheet.draw(ctx, this.sprite, this.x, this.y, this.frame);
}

Sprite.prototype.hit = function (damage) {
  this.board.remove(this);
}


var Background = function () {
  this.setup('background', { vx: 0, frame: 0, reloadTime: 0.25, maxVel: 0 });
  this.x = 0;
  this.y = 0;
}
Background.prototype = new Sprite();
Background.prototype.type = OBJECT_BACKGROUND;
Background.prototype.step = function () { };

//TITLE

var Title = function (centerX, centerY) {
  this.setup('title', {vx:0, frame: 0, reloadTime: 0, maxVel: 0 });
  this.x = centerX;
  this.y = centerY;
};

Title.prototype = new Sprite();
Title.prototype.step = function (dt) {};


// PLAYER

var Player = function () {
  var hasClicked = false;

  this.setup('frog_move', { vx: 0, vy: 0, frame: 0, reloadTime: 0.25, maxVel: 1});

  this.x = Game.width / 2 - this.w / 2;
  this.y = Game.height + this.h / 2;
  this.reload = this.reloadTime;
  this.subFrame = 0;

  //Metodo que mantiene a la rana encima del tronco
  this.onTrunk = function(vt){
  	this.enTronco = true;
  	this.vx = vt;
  }



  this.step = function (dt) {
  if(!hasClicked){
    this.hasClicked = true;
    if (Game.keys['left']) {
      this.vx = -this.maxVel;
      this.x += 7.5*this.vx;

      this.frame = Math.floor(this.subFrame++ / 3);
      //this.x += this.vx * dt;
     
      if (this.subFrame >= 21) {
        this.subFrame = 0;
      }
      
    }
    else if (Game.keys['right']) {
      this.vx = this.maxVel;
      this.x += 7.5*this.vx;

      this.frame = Math.floor(this.subFrame++ / 3);
      //this.x += this.vx * dt;

      
      if (this.subFrame >= 21) {
        this.subFrame = 0;
      }
      
    }
    else if (Game.keys['down']) {
      this.vy = -this.maxVel;
      this.y += 7.5*this.vy;

      this.frame = Math.floor(this.subFrame++ / 3);
      //this.y += this.vy * dt;
     
      if (this.subFrame >= 21) {
        this.subFrame = 0;
      }
      
    }
    else if (Game.keys['up']) {
      this.vy = this.maxVel;
      this.y += 7.5*this.vy;

      this.frame = Math.floor(this.subFrame++ / 3);
      //this.y += this.vy * dt;
     
      if (this.subFrame >= 21) {
        this.subFrame = 0;
      }
      
    }
    else {
    	//Booleano que si no esta en el tronco, la x sea la que pulsemos
    	if(!this.enTronco){
    		this.vx = 0;
      }

		  this.vy = 0;
		  this.x += this.vx*dt; //cambiar!!
		  this.y += this.vy; 
    }


    if (this.x < 0) {
      this.x = 0;
      this.subFrame = 0;
    }
    else if (this.x > Game.width - this.w) {
      this.x = Game.width - this.w;
      this.subFrame = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.subFrame = 0;
    }
    else if (this.y > Game.height - this.h) {
      this.y = Game.height - this.h;
      this.subFrame = 0;
    }



    this.reload -= dt;
    //Cada vez que hay un step, se resetea el estatus en el tronco
    this.enTronco = false;
    this.hasClicked = true;

  }
}

}

Player.prototype = new Sprite();
Player.prototype.type = OBJECT_PLAYER;

Player.prototype.hit = function (damage) {
	var a = this.x;
	var b = this.y;
	Game.boardLevel2 = this.board;

  if (this.board.remove(this)) {
  		Game.boardLevel2.add(new Death(a,b));
  		loseGame();
  	}
  
}


///// DEAD

var Death = function (centerX, centerY) {
  this.setup('orange_skull', {vx:0, frame: 0, reloadTime: 0, maxVel: 0 });
  this.x = centerX;
  this.y = centerY;
  this.subFrame = 0;
};

Death.prototype = new Sprite();
Death.prototype.type = OBJECT_DEATH;
Death.prototype.step = function (dt) {};


/// CARS
var cars = {
  cblue:     { x: -90,   y: 435, sprite: 'blue_car', health: 10, A: 60 },
  cgreen:    { x: -95,   y: 385, sprite: 'green_car', health: 10, A: 50 },
  cyellow:   { x: -95,   y: 337, sprite: 'yellow_car', health: 10, A: 70},
  vwhite: { x: -125,   y: 480, sprite: 'white_van', health: 10, A: 50 },              
  vbrown: { x: 550,   y: 525, sprite: 'brown_van', health: 10, A: -50}
};


var Car = function (blueprint, override) {
  this.merge(this.baseParameters);
  this.setup(blueprint.sprite, blueprint);
  this.merge(override);
}

Car.prototype = new Sprite();
Car.prototype.baseParameters = {
  A: 0, B: 0, C: 0, D: 0,
  E: 0, F: 0, G: 0, H: 0,
  t: 0, health: 20, damage: 10
};


Car.prototype.type = OBJECT_CAR;

Car.prototype.step = function (dt) {
  this.t += dt;
  this.vx = this.A + this.B * Math.sin(this.C * this.t + this.D);
  this.vy = this.E + this.F * Math.sin(this.G * this.t + this.H);
  this.x += this.vx * dt;
  this.y += this.vy * dt;
  if (this.y > Game.height ||
    this.x < -this.w ||
    this.x > Game.width) {
    this.board.remove(this);
  }

  var collision = this.board.collide(this, OBJECT_PLAYER);
  if (collision) {
    collision.hit(this.damage);
  }
}

Car.prototype.hit = function (damage) { 
  this.health -= damage;

Game.board.add(new Death(this.x + this.w / 2,
        this.y + this.h / 2));

  if (this.health <= 0) {
    if (this.board.remove(this)) {
      Game.board.add(new Death(this.x + this.w / 2,
        this.y + this.h / 2));
    }
  }
}


/// TRUNK (TRONCOS)
var trunks = {    //A: movimiento horizontal
  swood:  { x: -130, y: 250, sprite: 'small_wood', health: 20, A: 40},
  mwood:  { x: 550,   y: 50, sprite: 'medium_wood', health: 10, A:-30}, 
  lwood:  { x: -247,   y: 150, sprite: 'large_wood', health: 10, A:35},
  turtle1: { x: -40,   y: 200, sprite: 'turtle', health: 10, A:35},
  turtle2: { x: -40,   y: 100, sprite: 'turtle', health: 10, A:40}
};


var Trunk = function (blueprint, override) {
  this.merge(this.baseParameters);
  this.setup(blueprint.sprite, blueprint);
  this.merge(override);
}

Trunk.prototype = new Sprite();
Trunk.prototype.baseParameters = {
  A: 0, B: 0, C: 0, D: 0,
  E: 0, F: 0, G: 0, H: 0,
  t: 0, health: 20, damage: 10
};


Trunk.prototype.type = OBJECT_TRUNK;

Trunk.prototype.step = function (dt) {
  this.t += dt;
  this.vx = this.A + this.B * Math.sin(this.C * this.t + this.D);
  this.vy = this.E + this.F * Math.sin(this.G * this.t + this.H);
  this.x += this.vx * dt;
  this.y += this.vy * dt;
  if (this.y > Game.height ||
    this.x < -this.w ||
    this.x > Game.width) {
    this.board.remove(this);
  }

  var collision = this.board.collide(this, OBJECT_PLAYER);
  if (collision) {
  	 collision.onTrunk(this.vx); 
  }
}


//WATER

var Water = function(){
  this.setup('water', { vx: 0, frame: 0, reloadTime: 0, maxVel: 0 });
  this.x = 0;
  this.y = 50;
}

Water.prototype = new Sprite();
Water.prototype.type = OBJECT_WATER;

Water.prototype.step = function (dt) {
    var collision = this.board.collide(this, OBJECT_PLAYER);

    if(collision)
        if(!collision.enTronco)
        collision.hit(this.damage);
}

Water.prototype.hit = function (damage) {}

//HOME

var Home = function(){
  this.setup('winner', { vx: 0, frame: 0, reloadTime: 0, maxVel: 0 }); //Zona verde, para ganar
  this.x = 0;
  this.y = 0;
}

Home.prototype = new Sprite();

Home.prototype.step = function (dt) {
    var collision = this.board.collide(this, OBJECT_PLAYER);

    if(collision)
       winGame();
}








