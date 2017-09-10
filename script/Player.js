/**
 * The player's character
 * @constructor
 * @param {object} props - Various properties used in constructing the player
 */
function Player(props)
{
  this.x = props.x;
  this.y = props.y;

  this.height = 30;
  this.width = 30;

  this.halfHeight = (this.height/2);
  this.halfWidth = (this.width/2);
}

/**
 * Renders the player
 * @param {CanvasRenderingContext2D} context - 2D rendering context to use when rendering the player
 * @param {integer} mapCenterX - X-coordinate of the map's center
 * @param {integer} mapCenterY - Y-coordinate of the map's center
 */
Player.prototype.draw = function(context, mapCenterX, mapCenterY)
{
  context.fillStyle = 'rgb(255, 255, 255)';
  context.fillRect(
    this.x - this.halfWidth + mapCenterX,
    this.y - this.halfHeight + mapCenterY,
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
