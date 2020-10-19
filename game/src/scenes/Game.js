export default class Game extends Phaser.Scene {
    map;

    player_speed;
    current_direction;
    next_direction;
    target_point;

    TILE_SIZE = 16;
    MAP_SIZE = 51;

    constructor() {
        super('tailscene'); // Key of the scene
        this.next_direction = false;
    }

    preload() {
        this.load.image('twobois', 'assets/twobois.png');
        this.load.spritesheet('user_blob', 'assets/player_blob.png', {frameWidth: 32, frameHeight: 32});

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        const level = Array(this.MAP_SIZE).fill().map(() => Array(this.MAP_SIZE).fill(0));

        this.map = this.make.tilemap({
            data: level,
            tileWidth: this.TILE_SIZE,
            tileHeight: this.TILE_SIZE,
            height: this.MAP_SIZE * this.TILE_SIZE,
            width: this.MAP_SIZE * this.MAP_SIZE
        });

        let tiles = this.map.addTilesetImage('twobois');

        this.map.createStaticLayer(0, tiles, 0, 0);
        this.map.createBlankDynamicLayer(2, tiles, 0, 0);

        this.anims.create({
            key: "move",
            frames: this.anims.generateFrameNumbers('user_blob'),
            frameRate: 12,
            repeat: -1
        });

        let map_center = ((this.MAP_SIZE / 2) * this.TILE_SIZE);

        this.player = this.physics.add.sprite(map_center, map_center, 'user_blob')
            .setScale(0.5).setOrigin(0.5, 0.5);

        this.player.play('move');
        this.cameras.main.startFollow(this.player);

        this.player_speed = Phaser.Math.GetSpeed(this.TILE_SIZE * 4, 1);

        this.current_direction = false
        this.next_direction = false;

    }

    update(t, dt) {
        if (this.cursors.left.isDown) {
            this.next_direction = Phaser.Math.Vector2.LEFT;
        } else if (this.cursors.right.isDown) {
            this.next_direction = Phaser.Math.Vector2.RIGHT;
        } else if (this.cursors.up.isDown) {
            this.next_direction = Phaser.Math.Vector2.UP;
        } else if (this.cursors.down.isDown) {
            this.next_direction = Phaser.Math.Vector2.DOWN;
        }

        if (!this.current_direction) {
            if (this.next_direction) {
                this.current_direction = this.next_direction.clone();
                this.current_tile = this.map.worldToTileXY(this.player.x, this.player.y)
                this.target_point = new Phaser.Geom.Point(this.player.x + (this.TILE_SIZE * this.current_direction.x),
                    this.player.y + (this.TILE_SIZE * this.current_direction.y))
                this.map.putTileAt(1, this.current_tile.x, this.current_tile.y);
            }
        } else {
            let delta_move = this.player_speed * dt;

            if (Phaser.Math.Fuzzy.Equal(this.player.x, this.target_point.x, Math.abs(delta_move)) &&
                Phaser.Math.Fuzzy.Equal(this.player.y, this.target_point.y, Math.abs(delta_move))) {

                // Center player just in case.
                this.player.x = this.target_point.x;
                this.player.y = this.target_point.y;

                this.next_tile = this.map.worldToTileXY(this.player.x + (this.next_direction.x * this.TILE_SIZE), this.player.y + (this.next_direction.y * this.TILE_SIZE));
                this.target_point.x = this.next_tile.x * this.TILE_SIZE + (this.TILE_SIZE / 2);
                this.target_point.y = this.next_tile.y * this.TILE_SIZE + (this.TILE_SIZE / 2);

                this.map.putTileAt(1, this.next_tile.x - this.next_direction.x, this.next_tile.y - this.next_direction.y);

                this.current_direction = this.next_direction.clone();
            }

            this.player.x += this.current_direction.x * delta_move;
            this.player.y += this.current_direction.y * delta_move;
        }
    }

};