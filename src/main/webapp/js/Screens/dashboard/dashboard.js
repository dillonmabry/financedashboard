function getDashboard(user, database) {
	//clear main table
	if ( $.fn.DataTable.isDataTable('#mainTable') ) {
		  $('#mainTable').DataTable().destroy();
		  $('#mainTable').DataTable().clear();
		}
	//show user screenname and avatar
	populateUserInfo(user);
	//get current selected report
	var selectedCurrReport = getReport();
	//hide delete button
	$("#deletePeriod").hide();
	
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
		
	    //get pay periods of selected report
	    var currentReport = getReport();
	    
	    for (var key in reports) {
		    if (reports.hasOwnProperty(key)) {
		    	if(reports[key].report_name == currentReport) {
		    		 //populate report name & desc.
		    	    $("#reportDashName").html('<strong>'+reports[key].report_name+'</strong>');
		    	    $("#reportDashName").attr("title",reports[key].report_description);
		    		if(reports[key].pay_periods != null) {
		    			periods = reports[key].pay_periods;
		    		} else {
		    			periods = null;
		    		}
		    	}
			}
	    }  
	    
	    //get the current reports
	    var table = $('#mainTable').DataTable({
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
	    
	    //get Google charts setup
	    //load charts
	    google.charts.load('current', {'packages':['corechart']});
	    google.charts.setOnLoadCallback(drawChart)
	    var chartData = [];
	    
	    if(periods != null) {
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
	    	    //add each row
	    	    table.row.add([
	    	    	key,
	    	    	gross_income.toFixed(2),
	    	    	net_income.toFixed(2),
	    	    	expenses.toFixed(2),
	    	    	postExpenses.toFixed(2)
	    	    ] ).draw();
	    	    //populate chart data for one year
	    	    var lastDay = new Date(new Date().getFullYear(), 11, 31);
	    	    if(new Date(key) < lastDay){
	    	    	chartData.push([new Date(key),postExpenses])
	    	    }
	    	  }
	    	}
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
	    	$("#reportRange").html("<br/>Start Period: "+datePeriods[0].key+"<br/><br/>End Period: "
	    			+datePeriods[datePeriods.length-1].key);  
	    	
		    //listen to table row selection	
		    $('#mainTable tbody').unbind('click').on( 'click', 'tr', function () {
				if ( $(this).hasClass('selected') ) {
			        $(this).removeClass('selected');
			        $("#deletePeriod").hide();
			    }
			    else {
			        table.$('tr.selected').removeClass('selected');
			        $(this).addClass('selected');
			        $("#deletePeriod").show();
			    }
			});
		    
		    //remove previous selected on new page
		    $('#mainTable').on( 'page.dt', function () {
		    	$('#mainTable > tbody > tr').removeClass("selected");
		    	$("#deletePeriod").hide();
		    } );
			
			$('#deletePeriod').unbind('click').click( function () {
				// get current user id
				var userId = firebase.auth().currentUser.uid;
				//get current report
				var reportName = getReport();
				//get selected period and remove
				var periodDelete = table.$('tr.selected').find('td:first').text();
				//delete period
				deletePeriod(userId, reportName, periodDelete);
				toastInfo("Success","Pay period removed");
				return;
			} );

	    } else {
	    	//else periods null
	    	$("#conditionLabel").html("Condition: <span class='label label-info'>No Condition Available</span>");
	    }

	    //draw personalized chart
	    function drawChart() {

	        var data = new google.visualization.DataTable();
	        data.addColumn('date', 'Date');
	        data.addColumn('number', 'Savings (USD)');

	        for(var i=0; i < chartData.length; i++) {
	        	data.addRows([
	        	              [chartData[i][0], chartData[i][1]]
	        	]);
	        }
	        var options;
	        if(chartData.length <= 1) {        
		        options = {
		        	legend: { 
		        		    position : 'none'
		        	},
		          title: 'Monthly Savings',
		          hAxis: {
		              format: 'MMM dd',
		              gridlines: {count: 1},
		              direction:1, 
	  		          slantedText:true, 
	  		          slantedTextAngle:45
		            },
		            vAxis: {
		              gridlines: {color: 'none'},
		              minValue: 0,
		            },
		          width: 550,
		          height: 240,
		          chartArea: { width: "65%", height: "65%"}
		        };
	        } else {
	        	options = {
	        			legend: { 
		        		    position : 'none'
		        	},
	  		          title: 'Monthly Savings',
	  		          hAxis: {
	  		              format: 'MMM dd',
	  		              gridlines: {count: 15},
	  		            direction:1, 
	  		            slantedText:true, 
	  		            slantedTextAngle:45
	  		            },
	  		            vAxis: {
	  		              gridlines: {color: 'none'},
	  		              minValue: 0,
	  		            },
	  		          width: 550,
	  		          height: 240,
	  		          chartArea: { width: "70%", height: "65%"}
	  		        };
	        }
	       var chart = new google.visualization.LineChart(document.getElementById('mainChart'));
	       chart.draw(data, options);
	      }
	    
	      /*google.charts.setOnLoadCallback(drawDonut);
	      function drawDonut() {
	        var data = google.visualization.arrayToDataTable([
	          ['Task', 'Hours per Day'],
	          ['Work',     11],
	          ['Eat',      2],
	          ['Commute',  2],
	          ['Watch TV', 2],
	          ['Sleep',    7]
	        ]);

	        var options = {
	          title: 'Spending Ratios',
	          pieHole: 0.4,
	          width: 375,
		      height: 225,
		      chartArea: { width: "70%", height: "65%"},
		      colors: ['#316DA2', '#3D8ACE', '#479DEA', '#50ACFF', '#A5D3FE']
	        };

	        var chart = new google.visualization.PieChart(document.getElementById('secondaryChart'));
	        chart.draw(data, options);
	      }*/
	  });
}
/* --------------------------------- END DASHBOARD ----------------------------------*/

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
	$(".alert-warning").hide();
	$('#addPeriodModal').modal({backdrop: 'static', keyboard: true})  
	$("#addPeriodModal").modal("show");
	$("#addPeriodModal").on('shown.bs.modal', function(){
		$('#pay-period').focus();
	});
	//datetimepicker
	$(function () {
		var dateNow = moment();
		dateNow.format("MM-DD-YYYY");
        $('#periodSpan').datetimepicker({
        	minDate: dateNow,
        	format: 'MM-DD-YYYY',
        	defaultDate: dateNow
        });
    });
	// get current user id
	var userId = firebase.auth().currentUser.uid;
	//get current report
	var reportName = getReport();

	$("#confirmAddPeriod").unbind('click').click(function(){
		if(
				 $("#pay-period").val() == "" ||
				 $("#base-rent").val() == "" ||
				 $("#base-expenses").val()== "" ||
				 $("#base-income").val() == "" ||
				 $("#net-income").val() == "" ||
				 $("#other-expenses").val() == "" ||
				 $("#utilities-expenses").val() == ""
		) {
			$(".inputCheckForm").html("<div class='alert alert-warning text-center' role='alert'><strong>Alert</strong> " +
					"Please enter all required inputs</div>").show();
			return;
		}
		var dtoSave = {
				pay_period: $("#pay-period").val(),
				base_rent: $("#base-rent").val(),
				expenses: $("#base-expenses").val(),
				gross_income: $("#base-income").val(),
				net_income: $("#net-income").val(),
				other_expenses: $("#other-expenses").val(),
				utilities: $("#utilities-expenses").val(),
		}
		//insert new record
		writeNewPeriod(userId, reportName, dtoSave);
		//reset form and hide modal
		$(this).find('form').trigger('reset');
		$("#addPeriodModal").modal("hide");
		toastInfo("Success","New pay period added to report");
	});
	
});

