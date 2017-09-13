/**
 * An island
 * @constructor
 */
function Island(tileX, tileY, tileWidth, tileHeight, isDiscovered)
{
  this.tiles = this.generateTiles(tileX, tileY, tileWidth, tileHeight, isDiscovered);
  this.isDiscovered = isDiscovered;
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

Island.prototype.generateTiles = function(x, y, width, height, isDiscovered)
{
  var tiles = [];

  var leftX = x - (width/2);
  var topY = y - (height/2)

  var rightX = x + (width/2);
  var bottomY = y + (height/2);

  // Generate the land
  for(var currX = leftX; currX <= rightX; currX++)
  {
    for(var currY = topY; currY <= bottomY; currY++)
    {
      var isEdge = (currX === leftX || currX === rightX || currY === topY || currY === bottomY);

      // Are we on an edge?
      if(isEdge)
      {
        // If so, leave some random blocks empty on the edge to create a
        // more "natural" look to the island
        if(Math.random() > 0.5)
        {
          continue;
        }
      }

      // By default, place land
      var type = TileType.Land;

      // If we're in the center and the island isn't already discovered, place a marker
      if(!isDiscovered && (currX === x && currY === y))
      {
        type = TileType.Marker;
      }

      // Otherwise, randomly place some trees
      else if(!isEdge && Math.random() > 0.8)
      {
        type = TileType.TreeWithFruit;
      }

      tiles.push({
        x: currX,
        y: currY,
        type: type
      });
    }
  }

  return tiles;
}
