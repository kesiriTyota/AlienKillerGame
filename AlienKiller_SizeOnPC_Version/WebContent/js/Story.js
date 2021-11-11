function Story() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Story.prototype = proto;

Story.prototype.create = function() {
	this.stage.backgroundColor = '#F2F3F4';
	var story1 = this.add.sprite(300, 150,
	"story1");
	story1.anchor.set(0.5, 0.5);

this.storyW = this.add.sprite(100,400,"story_world");
this.storyW.anchor.set(0,0);
var twn3 = this.add.tween(this.storyW);
twn3.to({
	y : 440
}, 1000, "Quad.easeInOut", true, 0, Number.MAX_VALUE, true);


var story2 = this.add.sprite(900, 700,
"story2");
story2.anchor.set(0.5, 0.5);
var twn1 = this.add.tween(story2);
twn1.to({y:170},2000,"Quad.easeInOut", true, 0);

var story3 = this.add.sprite(900, 1000,
"story3");
story3.anchor.set(0.5, 0.5);
var twn1 = this.add.tween(story3);
twn1.to({y:600},2000,"Quad.easeInOut", true, 0);




this.input.onDown.active = true;
this.input.onDown.add(this.Next, this);

	 
};


Story.prototype.Next = function() {
	this.game.state.start("Ready");
};