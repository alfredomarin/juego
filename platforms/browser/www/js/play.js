var playState = {

  create: function() {
    this.music2 = game.add.audio('music2'); // Add the music
    this.music2.loop = true; // Make it loop
    this.music2.play(); // Start the music
    this.risa = game.add.audio('risa'); // Add the music

    this.vigilaSensores();
    // scoreText = game.add.text(200, 5, game.global.puntuacion, { fontSize: '60px', fill: '#757676' });
    this.burpSound = game.add.audio('burp');

    objetivo = game.add.sprite(this.randomInicioX(), 0, 'torrezno');
    homer = game.add.sprite(this.inicioX(), this.inicioY(), 'homerHambre');

    game.physics.arcade.enable(homer);
    game.physics.arcade.enable(objetivo);

    homer.body.collideWorldBounds = true;
    homer.scale.setTo(game.global.escala, game.global.escala);
    

    objetivo.body.collideWorldBounds = true;
    objetivo.body.gravity.y = 200;
    objetivo.scale.setTo(game.global.escala, game.global.escala);
    objetivo.body.onWorldBounds = new Phaser.Signal();
    objetivo.body.onWorldBounds.add(this.decrementaPuntuacion, this);
    msg = game.add.text(0, -100, '   No eres un\nMachoMachote', {font: '45px Arial', fill: '#B99F0B'});
    msg.x = (ancho - msg.width) / 2;
    tweenFin = game.add.tween(msg);
    tweenFin.to({y: alto}, 3000);
    tweenFin.onComplete.add(this.recomienza, this);
  },

  update: function(){
    var factorDificultad = (-200 + (game.global.dificultad * 10));

    homer.body.velocity.x = (game.global.velocidadX * factorDificultad);

    game.physics.arcade.overlap(homer, objetivo, this.incrementaPuntuacion, null, this);
  },

  render: function () {
//       game.debug.spriteInfo(homer, 0, 10);
//       game.debug.spriteInfo(objetivo, 0, 100);
  },

  decrementaPuntuacion: function(){
    game.global.puntuacion = game.global.puntuacion - 1;
    
    if (game.global.puntuacion >= 0) {
      //objetivo.body.gravity.y = objetivo.body.gravity.y - 50;
      game.global.dificultad = game.global.dificultad - 1;
      this.borraMarcador();
      this.pintaMarcador();
    } 
    if (game.global.puntuacion < 0) {
       // Perdiste
       //console.log('Perdiste');
       this.music2.stop();
       this.risa.play();
       tweenFin.start();

    }
    // scoreText.text = game.global.puntuacion;
    objetivo.reset(this.randomInicioX(), 0);
  },

  incrementaPuntuacion: function(){
    this.burpSound.play();
    game.global.puntuacion = game.global.puntuacion + 1;
       
    if (game.global.puntuacion >= 0){
      objetivo.body.gravity.y = objetivo.body.gravity.y + 50;
      game.global.dificultad = game.global.dificultad + 1;
      this.borraMarcador();
      this.pintaMarcador();
    } 
    objetivo.reset(this.randomInicioX(), 0);
  },

  pintaMarcador: function() {
    
    var i;
    var j;
    var nVinos = game.global.puntuacion % 5;
    var nCubatas = Math.floor(game.global.puntuacion / 5);
    
    for (i = 0; i < nCubatas; i++) {
      game.global.marcador.push(game.add.image(25 * i, 5, 'cubata'));
    }

    for (j = 0; j < nVinos; j++) {
      game.global.marcador.push(game.add.image((nCubatas * 25) + (26 * j), 5, 'vino'));
    }
  },

  borraMarcador: function(){
    for(var i in game.global.marcador) {
      game.global.marcador[i].destroy();
    }
  },

  inicioX: function(){
    return (ancho - game.global.anchoHommer) / 2;
  },

  inicioY: function(){
    return alto;
  },

  randomInicioX: function(){
    return this.numeroAleatorioHasta(ancho - game.global.anchoTorrezno );
  },

  randomInicioY: function(){
    return this.numeroAleatorioHasta(alto - game.global.anchoTorrezno );
  },

  numeroAleatorioHasta: function(limite){
    return Math.floor(Math.random() * limite);
  },

  vigilaSensores: function(){
    
    function onError() {
        console.log('vigilaSensores: onError!');
    }

    function onSuccess(datosAceleracion){
      playState.detectaAgitacion(datosAceleracion);
      playState.registraDireccion(datosAceleracion);
    }
    navigator.accelerometer.watchAcceleration(onSuccess, onError, { frequency: 10 });
  },

  detectaAgitacion: function(datosAceleracion){
    var agitacionX = datosAceleracion.x > 10;
    var agitacionY = datosAceleracion.y > 10;
    if (agitacionX || agitacionY){
      setTimeout(this.recomienza, 1000);
    }
  },

  recomienza: function(){
    
    game.state.start('menu');
    //document.location.reload(true);
  },

  registraDireccion: function(datosAceleracion){
    game.global.velocidadX = datosAceleracion.x ;
    game.global.velocidadY = datosAceleracion.y ;
  }
};
