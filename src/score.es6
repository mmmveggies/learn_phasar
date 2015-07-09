// NPM MODULES
//import Phaser from 'phaser';
var Phaser = require('phaser');

// STATIC VALUES
const SCORE_INCREASE = 10;

export default class Score extends Phaser.Text {
	constructor(game, x=10, y=10, t='score: ', opts) {
		opts = opts || { fontSize: '32px', fill: '#000' }; 
		super(game, x, y, t, opts);
		this.t = t;
		this.score = 0;
	}

	scoreUp(v=SCORE_INCREASE) {
		this.score += v;
		this.text = (t + this.score); 
	}
}
