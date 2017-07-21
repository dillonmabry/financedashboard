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
			  //populate user info
			  populateUserInfo(user);
			  //listen to resend verify email
			  $("#sendVerify").click(function(){
				  user.sendEmailVerification().catch(function(error) { toastInfo("Error",""+error);});
	              toastInfo("Success","Email verification re-sent to: "+user.email)
	              $(this).prop('disabled', true);
			  });
			  //listen to save user info
			  $("#saveUserInfo").click(function(){
				  var userInfo = {
						  name: $("#userName").val(),
						  photo: $("#photoUrl").val(),
						  email: $("#emailPref").val()
				  }
				  //update profile
				  user.updateProfile({
					  displayName: userInfo.name,
					  photoURL: userInfo.photo
					}).then(function() {
						toastInfo("Success","User profile successfully updated") 
					}, function(error) {
						toastInfo("Error",""+error);
					});
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
		  return user;
	  }
}

function populateUserInfo(user) {
	$("#userInfo").html(user.displayName);
	  //TODO: add username
	  if(user.displayName == null) {
		  $("#userName").val("Not Created");
	  } else {
		  $("#userName").val(user.displayName);
	  }
	  if(user.photoURL == null) {
		  $("#photoUrl").val("Not Created");
		  $("#userInfoAvatar").attr("src", "http://via.placeholder.com/50x50&text=No%20Avatar");
	  }  else {
		  $("#photoUrl").val(user.photoURL);
		  $("#userInfoAvatar").attr("src", user.photoURL);
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