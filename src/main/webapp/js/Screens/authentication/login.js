(function() {
	if (document.cookie.indexOf('visited=true') == -1) {
		//on first visit
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
		//set cookies
		$("#dismissWelcome").click(function(){
			var oneYear = 1000*60*60*24*365;
            var expires = new Date((new Date()).valueOf() + oneYear);
            document.cookie = "visited=true;expires=" + expires.toUTCString();
    		$("#welcomeModal").modal("hide");
		});	
		//app query selector
        var app = document.querySelector('#app');
        
        //login normally
        $("#form").submit(function( event ) {
        	event.preventDefault();
        	var email = $("#email").val();
        	var password = $("#password").val();
        	if (!email || !password) {
        		$(".alert-danger").hide();
        		$(".alert-warning").html("Please enter email and password to login").show();
        		return;
            }
        	$(".alert-warning").hide();
        	firebase.auth().signInWithEmailAndPassword(email, password)
          .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            $(".alert-danger").html(""+error).show();
            $(".starter-template").show();
          });
        });
        
        //login with Google
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
          $(".alert-danger").hide();
          $(".alert-warning").hide();
          $(".starter-template").hide();
        });
        
        $("#register").click(function(){
        	var email = $("#email").val();
        	var password = $("#password").val();
            if (!email || !password) {
              $(".alert-warning").show().html("Please enter email and password to register!")
              return;
            }
            $(".alert-warning").hide();
            // Register user    
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
            	isBusy(true);
            	user.sendEmailVerification().catch(function(error) { alert(error);});
            	toastInfo("Success","User successfully created");
            	isBusy(false);
            })
              .catch(function(error) {
                if (error.code === 'auth/email-already-in-use') {
                	 $(".alert-danger").show().html("Error, email already in use!");
                } else {
                	$(".alert-danger").html(""+error).show();
                	isBusy(false);
                }
              });
            
        });
        
        // Listen to auth state changes
        firebase.auth().onAuthStateChanged(function(user) {
        	 //if logged in 
        	 if(user) { 
        		 onSignIn(user);
        	 } 
        });
      })();

	//on sign
	function onSignIn(user) {	
		setTimeout(function(){ 
			window.location.href = 'dashboard.jsp';
		}, 1500);
	}
	
	//ajax loader
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
