// NPM MODULES
//import Phaser from 'phaser';
var Phaser = require('phaser');

// LOCAL MODULES
import Platforms from './platforms.es6';
import Player from './player.es6';
import Score from './score.es6';
import Stars from './stars.es6';

export default class Tiny extends Phaser.Game {
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
