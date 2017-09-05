/**
 * The player's character
 * @constructor
 * @param {object} props - Various properties used in constructing the player
 */
function Player(props)
{
  this.x = props.x;
  this.y = props.y;

  this.height = 20;
  this.width = 20;
}

/**
 * Renders the player
 * @param {CanvasRenderingContext2D} context - 2D rendering context to use when rendering the player
 */
Player.prototype.draw = function(context)
{
  context.fillStyle = 'rgb(255, 255, 255)';
  context.fillRect(
    this.x,
    this.y,
    this.width,
    this.height);
};

/**
 * Updates the ship's state
 */
Player.prototype.update = function()
{
};

Player.prototype.getBoundingRectangle = function()
{
  return {
    x: this.x,
    y: this.y,
    height: this.height,
    width: this.width
  };
}

Player.prototype.getActionBoundingRectangle = function()
{
  return {
    x: this.x,
    y: this.y - this.height,
    height: this.height,
    width: this.width
  };
}
