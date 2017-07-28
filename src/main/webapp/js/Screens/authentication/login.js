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
			
			$('#welcomeModal').modal({keyboard: true})  
			$("#welcomeModal").modal("show");
			$('#welcomeModal').on('hidden.bs.modal', function () {
  				$(this).remove();
  			})
		}
		// set cookies
		$("#dismissWelcome").click(function(){
			var oneYear = 1000*60*60*24*365;
            var expires = new Date((new Date()).valueOf() + oneYear);
            document.cookie = "visited=true;expires=" + expires.toUTCString();
    		$("#welcomeModal").modal("hide");
  		    $(this).remove();
		});	
		
		//remember email/pass for login
			if (localStorage.chkbx && localStorage.chkbx != '') {
                $('#checkboxG1').attr('checked', 'checked');
                $('#email').val(localStorage.usrname);
                $('#password').val(localStorage.pass);
            } else {
                $('#checkboxG1').removeAttr('checked');
                $('#email').val('');
                $('#password').val('');
            }

            $('#checkboxG1').click(function() {
            	if( $('#email').val() && $('#password').val() ) {
	                if ($('#checkboxG1').is(':checked')) {
	                    // save username and password
	                    localStorage.usrname = $('#email').val();
	                    localStorage.pass = $('#password').val();
	                    localStorage.chkbx = $('#checkboxG1').val();
	                } else {
	                    localStorage.usrname = '';
	                    localStorage.pass = '';
	                    localStorage.chkbx = '';
	                }
            	} else {
            		toastInfo("Info","Enter username/password to save info", "info") 
            		return false;
            	}
            });
            
          /* Contact information handles */
          $("#about-ft").click(function(){
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
      				"			<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>"+
      				"	        <button type=\"button\" id=\"dismissWelcome\" class=\"btn btn-primary\" data-dismiss=\"modal\">Ok</button>\r\n" + 
      				"	      </div>\r\n" + 
      				"	    </div>\r\n" + 
      				"	  </div>\r\n" + 
      				"	</div>").appendTo(document.body);
      			
      			$('#welcomeModal').modal({ keyboard: true})  
      			$("#welcomeModal").modal("show");
      			$('#welcomeModal').on('hidden.bs.modal', function () {
      				$(this).remove();
      			});
          });
		
		
		
/* ---------------------- AUTHENTICATION ------------------------------------*/		
		// app query selector
        var app = document.querySelector('#app');
        
        // login normally
        $("#form").submit(function( event ) {
        	event.preventDefault();
        	var email = $("#email").val();
        	var password = $("#password").val();
        	if (!email || !password) {
        		toastInfo("Info","Please enter both email and password", "info") 
        		return;
            }
        	firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
        		toastInfo("Success","User login successful", "success") 
        	})
          .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            toastInfo("Error",error+"", "error") 
          });
        });
        
        // login with Google
        $("#signInGoogle").click(function(e) {
        	e.preventDefault();
        	// Sign in with Google
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            return firebase.auth().signInWithRedirect(provider).then(function(){
            	toastInfo("Success","User login successful", "success") 
            })
              .catch(function(error) {
            	  toastInfo("Error",error+"", "error") 
              });
          $(".starter-template").hide();
        });
        
        // register new user
        $("#register").click(function(){
        		// listen to registration
	        	registerNewUser();
        });
        
        // Listen to auth state changes
        firebase.auth().onAuthStateChanged(function(user) {
        	isBusy(true);
        	 // if logged in
        	 if(user) { 
        		 onSignIn(user);
        		 isBusy(false);
        	 } 
        	 isBusy(false);
        });
      })();

/*----------------------- END AUTH ----------------------------------*/
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
					toastInfo("Success","User profile successfully updated", "success") 
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
	
	function toastInfo(subject, message, info) {

		toastr.options = {
		  "closeButton": false,
		  "debug": false,
		  "newestOnTop": false,
		  "progressBar": false,
		  "positionClass": "toast-bottom-left",
		  "preventDuplicates": false,
		  "onclick": null,
		  "showDuration": "1500",
		  "hideDuration": "1500",
		  "timeOut": "1500",
		  "extendedTimeOut": "1500",
		  "showEasing": "swing",
		  "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut"
		}
		Command: toastr[info](message, subject);
	}
