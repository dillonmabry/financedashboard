(function() {
        var app = document.querySelector('#app');
        
        //login normally
        $("#form").submit(function( event ) {
        	event.preventDefault();
        	var email = $("#email").val();
        	var password = $("#password").val();
        	if (!email || !password) {
        		$(".alert-danger").hide();
        		$(".alert-warning").show();
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
              return;
            }
            // Register user    
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
            	//alert("Success! New user: "+user.email+" registered!");
            	user.sendEmailVerification().catch(function(error) { alert(error);});
            	alert("Success! New user: "+user.email+" registered!");
            })
              .catch(function(error) {
                if (error.code === 'auth/email-already-in-use') {
                  var credential = firebase.auth.EmailAuthProvider.credential(email, password);
                  app.signInWithGoogle()
                    .then(function() {
                      firebase.auth().currentUser.link(credential)
                        .then(function(user) {
                          $(".alert-danger").hide();
                          alert("Account linking success", user);
                        }, function(error) {
                        	alert("Account linking error", error);
                        	return false;
                        });
                    });
                } else {
                	return false;
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
		}, 500);
	}
	
	
