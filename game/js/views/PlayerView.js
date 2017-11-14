function PlayerView(view) {
    this.graphics = view.getScreen().createGraphics();
}

PlayerView.prototype.create = function () {
    this.graphics.beginFill(0x1d1d1d);
    this.graphics.beginFill(0xFF6666);
    this.graphics.drawCircle(100, 100 / 2, 18);
    this.graphics.endFill();
    this.graphics.endFill();

    var that = this;
    this.keyDownListener = new KeyDownListener(this);

    document.addEventListener('keydown', function (event) {
        that.keyDownListener.handle(event);
    });
};

PlayerView.prototype.update = function () {
    if (this.keyDownListener.moving) {
        this.updatePosition(this.keyDownListener.dirKey);
    }
};

PlayerView.prototype. updatePosition = function (keyCode) {
    switch (keyCode) {
        case 37: // left
            this.graphics.x -= 5;
            break;
        case 38: // up
            this.graphics.y -= 5;
            break;
        case 39: // right
            this.graphics.x += 5;
            break;
        case 40: // down
            this.graphics.y += 5;
            break;
        default:
            return -1;
    }

    return keyCode;
};