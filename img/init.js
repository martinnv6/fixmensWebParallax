(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
	
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
				$("#email").focus();
				email: $("#email").val(data.email);
				$("#calleynumero").focus();
				calleynumero : $("#calleynumero").val(data.calleynumero);
				$("#colonia").focus();
				colonia : $("#colonia").val(data.colonia);
				$("#cp").focus();
				cp : $("#cp").val(data.cp);
				$("#municipio").focus();
				municipio : $("#municipio").val(data.municipio);
				$("#estado").focus();
				estado : $("#estado").val(data.estado);
				$("#telefono").focus();
				telefono : $("#telefono").val(data.telefono);
				$("#name").focus();
				nombreFiscal : $("#name").val(data.nombreFiscal);
				
					
						
						
						  var a = JSON.stringify(data, null, 2);
						  console.log(a);
						  
						  
					
				});
			
			//setTimeout(function(){ window.location.replace("http://www.fixmens.com.mx/facturar.html"); }, 1000);
		
    console.log(data);
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
						Materialize.toast('Cliente no '+$("#rfc").val()+' existe ', 3000, 'rounded')
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
	
	
})

    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
	
	
  $(document).ajaxStart(function () {
    $(".progress").show();
   $(".modal-footer > a").attr('disabled', 'disabled');
});

$(document).ajaxComplete(function () {
    $(".progress").hide();
    $(".modal-footer > a").removeAttr('disabled');
});
       

   // end of document ready
})(jQuery); // end of jQuery name space


function alertaTemporal(){
	alert("En construcción")
}