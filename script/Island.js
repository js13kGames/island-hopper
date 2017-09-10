/**
 * An island
 * @constructor
 */
function Island(x, y)
{
  this.tiles = this.generateTiles(x, y);
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

Island.prototype.generateTiles = function(x, y)
{
  return [
    { x: x, y: y, type: TileType.Land },
    { x: x + 1, y: y, type: TileType.Land },
    { x: x - 1, y: y, type: TileType.Land },
    { x: x, y: y + 1, type: TileType.Land },
    { x: x, y: y - 1, type: TileType.Land }
  ];
}
