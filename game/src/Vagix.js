import Game from "./scenes/Game.js";

export default new Phaser.Game({
    type: Phaser.AUTO,
    scale: {
        width: 400,
        height: 400,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#2d2d2d',
    scene: Game,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    }
});