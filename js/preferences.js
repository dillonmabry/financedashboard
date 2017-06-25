//auth listener
$(document).ready(function(){
	
	//check current user
	firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
			  isBusy(true);
			  //get current user
			  var userId = firebase.auth().currentUser.uid;
			  var database = firebase.database();
			  //ensure user
			  var user = getUser(userId, database);
			  $("#userInfo").html("Current user - "+user.email);
			  //TODO: add username
			  if(user.displayName == null) {
				  $("#userName").val("Not Created");
			  } else {
				  $("#userName").val(user.displayName);
			  }
			  if(user.photoURL == null) {
				  $("#photoUrl").val("Not Created");
			  }  else {
				  $("#photoUrl").val(user.photoURL);
			  }
			  $("#emailPref").val(user.email);
			  $("#userId").val(user.uid);
			  if(user.emailVerified) {
				  $("#userVerified").html("User Verified: &nbsp;<span class='label label-success'>"
					  +"Verified</span>");
			  } else {
				  $("#userVerified").html("User Verified: &nbsp;<span class='label label-warning'>"
						  +"Unverified</span>");
			  }
			  $("#sendVerify").click(function(){
				  user.sendEmailVerification().catch(function(error) { alert(error);});
	              toastInfo("Sucess","Email verification re-sent to: "+user.email)
	              $(this).prop('disabled', true);
			  });
			  
			  
			  
			  isBusy(false);
		  } 
	});
	
	
});


function getUser(userId, database) {
	  var user = firebase.auth().currentUser;
	  var email, uid, emailVerified;
	  if(user != null) {
		  email = user.email;
		  emailVerified = user.emailVerified;
		  uid = user.uid;
		  console.log(user.uid);
		  return user;
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
	  "timeOut": "2000",
	  "extendedTimeOut": "1000",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showMethod": "fadeIn",
	  "hideMethod": "fadeOut"
	}
	Command: toastr["success"](message, subject);
}

function isBusy(load) {
	if(load) {
		$(".loading").show();
	} else {
		$(".loading").hide();
	}
}