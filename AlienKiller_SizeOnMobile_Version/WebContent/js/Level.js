/**
   * Level state.
 */
function Level() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Level.prototype = proto;

Level.prototype.create = function() {
	
	//เพิ่มเสียง	
	this.music = this.add.sound("music",1,true);
	this.music.play();
	this.shoot3 = this.add.audio("shoot3");
	this.shoot3.allowMultiple=true;
	this.lasore = this.add.audio("lasore");
	this.lasore.allowMultiple=true;
	this.boom = this.add.audio("boom");
	this.boom.allowMultiple=true;
	this.coin2 = this.add.audio("coin2");
	this.coin2.allowMultiple=true;
	this.dead = this.add.audio("dead");
	this.dead.allowMultiple=true;
	
	
	
	//สร้างพื้นหลัง
	this.createBg();
	
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.physics.arcade.gravity.y = 1000;
	
	this.stage.backgroundColor = '#F2F3F4';
	this.game.score = 0;
	this.game.health = 2;
	count = 0;
	
	
	
	
this.map = this.game.add.tilemap("map_test6");
this.map.addTilesetImage('t1');
this.map.addTilesetImage('t2');
this.map.addTilesetImage('t4');


//this.map.addTilesetImage('tile_sheet2');
//this.map.addTilesetImage('t2');
//this.map.addTilesetImage('Tileset');

this.map_floor = this.map.createLayer("Tile Layer 1");
console.log(this.map);
this.map_floor.resizeWorld();
this.map.setCollisionBetween(0, 17, true, this.map_floor);


this.ui = this.add.group();
this.ui.fixedToCamera = true;

this.enemies = this.add.group();
this.item = this.add.group();
for (x in this.map.objects.object) {
	var obj = this.map.objects.object[x];
	if (obj.type == "player") {
		console.log(this.player);
	
		this.player = this.addBOB(obj.x, obj.y);
		this.game.camera.follow(this.player,
				Phaser.Camera.FOLLOW_PLATFORMER);
		this.player.play("Idle");
		this.player.scale.x = 1.5;
		this.player.scale.y = 1.5;
	}else if(obj.type=="enemy1"){
		 var c = this.addMon(obj.x,obj.y);
		 this.enemies.add(c);
	}else if(obj.type=="enemy2"){
		 var c = this.addMon(obj.x,obj.y);
		 this.enemies.add(c);
	}else if(obj.type=="goal"){
		 // เพิ่ม sprite goal
		 // this.goal = this.addGoal(obj.x,obj.y);
	}else if(obj.type=="item"){
		var item = this.addCoin(obj.x,obj.y);
		this.game.physics.enable(item);
		item.body.collideWorldBounds = false;
		this.item.add(item);
		
	}
		 
}

this.game.coin = 0;
this.coinText = this.add.text(373,10,''+"Coin : 0",{fill:'#DF7401'});
this.coinText.z = 10;
this.coinText.fixedToCamera = true;

this.player.events.onInputDown.add(this.fireWeapon, this); 
this.player.maxHealth = 5;
this.player.setHealth(2);
this.player.events.onKilled.addOnce(this.onPlayerKilled,this);
this.player.canhit = true;

this.scoreText = this.add.text(500, 10, ''+"Kill : 0", { fill: '#DF7401' });
this.scoreText.z = 10;
this.scoreText.fixedToCamera = true;
this.createButtons();
this.createWeapon();


};



