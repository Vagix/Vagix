function BackgroundView(view) {
    this.graphics = view.getScreen().createGraphics();
}

BackgroundView.prototype.create = function () {
    this.graphics.beginFill(0x1d1d1d);

    for (var x = 5; x < window.innerWidth; x += 30) {
        for (var y = 5; y < window.innerHeight; y += 30) {
            this.graphics.drawRect(x, y, 25, 25);
        }
    }

    this.graphics.endFill();
};

BackgroundView.prototype.update = function () {

};