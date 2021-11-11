/**
 * Menu state.
 */
function Menu() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Menu.prototype = proto;

Menu.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

Menu.prototype.create = function() {
	
	this.start = this.add.audio("start");
	this.start.allowMultiple=true;
	this.click2 = this.add.audio("click2");
	this.click2.allowMultiple=true;
	
	this.stage.backgroundColor = '#e5e4e2';
	this.logo1 = this.addLOGO(this.world.centerX, this.world.centerY);
	var tree1 = this.add.sprite(this.world.centerX, this.world.centerY+6,"tree1");
	tree1.anchor.set(0.5, 0.5);
	this.input.onDown.add(this.nextgroup, this);
	
};


Menu.prototype.addLOGO = function(x,y){
	c= this.add.sprite(x,y,"logo");
	c.animations.add("logo", mframe("logo",100),8,true);
	
	c.anchor.set(0.5, 0.5);
	this.game.physics.enable(c);
	c.body.collideWorldBounds = true;
	
	return c;
	
	
};
function mframe(key,n){
	f=[];
	for(i=1;i<n;i++){
		f.push(key+"("+i+")");
	}
	return f;
}

Menu.prototype.nextgroup = function() {
	this.logo1.play("logo");
	this.input.onDown.add(this.next, this);
	this.start.play();
};
Menu.prototype.next = function() {
	
	this.click2.play();
	this.game.state.start("Present");
	
};