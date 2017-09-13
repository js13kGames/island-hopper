Utility = {};

Utility.intersects = function(firstRect, secondRect)
{
  return (Utility.getIntersection(firstRect, secondRect) != null);
}

Utility.getIntersection = function(firstRect, secondRect)
{
  // Source: https://stackoverflow.com/a/22921131/74053

  var leftXMax = Math.max(firstRect.x, secondRect.x);
  var rightXMin = Math.min(firstRect.x + firstRect.width, secondRect.x + secondRect.width);

  var topYMax = Math.max(firstRect.y, secondRect.y);
  var bottomYMin = Math.min(firstRect.y + firstRect.height, secondRect.y + secondRect.height);

  if(rightXMin >= leftXMax && bottomYMin >= topYMax)
  {
    return {
      x: leftXMax,
      y: topYMax,
      width: (rightXMin - leftXMax),
      height: (bottomYMin - topYMax)
    };
  }

  return null;
}

Utility.getRandom = function(min, max)
{
  // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
