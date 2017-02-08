var menuState = {

	preload: function () {
		game.stage.backgroundColor = '#ffffff';
		game.load.image('logo', 'assets/logo.png');
		game.load.image('homerFeliz', 'assets/homerFeliz.png');
		game.load.image('homerHambre', 'assets/homerHambre.png');
    	game.load.image('torrezno', 'assets/torreznos-soria.png');
		game.load.image('vino', 'assets/copa-vino.png');
		game.load.image('cubata', 'assets/cubata.png');
		game.load.image('logo8KA', 'assets/logo-8kapps.png');

		game.load.audio('music1', ['assets/Kids_Music_1.ogg', 'assets/Kids_Music_1.mp3']);
		game.load.audio('music2', ['assets/Kids_Music_3.ogg', 'assets/Kids_Music_3.mp3']);
		game.load.audio('risa', ['assets/wickedmalelaugh1.ogg', 'assets/wickedmalelaugh1.mp3']);
		game.load.audio('burp', ['assets/burp.ogg', 'assets/burp.mp3']);

		//game.global = {escala: 1.0};
    	game.global = {escala: 0.7};
		game.global = {
    		puntuacion: 0,
    		escala: game.global.escala,
    		anchoHommer: 279 * game.global.escala,
    		anchoTorrezno: 240 * game.global.escala,
    		
    		dificultad: 0,
    		velocidadX: 0,
    		velocidadY: 0,
    		puntuacion: 0,
    		comilona: false,
    		marcador: []
    	};
	},

	create: function () {

		this.music1 = game.add.audio('music1'); // Add the music
		this.music1.loop = true; // Make it loop
		this.music1.play(); // Start the music

		homerFeliz = game.add.image(0, 0, 'homerFeliz');
		homerFeliz.scale.setTo(0.1, 0.1);
		homerFeliz.x = (ancho / 2) - (563 / 4);
		homerFeliz.y = 200;
		logo = game.add.image(0, 0, 'logo');
		logo.x = (ancho / 2) - (logo.width / 2);
		logo.y = -100;

		emp = game.add.image(0, 0, 'logo8KA');
		emp.scale.setTo(0.2, 0.2);
		emp.x = (ancho / 2) - (emp.width / 2);
		emp.y = (alto - 120);
		// Not for sale
		msg1 = game.add.text(0, alto - 50, 'Ejercicio didactico', {font: '20px Arial', fill: '#B99F0B'});
		msg1.x = (ancho - msg1.width) / 2;
		msg2 = game.add.text(0, alto - 30, 'Not for Sale', {font: '20px Arial', fill: '#B99F0B'});
		msg2.x = (ancho - msg2.width) / 2;
		var tween1 = game.add.tween(logo);
		tween1.to({y: 80}, 1000);
		tween1.start();

		var tween2 = game.add.tween(homerFeliz.scale);
		tween2.to({x:0.5, y:0.5}, 1000);
		tween2.start();

		// var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		// upKey.onDown.add(this.start, this);

		var upKey = game.input.onTap.add(this.start, this);
	},

	start: function () {
		// Start the game
		this.music1.stop();
		game.state.start('play');
	},
};