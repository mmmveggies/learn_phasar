// NPM MODULES
//import Phaser from 'phaser';
var Phaser = require('phaser');

export default class Platforms extends Phaser.Group {
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
