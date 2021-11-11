window.onload = function() {
	// Create your Phaser game and inject it into an auto-created canvas.
	// We did it in a window.onload event, but you can do it anywhere (requireJS
	// load, anonymous function, jQuery dom ready, - whatever floats your boat)
	var game = new Phaser.Game(640, 360, Phaser.AUTO);

	// Add the States your game has.
	game.state.add("Boot", Boot);
	game.state.add("Menu", Menu);
	game.state.add("Preload", Preload);
	game.state.add("Level", Level);
	game.state.add("Present", Present);
	game.state.add("Story", Story);
	game.state.add("Ready", Ready);
	game.state.add("Credit", Credit);
	game.state.add("Game", Game);
	game.state.add("Win", Win);

	// Now start the Boot state.
	game.state.start("Boot");
};
