
if ('addEventListener' in document) {
    document.addEventListener('deviceready', function() {
    	alto  = document.documentElement.clientHeight;
    	ancho = document.documentElement.clientWidth;
    	// var estados = { preload: preload, create: create, update: update, render: render };
    	// var game = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'gameDiv', estados);
    	game = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'gameDiv');
    	
    	// Add all the states
    	game.state.add('menu', menuState);
    	game.state.add('play', playState);

    	game.state.start('menu');
    	//game.state.start('play');
    }, false);
}