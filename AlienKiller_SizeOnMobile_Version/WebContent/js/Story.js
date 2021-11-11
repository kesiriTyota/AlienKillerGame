function Story() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Story.prototype = proto;

Story.prototype.create = function() {
	this.stage.backgroundColor = '#F2F3F4';
	var story1 = this.add.sprite(120, 80,
	"story1");
	story1.width = 200;
	story1.height = 120;
	story1.anchor.set(0.5, 0.5);

this.storyW = this.add.sprite(20,150,"story_world");
this.storyW.width = 180;
this.storyW.height = 170;
this.storyW.anchor.set(0,0);
var twn3 = this.add.tween(this.storyW);
twn3.to({
	y : 160
}, 1000, "Quad.easeInOut", true, 0, Number.MAX_VALUE, true);


var story2 = this.add.sprite(500, -40,
"story2");
story2.width = 180;
story2.height = 170;
story2.anchor.set(0.5, 0.5);
var twn1 = this.add.tween(story2);
twn1.to({y:90},1000,"Quad.easeInOut", true, 0);

var story3 = this.add.sprite(500, 350,
"story3");
story3.width = 170;
story3.height = 170;
story3.anchor.set(0.5, 0.5);
var twn1 = this.add.tween(story3);
twn1.to({y:260},2000,"Quad.easeInOut", true, 0);




this.input.onDown.active = true;
this.input.onDown.add(this.Next, this);

	 
};


Story.prototype.Next = function() {
	this.game.state.start("Ready");
};