/**
 * A map of tiles
 * @constructor
 * @param {integer} x - X-coordinate of the map
 * @param {integer} y - Y-cooridnate of the map
 */
function TileMap(x, y)
{
  this.tiles = [];
  this.tileSize = 20;
  this.type = null;

  this.islands = [
    new Island(10, 10),
    new Island(20, 20),
    new Island(30, 30),
  ];

  var tileGlyphs = this.generateGlyphs(this.islands);

  this.width = tileGlyphs[0].length * this.tileSize;
  this.height = tileGlyphs.length * this.tileSize;

  this.x = x - (this.width/2);
  this.y = y - (this.height/2);

  this.initialize(tileGlyphs);
}

TileMap.prototype.initialize = function(tileGlyphs)
{
  var self = this;

  // Initialize each of the map's tiles
  for(var i = 0; i < tileGlyphs.length; i++)
  {
    self.tiles[i] = [];

    for(var j = 0; j < tileGlyphs[i].length; j++)
    {
      self.tiles[i][j] = new Tile((j * self.tileSize) + self.x, (i * self.tileSize) + self.y, self.tileSize, tileGlyphs[i][j]);
    }
  }
}

/**
 * Renders the map
 * @param {CanvasRenderingContext2D} context - 2D rendering context to use when rendering the map
 * @param {integer} mapCenterX - X-coordinate of the map's center
 * @param {integer} mapCenterY - Y-coordinate of the map's center
 */
TileMap.prototype.draw = function(context, mapCenterX, mapCenterY)
{
  var self = this;

  for(var i = 0; i < self.tiles.length; i++)
  {
    for(var j = 0; j < self.tiles[i].length; j++)
    {
      self.tiles[i][j].draw(context, mapCenterX, mapCenterY);
    }
  }
};

TileMap.prototype.forEachTile = function(operation)
{
  var self = this;

  for(var i = 0; i < self.tiles.length; i++)
  {
    for(var j = 0; j < self.tiles[i].length; j++)
    {
      operation(self.tiles[i][j], j, i);
    }
  }
};

TileMap.prototype.getUndiscoveredIsland = function(tileX, tileY)
{
  var self = this;
  var undiscoveredIsland = null;

  self.islands.forEach(function(island) {

    if(island.isDiscovered)
    {
      return;
    }

    if(island.containsCoordinate(tileX, tileY))
    {
      undiscoveredIsland = island;
    }
  });

  return undiscoveredIsland;
};

TileMap.prototype.generateGlyphs = function(islands)
{
  var self = this;
  var glyphs = [];

  // Cover the entire map w/ water
  for(var i=0; i<50; i++)
  {
    glyphs.push([]);

    for(var j=0; j<50; j++)
    {
      glyphs[i][j] = TileType.Water;
    }
  }

  // Add in islands
  self.islands.forEach(function(island) {
    island.tiles.forEach(function(tile) {
      glyphs[tile.y][tile.x] = tile.type;
    });
  });

  return glyphs;
};
