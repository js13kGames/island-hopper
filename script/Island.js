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

  // Generate the land
  for(var x=leftX; x<=rightX; x++)
  {
    for(var y=topY; y<=bottomY; y++)
    {
      // Are we on an edge?
      if(x === leftX || x === rightX || y === topY || y === bottomY)
      {
        // If so, leave some random blocks empty on the edge to create a
        // more "natural" look to the island
        if(Math.random() > 0.5)
        {
          continue;
        }
      }

      tiles.push({
        x: x,
        y: y,
        type: TileType.Land
      });
    }
  }

  return tiles;
}
