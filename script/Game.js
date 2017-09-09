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

  this.mapCenterX = (this.canvasWidth/2);
  this.mapCenterY = (this.canvasHeight/2);

  this.player = new Player({ x: 0, y: 0 });
  this.tileMap = new TileMap(0, 0);
  this.healthBar = new HealthBar(0, 0, this.canvasWidth * 0.85, 20);
  this.woodInventory = new WoodInventory(this.canvasWidth * 0.9, 20, this.canvasWidth * 0.1, 20);

  this.isUpPressed = false;
  this.isDownPressed = false;
  this.isLeftPressed = false;
  this.isRightPressed = false;
  this.isActionPressed = false;

  this.isActionActive = false;
  this.canActivateAction = false;

  this.maxPlayerHealth = 100;
  this.playerHealth = this.maxPlayerHealth;

  this.playerWoodCount = 0;
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

  // Set up the action button behavior
  if(self.isActionPressed && self.canActivateAction)
  {
    self.isActionActive = true;
    self.canActivateAction = false;
  }

  if(!self.isActionPressed)
  {
    self.canActivateAction = true;
  }

  // Prevent the player from leaving the map
  if(self.player.x <= self.tileMap.x
      || (self.player.x + self.player.width >= self.tileMap.x + self.tileMap.width))
  {
    self.player.x = originalPlayerX;
  }

  if(self.player.y <= self.tileMap.y
      || (self.player.y + self.player.height >= self.tileMap.y + self.tileMap.height))
  {
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
  if(self.isActionActive && playerActionTile != null)
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
    else if(playerActionTile.type === TileType.Tree)
    {
      // If so, cut down the tree
      playerActionTile.updateTileType(TileType.Land);
      self.playerWoodCount++;
    }
  }

  // Update the health bar
  self.healthBar.playerHealthPercentage = (self.playerHealth/100);

  // Update the wood inventory
  self.woodInventory.count = self.playerWoodCount;

  // Reset the player action
  self.isActionActive = false;

  // Re-center the map
  self.mapCenterX -= (self.player.x - originalPlayerX);
  self.mapCenterY -= (self.player.y - originalPlayerY);
}

/**
 * Draws the game
 */
Game.prototype.draw = function()
{
  var self = this;

  // Clear the canvas
  self.context.clearRect(0, 0, self.canvasWidth, self.canvasHeight);

  // Draw the map
  self.tileMap.draw(self.context, self.mapCenterX, self.mapCenterY);

  // Draw the player
  self.player.draw(self.context, self.mapCenterX, self.mapCenterY);

  // Draw the player's health bar
  self.healthBar.draw(self.context);

  // Draw the player's wood inventory
  self.woodInventory.draw(self.context);
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
