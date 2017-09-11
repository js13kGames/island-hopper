/**
 * The player's wood inventory
 * @constructor
 * @param {integer} x - X-coordinate of the health bar
 * @param {integer} y - Y-cooridnate of the health bar
 * @param {integer} width - Width of the health bar
 * @param {integer} height - Height of the health bar
 */
function WoodInventory(x, y, width, height, maxWoodCount)
{
  this.x = x;
  this.y = y;

  this.width = width;
  this.height = height;

  this.count = 0;
  this.maxWoodCount = maxWoodCount;

  this.marginWidth = ((this.width * 0.2)/maxWoodCount);
  this.barWidth = ((this.width * 0.8)/maxWoodCount);
}

/**
 * Renders the wood inventory
 * @param {CanvasRenderingContext2D} context - 2D rendering context to use when rendering the tile
 */
WoodInventory.prototype.draw = function(context)
{
  var self = this;

  for(var i=0; i<self.maxWoodCount; i++)
  {
    context.fillStyle = 'rgb(20, 20, 20)';

    if(self.count > i)
    {
      context.fillStyle = 'rgb(172, 114, 0)';
    }

    context.fillRect(
      self.marginWidth + self.x + ((self.barWidth + self.marginWidth) * i),
      self.y,
      self.barWidth,
      self.height);
  }
};
