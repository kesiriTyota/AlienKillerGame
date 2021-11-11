function Win() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Win.prototype = proto;

Win.prototype.create = function() {
	this.stage.backgroundColor = '#F2F3F4';
	var end = this.add.sprite(340,100,
	"gameover");
	end.anchor.set(0.5, 0.5);
	
	var Flame = this.add.sprite(300, 200,
	"Flame");
	Flame.anchor.set(0.5, 0.5);
	
	var menu = this.add.sprite(300, 280,
	"win");
	menu.anchor.set(0.5, 0.5);
	
	
this.input.onDown.active = true;
this.input.onDown.add(this.Next, this);

	 
};


Win.prototype.Next = function() {
	this.game.state.start("Present");
};