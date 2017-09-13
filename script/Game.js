/**
 * The game
 * @constructor
 * @param {HTMLCanvasElement} canvas - Canvas for displaying the game
 */
function Game(canvas, gameMessageElement)
{
  this.canvas = canvas;
  this.context = canvas.getContext("2d");

  this.canvasWidth = this.canvas.width;
  this.canvasHeight = this.canvas.height;

  this.messageElement = gameMessageElement;
  this.currMessage = null;

  this.state = GameState.Start;

  this.tileSize = 20;

  this.mapCenterX = (this.canvasWidth/2);
  this.mapCenterY = (this.canvasHeight/2);

  this.player = new Player({ x: 0, y: 0, size: this.tileSize });
  this.tileMap = null;
  this.healthBar = new HealthBar(0, 0, this.canvasWidth * 0.85, 20);
  this.woodInventory = new WoodInventory(this.canvasWidth * 0.86, 0, this.canvasWidth * 0.14, 20, 5);

  this.isUpPressed = false;
  this.isDownPressed = false;
  this.isLeftPressed = false;
  this.isRightPressed = false;
  this.isActionPressed = false;

  this.isActionActive = false;
  this.canActivateAction = false;

  this.maxPlayerHealth = 100;
  this.playerHealth = this.maxPlayerHealth;

  this.playerWalkingSpeed = 2;
  this.playerSwimmingSpeed = 1;
  this.playerSpeed = this.playerWalkingSpeed;

  this.maxWoodCount = 5;
  this.playerWoodCount = 0;

  this.isPlayerClimbing = false;
  self.preClimbingX = null;
  self.preClimbingY = null;

  this.maxZoomLevel = 300;
  this.zoomLevel = 0;
  this.zoomPercentage = 1;

  this.zonesCompleted = 0;

  this.hasPlayerMoved = false;
  this.hasPlayerEatenFruit = false;
  this.hasPlayerChoppedTree = false;
  this.hasPlayerBuiltTower = false;
  this.hasPlayerClimbedTower = false;
  this.hasPlayerDismounted = false;
  this.hasPlayerSwam = false;
  this.hasPlayerDiscoveredIsland = false;
  this.hasCompletedTutorial = false;

  this.waterTileImage = new Image();
  this.waterTileImage.src = 'images/water.png';
}

/**
 * Updates the game's state
 */
Game.prototype.update = function()
{
  switch(this.state)
  {
    case GameState.Start:
      this.updateStartScreen();
      return;

    case GameState.Playing:
      this.updateGameplay();
      return;

    case GameState.ZoneComplete:
      this.updateZoneCompleteScreen();
      return;

    case GameState.GameOver:
      this.updateGameOverScreen();
      return;
  }
}

/**
 * Draws the game
 */
