/**
 * The game
 * @constructor
 * @param {HTMLCanvasElement} canvas - Canvas for displaying the game
 */
function Game(canvas, instructions, narrative, score, highScore)
{
  this.canvas = canvas;
  this.context = canvas.getContext("2d");

  this.canvasWidth = this.canvas.width;
  this.canvasHeight = this.canvas.height;

  this.player = new Player({ x: 30, y: 30 });
  this.tileMap = new TileMap(0, 23);
  this.healthBar = new HealthBar(0, 0, this.canvasWidth, 20);

  this.isUpPressed = false;
  this.isDownPressed = false;
  this.isLeftPressed = false;
  this.isRightPressed = false;
  this.isActionPressed = false;

  this.maxPlayerHealth = 100;
  this.playerHealth = this.maxPlayerHealth;
}

/**
 * Updates the game's state
 */
Game.prototype.update = function()
{
  var self = this;

  var originalPlayerX = self.player.x;
  var originalPlayerY = self.player.y;

  // Player movement
  if(self.isUpPressed)
  {
    self.player.y--;
  }

  if(self.isDownPressed)
  {
    self.player.y++;
  }

  if(self.isLeftPressed)
  {
    self.player.x--;
  }

  if(self.isRightPressed)
  {
    self.player.x++;
  }

  // Player/map boundary interactions
  if(self.player.x <= self.tileMap.x
      || self.player.y <= self.tileMap.y
      || (self.player.x + self.player.width >= self.tileMap.x + self.tileMap.width)
      || (self.player.y + self.player.height >= self.tileMap.y + self.tileMap.height))
  {
    // If the player is outside the boundaries of the map, reset their position
    self.player.x = originalPlayerX;
    self.player.y = originalPlayerY;
  }

  // Player/tile interactions
  var playerActionTile = null;

  self.tileMap.forEachTile(function(tile) {

    // Tile intersects with player
    if(tile.intersects(self.player.getBoundingRectangle()))
    {
      // Is the player intersecting with a tile that's not passable?
      if(!tile.isPassable)
      {
        // If so, reset their X and Y back to original values
        self.player.x = originalPlayerX;
        self.player.y = originalPlayerY;
      }

      // Is the player on a water tile?
      if(tile.type === TileType.Water)
      {
        // If so, deplete their health
        self.playerHealth -= 0.01;
      }
    }

    // Tile intersects with player action area
    if(playerActionTile == null && tile.intersects(self.player.getActionBoundingRectangle()))
    {
      playerActionTile = tile;
    }

  });

  // Is the player trying to interact with a tile?
  if(self.isActionPressed && playerActionTile != null)
  {
    // Is the player interacting with a fruit tree?
    if(playerActionTile.type === TileType.TreeWithFruit)
    {
      // If so, pick the fruit and eat it
      playerActionTile.updateTileType(TileType.Tree);
      self.playerHealth += 10;

      if(self.playerHealth > self.maxPlayerHealth)
      {
        self.playerHealth = self.maxPlayerHealth;
      }
    }

    // Is the player interacting with a fruitless tree?
    if(playerActionTile.type === TileType.Tree)
    {
      // If so, cut down the tree
      playerActionTile.updateTileType(TileType.Land);
    }
  }

  // Update the health bar
  self.healthBar.playerHealthPercentage = (self.playerHealth/100);
}

/**
 * Draws the game
 */
Game.prototype.draw = function()
{
  var self = this;

  // Clear the canvas
  self.context.clearRect(0, 0, self.canvasWidth, self.canvasHeigh);

  // Draw the map
  self.tileMap.draw(self.context);

  // Draw the player
  self.player.draw(self.context);

  // Draw the player's health bar
  self.healthBar.draw(self.context);
}

/**
 * Starts the game
 */
Game.prototype.start = function()
{
  var self = this;

  self.canvas.addEventListener('keydown', function(event) { toggleKeys(event.keyCode, true); }, false);
  self.canvas.addEventListener('keyup', function(event) { toggleKeys(event.keyCode, false); }, false);

  function toggleKeys(keyCode, isPressed)
  {
    switch(keyCode)
    {
      // Up Arrow
      case 38:
        self.isUpPressed = isPressed;
        break;

      // Right Arrow
      case 39:
        self.isRightPressed = isPressed;
        break;

      // Left Arrow
      case 37:
        self.isLeftPressed = isPressed;
        break;

      // Down Arrow
      case 40:
        self.isDownPressed = isPressed;
        break;

      // Action
      case 88:
        self.isActionPressed = isPressed;
        break;
    }
  }

  function loop()
  {
    self.update();
    self.draw();
    requestAnimationFrame(loop);
  }

  loop();
}
