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

  this.boundBuffer = 2;
}

/**
 * Renders the player
 * @param {CanvasRenderingContext2D} context - 2D rendering context to use when rendering the player
 * @param {integer} mapWidth - Width of the map
 * @param {integer} mapHeight - Height of the map
 * @param {integer} mapCenterX - X-coordinate of the map's center
 * @param {integer} mapCenterY - Y-coordinate of the map's center
 * @param {float} zoomPercentage - Curret zoom percentage of the map
 */
Player.prototype.draw = function(context, mapWidth, mapHeight, mapCenterX, mapCenterY, zoomPercentage)
{
  context.fillStyle = 'rgb(255, 255, 255)';

  var x = (this.x - this.halfWidth + mapCenterX) * zoomPercentage;
  var y = (this.y - this.halfHeight + mapCenterY) * zoomPercentage;

  x += (1 - zoomPercentage) * (mapWidth/2);
  y += (1 - zoomPercentage) * (mapHeight/2);

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
    x: this.x + this.boundBuffer,
    y: this.y + this.boundBuffer,
    height: this.height - this.boundBuffer,
    width: this.width - this.boundBuffer
  };
}

Player.prototype.getActionBoundingRectangle = function()
{
  return {
    x: this.x + (this.width/2),
    y: this.y - (this.height/2) - 5,
    height: 1,
    width: 1
  };
}
