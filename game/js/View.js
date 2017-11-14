function View(screen) {
    this.screen = screen;
}

View.prototype.create = function () {
    this.background = new BackgroundView(this);
    this.background.create();

    this.player = new PlayerView(this);
    this.player.create();
};

View.prototype.update = function () {
    this.background.update();
    this.player.update();
};

View.prototype.getScreen = function () {
    return this.screen;
};