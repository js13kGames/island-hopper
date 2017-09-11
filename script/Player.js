/**
 * The player's character
 * @constructor
 * @param {object} props - Various properties used in constructing the player
 */
function Player(props)
{
  this.x = props.x;
  this.y = props.y;

  this.height = props.size;
  this.width = props.size;

  this.halfHeight = (this.height/2);
  this.halfWidth = (this.width/2);
}

/**
 * Renders the player
 * @param {CanvasRenderingContext2D} context - 2D rendering context to use when rendering the player
 * @param {integer} mapCenterX - X-coordinate of the map's center
 * @param {integer} mapCenterY - Y-coordinate of the map's center
 * @param {float} zoomPercentage - Curret zoom percentage of the map
 */
Player.prototype.draw = function(context, mapCenterX, mapCenterY, zoomPercentage)
{
  context.fillStyle = 'rgb(255, 255, 255)';

  var x = ((this.x - this.halfWidth) * zoomPercentage) + mapCenterX;
  var y = ((this.y - this.halfHeight) * zoomPercentage) + mapCenterY;
  var width = this.width * zoomPercentage;
  var height = this.height * zoomPercentage;

  context.fillRect(x, y, width, height);
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