//listen to add new report
$("#addNewReport").click(function(){
	//reset modal on close
	$('#addReportModal').on('hidden.bs.modal', function () {
	    //$(this).find('form').trigger('reset');
	});
	$('#addReportModal').modal({backdrop: 'static', keyboard: true})  
	$("#addReportModal").modal("show");
	$("#addReportModal").on('shown.bs.modal', function(){
		$('#reportNameInput').focus();
	});
	//get current timestamp
	var momentTime = moment().format().toString();

	// get current user id
	var userId = firebase.auth().currentUser.uid;
	//get current report
	var reportName = getReport();

	$("#confirmAddReport").unbind('click').click(function(){
		if(
				 $("#reportDescInput").val() == "" ||
				 $("#reportNameInput").val() == ""
		) {
			$(".inputCheckForm").html("<div class='alert alert-warning text-center' role='alert'><strong>Alert</strong> " +
					"Please enter all required inputs</div>").show();
			return;
		}
		var dtoSave = {
				report_name: $("#reportNameInput").val(),
				report_description: $("#reportDescInput").val(),
				time_generated: momentTime,
		}
		//insert new record
		writeNewReport(userId, dtoSave)
		//reset form and hide modal
		$(this).find('form').trigger('reset');
		$("#addReportModal").modal("hide");
		toastInfo("Success","New report added");
	});
});

