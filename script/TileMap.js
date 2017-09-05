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

  var tileGlyphs = [
    [0, 0, 0, 2, 2, 2, 2, 2, 2, 2],
    [0, 0, 0, 2, 2, 2, 2, 2, 2, 2],
    [0, 0, 0, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 0, 0, 0, 0, 2, 2],
    [2, 2, 2, 2, 0, 0, 3, 0, 2, 2],
    [2, 2, 2, 2, 0, 0, 4, 0, 2, 2],
    [2, 2, 2, 2, 0, 0, 0, 0, 2, 2],
    [2, 2, 2, 2, 0, 0, 0, 0, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
  ];

  this.x = x;
  this.y = y;

  this.initialize(tileGlyphs);

  this.width = this.tiles[0].length * this.tileSize;
  this.height = this.tiles.length * this.tileSize;
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
 */
TileMap.prototype.draw = function(context)
{
  var self = this;

  for(var i = 0; i < self.tiles.length; i++)
  {
    for(var j = 0; j < self.tiles[i].length; j++)
    {
      self.tiles[i][j].draw(context);
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
      operation(self.tiles[i][j]);
    }
  }
};
