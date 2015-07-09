// NPM MODULES
//import Phaser from 'phaser';
var Phaser = require('phaser');

// STATIC VALUES
const X_ACCEL = 15;
const X_SPEED_LIMIT = 300;
const TURN_STEPS = 10;
const TURN_SPEED = 1;

export default class Player extends Phaser.Sprite {
	constructor(game, x, y, key, frame) {
		super(game, x, y, key, frame);

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

		if (vX > TURN_STEPS)
			vX = TURN_STEPS;
		else if (vX > 0)
			vX -= TURN_SPEED;
		else 
			vX = Math.max(-X_SPEED_LIMIT, vX-X_ACCEL);

		this.animations.play('left');
		this.body.velocity.x = vX;
	}

	moveRight() {
		var vX = this.body.velocity.x;

		if (vX < -TURN_STEPS)
			vX = -TURN_STEPS;
		else if (vX < 0)
			vX += TURN_SPEED;
		else 
			vX = Math.min(X_SPEED_LIMIT, vX+X_ACCEL);

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
