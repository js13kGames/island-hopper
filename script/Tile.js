/**
 * A tile
 * @constructor
 * @param {integer} x - X-coordinate of the tile
 * @param {integer} y - Y-cooridnate of the tile
 */
function Tile(x, y, size, type)
{
  this.x = x;
  this.y = y;

  this.type = null;
  this.isPassable = true;

  this.height = size;
  this.width = size;

  this.halfHeight = (this.height/2);
  this.halfWidth = (this.width/2);

  this.updateTileType(type);

  this.isIntersecting = false;
  this.isActive = false;

  this.waterTileImage = ImageCache.waterTileImage;
  this.landTileImage = ImageCache.landTileImage;
  this.treeWithFruitTileImage = ImageCache.treeWithFruitTileImage;
  this.treeTileImage = ImageCache.treeTileImage;
  this.towerTileImage = ImageCache.towerTileImage;
  this.markerTileImage = ImageCache.markerTileImage;
}

/**
 * Renders the tile
 * @param {CanvasRenderingContext2D} context - 2D rendering context to use when rendering the tile
 * @param {integer} mapWidth - Width of the map
 * @param {integer} mapHeight - Height of the map
 * @param {integer} mapCenterX - X-coordinate of the map's center
 * @param {integer} mapCenterY - Y-coordinate of the map's center
 * @param {float} zoomPercentage - Curret zoom percentage of the map
 */
Tile.prototype.draw = function(context, mapWidth, mapHeight, mapCenterX, mapCenterY, zoomPercentage)
{
  var x = (this.x - this.halfWidth + mapCenterX) * zoomPercentage;
  var y = (this.y - this.halfHeight + mapCenterY) * zoomPercentage;

  x += (1 - zoomPercentage) * (mapWidth/2);
  y += (1 - zoomPercentage) * (mapHeight/2);

  var width = this.width * zoomPercentage;
  var height = this.height * zoomPercentage;

  x = Math.ceil(x);
  y = Math.ceil(y);
  width = Math.ceil(width);
  height = Math.ceil(height);

  if(this.type === TileType.Water)
  {
  }

  else if(this.type === TileType.Land)
  {
    context.drawImage(this.landTileImage, x, y, width, height);
  }

  else if(this.type === TileType.TreeWithFruit)
  {
    context.drawImage(this.treeWithFruitTileImage, x, y, width, height);
  }

  else if(this.type === TileType.Tree)
  {
    context.drawImage(this.treeTileImage, x, y, width, height);
  }

  else if(this.type === TileType.Tower)
  {
    context.drawImage(this.towerTileImage, x, y, width, height);
  }

  else if(this.type === TileType.Marker)
  {
    context.drawImage(this.markerTileImage, x, y, width, height);
  }

  if(this.isActive)
  {
    context.fillStyle = 'rgba(255, 255, 255, 0.5)';
    context.fillRect(x, y, width, height);
  }
};

Tile.prototype.getBoundingRectangle = function()
{
  return {
    x: this.x,
    y: this.y,
    height: this.height,
    width: this.width
  };
}

Tile.prototype.updateTileType = function(tileType)
{
  this.type = tileType;

  // Initialize properties based on tile type
  switch(this.type)
  {
    case TileType.Land:
      this.isPassable = true;
      break;

    case TileType.Water:
      this.isPassable = true;
      break;

    case TileType.Tree:
      this.isPassable = false;
      break;

    case TileType.TreeWithFruit:
      this.isPassable = false;
      break;

    case TileType.Tower:
      this.isPassable = false;
      break;
  }
}
