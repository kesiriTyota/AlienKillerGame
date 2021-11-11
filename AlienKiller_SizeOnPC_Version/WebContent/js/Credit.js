/**
 * Boot state.
 */
function Credit() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Credit.prototype = proto;

Credit.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

Credit.prototype.create = function() {
	this.click = this.add.audio("click");
	this.click.allowMultiple=true;
	
	this.stage.backgroundColor = '#e5e4e2';
	var group = this.add.sprite(this.world.centerX, this.world.centerY,
	"group");
	group.anchor.set(0.5, 0.5);
	
	var foot = this.add.sprite(this.world.centerX, this.world.centerY+400,
	"bg_credit");
	foot.anchor.set(0.5, 0.5);
	
	this.createButtons();

};

Credit.prototype.createButtons = function() {
	this.btn_home = this.add.button(this.world.centerX+100, this.world.centerY-220,"button_home");
	this.btn_home.anchor.set(0.5);
	this.btn_home.isdown = false;
	
	
	this.btn_home.onInputDown.add(this.inputDown,this.btn_home);
	this.btn_home.onInputUp.add(this.inputUp,this.btn_home);
	this.btn_home.onInputOver.add(this.onInputOver,this.btn_home);
	this.btn_home.onInputOut.add(this.onInputOut,this.btn_home);
}


Credit.prototype.inputDown = function() {
	this.alpha = 0.6;
	this.isdown = true;
};

Credit.prototype.inputUp = function() {
	this.alpha = 0.9;
	this.isdown = false;
};
Credit.prototype.onInputOver = function() {
	this.alpha = 0.6;
	this.isdown = false;
};
Credit.prototype.onInputOut = function() {
	this.alpha = 0.9;
	this.isdown = false;
};

Credit.prototype.update = function() {
	
	if(this.btn_home.isdown){
		this.nextgroup();
	}
	

};


Credit.prototype.nextgroup = function() {
	this.click.play();
	this.game.state.start("Present");
};