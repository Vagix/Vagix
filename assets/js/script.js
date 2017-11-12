//Create the renderer
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

var graphics = new PIXI.Graphics();
graphics.beginFill(0x1d1d1d);
for (var x = 5; x < window.innerWidth; x += 30) {
  for (var y = 5; y < window.innerHeight; y += 30) {
    graphics.drawRect(x, y, 25, 25);
  }
}
graphics.endFill();
stage.addChild(graphics);

var mvGraphics = new PIXI.Graphics();
mvGraphics.beginFill(0xFF6666);
mvGraphics.drawCircle( 100, 100 / 2, 18);
mvGraphics.endFill();
stage.addChild(mvGraphics);

var moving;
var dirKey;
document.addEventListener('keydown', function (event) {
    event = window.event ? window.event : e;

    var arrow = updatePosition(event.keyCode);

    if (arrow != -1) {
        moving = true;
        dirKey = event.keyCode;
    }
});

function updatePosition(keyCode) {
    switch (keyCode) {
        case 37: // left
            mvGraphics.x -= 5;
            break;
        case 38: // up
            mvGraphics.y -= 5;
            break;
        case 39: // right
            mvGraphics.x += 5;
            break;
        case 40: // down
            mvGraphics.y += 5;
            break;
        default:
            return -1;
    }

    return keyCode;
}

setInterval(function () {
    if (moving) {
        updatePosition(dirKey);
    }

    renderer.render(stage);
}, 10);