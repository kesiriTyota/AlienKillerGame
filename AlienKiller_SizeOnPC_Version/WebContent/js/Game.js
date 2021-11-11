function Game() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Game.prototype = proto;

Game.prototype.create = function() {
	this.stage.backgroundColor = '#F2F3F4';
	var end = this.add.sprite(600, 300,
	"gameover");
	end.anchor.set(0.5, 0.5);
	
	var Flame = this.add.sprite(600, 400,
	"Flame");
	Flame.anchor.set(0.5, 0.5);
	
	var menu = this.add.sprite(600, 500,
	"menu");
	menu.anchor.set(0.5, 0.5);
	
	
this.input.onDown.active = true;
this.input.onDown.add(this.Next, this);

	 
};


Game.prototype.Next = function() {
	this.game.state.start("Present");
};