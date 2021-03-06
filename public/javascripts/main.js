$(document).ready( function() {

	var socket = io();

	var visor = document.getElementById("visor");
	var url = "ws://"+document.location.hostname+":3030";
	var reproductor = new JSMpeg.Player(url, { canvas : visor });

	console.log(reproductor);

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

	var a_press_enviada = false;
	var d_press_enviada = false;
	var f_press_enviada = false;
	var o_press_enviada = false;
	var p_press_enviada = false;
	var s_press_enviada = false;
	var w_press_enviada = false;

	$(document).keyup(function(tecla) {

		// console.log("keyup>tecla.which = " + tecla.which);

		var s_up = 83;
		var w_up = 87;

		if (tecla.which == w_up || tecla.which == s_up) {
			$('#btnFrenar').trigger('click');
			tecla_enviada("f_press_enviada");
		}

		$('#direccionDron').text('.');
	
	});

	$(document).keypress(function(tecla) {

		// console.log("keypress>tecla.which = " + tecla.which);

		var a_press = 97;
		var d_press = 100;
		var f_press = 102;
		var o_press = 111;
		var p_press = 112;
		var s_press = 115;
		var w_press = 119;

		if (tecla.which == p_press && !p_press_enviada) {
			$('#btnEncender').trigger('click');
			tecla_enviada("p_press_enviada");
		}

		if (tecla.which == o_press && !o_press_enviada) {
			$('#btnApagar').trigger('click');
			tecla_enviada("o_press_enviada");
		}

		if (tecla.which == w_press && !w_press_enviada) {
			$('#btnAdelante').trigger('click');
			tecla_enviada("w_press_enviada");
		}

		if (tecla.which == s_press && !s_press_enviada) {
			$('#btnAtras').trigger('click');
			tecla_enviada("s_press_enviada");
		}

		if (tecla.which == a_press /* && !a_press_enviada */) {
			$('#btnIzquierda').trigger('click');
			// tecla_enviada("a_press_enviada");
		} 

		if (tecla.which == d_press /* && !d_press_enviada */) {
			$('#btnDerecha').trigger('click');
			// tecla_enviada("d_press_enviada");
		} 

		if (tecla.which == f_press && !f_press_enviada) {
			$('#btnFrenar').trigger('click');
			tecla_enviada("f_press_enviada");
		}
	
	});

	function tecla_enviada(press_enviada) {

		// Ninguna de estas teclas fueron enviadas...			
		a_press_enviada = false;
		d_press_enviada = false;
		f_press_enviada = false;
		o_press_enviada = false;
		p_press_enviada = false;
		s_press_enviada = false;
		w_press_enviada = false;

		// excepto solo una de las siguientes teclas:
		if (press_enviada=="a_press_enviada") a_press_enviada = true;
		if (press_enviada=="d_press_enviada") d_press_enviada = true;
		if (press_enviada=="f_press_enviada") f_press_enviada = true;
		if (press_enviada=="o_press_enviada") o_press_enviada = true;
		if (press_enviada=="p_press_enviada") p_press_enviada = true;
		if (press_enviada=="s_press_enviada") s_press_enviada = true;
		if (press_enviada=="w_press_enviada") w_press_enviada = true;

	}

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
