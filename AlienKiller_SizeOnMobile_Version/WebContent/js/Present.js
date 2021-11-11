function Present() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Present.prototype = proto;




Present.prototype.create = function() {
	
	this.click = this.add.audio("click");
	this.click.allowMultiple=true;
	
	this.stage.backgroundColor = '#F2F3F4';
	
	var moon = this.add.sprite(230, this.world.centerY+30,
	"moon");
	moon.width =190;
	moon.anchor.set(0.5, 0.5);
	var twn5 = this.add.tween(moon);
	twn5.to({
		angle : 360
	}, 15000, "Quad.easeInOut", true, 0,  true);
	

	var foot = this.add.sprite(this.world.centerX, this.world.centerY+160,
	"foot");
	foot.anchor.set(0.5, 0.5);
	
	var head = this.add.sprite(this.world.centerX, this.world.centerY-145,
	"head");
	head.anchor.set(0.5, 0.5);
	
//	var button = game.add.button(game.world.centerX, game.world.centerY, 'logo', actionOnClick, this, 1, 0, 2);
 //   button.anchor.setTo(0.5, 0.5);
	
	//play.events.onInputOver.add(onDown, this);
// myGamePiece.angle += 1 * Math.PI / 180; 
	var logo = this.add.sprite(this.world.centerX,this.world.centerY-300,"alien_logo");

	logo.anchor.set(0.5, 0);
	var twn1 = this.add.tween(logo);
	twn1.to({y:-15},2000,"Quad.easeInOut", true, 0);

//this.input.onDown.active = true;

//this.input.onDown.add(this.Nextgroup,this);
this.createButtons();

	 
};

Present.prototype.createButtons = function() {
	//button play
	this.btn_play = this.add.button(this.world.centerX, this.world.centerY-50,"play_menu_1");
	this.btn_play.width = 170;
	this.btn_play.height = 80;
	this.btn_play.anchor.set(0.5,0.5);
	
	this.btn_play.isdown = false;
	
	this.btn_play.onInputDown.add(this.inputDown,this.btn_play);
	this.btn_play.onInputUp.add(this.inputUp,this.btn_play);
	this.btn_play.onInputOver.add(this.onInputOver,this.btn_play);
	this.btn_play.onInputOut.add(this.onInputOut,this.btn_play);
	
	//button story
	this.btn_story = this.add.button(this.world.centerX, this.world.centerY+24,"story_menu_1");
	this.btn_story.width = 170;
	this.btn_story.height = 80;
	this.btn_story.anchor.set(0.5,0.5);
	
	this.btn_story.isdown = false;
	
	this.btn_story.onInputDown.add(this.inputDown,this.btn_story);
	this.btn_story.onInputUp.add(this.inputUp,this.btn_story);
	this.btn_story.onInputOver.add(this.onInputOver,this.btn_story);
	this.btn_story.onInputOut.add(this.onInputOut,this.btn_story);
	
	//button credit
	this.btn_credit = this.add.button(this.world.centerX, this.world.centerY+100,"credit_menu_1");
	this.btn_credit.width = 170;
	this.btn_credit.height = 80;
	this.btn_credit.anchor.set(0.5,0.5);
	
	this.btn_credit.isdown = false;
	
	this.btn_credit.onInputDown.add(this.inputDown,this.btn_credit);
	this.btn_credit.onInputUp.add(this.inputUp,this.btn_credit);
	this.btn_credit.onInputOver.add(this.onInputOver,this.btn_credit);
	this.btn_credit.onInputOut.add(this.onInputOut,this.btn_credit);
	
};
//onInputOut

Present.prototype.inputDown = function() {
	
	this.alpha = 0.8;
	this.isdown = true;
	
};

Present.prototype.inputUp = function() {
	this.alpha = 1;
	this.isdown = false;
	
};
Present.prototype.onInputOver = function() {
	this.alpha = 0.8;
	this.isdown = false;
	
};
Present.prototype.onInputOut = function() {
	this.alpha = 1;
	this.isdown = false;
	
};

Present.prototype.update = function() {
	
	if(this.btn_play.isdown){
		this.NextPlay();
		this.click.play();
	}
	else if(this.btn_story.isdown){
		this.NextStory();
		this.click.play();
	}
	else if(this.btn_credit.isdown){
		this.NextCredit();
		this.click.play();
	}
	

};


function actionOnClick () {

	 button.setFrames(4, 3, 5);

}
Present.prototype.NextPlay = function() {
	this.game.state.start("Ready");
};
Present.prototype.NextStory = function() {
	this.game.state.start("Story");
};
Present.prototype.NextCredit = function() {
	this.game.state.start("Credit");
};
