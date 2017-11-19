$(document).ready( function() {
	
	var socket = io();
	// var visor = document.getElementById("visor");
	// var url = "ws://"+document.location.hostname+":3030";
	// var reproductor = new JSMpeg.Player(url, { canvas : visor });

	$('#btnEncender').click(function() {
		socket.emit("enviarDatos", "encenderLED");
	});

	$('#btnApagar').click(function() {
		socket.emit("enviarDatos", "apagarLED");
	});

	$('#btnAdelante').click(function() {
		socket.emit("enviarDatos", "acelerarDron");
		$('#direccionDron').text('↑');
		$('input:radio[name=senialero]').val(['neutro']);
	});

	$('#btnAtras').click(function() {
		socket.emit("enviarDatos", "retrocederDron");
		$('#direccionDron').text('↓');
		$('input:radio[name=senialero]').val(['neutro']);
	});

	$('#btnIzquierda').click(function() {
		socket.emit("enviarDatos", "izquierdaDron");
		$('#direccionDron').text('←');
		$('input:radio[name=senialero]').val(['izquierda']);
	});

	$('#btnDerecha').click(function() {
		socket.emit("enviarDatos", "derechaDron");
		$('#direccionDron').text('→');
		$('input:radio[name=senialero]').val(['derecha']);
	});

	$('#btnFrenar').click(function() {
		socket.emit("enviarDatos", "frenarDron");
		$('#direccionDron').text('.');
		$('input:radio[name=senialero]').val(['neutro']);
	});

	$('#seguirLinea').change(function() { 
	    if (this.checked) {
	        socket.emit("enviarDatos", "seguirLinea"); 
	    } else {
	        socket.emit("enviarDatos", "noSeguirLinea");
	    }
	});

	$('#usarControl').change(function() { 
	    if (this.checked) {
	        socket.emit("enviarDatos", "usarControl"); 
	    } else {
	        socket.emit("enviarDatos", "noUsarControl");
	    }
	});

	$(document).keyup(function(tecla) {

		console.log("keyup>tecla.which = "+tecla.which);

		var w = 119;
		var s = 115;
		var a = 97;
		var d = 100;
		var f = 102;
		var p = 112;
		var o = 111;

		$('#btnFrenar').trigger('click');

		if (tecla.which == w || tecla.which == s) $('#btnFrenar').trigger('click');

		$('input:radio[name=senialero]').val(['neutro']);
	
	});

	$(document).keypress(function(tecla) {

		console.log("keypress>tecla.which = "+tecla.which);
		
		var w = 119;
		var s = 115;
		var a = 97;
		var d = 100;
		var f = 102;
		var p = 112;
		var o = 111;

		if (tecla.which == p) $('#btnEncender').trigger('click');
		if (tecla.which == o) $('#btnApagar').trigger('click');
		if (tecla.which == w) $('#btnAdelante').trigger('click');
		if (tecla.which == s) $('#btnAtras').trigger('click');
		if (tecla.which == a) $('#btnIzquierda').trigger('click');
		if (tecla.which == d) $('#btnDerecha').trigger('click');
		if (tecla.which == f) $('#btnFrenar').trigger('click');
	
	});

	socket.on("recibirDatos", function(datos) {
		
		// console.log(datos);
		
		switch (datos) {
			case "btn1_apretado":
				$('#statusBtn1').text("Apretado");
			break;
			case "btn1_liberado":
				$('#statusBtn1').text("Suelto");
			break;
		}
		
	})

	socket.on("recibirDistancia", function(datos) {
		
		$('#sensorDistancia').text(datos);
		
	})

});