Level.prototype.createBg = function() {
//	this.bg_sun = this.add.image(0,0,"bg1","",this.bg);
	
	this.BG = this.add.image(0,220,"bg1","",this.bg);
	
	this.BG.width  = this.world.width+20000;
	this.BG.height  = this.world.height+1000;
	//this.h = this.add.image(100,200,"heart","",this.bg);
	this.heart = [];
	for(var i=0;i<2;i++){
		 this.heart[i] = this.add.sprite(30*i,10,"heart");
		 this.heart[i].scale.set(1);
		 this.heart[i].fixedToCamera = true;
	}
	
	this.btn1 = this.add.button(590,10,"button_exit");
	this.btn1.width = 50;
	this.btn1.height = 50;
	this.btn1.fixedToCamera = true;
	this.btn1.alpha = 0.6;
	this.btn1.isdown = false;
	
	this.btn1.onInputDown.add(this.inputDown,this.btn1);
	this.btn1.onInputUp.add(this.inputUp,this.btn1);
	this.btn1.onInputOver.add(this.onInputOver,this.btn1);
	this.btn1.onInputOut.add(this.onInputOut,this.btn1);

    //	 this.bg_3 = this.add.image(0,530,"bg2","",this.bg);
	//   this.bg_3.width  = 480;
	//   this.bg_3.height  = 400;
	
	//this.bg_1 = this.add.tileSprite(0,this.world.height-180,this.world.width,180,"bg_1","",this.bg);

};

Level.prototype.addBOB = function(x,y){
	c= this.add.sprite(x,y,"BOB");
	c.animations.add("idle", mframe("Idle",3),8,true);
	c.animations.add("motion", mframe("Motion",15),8,true);
	c.animations.add("run", mframe("Run",8),8,true);
	c.animations.add("shoot", mframe("Shoot",5),8 ,true);
	c.animations.add("jump", mframe("Jump",1000),1 ,true);
	c.play("Idle");
	
	c.anchor.set(0, 1);
	this.game.physics.enable(c);
	c.body.collideWorldBounds = true;
	return c;	
};
Level.prototype.addCoin = function(x,y){
	c = this.add.sprite(x,y,"coin");
	c.animations.add("Coin", mframe("Coin",11),9,true);
	c.play("Coin");
	c.anchor.set(0.5, 0.5);
	this.game.physics.enable(c);
	c.body.collideWorldBounds = true;
	return c;	
};

