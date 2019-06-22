const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var drugs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var turn_left = false;
var digging = false;

var game = new Phaser.Game(config);

function preload() {
    this.load.image("tiles", "assets/platformertiles.png");
    this.load.tilemapTiledJSON("map", "assets/soir_platform.json");
    this.load.image('drug', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/SoirMole.png', { frameWidth: 38, frameHeight: 25 });
}

function create() {
    //  The platforms group contains the ground and the 2 ledges we can jump on
    // platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    // platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    
    this.map = this.add.tilemap("map");
    var tileset = this.map.addTilesetImage("platformertiles", "tiles");
    this.backgroundlayer = this.map.createStaticLayer("Background", tileset);
    this.groundLayer = this.map.createStaticLayer("Ground", tileset);
    
    //Before you can use the collide function you need to set what tiles can collide
    this.groundLayer.setCollisionBetween(0, 800);

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn_left',
        frames: [{ key: 'dude', frame: 0 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'turn_right',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'digging_start',
        frames: this.anims.generateFrameNumbers('dude', { start: 11, end: 15 }),
        frameRate: 10,
    });


    this.anims.create({
        key: 'digging_end',
        frames: this.anims.generateFrameNumbers('dude', { start: 8, end: 11 }),
        frameRate: 10,
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    drugs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, this.groundLayer);
    // this.physics.add.collider(drugs, this.groundLayer);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, drugs, collectDrug, null, this);

    this.physics.add.collider(drugs, this.groundLayer, drugHit, null, this);
}

function update() {
    if (gameOver) {
        return;
    }


    if (!digging) {
        if (cursors.down.isDown) {
            player.setVelocityX(0);
            digging = true;
            player.body.enable = false;
            player.anims.play('digging_start', true);
            setTimeout(() => {
                player.anims.play('digging_end', true);
                setTimeout(() => {
                    digging = false;
                    player.body.enable = true;
                }, 400);
            }, 1000);
        }
        else if (cursors.left.isDown) {
            player.setVelocityX(-240);
            turn_left = true;

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(240);
            turn_left = false;

            player.anims.play('right', true);
        }
        else {
            player.setVelocityX(0);

            if (turn_left) {
                player.anims.play('turn_left');
            } else {
                player.anims.play('turn_right');
            }
        }
        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }
    }

    if (Math.floor(Math.random() * 30) === 0) {
        addDrug();
    }
}

function collectDrug(player, drug) {
    drug.destroy();

    score += 10;
    scoreText.setText('Score: ' + score);
}

function drugHit(drug, platform) {
    drug.destroy();
}

function addDrug() {
    const x = Math.floor(Math.random() * 800);
    let drug = drugs.create(x, 0, 'drug');
    drug.setVelocity(0, 80);
    drug.body.setAllowGravity(false);
}