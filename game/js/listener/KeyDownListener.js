function KeyDownListener(playerView) {
    console.log(playerView);
    this.playerView = playerView;
    this.moving = false;
}

KeyDownListener.prototype.handle = function (event) {
    event = window.event ? window.event : e;

    var arrow = this.playerView.updatePosition(event.keyCode);

    if (arrow != -1) {
        this.moving = true;
        this.dirKey = event.keyCode;
    }
};

