/**
 * Level state.
 */
function Ready() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Ready.prototype = proto;

Ready.prototype.create = function() {
	this.click = this.add.audio("click");
	this.click.allowMultiple=true;
	
	this.stage.backgroundColor = '#EBF5FB';
	var ready = this.add.sprite(310, 200,
	"readytoplay");
	ready.anchor.set(0.5, 0.5);
	this.input.onDown.add(this.nextis, this);
	
	
	var play = this.add.sprite(310, 220,"play");
	var twn = this.add.tween(play);
	twn.to({y : 230}, 1000, "Quad.easeInOut", true, 0, Number.MAX_VALUE, true);
	play.anchor.set(0.5, 0);	
	
};


Ready.prototype.nextis = function() {
	this.click.play();
	this.game.state.start("Level");
};