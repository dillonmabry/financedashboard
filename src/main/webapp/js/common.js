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
			var user = getUser();
			//push reports for unique user
			pushReports(userId);
			//generate dashboard for user
			getDashboard(user, database);
			isBusy(false);
			// listen to report selection
			$("#reportSelect").on("change", function() {
				$("#deletePeriod").hide();
				isBusy(true);
				var user = firebase.auth().currentUser;
				var database = firebase.database();
				getDashboard(user, database);
				isBusy(false);
			});
			
		}
	});

});

//get current user
function getUser() {
	  var user = firebase.auth().currentUser;
	  var email, uid, emailVerified;
	  if(user != null) {
		  email = user.email;
		  emailVerified = user.emailVerified;
		  uid = user.uid;
		  return user;
	  }
}

//load reports
function pushReports(userId) {
	isBusy(true);
	//monitor/load report changes
  	var reportRef = firebase.database().ref('reports/' + userId);
	reportRef.on('value', function(snapshot) {
		if(snapshot.val() == null) {
			$("#mainReport").append("<div class='alert alert-primary text-center' " +
					"style='background-color:#d9edf7;color:#31708f;padding:10px;"+
				"role='alert'>You have no reports at this time</div>");
			$("#reportSelect").html("<option>No Reports Available</option>");
			$("#reportSelect").prop("disabled",true);
			$("#addNewPeriod").prop("disabled",true);
			$("#deleteReport").prop("disabled",true);
			isBusy(false);
			return false;
		}		
		var reports = snapshot.val().balance_reports;
	    //get pay periods and populate reports
		if($("#reportSelect").val() == null) {
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

//ajax loader
function isBusy(load) {
	if(load) {
		$(".loading").show();
	} else {
		$(".loading").hide();
	}
}