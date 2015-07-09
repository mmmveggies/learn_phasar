//'use strict';

class Simple extends Phaser.Game {
	constructor(w, h, engine=Phaser.AUTO, containerId='') {
		super(w, h, engine, containerId);
		
		this.cursor = null;
		this.platforms = null;
		this.player = null;
		this.score = null;
		this.stars = null;

	}

	getStar(player, star) {
		star.kill();
		this.score.scoreUp();
	}

	preload() {
		this.load.image('sky', 'assets/sky.png');
		this.load.image('ground', 'assets/platform.png');
		this.load.image('star', 'assets/star.png');
		this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	}

	create() {
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.add.sprite(0, 0, 'sky');

		this.platforms = new Platforms(this);
		this.player = new Player(this, 0, 200, 'dude');
		this.score = new Score(this);
		this.stars = new Stars(this, 20, 'star');

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	update() {
		this.physics.arcade.collide(this.player, this.platforms);
		this.physics.arcade.collide(this.stars, this.platforms);
		this.physics.arcade.collide(this.player, this.stars, this.getStar, null, this);
		this.player.moveFromCursor(this.cursors);
	}

}

class Player extends Phaser.Sprite {
	constructor(game, x, y, key, frame) {
		super(game, x, y, key, frame);

		this.xAccel = 15;
		this.xSpeedLimit = 300;

		this.body.bounce.y = 0.08;
		this.body.gravity.y = 200;
		this.body.collideWorldBounds = true;

		this.animations.add( 'left', [0,1,2,3], 20, true);
		this.animations.add('right', [5,6,7,8], 20, true);

		game.physics.arcade.enable(this);
	}

	moveFromCursor(cursors) {
		if (cursors.left.isDown) 
			this.moveLeft();
		else if (cursors.right.isDown)
			this.moveRight();
		else
			this.animations.stop();

		if(cursors.up.isDown && this.body.touching.down)
			this.jump();
	}
	
	moveLeft() {
		var vX = this.body.velocity.x;

		if (vX > 10)
			vX = 10;
		else if (vX > 0)
			vX -= 1;
		else 
			vX = Math.max(-this.xSpeedLimit, vX-this.xAccel);

		this.animations.play('left');
		this.body.velocity.x = vX;
	}

	moveRight() {
		var vX = this.body.velocity.x;

		if (vX < -10)
			vX = -10;
		else if (vX < 0)
			vX += 1;
		else 
			vX = Math.min(this.xSpeedLimit, vX+this.xAccel);

		this.animations.play('right');
		this.body.velocity.x = vX;
	}

	stopMoving() {
		this.animations.stop();
		this.frame = 4;

		if(player.body.touching.down) 
			this.body.velocity.x = Math.floor(this.body.velocity.x / 1.6); 
	}

	jump() {
		this.body.velocity.y = -420;
	}
}

class Platforms extends Phaser.Group {
	constructor(game) {
		super(game);

		this.enableBody = true;	
		
		var ground = this.create(0, game.world.height-64, 'ground');
		ground.scale.setTo(2,2);
		ground.body.immovable = true;

		var ledge1 = this.create( 400, 400, 'ground');
		ledge1.body.immovable = true;

		var ledge2 = this.create(-150, 250, 'ground');
		ledge2.body.immovable = true;
	}
}

class Stars extends Phaser.Group {
	constructor(game, numStars, key) {
		super(game);

		this.enableBody = true;

		var sW = game.world.width / numStars;

		for (let i = 0; i < numStars; i++) {
			let star = this.create(i*sW, 0, key);
			star.body.gravity.y = 18;
			star.body.bounce.y = 0.2 + Math.random() * 0.4;
		}
	}
}

class Score extends Phaser.Text {
	constructor(game, x=10, y=10, t='score: ', opts) {
		opts = opts || { fontSize: '32px', fill: '#000' }; 
		super(game, x, y, t, opts);
		this.t = t;
		this.score = 0;
	}

	scoreUp(v=10) {
		this.score += v;
		this.text = (t + this.score); 
	}
}

var w = window.innerWidth;
var h = window.innerHeight;
new Simple(w, h);