Game.prototype.draw = function()
{
  switch(this.state)
  {
    case GameState.Start:
      this.drawStartScreen();
      return;

    case GameState.Playing:
      this.drawGameplay();
      return;

    case GameState.ZoneComplete:
      this.drawZoneCompleteScreen();
      return;

    case GameState.GameOver:
      this.drawGameOverScreen();
      return;
  }
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

Game.prototype.updateStartScreen = function()
{
  var self = this;

  if(self.isActionPressed)
  {
    self.advanceLevel();
    self.state = GameState.Playing;
  }
}

Game.prototype.drawStartScreen = function()
{
  var self = this;

  self.context.clearRect(0, 0, self.canvasWidth, self.canvasHeight);

  self.context.font = "25px Arial";
  self.context.fillStyle = "rgb(255, 255, 255)";
  self.context.fillText("Island Hopper", 50, 50);
}

Game.prototype.updateZoneCompleteScreen = function()
{
  var self = this;

  if(self.isActionPressed)
  {
    self.state = GameState.Playing;
    self.advanceLevel();
  }
}

Game.prototype.drawZoneCompleteScreen = function()
{
  var self = this;

  self.context.clearRect(0, 0, self.canvasWidth, self.canvasHeight);

  self.context.font = "25px Arial";
  self.context.fillStyle = "rgb(255, 255, 255)";
  self.context.fillText("Completed Zone #" + self.zonesCompleted, 50, 50);
}

Game.prototype.updateGameOverScreen = function()
{
  var self = this;

  if(self.isActionPressed)
  {
    self.resetGame();
    self.state = GameState.Start;
  }
}

Game.prototype.drawGameOverScreen = function()
{
  var self = this;

  self.context.clearRect(0, 0, self.canvasWidth, self.canvasHeight);

  self.context.font = "25px Arial";
  self.context.fillStyle = "rgb(255, 255, 255)";
  self.context.fillText("Game Over", 50, 50);
}

Game.prototype.updateGameplay = function()
{
  var self = this;

  self.updateMessages();

  var originalPlayerX = self.player.x;
  var originalPlayerY = self.player.y;

  // Reset player swimming
  self.player.isSwimming = false;

  // Player movement
  if(self.isUpPressed)
  {
    self.player.y -= self.playerSpeed;
    self.player.isFacingUp = true;
    self.player.isFacingLeft = false;
    self.player.isFacingRight = false;
    self.player.isFacingDown = false;
  }

  if(self.isDownPressed)
  {
    self.player.y += self.playerSpeed;
    self.player.isFacingUp = false;
    self.player.isFacingLeft = false;
    self.player.isFacingRight = false;
    self.player.isFacingDown = true;
  }

  if(self.isLeftPressed && !self.isPlayerClimbing)
  {
    self.player.x -= self.playerSpeed;
    self.player.isFacingUp = false;
    self.player.isFacingLeft = true;
    self.player.isFacingRight = false;
    self.player.isFacingDown = false;
  }

  if(self.isRightPressed && !self.isPlayerClimbing)
  {
    self.player.x += self.playerSpeed;
    self.player.isFacingUp = false;
    self.player.isFacingLeft = false;
    self.player.isFacingRight = true;
    self.player.isFacingDown = false;
  }

  // Tutorial: Has player moved?
  if(self.isUpPressed || self.isDownPressed || self.isLeftPressed || self.isRightPressed)
  {
    self.hasPlayerMoved = true;
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
  var playerActionTileX = null;
  var playerActionTileY = null;

  var playerStandingTile = null;
  var playerStandingTileX = null;
  var playerStandingTileY = null;

  var greatestIntersection = null;

  var resetX = false;
  var resetY = false;

  var lowerBoundX = (self.player.x - (self.tileSize * 2));
  var upperBoundX = (self.player.x + (self.tileSize * 2));

  var lowerBoundY = (self.player.y - (self.tileSize * 2));
  var upperBoundY = (self.player.y + (self.tileSize * 2));

  self.tileMap.forEachTile(function(tile, tileX, tileY) {

    // Reset active tile status
    if(tile.isActive)
    {
      tile.isActive = false;
    }

    // Let's only check the tiles around the player
    if(tile.x < lowerBoundX || tile.x > upperBoundX || tile.y < lowerBoundY || tile.y > upperBoundY)
    {
      return;
    }

    var intersection = Utility.getIntersection(self.player.getBoundingRectangle(), tile.getBoundingRectangle());

    // Tile intersects with player
    if(intersection != null)
    {
      // Determine which tile the player is standing on
      if(greatestIntersection === null || (intersection.width > greatestIntersection.width && intersection.height > greatestIntersection.height))
      {
        greatestIntersection = intersection;
        playerStandingTile = tile;
        playerStandingTileX = tileX;
        playerStandingTileY = tileY;
      }

      // Is the player climbing?
      if(self.isPlayerClimbing)
      {
        // If so, ignore the tiles to the side
        if(tile.x < self.player.x || tile.x >= (self.player.x + self.player.width))
        {
          return;
        }

        // And only allow the player to pass tower tile types
        if(tile.type != TileType.Tower)
        {
          resetX = true;
          resetY = true;
        }

        return;
      }

      // Is the player intersecting with a tile that's not passable?
      if(!tile.isPassable)
      {
        if(intersection.height != 0)
        {
          resetX = true;
        }

        if(intersection.width != 0)
        {
          resetY = true;
        }
      }
    }

    // Tile intersects with player action area
    if(playerActionTile == null && Utility.intersects(tile.getBoundingRectangle(), self.player.getActionBoundingRectangle()))
    {
      playerActionTile = tile;
      playerActionTileX = tileX;
      playerActionTileY = tileY;
    }

  });

  // Set the player's action tile as active
  if(playerActionTile != null)
  {
    playerActionTile.isActive = true;
  }

  // Has the player run out of health?
  if(self.playerHealth <= 0)
  {
    self.state = GameState.GameOver;
    return;
  }

  // What tile is the player standing on?
  if(playerStandingTile != null)
  {
    // Is the player standing on water?
    if(playerStandingTile.type === TileType.Water)
    {
      // If so, deplete their health
      self.playerHealth -= 0.1;
      self.hasPlayerSwam = true;
      self.playerSpeed = self.playerSwimmingSpeed;
      self.player.isSwimming = true;
    }

    // Is the player standing on an island marker?
    else if(playerStandingTile.type === TileType.Marker)
    {
      var undiscoveredIsland = self.tileMap.getUndiscoveredIsland(playerStandingTileX, playerStandingTileY);

      if(undiscoveredIsland != null)
      {
        // Mark the island as discovered
        undiscoveredIsland.isDiscovered = true;
        playerStandingTile.updateTileType(TileType.Land);
      }
    }

    else if(playerStandingTile.type === TileType.Land)
    {
      self.playerSpeed = self.playerWalkingSpeed;
    }
  }

  // If the player is climbing, update their zoom level
  if(self.isPlayerClimbing && (!resetX || !resetY))
  {
    if(self.isUpPressed)
    {
      self.zoomLevel++;
    }

    if(self.isDownPressed)
    {
      self.zoomLevel--;
    }
  }

  // Is the player trying to drop from climbing?
  if(self.isActionActive && self.isPlayerClimbing)
  {
    self.isPlayerClimbing = false;
    self.zoomLevel = 0;
    self.player.x = self.preClimbingX;
    self.player.y = self.preClimbingY;
    self.hasPlayerDismounted = true;
  }

  // If applicable, reset the player's X/Y coordinates
  if(resetX)
  {
    self.player.x = originalPlayerX;
  }

  if(resetY)
  {
    self.player.y = originalPlayerY;
  }

  // Is the player trying to interact with a tile?
  if(self.isActionActive && playerActionTile != null)
  {
    // Is the player interacting with a fruit tree?
    if(playerActionTile.type === TileType.TreeWithFruit)
    {
      // If so, pick the fruit and eat it
      playerActionTile.updateTileType(TileType.Tree);
      self.hasPlayerEatenFruit = true;
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
      if(self.playerWoodCount < 5)
      {
        playerActionTile.updateTileType(TileType.Land);
        self.hasPlayerChoppedTree = true;
        self.playerWoodCount++;
      }
    }

    // Is the player interacting with a tower?
    else if(playerActionTile.type === TileType.Tower)
    {
      // If so, place the player on the tower and set them into climbing state
      self.preClimbingX = self.player.x;
      self.preClimbingY = self.player.y;

      self.player.x = playerActionTile.x;
      self.player.y = playerActionTile.y;

      self.isPlayerClimbing = true;

      self.hasPlayerClimbedTower = true;
    }

    // Is the player interacting with land?
    else if(playerActionTile.type === TileType.Land)
    {
      // If so, build a tower
      if(self.playerWoodCount > 0)
      {
        // Start with the initial base
        playerActionTile.updateTileType(TileType.Tower);
        var towerY = playerActionTileY;

        // Next, build upwards until the player runs out of wood
        while(self.playerWoodCount > 0)
        {
          towerY--;
          self.tileMap.tiles[towerY][playerActionTileX].updateTileType(TileType.Tower);
          self.playerWoodCount--;
        }

        self.hasPlayerBuiltTower = true;
      }
    }
  }

  // Update the health bar
  self.healthBar.playerHealthPercentage = (self.playerHealth/100);

  // Update the wood inventory
  self.woodInventory.count = self.playerWoodCount;

  // Update the zoom level
  if(self.zoomLevel < 0)
  {
    self.zoomLevel = 0;
  }

  if(self.zoomLevel > self.maxZoomLevel)
  {
    self.zoomLevel = self.maxZoomLevel;
  }

  if(!self.isPlayerClimbing)
  {
    self.zoomLevel = 0;
  }

  self.zoomPercentage = 1 - (self.zoomLevel/self.maxZoomLevel);

  // Have all the islands been discovered?
  var maxIslandCount = self.tileMap.islands.length;
  var discoveredIslands = 0;

  self.tileMap.islands.forEach(function(island) {

    if(island.isDiscovered)
    {
      discoveredIslands++;
    }

    // Has the player discovered all of the islands?
    if(maxIslandCount === discoveredIslands)
    {
      self.state = GameState.ZoneComplete;
    }

  });

  // Reset the player action
  self.isActionActive = false;

  // Re-center the map
  self.mapCenterX -= (self.player.x - originalPlayerX);
  self.mapCenterY -= (self.player.y - originalPlayerY);
}

Game.prototype.drawGameplay = function()
{
  var self = this;

  // Clear the canvas
  self.context.clearRect(0, 0, self.canvasWidth, self.canvasHeight);

  // Draw the water as background
  var currTileSize = self.tileSize * self.zoomPercentage;
  for(var x = 0; x < self.canvasWidth; x += currTileSize)
  {
    for(var y = 0; y < self.canvasHeight; y += currTileSize)
    {
      self.context.drawImage(self.waterTileImage, x, y, currTileSize, currTileSize);
    }
  }

  // Draw the map
  self.tileMap.draw(self.context, self.canvasWidth, self.canvasHeight, self.mapCenterX, self.mapCenterY, self.zoomPercentage);

  // Draw the player
  self.player.draw(self.context, self.canvasWidth, self.canvasHeight, self.mapCenterX, self.mapCenterY, self.zoomPercentage);

  // Draw a black bar behind the player HUD
  self.context.fillStyle = 'rgb(0, 0, 0)';
  self.context.fillRect(0, 0, self.canvasWidth, 25);

  // Draw the player's health bar
  self.healthBar.draw(self.context);

  // Draw the player's wood inventory
  self.woodInventory.draw(self.context);
}

Game.prototype.advanceLevel = function()
{
  // Reset the player
  this.player.x = 0;
  this.player.y = 0;
  this.playerHealth = this.maxPlayerHealth;

  if(this.zonesCompleted === 0)
  {
    // Start the player off with reduced health to demonstrate refilling health
    // with fruit
    this.playerHealth = 80;
  }

  // Reset the map center
  this.mapCenterX = (this.canvasWidth/2);
  this.mapCenterY = (this.canvasHeight/2);

  this.zonesCompleted++;
  this.tileMap = this.generateLevel();
}

Game.prototype.generateLevel = function()
{
  return new TileMap(0, 0, this.tileSize, 0);
}

Game.prototype.resetGame = function()
{
  this.zonesCompleted = 0;
}

Game.prototype.updateMessage = function(message)
{
  if(this.currMessage === message)
  {
    // Don't update the message unnecessarily
    return;
  }

  this.currMessage = message;
  this.messageElement.innerHTML = '"' + message + '"'
}

Game.prototype.clearMessage = function(message)
{
  this.currMessage = null;
  this.messageElement.innerHTML = '';
}

Game.prototype.updateMessages = function()
{
  var self = this;

  // Is the player just starting the tutorial?
  if(self.zonesCompleted === 1)
  {
    if(self.hasPlayerDiscoveredIsland)
    {
      self.updateMessage("You discovered a new island! Now discover all five islands in this zone to move onto the next one!");
    }
    else if(self.hasPlayerSwam)
    {
      self.updateMessage("Be careful! Swimming depletes your health!");
    }
    else if(self.hasPlayerDismounted)
    {
      self.updateMessage("Let's swim over to that island!");
    }
    else if(self.hasPlayerClimbedTower)
    {
      self.updateMessage("Ooh! Look at that hidden island over there! Dismount with X.")
    }
    else if(self.hasPlayerBuiltTower)
    {
      self.updateMessage("Beautiful! Climb the tower with X.");
    }
    else if(self.hasPlayerChoppedTree)
    {
      self.updateMessage("Now we're cooking! Find an empty spot of land and press X to build a tower!");
    }
    else if(self.hasPlayerEatenFruit)
    {
      self.updateMessage("You're a natural! Now face a fruitless tree and chop it down with X to get some wood!");
    }
    else if(self.hasPlayerMoved)
    {
      self.updateMessage("Great! Now it's time to eat and refill some health! Stand in front of a tree with fruit and press X.");
    }
    else
    {
      self.updateMessage("Hello Explorer! Move with the arrow keys!");
    }
  }
}
