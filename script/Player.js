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

  this.isFacingUp = false;
  this.isFacingLeft = false;
  this.isFacingRight = false;
  this.isFacingDown = true;
  this.isSwimming = false;

  this.upImage = new Image();
  this.upImage.src = 'images/player_up.png';

  this.downImage = new Image();
  this.downImage.src = 'images/player_down.png';

  this.leftImage = new Image();
  this.leftImage.src = 'images/player_left.png';

  this.rightImage = new Image();
  this.rightImage.src = 'images/player_right.png';

  this.upSwimImage = new Image();
  this.upSwimImage.src = 'images/player_swim_up.png';

  this.downSwimImage = new Image();
  this.downSwimImage.src = 'images/player_swim_down.png';

  this.leftSwimImage = new Image();
  this.leftSwimImage.src = 'images/player_swim_left.png';

  this.rightSwimImage = new Image();
  this.rightSwimImage.src = 'images/player_swim_right.png';
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
  var image = null;

  if(this.isFacingUp)
  {
    image = this.upImage;

    if(this.isSwimming)
    {
      image = this.upSwimImage;
    }
  }

  if(this.isFacingDown)
  {
    image = this.downImage;

    if(this.isSwimming)
    {
      image = this.downSwimImage;
    }
  }

  if(this.isFacingLeft)
  {
    image = this.leftImage;

    if(this.isSwimming)
    {
      image = this.leftSwimImage;
    }
  }

  if(this.isFacingRight)
  {
    image = this.rightImage;

    if(this.isSwimming)
    {
      image = this.rightSwimImage;
    }
  }

  context.drawImage(image, x, y, width, height);
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
  if(this.isFacingUp)
  {
    return {
      x: this.x + (this.width/2),
      y: this.y - (this.height/2) - 5,
      height: 1,
      width: 1
    };
  }

  else if(this.isFacingDown)
  {
    return {
      x: this.x + (this.width/2),
      y: this.y + (this.height) + (this.height/2) + 5,
      height: 1,
      width: 1
    };
  }

  else if(this.isFacingLeft)
  {
    return {
      x: this.x - (this.width/2) - 5,
      y: this.y + (this.height/2),
      height: 1,
      width: 1
    };
  }

  else if(this.isFacingRight)
  {
    return {
      x: this.x + (this.width) + (this.width/2) + 5,
      y: this.y + (this.height/2),
      height: 1,
      width: 1
    };
  }
}
