function Screen(vagix) {
    this.vagix = vagix;
    this.view = new View(this);
}

Screen.prototype.initialize = function () {
    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.view);

    this.stage = new PIXI.Container();
    this.view.create();
};

Screen.prototype.render = function () {
    this.view.update();
    this.renderer.render(this.stage);
};

Screen.prototype.createGraphics = function() {
    var graphics = new PIXI.Graphics();
    this.stage.addChild(graphics);
    return graphics;
};

Vagix.prototype.getStage = function () {
    return this.stage;
};

Vagix.prototype.getVagix = function () {
    return this.vagix;
};

