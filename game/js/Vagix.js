function Vagix() {
    this.screen = new Screen(this);
    this.connection = new ConnectionProvider();
}

Vagix.prototype.initialize = function () {
    this.connection.connect();
    this.screen.initialize();
};

Vagix.prototype.launch = function () {
    var that = this;

    setInterval(function () {
        that.screen.render();
    }, 10);
};

Vagix.prototype.getScreen = function () {
    return this.screen;
};