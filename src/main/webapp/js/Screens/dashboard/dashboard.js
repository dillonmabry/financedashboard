function getDashboard(user, database) {
	//clear main table
	if ( $.fn.DataTable.isDataTable('#mainTable') ) {
		  $('#mainTable').DataTable().destroy();
		}
	$('#mainTable tbody > tr').remove();
	//current user info
	$("#userInfo").html("Current user - "+user.email);
	
	//retrieve data
	var reportRef = firebase.database().ref('reports/' + user.uid);
	reportRef.on('value', function(snapshot) {
		if(snapshot.val() == null) {
			return false;
		}		
	    //get pay periods/reports
		var reports = snapshot.val().balance_reports;
		var periods;
		var datePeriods = [];
	    var startPeriod, endPeriod;
	    
	    //get pay periods of selected report
	    var currentReport = getReport();
	    for (var key in reports) {
		    if (reports.hasOwnProperty(key)) {
		    	if(reports[key].report_name == currentReport) {
		    		periods = reports[key].pay_periods;
		    	}
			}
	    }  
	    
	    //populate condition and main table with pay periods
	    for (var key in periods) {
	    	  if (periods.hasOwnProperty(key)) {
	    		//moment.utc(dateNew).format()
	    		datePeriods.push({
	    			key: key,
	    			pay_period: periods[key],
	    		});
	    		//calculate after expenses
	    		var gross_income = parseInt(periods[key].gross_income);
	    		var net_income = parseInt(periods[key].net_income);
	    		var expenses = (parseInt(periods[key].expenses) + parseInt(periods[key].utilities) 
	    				+ parseInt(periods[key].other_expenses) + parseInt(periods[key].base_rent));
	    	    var postExpenses = (parseInt(periods[key].net_income)) - expenses;
	    	    
	    	     //setup data table
		       	 $('#mainDataTable').append(
		  			 "<tr class='child'>"
		  			 +'<td>'+key+'</td>'
		  			 +'<td>$'+gross_income.toFixed(2)+'</td>'
		  			 +'<td>$'+net_income.toFixed(2)+'</td>'
		  			 +'<td>$'+expenses.toFixed(2)+'</td>'
		  			 +'<td>$'+postExpenses.toFixed(2)+'</td>'
		  			 +'</tr>$');
		    	  }
	    	}
	    	console.log(JSON.stringify(datePeriods));
		    var sortedDates = datePeriods;
		    sortedDates.sort(function(a, b) {
		        return new Date( b.key ) < new Date( a.key );
		    });
		    var last_period = (parseInt(sortedDates[sortedDates.length-1].pay_period.net_income) - (
					parseInt(sortedDates[sortedDates.length-1].pay_period.expenses)+	
					parseInt(sortedDates[sortedDates.length-1].pay_period.utilities)+
					parseInt(sortedDates[sortedDates.length-1].pay_period.other_expenses)+
					parseInt(sortedDates[sortedDates.length-1].pay_period.base_rent)
					));
		    //condition on report for lastest pay period
			if(last_period >= 500) {
				$("#conditionLabel").html("Condition: <span class='label label-success'>Excellent</span>");
			} else if (last_period < 500 && last_period  >= 300) {
				$("#conditionLabel").html("Condition: <span class='label label-warning'>Medium</span>");
			} else {
				$("#conditionLabel").html("Condition: <span class='label label-danger'>Critical</span>");
			}
	    	//set report range info period
	    	$("#reportRange").html("Start Period: "+datePeriods[0]+"<br/><br/>End Period: "
	    			+datePeriods[datePeriods.length-1]);  
	    	
		    //get the current reports
		    $('#mainTable').DataTable({
	        	"oLanguage": {
			        "sSearch": "Filter: ",
			       },
			       "bDestroy": true,
			       dom:'Bfrtip',
			       "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
			       dom: 'Blfrtip',
			       buttons: [
			         'copy', 'csv', 'excel', 'pdf', 'print'
			       ],
	        });

	        $("#mainTable_filter input").addClass("form-control");
	  });
}

function getReport() {
	var currRep = $("#reportSelect").val();
	if(currRep != null || currRep != "") {
		return currRep;
	}
}

//listen to add new period
$("#addNewPeriod").click(function(){
	//reset modal on close
	$('#addPeriodModal').on('hidden.bs.modal', function () {
	    //$(this).find('form').trigger('reset');
	});
	$('#addPeriodModal').modal({backdrop: 'static', keyboard: true})  
	$("#addPeriodModal").modal("show");
	
	//datetimepicker
	$(function () {
		var dateNow = moment();
		dateNow.format("MM-DD-YYYY");
        $('#periodSpan').datetimepicker({
        	format: 'MM-DD-YYYY',
        	defaultDate: dateNow
        });
    });
	// get current user id
	var userId = firebase.auth().currentUser.uid;
	//get current report
	var reportName = getReport();

	$("#confirmAddPeriod").unbind('click').click(function(){
		var dtoSave = {
				pay_period: $("#pay-period").val(),
				base_rent: $("#base-rent").val(),
				expenses: $("#base-income").val(),
				gross_income: $("#base-income").val(),
				net_income: $("#net-income").val(),
				other_expenses: $("#other-expenses").val(),
				utilities: $("#utilities-expenses").val(),
		}
		console.log(JSON.stringify(dtoSave));
		writeNewPeriod(userId, reportName, dtoSave);
		
		$(this).find('form').trigger('reset');
		$("#addPeriodModal").modal("hide");
		toastInfo("Success","New pay period added to report");
	});
	
	
});

//get user id, get report name matched with key, add new pay period to pay_periods
function writeNewPeriod(userId, reportName, dto) {
	// Get a reference to the database service
	var database = firebase.database();
	
	var reportRef = firebase.database().ref('reports/' + userId);
	reportRef.on('value', function(snapshot) {
		var reports = snapshot.val().balance_reports;
	    //get pay periods and populate reports
	    for (var key in reports) {
		    if (reports.hasOwnProperty(key)) {
			    	$.each(reports[key], function(reportNameKey, value) {
			    		if(reportNameKey == "report_name") {
			    			if(reportName == value) {
			    				var reportSetRef = firebase.database().ref('reports/' + userId + '/balance_reports/'+key+'/pay_periods');
			    				//add the period as new child
			    				reportSetRef.child(dto.pay_period).set({
			    					base_rent: dto.base_rent,
			    					expenses: dto.expenses,
			    					gross_income: dto.gross_income,
			    					net_income: dto.net_income,
			    					other_expenses: dto.other_expenses,
			    					utilities: dto.utilities
			    				});
			    			}
			    		}
			    	});
			}
	    }
	});
	//reload dashboard
	var currUser = getUser(userId, database);
	getDashboard(currUser, database);
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

//get current user
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