//listen to delete report
$("#deleteReport").click(function(){
	$("<div class=\"modal fade\" id=\"deleteReportModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"deleteReportModal\" aria-hidden=\"true\">\r\n" + 
			"	  <div class=\"modal-dialog\" role=\"document\">\r\n" + 
			"	    <div class=\"modal-content\">\r\n" + 
			"	      <div class=\"modal-header\">\r\n" + 
			"	        <h5 class=\"modal-title\">Confirm Changes</h5>\r\n" + 
			"	        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n" + 
			"	          <span aria-hidden=\"true\">&times;</span>\r\n" + 
			"	        </button>\r\n" + 
			"	      </div>\r\n" + 
			"	      <div class=\"modal-body\">\r\n" + 
			"	        <p>Are you sure you wish to delete?</p>\r\n" + 
			"	      </div>\r\n" + 
			"	      <div class=\"modal-footer\">\r\n" + 
			"	        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\r\n" + 
			"	        <button type=\"button\" id=\"confirmDeleteReport\" class=\"btn btn-primary\">Delete</button>\r\n" + 
			"	      </div>\r\n" + 
			"	    </div>\r\n" + 
			"	  </div>\r\n" + 
			"	</div>").appendTo(document.body);
	$("#deleteReportModal").on('hidden.bs.modal', function () {
		$("#deleteReportModal").remove();
	});
	$('#deleteReportModal').modal({backdrop: 'static', keyboard: true})  
	$("#deleteReportModal").modal("show");
	// get current user id
	var userId = firebase.auth().currentUser.uid;
	//get current report
	var reportName = getReport();
	$("#confirmDeleteReport").unbind('click').click(function(){
		
		deleteReport(userId, reportName);

		$("#deleteReportModal").modal("hide");
		$("#deleteReportModal").remove();
		$('.modal-backdrop').remove();
		toastInfo("Success","New report added");
	});
});


//get user id, get report name matched with key, add new pay period to pay_periods
function writeNewPeriod(userId, reportName, dto) {
	// Get a reference to the database service
	var database = firebase.database();
	
	var reportRef = firebase.database().ref('reports/' + userId);
	reportRef.once('value', function(snapshot) {
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
	var currUser = getUser();
	getDashboard(currUser, database);
}

//get user id, add report to balance_reports
function deletePeriod(userId, reportName, pay_period) {
	// Get a reference to the database service
	var database = firebase.database();
	
	var reportRef = firebase.database().ref('reports/' + userId);
	reportRef.once('value', function(snapshot) {
		if(snapshot) {
			var reports = snapshot.val().balance_reports;
		    //get pay periods and populate reports
		    for (var key in reports) {
			    if (reports.hasOwnProperty(key)) {
				    	$.each(reports[key], function(reportNameKey, value) {
				    		if(reportNameKey == "report_name") {
				    			if(reportName == value) {
				    				var reportSetRef = firebase.database().ref('reports/' + userId + '/balance_reports/'+key+'/pay_periods');
				    				//delete the period
				    				console.log(true);
				    				console.log(reportSetRef.child(pay_period));
				    				reportSetRef.child(pay_period).remove();
				    			}
				    		}
				    	});
				}
		    }
		}
	});
	
	//reload dashboard
	var currUser = getUser();
	getDashboard(currUser, database);
	//remove delete if no more elements left
	if($("#mainTable > tbody > tr").length< 1) {
		$("#deletePeriod").hide();
	}
}

//get user id, add report to balance_reports
function writeNewReport(userId,dto) {
	// Get a reference to the database service
	var database = firebase.database();
	//get ref to balance_reports
	var reportRef = firebase.database().ref('reports/' + userId +'/balance_reports');
	var pushKey = reportRef.push().key;
	
	//push new report
	reportRef.child(pushKey).set({
		report_name: dto.report_name,
    	report_description: dto.report_description,
    	time_generated: dto.time_generated
	});
	//reload dashboard
	var currUser = getUser();
	
	//refresh reports
	location.reload();
}

function deleteReport(userId, report) {
	// Get a reference to the database service
	var database = firebase.database();
	//get db reference
	var reportRef = firebase.database().ref('reports/' + userId);
	reportRef.once('value', function(snapshot) {
		var reports = snapshot.val().balance_reports;
		//get report to delete
	    for (var key in reports) {
		    if (reports.hasOwnProperty(key)) {
			    	$.each(reports[key], function(reportNameKey, value) {
			    		if(reportNameKey == "report_name") {
			    			if(report == value) {
			    				//get ref to balance_reports
			    				var deleteRef = firebase.database().ref('reports/' + userId +'/balance_reports');
			    				//delete report
			    				deleteRef.child(key).remove();
			    			}
			    		}
			    	});
			}
	    }
	});
	
	//reload dashboard
	var currUser = getUser();
	//refresh reports 
	location.reload();
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

function populateUserInfo(user) {
	//current user info
	$("#userInfo").html(user.displayName);
	if(user.photoURL == null) {
		  $("#photoUrl").val("Not Created");
		  $("#userInfoAvatar").attr("src", "img/new-user-icon.png");
	  } else if(user.photoURL == 'Not Created') {
			$("#userInfoAvatar").attr("src", "img/new-user-icon.png");
	  }  else {
		  $("#photoUrl").val(user.photoURL);
		  $("#userInfoAvatar").attr("src", user.photoURL);
	  }
}