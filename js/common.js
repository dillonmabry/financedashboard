//auth listener
$(document).ready(function(){
	
	//check current user
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			isBusy(true);
			// get current user
			var userId = firebase.auth().currentUser.uid;
			var database = firebase.database();
			// ensure user
			var user = getUser(userId, database);
			// get unique report for user
			pushReports(userId);
			getDashboard(user, database);
			// listen to report selection
			$("#reportSelect").on("change", function() {
				var user = firebase.auth().currentUser;
				var database = firebase.database();
				getDashboard(user, database);
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

function pushReports(userId) {
	//monitor/load report changes
  	var reportRef = firebase.database().ref('reports/' + userId);
	reportRef.on('value', function(snapshot) {
		if(snapshot.val() == null) {
			$("#mainReport").append("<div class='alert alert-primary text-center' " +
					"style='background-color:#d9edf7;color:#31708f;padding:10px;"+
				"role='alert'>You have no reports at this time</div>");
			$("#reportSelect").html("<option>No Reports Available</option>");
			$("#reportSelect").prop("disabled",true);
			return false;
		}		
		var reports = snapshot.val().balance_reports;
	    //get pay periods and populate reports
	    for (var key in reports) {
		    if (reports.hasOwnProperty(key)) {
		    	var output = [];
			    	$.each(reports[key], function(key, value) {
			    		if(key == "report_name") {
			    			output.push('<option value="'+ value +'">'+ value+'</option>');
			    		}
			    	});
		    	$('#reportSelect').append(output.join(''));
			}
	    }
	});
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
	Command: toastr["success"](message, subject)
}

function isBusy(load) {
	if(load) {
		$(".loading").show();
	} else {
		$(".loading").hide();
	}
}