(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
	$("#isAdmin").click(function() {
        if($(this).is(":checked")) {
            $(".divPassword").removeClass("hide");
        } else {
            $(".divPassword").addClass("hide");
        }
    });


  });

var user="";
$( document ).ready( function(){
	var provider = new firebase.auth.GoogleAuthProvider();//Initialice porvider GoogleId
	$(".jsLogin").click(function(){
		firebase.auth().signInWithPopup(provider).then(function(result) {
		  // This gives you a Google Access Token. You can use it to access the Google API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  user = result.user;
		  $(".jsLogin").text(user.displayName);
		  // ...
			}).catch(function(error) {
		  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // The email of the user's account used.
			  var email = error.email;
			  // The firebase.auth.AuthCredential type that was used.
			  var credential = error.credential;
		// ...
		});
	})
	
	$("input, textarea").keyup(function(){
		$(this).val( $(this).val().toUpperCase() );
	});

	$("#rfc").focusout(function() {
		focus++;
		window.data = {};
		var rfc = $("#rfc").val() ? $("#rfc").val() : "&/%&/!/";
		var commentsRef = firebase.database().ref('users/' + rfc);
		commentsRef.once('value', function(snap){
				data = snap.val();

				if(data == null){
					Materialize.toast('Cliente '+$("#rfc").val()+' no existe, capture todos los datos.', 3000, 'rounded')
				}
				else{
				$("#name").focus();
				nombreFiscal : $("#name").val(data.nombreFiscal);
				$("#email").focus();
				$("#email").focus();
				email: $("#email").val(data.email);
				$("#calleynumero").focus();
				$("#calleynumero").focus();
				calleynumero : $("#calleynumero").val(data.calleynumero);
				$("#colonia").focus();
				$("#colonia").focus();
				colonia : $("#colonia").val(data.colonia);
				$("#cp").focus();
				$("#cp").focus();
				cp : $("#cp").val(data.cp);
				$("#municipio").focus();
				$("#municipio").focus();
				municipio : $("#municipio").val(data.municipio);
				$("#estado").focus();
				$("#estado").focus();
				estado : $("#estado").val(data.estado);
				$("#telefono").focus();
				$("#telefono").focus();
				telefono : $("#telefono").val(data.telefono);
				
				
					
						
						
						  var a = JSON.stringify(data, null, 2);
						  console.log(a);
						  
						  
						}
				});
			
			//setTimeout(function(){ window.location.replace("http://www.fixmens.com.mx/facturar.html"); }, 1000);
		
  })
	
	$(".action").click(function(){
		
		  firebase.database().ref('users/' + $("#rfc").val()).set({
			email: $("#email").val(),
			rfc: $("#rfc").val(),
			calleynumero : $("#calleynumero").val(),
			colonia : $("#colonia").val(),
			cp : $("#cp").val(),
			municipio : $("#municipio").val(),
			estado : $("#estado").val(),
			telefono : $("#telefono").val(),
			nombreFiscal : $("#name").val()
			
		  });
		  
		  
		  Materialize.toast('Cliente guardado/Actualizado exitosamente', 3000, 'rounded')
		  // similar behavior as an HTTP redirect
			
			setTimeout(function(){ window.location.replace("http://www.fixmens.com.mx/facturar.html"); }, 1000);
		
	})
	
	$(".facturar").click(function(){
		var rfc = $("#rfc").val() ? $("#rfc").val() : "&/%&/!/";
		if ($("#ticket").val() == null || $("#ticket").val() == "" || $("#ticket").val() == undefined){
			Materialize.toast('Ingrese No Ticket/Orden', 3000, 'rounded');
			return false;
		}

		if (user==""){
			Materialize.toast('Favor de iniciar sesion', 3000, 'rounded');
			return false;
		}



		  window.data = {};
			var commentsRef = firebase.database().ref('users/' + rfc);
			
			commentsRef.once('value', function(snap){
				data = snap.val();
				
				if(data == null){
						Materialize.toast('Cliente '+$("#rfc").val()+' no existe ', 3000, 'rounded')
					}
					else{
						data.ticket = $("#ticket").val()
						
						  var a = JSON.stringify(data, null, 2);
						  console.log(a);
						  $("#data").html(a);
						$('#md1').modal();
						 $('#md1').modal('open');
						  // similar behavior as an HTTP redirect
					}
				});
			
			//setTimeout(function(){ window.location.replace("http://www.fixmens.com.mx/facturar.html"); }, 1000);
		
	})
	
	$("#md1_YesBtn").click(function(){
		
		data.comentario = $("#comentario").val();
		$.ajax({
		  method: "POST",
		  type: "POST",
		  dataType: 'json',
		  url: "https://fixmensintegration.azurewebsites.net/api/MailInvoices",
		  data: data 
		}).done(function( msg ) {
			Materialize.toast('Factura del ticket '+$("#ticket").val() +' procesandose espere un correo en maximo 24hrs ', 3000, 'rounded')
		}).fail( function(xhr, textStatus, errorThrown) {
			Materialize.toast('Ocurrio un error al procesar contactenos para atender su caso. Error: '+ xhr.responseText, 3000, 'rounded')	  
			  
	  });
	});

	$(".jsConsultarOrden").click(function(event){
		event.preventDefault();
		// $.validator.messages.required = ""; //ToDo hacer override para que no choque con materialize
    $("#detalleOrden").hide(); //Limpiar detalle
   // if ($(".formOrden :input").valid()) {
					debugger;
					var ordenId = $("#orden").val();
					var nombrein = ($("#nombrein").val()).toLowerCase();
					var isAdmin = $("#adminPassword").val() == "1123581321";

					var url = "https://fixmensintegration.azurewebsites.net/api/Reparaciones/"+ordenId;
					$.ajax(url, {
				      success: function(data) {
				      	debugger;
				      	if (data != null && nombrein.length > 0 && (isAdmin || (data.NOMBRES.toLowerCase().indexOf(nombrein) >= 0)))
				      	{
				      		if(!isAdmin){
				      			data.TELEFONO = "PRIVADO";
				      			data.CELULAR = "PRIVADO";
				      			data.EMAIL = "PRIVADO";
				      			data.NS = "PRIVADO";
				      			data.NOMBRES = data.NOMBRES.split(' ')[0];
				      		}
				      		$("#detalleOrden").show();
				      		$('#detalleOrden').loadJSON(data) 
				      		if(data.ENTREGADO == true){
				      			$("#ENTREGADO").prop('checked','checked')
				      		}
				      		else{
				      			$("#ENTREGADO").prop('checked','')
				      		}

				      		
			                Materialize.updateTextFields();
							$('textarea').trigger('autoresize'); //Ajustar tamaño de textareas  
				      	}
				      	else{
				      		Materialize.toast('Orden '+ordenId+' no encontrada. ', 3000, 'red')	

				      	}
				         //$('#main').html($(data).find('#main *'));
				         //$('#notification-bar').text('The page has been successfully loaded');
				      },
				      error: function(xhr, textStatus, errorThrown) {
				         debugger;
				         Materialize.toast('Ocurrio un error al procesar contactenos para atender su caso. Error: '+ xhr.responseText, 3000, 'red')	  
				      }
			   });
				/*}
				else{
					 $(".formOrden :input").each(function () {
			            if(!($(this).valid()))
			            $(this).addClass("invalid");
			        });
				}*/
		/*
		$.ajax({
		  method: "GET",
		  type: "GET",
		  //dataType: 'json',
		  url: "http://fixmensintegration.azurewebsites.net/api/Reparaciones/"+ordenId ,
		  //data: data 
		}).done(function( msg ) {
			Materialize.toast('Factura del ticket '+$("#ticket").val() +' procesandose espere un correo en maximo 24hrs ', 3000, 'rounded')
		}).fail( function(xhr, textStatus, errorThrown) {
			Materialize.toast('Ocurrio un error al procesar contactenos para atender su caso. Error: '+ xhr.responseText, 3000, 'rounded')	  
			  
	  });
	  */
	});
	
	
})

    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
	
	
  $(document).ajaxStart(function () {
    $(".progress").show();
   $(".modal-footer > a").attr('disabled', 'disabled');
    $(".jsConsultarOrden").attr('disabled', 'disabled');
});

$(document).ajaxComplete(function () {
    $(".progress").hide();
    $(".modal-footer > a").removeAttr('disabled');
    $(".jsConsultarOrden").removeAttr('disabled');
});
       

   // end of document ready
})(jQuery); // end of jQuery name space


function alertaTemporal(){
	alert("En construcción")
}