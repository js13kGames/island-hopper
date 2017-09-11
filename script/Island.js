/**
 * An island
 * @constructor
 */
function Island(tileX, tileY, tileWidth, tileHeight)
{
  this.tiles = this.generateTiles(tileX, tileY, tileWidth, tileHeight);
  this.isDiscovered = false;
}

Island.prototype.containsCoordinate = function(x, y)
{
  var self = this;
  var hasCoordinate = false;

  self.tiles.forEach(function(tile) {

    if(tile.x === x && tile.y === y)
    {
      hasCoordinate = true;
    }

  });

  return hasCoordinate;
}

Island.prototype.generateTiles = function(x, y, width, height)
{
  var tiles = [];

  var leftX = x - (width/2);
  var topY = y - (height/2)

  var rightX = x + (width/2);
  var bottomY = y + (height/2);

  var x = leftX;
  var y = topY;

  for(var x=leftX; x<=rightX; x++)
  {
    for(var y=topY; y<=bottomY; y++)
    {
      tiles.push({
        x: x,
        y: y,
        type: TileType.Land
      });
    }
  }

  return tiles;

  /*
  return [
    { x: x, y: y, type: TileType.Land },
    { x: x + 1, y: y, type: TileType.Land },
    { x: x, y: y + 1, type: TileType.Land },
    { x: x - 1, y: y, type: TileType.Land },
    { x: x, y: y - 1, type: TileType.Land },
    { x: x + 1, y: y + 1, type: TileType.Land },
    { x: x - 1, y: y - 1, type: TileType.Land },
  ];
  */
}
