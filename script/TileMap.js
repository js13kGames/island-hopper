/**
 * A map of tiles
 * @constructor
 * @param {integer} x - X-coordinate of the map
 * @param {integer} y - Y-cooridnate of the map
 */
function TileMap(x, y, tileSize, difficulty)
{
  this.mapSize = 100;

  this.tiles = [];
  this.tileSize = tileSize;
  this.type = null;

  this.islands = this.generateIslands(difficulty);
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
 * @param {integer} mapWidth - Width of the map
 * @param {integer} mapHeight - Height of the map
 * @param {integer} mapCenterX - X-coordinate of the map's center
 * @param {integer} mapCenterY - Y-coordinate of the map's center
 * @param {float} zoomPercentage - Curret zoom percentage of the map
 */
TileMap.prototype.draw = function(context, mapWidth, mapHeight, mapCenterX, mapCenterY, zoomPercentage)
{
  var self = this;

  for(var i = 0; i < self.tiles.length; i++)
  {
    for(var j = 0; j < self.tiles[i].length; j++)
    {
      self.tiles[i][j].draw(context, mapWidth, mapHeight, mapCenterX, mapCenterY, zoomPercentage);
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
  for(var i=0; i<self.mapSize; i++)
  {
    glyphs.push([]);

    for(var j=0; j<self.mapSize; j++)
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

TileMap.prototype.generateIslands = function(difficulty)
{
  var self = this;

  var halfMapSize = self.mapSize/2;

  if(difficulty === 1)
  {
    // Tutorial Level
    return [
      new Island(halfMapSize, halfMapSize, 8, 8, true),
      new Island(halfMapSize, halfMapSize - 20, 8, 8, false),
      //new Island(halfMapSize, halfMapSize + 20, 8, 8, false),
      //new Island(halfMapSize + 20, halfMapSize, 8, 8, false),
      //new Island(halfMapSize - 20, halfMapSize, 8, 8, false)
    ];
  }

  var islandSize = 8;
  var islands = [ new Island(halfMapSize, halfMapSize, 8, 8, true) ];

  islandSize -= difficulty;

  if(islandSize < 3)
  {
    islandSize = 3;
  }

  for(var i=0; i<5; i++)
  {
    var x = Utility.getRandom(islandSize, this.mapSize - islandSize);
    var y = Utility.getRandom(islandSize, this.mapSize - islandSize);
    islands.push(new Island(x, y, islandSize, islandSize));
  }

  return islands;
}
