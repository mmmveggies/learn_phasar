// NPM MODULES
//import Phaser from 'phaser';
var Phaser = require('phaser');

// STATIC VALUES
const STAR_GRAVITY = 18;
const BOUNCE_VARIANCE = 0.4

export default class Stars extends Phaser.Group {
	constructor(game, numStars, key) {
		super(game);

		this.enableBody = true;

		var sW = game.world.width / numStars;

		for (let i = 0; i < numStars; i++) {
			let star = this.create(i*sW, 0, key);
			star.body.gravity.y = STAR_GRAVITY;
			star.body.bounce.y = 0.2 + Math.random() * BOUNCE_VARIANCE;
		}
	}
}
