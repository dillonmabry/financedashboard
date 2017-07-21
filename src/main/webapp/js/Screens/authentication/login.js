(function() {
	if (document.cookie.indexOf('visited=true') == -1) {
		// on first visit
		$("<div class=\"modal fade\" id=\"welcomeModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"welcomeModal\" aria-hidden=\"false\">\r\n" + 
			"	  <div class=\"modal-dialog\" role=\"document\">\r\n" + 
			"	    <div class=\"modal-content text-center\">\r\n" + 
			"	      <div class=\"modal-header\">\r\n" + 
			"	        <h5 class=\"modal-title\" ><strong>Welcome to Personal Finance Planner!</strong></h5>\r\n" + 
			"	        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n" + 
			"	          <span aria-hidden=\"true\">&times;</span>\r\n" + 
			"	        </button>\r\n" + 
			"	      </div>\r\n" + 
			"	      <div class=\"modal-body\">\r\n" + 
			"	        <br/><p>This application allows quick changes to personal finance goals as well as tracking bulk status of finances.</p>\r\n" + 
			"	      </div>\r\n" + 
			"	      <div class=\"modal-footer\">\r\n" + 
			"	        <button type=\"button\" id=\"dismissWelcome\" class=\"btn btn-primary\" data-dismiss=\"modal\">Ok never show me this again</button>\r\n" + 
			"	      </div>\r\n" + 
			"	    </div>\r\n" + 
			"	  </div>\r\n" + 
			"	</div>").appendTo(document.body);
		
		$('#welcomeModal').modal({backdrop: 'static', keyboard: true})  
		$("#welcomeModal").modal("show");
	}
		// set cookies
		$("#dismissWelcome").click(function(){
			var oneYear = 1000*60*60*24*365;
            var expires = new Date((new Date()).valueOf() + oneYear);
            document.cookie = "visited=true;expires=" + expires.toUTCString();
    		$("#welcomeModal").modal("hide");
		});	
		// app query selector
        var app = document.querySelector('#app');
        
        // login normally
        $("#form").submit(function( event ) {
        	event.preventDefault();
        	var email = $("#email").val();
        	var password = $("#password").val();
        	if (!email || !password) {
        		$("#loginOutput").hide();
        		$("#loginOutput").html("<div class=\"alert alert-warning\" style=\"padding:10px\" role=\"alert\">\r\n" + 
        				"				Please enter both email and password\r\n" + 
        				"				</div>").show();
        		return;
            }
        	$(".alert-warning").hide();
        	firebase.auth().signInWithEmailAndPassword(email, password)
          .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            $("#loginOutput").html("<div class=\"alert alert-danger\" style=\"padding:10px\" role=\"alert\">\r\n" + error+ 
            		"				</div>").show();
          });
        });
        
        // login with Google
        $("#signInGoogle").click(function(e) {
        	e.preventDefault();
        	// Sign in with Google
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            return firebase.auth().signInWithPopup(provider)
              .catch(function(error) {
                console.log('Google sign in error', error);
              });
          $("#loginOutput").hide();
          $(".starter-template").hide();
        });
        
        // register new user
        $("#register").click(function(){
        	// display register modal
        	$("\r\n" + 
        			"	<div class=\"modal fade\" id=\"regDialogModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"regDialogModal\" aria-hidden=\"true\">\r\n" + 
        			"	  <div class=\"modal-dialog\" role=\"document\">\r\n" + 
        			"	    <div class=\"modal-content\">\r\n" + 
        			"	      <div class=\"modal-header\">\r\n" + 
        			"	        <h5 class=\"modal-title\" >Register New User</h5>\r\n" + 
        			"	        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n" + 
        			"	          <span aria-hidden=\"true\">&times;</span>\r\n" + 
        			"	        </button>\r\n" + 
        			"	      </div>\r\n" + 
        			"	      <div class=\"modal-body\">\r\n" + 
        			"	        <form id=\"registerForm\">\r\n" + 
        			"				<div class=\"form-group\">\r\n" + 
        			"					<label for=\"email\">Email: </label>\r\n" + 
        			"					<input class=\"form-control\" id=\"emailReg\" type=\"text\">\r\n" + 
        			"				</div>\r\n" + 
        			"				<div class=\"form-group\">\r\n" + 
        			"					<label for=\"password\">Password: </label>\r\n" + 
        			"					<input class=\"form-control\" id=\"passwordReg\" type=\"password\">\r\n" + 
        			"				</div>\r\n" + 
        			"				<div class=\"alert alert-warning regAlertWarn\" style=\"display:none;padding:10px;\"\r\n" + 
        			"				role=\"alert\">Email and password required!</div>\r\n" + 
        			"				<div class=\"alert alert-danger regAlertDang\" style=\"display:none;padding:10px;\"\r\n" + 
        			"				role=\"alert\"></div>\r\n" + 
        			"			</form>\r\n" + 
        			"	      </div>\r\n" + 
        			"	      <div class=\"modal-footer\">\r\n" + 
        			"	      	<div class=\"inputCheckForm\"></div>\r\n" + 
        			"	        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\r\n" + 
        			"	        <button type=\"button\" id=\"submitRegister\" class=\"btn btn-primary\">Confirm</button>\r\n" + 
        			"	      </div>\r\n" + 
        			"	    </div>\r\n" + 
        			"	  </div>\r\n" + 
        			"	</div>").appendTo(document.body);
        		// show modal and hide on close
        		$('#regDialogModal').modal({backdrop: 'static', keyboard: true})  
        		$("#regDialogModal").modal("show");
        		$('#regDialogModal').on('hidden.bs.modal', function () {
        		    $("#regOutput").hide();
        		})
        		
        		//show avatar on URL
        		$("#photoReg").change(function(){
        			var photoPreview = $("#photoReg").val();
	        		if(photoPreview) { $("#avatarURLPhoto").attr("src",photoPreview) } 
	        		else {$("#avatarURLPhoto").attr("src","https://fakeimg.pl/100x100/?text=No%20Photo")}
        		});
        		// listen to registration
        		$("#submitRegister").click(function(){
	        		registerNewUser();
        		});
        });
        
        // Listen to auth state changes
        firebase.auth().onAuthStateChanged(function(user) {
        	 // if logged in
        	 if(user) { 
        		 onSignIn(user);
        	 } 
        });
      })();

	//register new user
	function registerNewUser() {
		// process registration logic
    	var email = $("#emailReg").val();
    	var password = $("#passwordReg").val();
        if (!email || !password) {
        	$("#regOutput").html("<div class=\"alert alert-warning\" style=\"padding:10px\" role=\"alert\">\r\n" + 
    				"				Please enter both email and password\r\n" + 
    				"				</div>").show();
          return;
        }
        $("#regOutput").hide();
        // Register user
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
        	isBusy(true);
        	user.sendEmailVerification().catch(function(error) { 
        		$("#regOutput").html("<div class=\"alert alert-danger\" style=\"padding:10px\" role=\"alert\">\r\n" + error+
    				"\r\n" + 
        		"</div>").show();});
        	  // save other user info
			  var userInfo = {
					  name: $("#userReg").val(),
					  photo: $("#photoReg").val(),
			  }
			  // update profile
			  user.updateProfile({
				  displayName: userInfo.name,
				  photoURL: userInfo.photo
				}).then(function() {
					toastInfo("Success","User profile successfully updated") 
					isBusy(false);
				}, function(error) {
					$("#regOutput").html("<div class=\"alert alert-danger\" style=\"padding:10px\" role=\"alert\">\r\n" + error+
		    				"\r\n" + 
		        		"</div>").show();
				});
        })
        .catch(function(error) {
            if (error.code === 'auth/email-already-in-use') {
            	$("#regOutput").html("<div class=\"alert alert-danger\" style=\"padding:10px\" role=\"alert\">\r\n"+
        				"Error email already in use\r\n" + 
            		"</div>").show();
            } else {
            	$("#regOutput").html("<div class=\"alert alert-danger\" style=\"padding:10px\" role=\"alert\">\r\n" + error+
        				"\r\n" + 
            		"</div>").show();
            	isBusy(false);
            }
        });
	}

	// on sign
	function onSignIn(user) {	
		setTimeout(function(){ 
			window.location.href = 'dashboard.jsp';
		}, 1500);
	}
	
	// ajax loader
	function isBusy(load) {
		if(load) {
			$(".loading").show();
		} else {
			$(".loading").hide();
		}
	}
	
	function toastInfo(subject, message) {

		toastr.options = {
		  "closeButton": false,
		  "debug": false,
		  "newestOnTop": false,
		  "progressBar": false,
		  "positionClass": "toast-bottom-left",
		  "preventDuplicates": false,
		  "onclick": null,
		  "showDuration": "300",
		  "hideDuration": "1000",
		  "timeOut": "1000",
		  "extendedTimeOut": "1000",
		  "showEasing": "swing",
		  "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut"
		}
		Command: toastr["success"](message, subject);
	}
