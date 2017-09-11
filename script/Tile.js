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
  context.fillStyle = this.color;

  var x = (this.x - this.halfWidth + mapCenterX) * zoomPercentage;
  var y = (this.y - this.halfHeight + mapCenterY) * zoomPercentage;

  x += (1 - zoomPercentage) * (mapWidth/2);
  y += (1 - zoomPercentage) * (mapHeight/2);

  var width = this.width * zoomPercentage;
  var height = this.height * zoomPercentage;

  context.fillRect(Math.ceil(x), Math.ceil(y), Math.ceil(width), Math.ceil(height));
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
      this.color = 'rgb(0, 255, 255)';
      break;

    case TileType.Coast:
      this.isPassable = true;
      this.color = 'rgb(0, 255, 255)';
      break;

    case TileType.Water:
      this.isPassable = true;
      this.color = 'rgb(0, 0, 255)';
      break;

    case TileType.Tree:
      this.isPassable = false;
      this.color = 'rgb(0, 255, 0)';
      break;

    case TileType.TreeWithFruit:
      this.isPassable = false;
      this.color = 'rgb(255, 0, 0)';
      break;

    case TileType.Tower:
      this.isPassable = false;
      this.color = 'rgb(0, 0, 0)';
      break;
  }
}
