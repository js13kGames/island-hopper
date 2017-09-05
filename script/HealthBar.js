/**
 * The player's health bar
 * @constructor
 * @param {integer} x - X-coordinate of the health bar
 * @param {integer} y - Y-cooridnate of the health bar
 * @param {integer} width - Width of the health bar
 * @param {integer} height - Height of the health bar
 */
function HealthBar(x, y, width, height)
{
  this.x = x;
  this.y = y;

  this.width = width;
  this.height = height;

  this.borderWidth = 2;
  this.marginWidth = 3;

  this.playerHealthPercentage = 1;
}

/**
 * Renders the health bar
 * @param {CanvasRenderingContext2D} context - 2D rendering context to use when rendering the tile
 */
HealthBar.prototype.draw = function(context)
{
  var self = this;

  // Draw the outer border
  context.fillStyle = 'rgb(255, 255, 255)';
  context.fillRect(
    self.x,
    self.y,
    self.width,
    self.height);

  // Draw the inner background
  context.fillStyle = 'rgb(0, 0, 0)';
  context.fillRect(
    self.x + self.borderWidth,
    self.y + self.borderWidth,
    self.width - (self.borderWidth * 2),
    self.height - (self.borderWidth * 2)
  );

  // Draw the actual health bar
  context.fillStyle = 'rgb(255, 0, 0)';
  context.fillRect(
    self.x + self.borderWidth + self.marginWidth,
    self.y + self.borderWidth + self.marginWidth,
    (self.width - (self.borderWidth * 2) - (self.marginWidth * 2)) * self.playerHealthPercentage,
    self.height - (self.borderWidth * 2) - (self.marginWidth * 2)
  );
};
