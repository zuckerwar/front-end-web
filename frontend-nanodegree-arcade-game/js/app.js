/**
 * @description Enemies our player must avoid
 * @constructor
 * @param {number} x - Enemy's x coordinate on canvas
 * @param {number} y - Enemy's y coordinate on canvas
 * @param {string} sprite - Enemy's sprite used to render enemy on canvas
 */

var Enemy = function(x, y, speed) {
    // Variables to deteremine the x and y axis and speed of the enemy
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Multiplies the moement by the dt parameter
    this.x += this.speed * dt;

    // Enemies apear randomly with random speed
    if (this.x > 550) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 222);
    };

    // Collisions between player and enemy
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description Player class, epresents the player
 * @constructor
 * @param {number} x - Player's x coordinate on canvas
 * @param {number} y - Player's y coordinate on canvas
 * @param {string} player - Player's character image
 */

var Player = function (x, y) {
  this.x = x;
  this.y = y;

  // Player character image
  this.player = 'images/char-horn-girl.png';
};

Player.prototype.update = function (dt) {

};

// Adds the image of the player to the game canvas
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// Enables the use of arrow keys to move on the game canvas
Player.prototype.handleInput = function (keyPress) {
  // Move left
  if (keyPress == 'left' && this.x > 0) {
      this.x -= 102;
  };

  // Move right
  if (keyPress == 'right' && this.x < 405) {
      this.x += 102;
  };

  // Move up
  if (keyPress == 'up' && this.y > 0) {
      this.y -= 83;
  };

  // Move down
  if (keyPress == 'down' && this.y < 405) {
      this.y += 83;
  };

  // Reset user to starting position
  if (this.y < 0) {
      setTimeout(() => {
        this.x = 202;
        this.y = 405;
      }, 800);
   };
};

// Place the player object in a variable called player
var player = new Player (202, 407);

// Now instantiate your objects.
// Enemies array

var allEnemies = [];

// Position of the enemies on the canvas
var enemyLocation = [63, 147, 230];

enemyLocation.forEach(function (locationY) {
  enemy = new Enemy(0, locationY, 200);
  allEnemies.push(enemy);
});

/**
 * This Event Listener is fired when a key is released.
 * @param {string} keyup - The keyup event is fired when a key is released.
 * @param {Object} listener: anonymouse function - Passes event object when key pressed and released.
 * The allowed keys are place into an array. 37, 38, 39, 40 correspond to the event. keycode DOM element
 * when you click on the arrow keys.
 */

// This listens for key presses and sends the keys to player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
