Utility = {};

Utility.intersects = function(firstRect, secondRect)
{
  // Do the X coordinates intersect?
  var xIntersects =
    Utility.linesIntersect(firstRect.x, firstRect.x + firstRect.width, secondRect.x, secondRect.x + secondRect.width)
    || Utility.linesIntersect(secondRect.x, secondRect.x + secondRect.width, firstRect.x, firstRect.x + firstRect.width);

  if(!xIntersects)
  {
    // If the X-coordinates don't even intersect, we can stop now
    return false;
  }

  // Do the Y coordinates intersect?
  var yIntersects =
    Utility.linesIntersect(firstRect.y, firstRect.y + firstRect.height, secondRect.y, secondRect.y + secondRect.height)
    || Utility.linesIntersect(secondRect.y, secondRect.y + secondRect.height, firstRect.y, firstRect.y + firstRect.height);

  return xIntersects && yIntersects;
}

Utility.linesIntersect = function(a1, a2, b1, b2)
{
  return (a2 >= b1 && a2 <= b1)
    || (a1 >= b1 && a1 <= b2)
    || (a1 >= b1 && a2 <= b2)
    || (a1 <= b1 && a2 >= b2);
}
