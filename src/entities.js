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

  medium_wood: { sx: 9, sy: 122, w: 191, h: 41, frames: 1 },
  large_wood: { sx: 9, sy: 171, w: 248, h: 41, frames: 1 },
  small_wood: { sx: 270, sy: 171, w: 131, h: 41, frames: 1 },

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
};

var OBJECT_PLAYER = 1,
  OBJECT_PLAYER_PROJECTILE = 2,
  OBJECT_CAR = 4,
  OBJECT_ENEMY_PROJECTILE = 8,
  OBJECT_POWERUP = 16,
  OBJECT_BACKGROUND = 32,
  OBJECT_TRUNK = 64;


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


// PLAYER

var Player = function () {
  this.setup('frog_move', { vx: 0, vy: 0, frame: 0, reloadTime: 0.25, maxVel: 150 });

  this.x = Game.width / 2 - this.w / 2;
  this.y = Game.height + this.h / 2;
  this.reload = this.reloadTime;
  this.subFrame = 0;

  //Metodo que mantiene a la rana encima del tronco
  this.onTrunk = function(vt){
  	this.x += vt;
  }

  this.step = function (dt) {
   /*  //MOVIMIENTO RANA CASILLA A CASILLA
  var temp;
  if (Game.keys['left']) {
    temp = setInterval(() => {
      () => {
        this.frame = Math.floor(this.subFrame++ / 3);
        if (this.subFrame >= 21) {
          this.subFrame = 0;
          clearInterval(temp);
        }
      }
    }, 500);
    this.vx = -this.maxVel;
    this.x -= 40;
  } else if (Game.keys['right']) {
    temp = setInterval(() => {
      () => {
        this.frame = Math.floor(this.subFrame++ / 3);
        if (this.subFrame >= 21) {
          this.subFrame = 0;
          clearInterval(temp);
        }
      }
    }, 16);
    this.vx = this.maxVel;
    this.x += 40;
  } else if (Game.keys['up']) {
    temp = setInterval(() => {
      () => {
        this.frame = Math.floor(this.subFrame++ / 3);
        if (this.subFrame >= 21) {
          this.subFrame = 0;
          clearInterval(temp);
        }
      }
    }, 16);
    this.vy = -this.maxVel;
    this.y += 40;
  } else if (Game.keys['down']) {
    temp = setInterval(() => {
      () => {
        this.frame = Math.floor(this.subFrame++ / 3);
        if (this.subFrame >= 21) {
          this.subFrame = 0;
          clearInterval(temp);
        }
      }
    }, 16);
    this.vy = this.maxVel;
    this.y -= 40;
  } else {
    this.vx = 0;
    this.vy = 0;
  }*/
    if (Game.keys['left']) {
      this.vx = -this.maxVel;
      this.frame = Math.floor(this.subFrame++ / 3);
      this.x += this.vx * dt;
      if (this.subFrame >= 21) {
        this.subFrame = 0;
      }
    }
    else if (Game.keys['right']) {
      this.vx = this.maxVel;
      this.frame = Math.floor(this.subFrame++ / 3);
      this.x += this.vx * dt;
      if (this.subFrame >= 21) {
        this.subFrame = 0;
      }
    }
    else if (Game.keys['down']) {
      this.vy = -this.maxVel;
      this.frame = Math.floor(this.subFrame++ / 3);
      this.y += this.vy * dt;
      if (this.subFrame >= 21) {
        this.subFrame = 0;
      }
    }
    else if (Game.keys['up']) {
      this.vy = this.maxVel;
      this.frame = Math.floor(this.subFrame++ / 3);
      this.y += this.vy * dt;
      if (this.subFrame >= 21) {
        this.subFrame = 0;
      }
    }
    else {
      this.vx = 0;
      this.vy = 0;
      this.x += this.vx * dt;
      this.y += this.vy * dt;
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
  }

}

Player.prototype = new Sprite();
Player.prototype.type = OBJECT_PLAYER;

Player.prototype.hit = function (damage) {
  if (this.board.remove(this)) {
    loseGame();
  }
}

///// DEAD

var Dead = function (centerX, centerY) {
  this.setup('orange_skull', { frame: 0 });
  this.x = centerX - this.w / 2;
  this.y = centerY - this.h / 2;
  this.subFrame = 0;
};

Dead.prototype = new Sprite();

Dead.prototype.step = function (dt) {
    this.board.remove(this);
};


/// CARs
    //E: movimiento vertical.
    //A: movimiento horizontal
var cars = {
  cblue:     { x: -50,   y: 435, sprite: 'blue_car', health: 10, A: 60 },
  cgreen:    { x: -50,   y: 385, sprite: 'green_car', health: 10, A: 50 },
  cyellow:   { x: -50,   y: 335, sprite: 'yellow_car', health: 10, A: 70},
  vwhite: { x: -50,   y: 480, sprite: 'white_van', health: 10, A: 50 },              
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
  if (this.health <= 0) {
    if (this.board.remove(this)) {
      this.board.add(new Dead(this.x + this.w / 2,
        this.y + this.h / 2));
    }
  }
}

/// TRUNK (TRONCOS)
    //A: movimiento horizontal
var trunks = {
  swood:  { x: 0, y: 250, sprite: 'small_wood', health: 20, A: 70},
  mwood:  { x: 550,   y: 50, sprite: 'medium_wood', health: 10, A:-50},
  lwood:  { x: 0,   y: 150, sprite: 'large_wood', health: 10, A:60},
  turtle1: { x: 0,   y: 200, sprite: 'turtle', health: 10, A:40},
  turtle2: { x: 0,   y: 100, sprite: 'turtle', health: 10, A:60}

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
  	 var player = new Player();
  	 player.onTrunk(dt); //No se actualiza
  }

}

//Seria move en todo caso, para que se mueva a la vez que el tronco
Trunk.prototype.hit = function (damage) {
  this.health -= damage;
  if (this.health <= 0) {
    if (this.board.remove(this)) {
      this.board.add(new Dead(this.x + this.w / 2,
        this.y + this.h / 2));
    }
  }

}