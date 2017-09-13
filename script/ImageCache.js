var ImageCache = (function() {

  var waterTileImage = new Image();
  waterTileImage.src = 'images/water.png';

  var landTileImage = new Image();
  landTileImage.src = 'images/land.png';

  var treeWithFruitTileImage = new Image();
  treeWithFruitTileImage.src = 'images/tree_with_fruit.png';

  var treeTileImage = new Image();
  treeTileImage.src = 'images/tree.png';

  var towerTileImage = new Image();
  towerTileImage.src = 'images/tower.png';

  var markerTileImage = new Image();
  markerTileImage.src = 'images/marker.png';

  var upImage = new Image();
  upImage.src = 'images/player_up.png';

  var downImage = new Image();
  downImage.src = 'images/player_down.png';

  var leftImage = new Image();
  leftImage.src = 'images/player_left.png';

  var rightImage = new Image();
  rightImage.src = 'images/player_right.png';

  var upSwimImage = new Image();
  upSwimImage.src = 'images/player_swim_up.png';

  var downSwimImage = new Image();
  downSwimImage.src = 'images/player_swim_down.png';

  var leftSwimImage = new Image();
  leftSwimImage.src = 'images/player_swim_left.png';

  var rightSwimImage = new Image();
  rightSwimImage.src = 'images/player_swim_right.png';

  return {
    waterTileImage: waterTileImage,
    landTileImage: landTileImage,
    treeWithFruitTileImage: treeWithFruitTileImage,
    treeTileImage: treeTileImage,
    towerTileImage: towerTileImage,
    markerTileImage: markerTileImage,
    upImage: upImage,
    downImage: downImage,
    leftImage: leftImage,
    rightImage: rightImage,
    upSwimImage: upSwimImage,
    downSwimImage: downSwimImage,
    leftSwimImage: leftSwimImage,
    rightSwimImage: rightSwimImage
  };

})();
