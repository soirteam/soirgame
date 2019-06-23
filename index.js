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
var polices;
var police_number = 0;
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
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('drug', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/SoirMole.png', { frameWidth: 38, frameHeight: 25 });
    this.load.spritesheet('police', 'assets/PoliceMole.png', { frameWidth: 38, frameHeight: 25 });
}

function create() {
    this.physics.world.setBoundsCollision(true, true, true, true);
    //  A simple background for our game
    this.add.image(400, 300, 'sky');

    // Create the platforms group
    platforms = this.physics.add.staticGroup();

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    // The player and its settings
    player = this.physics.add.sprite(350, 450, 'dude');

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

    this.anims.create({
        key: 'police_left',
        frames: this.anims.generateFrameNumbers('police', { start: 0, end: 3 }),
        frameRate: 10,
	repeat: -1
    });

    this.anims.create({
        key: 'police_right',
        frames: this.anims.generateFrameNumbers('police', { start: 4, end: 7 }),
        frameRate: 10,
	repeat: -1
    });
    //  Input Events

    cursors = this.input.keyboard.createCursorKeys();
	polices = this.physics.add.group();
    drugs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(polices, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, drugs, collectDrug, null, this);

    this.physics.add.collider(drugs, platforms, drugHit, null, this);
    this.physics.add.collider(player, polices, gameover, null, this);

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
		if (police_number < 2)
			addPolice();
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
function gameover(){
	gameOver = true;
	console.log("fin de partie")
}
function addPolice() {
	let width = 20;
	let velocity = 125;
	let animation = 'police_right';

	if (Math.floor(Math.random() * 2) == 0) {
		width = 780;
		animation = 'police_left';
		velocity = -1 * velocity;
	}
	let police = polices.create(width, 525, 'police');
	police.setCollideWorldBounds(true);
	police.body.onWorldBounds = true;
	police.body.world.on('worldbounds', function(body){
	//police.destroy();
	//police_number--;
})
	police.anims.play(animation, true);
	police.setVelocity(velocity, 0);
	police_number++;
}
