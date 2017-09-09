/**
 * The player's wood inventory
 * @constructor
 * @param {integer} x - X-coordinate of the health bar
 * @param {integer} y - Y-cooridnate of the health bar
 * @param {integer} width - Width of the health bar
 * @param {integer} height - Height of the health bar
 */
function WoodInventory(x, y, width, height)
{
  this.x = x;
  this.y = y;

  this.width = width;
  this.height = height;

  this.count = 0;
}

/**
 * Renders the wood inventory
 * @param {CanvasRenderingContext2D} context - 2D rendering context to use when rendering the tile
 */
WoodInventory.prototype.draw = function(context)
{
  var self = this;

  context.font = "25px Arial";
  context.fillStyle = "rgb(68, 43, 28)";
  context.fillText("# x " + self.count, self.x, self.y);
};