Level.prototype.addMon = function(x,y){
	c= this.add.sprite(x,y,"monster");
	c.animations.add("idle", mframe("idle",200),9,true);
	c.animations.add("dead", mframe("dead",100),9,true);
	c.animations.add("alert", mframe("alert",100),4,true);
	c.play("idle");
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


Level.prototype.createButtons = function() {
	this.btn_right = this.add.button(220,this.game.height-110,"button_2");
	//
	

	this.btn_right.anchor.set(1,0);
	this.btn_right.height = 100;
	this.btn_right.width = 100;
	this.btn_right.alpha = 0.6;
	
	
	this.btn_left = this.add.button(10,this.game.height-110,"button");
	this.btn_left.alpha = 0.6;
	this.btn_left.height = 100;
	this.btn_left.width = 100;
	this.btn_jump = this.add.button(this.game.width-70,this.game.height-60,"button_3");
	this.btn_jump.height = 100;
	this.btn_jump.width = 100;
	this.btn_jump.anchor.set(0.5,0.5);
	this.btn_jump.alpha = 0.6;
	

	this.btn_spacebar = this.add.button(this.game.width-240,this.game.height-110,"shoot");
	this.btn_spacebar.alpha = 0.6;
	this.btn_spacebar.height = 100;
	this.btn_spacebar.width = 100;
	
	this.btn_left.isdown = false;
	this.btn_right.isdown = false;
	this.btn_jump.isdown = false;
	this.btn_spacebar.isdown =false;
	
	
	this.ui.add(this.btn_left);
	this.ui.add(this.btn_right);
	this.ui.add(this.btn_jump);
	this.ui.add(this.btn_spacebar);
	
	this.btn_left.onInputDown.add(this.inputDown,this.btn_left);
	this.btn_left.onInputUp.add(this.inputUp,this.btn_left);
	this.btn_right.onInputDown.add(this.inputDown,this.btn_right);
	this.btn_right.onInputUp.add(this.inputUp,this.btn_right);
	this.btn_jump.onInputDown.add(this.inputDown,this.btn_jump);
	this.btn_jump.onInputUp.add(this.inputUp,this.btn_jump);
	this.btn_spacebar.onInputDown.add(this.inputDown,this.btn_spacebar);
	this.btn_spacebar.onInputUp.add(this.inputUp,this.btn_spacebar);

	this.keys = this.input.keyboard.addKeys({
		"left"  : Phaser.Keyboard.LEFT,
		"right" : Phaser.Keyboard.RIGHT,
		"jump"  : Phaser.Keyboard.UP,
		"spacebar" : Phaser.Keyboard.SPACEBAR
	});
	
	this.keys.left.onDown.add(this.inputDown,this.btn_left);
	this.keys.left.onUp.add(this.inputUp,this.btn_left);
	this.keys.right.onDown.add(this.inputDown,this.btn_right);
	this.keys.right.onUp.add(this.inputUp,this.btn_right);
	this.keys.jump.onDown.add(this.inputDown,this.btn_jump);
	this.keys.jump.onUp.add(this.inputUp,this.btn_jump);
	this.keys.spacebar.onDown.add(this.inputDown,this.btn_spacebar);
	this.keys.spacebar.onUp.add(this.inputUp,this.btn_spacebar);
	
};
Level.prototype.inputDown = function() {
	this.alpha = 1;
	this.isdown = true;
};

Level.prototype.inputUp = function() {
	this.alpha = 0.6;
	this.isdown = false;
};

Level.prototype.update = function() {
	//if(this.gameover) return;
	
	
	this.physics.arcade.collide(this.player,this.map_floor);
	this.physics.arcade.collide(this.enemies,this.map_floor);
	this.physics.arcade.collide(this.item,this.map_floor);
	this.player.body.velocity.x = 0;
	  if(this.btn1.isdown){
		 // this.input.onDown.add(this.quitGame, this);
	 		this.quitGame();
	 		//this.click.play();
	 	}
	if(this.btn_right.isdown){
		this.player.body.velocity.x = 200;
	
	}
	if(this.btn_left.isdown){
		this.player.body.velocity.x = -200;
	}
	if(this.btn_jump.isdown && this.player.body.onFloor()){
		this.player.body.velocity.y = -650;
	
	}if(this.btn_spacebar.isdown){
		this.player.play("shoot");
		if(this.btn_left.isdown){
			this.player.scale.x = -1.5;//-2หันซ้ายยิง 2หันขวายิง
			this.player.play("shoot");
			this.fireWeapon2();
		}else if(this.btn_right.isdown){
			this.player.scale.x = 1.5;//-2หันซ้ายยิง 2หันขวายิง
			this.player.play("shoot");
			this.fireWeapon();
		}
			//ต้องแก้ให้เวลามันหันหน้าไปทางไหนเมื่อกดสเปคบาร์เฉยๆมันจะยิงไปทางนั้นทันที
			//this.fireWeapon2();
		//	this.fireWeapon();
	}if(this.btn_spacebar.isdown&&this.player.scale.x>0){
		this.fireWeapon();
		
	}else if(this.btn_spacebar.isdown&&this.player.scale.x<0){
		this.fireWeapon2();
	}
	
	if(this.player.body.onFloor()){
		if(this.player.body.velocity.x>0){
			this.player.play("run");
			this.player.scale.x = 1.5;
		}else if(this.player.body.velocity.x<0){
			this.player.play("run");
			this.player.scale.x = -1.5;
		}else if(this.btn_spacebar.isdown){
			this.player.play("shoot");
			if(this.btn_left.isdown){
				this.player.play("shoot");
				this.player.scale.x = -1.5;//-2หันซ้ายยิง 2หันขวายิง
			}else if(this.btn_right.isdown){
				this.player.play("shoot");
				this.player.scale.x = 1.5;//-2หันซ้ายยิง 2หันขวายิง
			}
		}
		else{
			this.player.play("idle");
		}
	}
	else if(this.player.body.velocity.y<0){
		this.player.play("jump");
	}
	
	 this.physics.arcade.collide(this.enemies,this.weapon1.bullets,this.onCollide,null,this);
	 this.physics.arcade.collide(this.enemies,this.weapon3.bullets,this.onCollide,null,this);
	 if(this.player.canhit){
			this.physics.arcade.collide(this.enemies,this.player,this.onPlayerCollide,null,this);
	 }
     this.physics.arcade.collide(this.item,this.player,this.onPlayerGetItem,null,this);
     if(this.enemies.countLiving()==0){
			this.gameover=true;
			win = this.add.text(this.world.centerX,this.world.centerY,"You Win!!",{fill: 'Yellow'});
			win.anchor.set(0.5,0.5);
			win.scale.set(0.1);
			var tw =  this.add.tween(win.scale);
			tw.to({x:2,y:2},1000,"Linear",true,0);
			
			delay = this.add.tween(win);
			delay.to({y:100},1000,"Linear",true,2000);
			tw.chain(delay);
			delay.onComplete.addOnce(this.WintheGame,this);
	}
   
};

Level.prototype.createWeapon = function() {
	//ยิงทางขวา
	this.weapon1 = this.add.weapon(1,"bullet",1);
	this.weapon1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon1.trackSprite(this.player,120,-50);
	this.weapon1.bulletSpeed = 2300;
	this.weapon1.fireAngle = 0;
	this.weapon1.bulletAngleOffset = 0;
	this.weapon1.rate = 0;
	//ยิงทางซ้าย
	this.weapon3 = this.add.weapon(1,"bullet",1);
	this.weapon3.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon3.trackSprite(this.player,-120,-50);
	this.weapon3.bulletSpeed = 2300;
	this.weapon3.fireAngle = 180;
	this.weapon3.bulletAngleOffset = 0;
	this.weapon3.rate = 0;
	};
	
	
Level.prototype.onPlayerGetItem = function(player,item){
	item.kill();
	getcoin = this.game.coin++;
	this.coinText.text = "Coin : "+this.game.coin;
	this.coin2.play();//เสียง
};
	
Level.prototype.onCollide = function(alien,bullet){
	alien.kill();
	//bullet.kill();
	getscore = this.game.score++;
	this.scoreText.text = "Kill : "+this.game.score;
	exp = this.add.sprite(alien.x , alien.y,"Flame");
	exp.anchor.set(0.5);
	exp.animations.add("all",null,12,false).play().killOnComplete=true;
	this.boom.play();//เสียง
};


Level.prototype.onPlayerKilled = function(){
	this.dead.play();//เสียง
	this.gameover = true;
	win = this.add.text(this.world.centerX,this.world.centerY,
			"คุณแพ้แล้ว",{fill:'Yellow'});
	win.anchor.set(0.5,0.5);
	win.scale.set(0,1);
	var tw = this.add.tween(win.scale);
	tw.to({x:2,y:2},1000,"Linear",true,0);
	
	delay = this.add.tween(win);
	delay.to({y:100},1000, "Linear",true,2000);
	tw.chain(delay);
	delay.onComplete.addOnce(this.quitGame,this);
};

Level.prototype.onPlayerCollide = function(player,alien) {
	player.damage(1);
	player.canhit = false;
	player.alpha = 0.1;
	
	tw = this.add.tween(player);
	tw.to({alpha:1},200, "Linear",true,0,5);
	tw.onComplete.addOnce(function(){this.alpha=1;this.canhit=true;}, player);
	if(count==0){this.heart[1].kill();}		
	else if(count==1){this.heart[0].kill();}
	count++;

	return true;
};

	
Level.prototype.fireWeapon = function() {
	//ยิงขวา
	this.weapon1.fire();
	this.lasore.play();//เสียง
};
Level.prototype.fireWeapon2 = function(){
	//ยิงซ้าย
	this.weapon3.fire();
	//this.lasore.play(); //เสียง
};

Level.prototype.inputDown = function() {
	this.alpha = 0.8;
	this.isdown = true;
};

Level.prototype.inputUp = function() {
	this.alpha = 1;
	this.isdown = false;
	
};
Level.prototype.onInputOver = function() {
	this.alpha = 0.8;
	this.isdown = false;
	
};
Level.prototype.onInputOut = function() {
	this.alpha = 1;
	this.isdown = false;
	
};



Level.prototype.quitGame = function() {
	
	this.game.state.start("Game");
};

Level.prototype.WintheGame = function() {
	this.game.state.start("Win");
};