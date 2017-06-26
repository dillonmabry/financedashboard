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
	    //var periods = snapshot.val().pay_periods;
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
	    		datePeriods.push(key);
	    		//calculate after expenses
	    		var expenses = (periods[key].expenses + periods[key].utilities 
	    				+ periods[key].other_expenses + periods[key].base_rent);
	    	    var postExpenses = (periods[key].net_income) - expenses;

	    	    //condition
	    		if(postExpenses >= 500) {
	    			$("#conditionLabel").html("Condition: <span class='label label-success'>Excellent</span>");
	    		} else if (postExpenses < 500 && postExpenses >= 300) {
	    			$("#conditionLabel").html("Condition: <span class='label label-warning'>Medium</span>");
	    		} else {
	    			$("#conditionLabel").html("Condition: <span class='label label-danger'>Critical</span>");
	    		}
	    	     //setup data table
		       	 $('#mainDataTable').append(
		  			 "<tr class='child'>"
		  			 +'<td>'+key+'</td>'
		  			 +'<td>$'+periods[key].gross_income.toFixed(2)+'</td>'
		  			 +'<td>$'+periods[key].net_income.toFixed(2)+'</td>'
		  			 +'<td>$'+expenses.toFixed(2)+'</td>'
		  			 +'<td>$'+postExpenses.toFixed(2)+'</td>'
		  			 +'</tr>$');
		    	  }
	    	}
	    	
	    	//set report range info period
	    	$("#reportRange").html("Start Period: "+datePeriods[0]+"<br/><br/>End Period: "
	    			+datePeriods[datePeriods.length-1]);  
	    	
		    //get the current reports
		    $('#mainTable').DataTable({
	        	"oLanguage": {
			        "sSearch": "Filter: ",
			       },
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
	$('#addPeriodModal').on('hidden.bs.modal', function () {
	    $(this).find('form').trigger('reset');
//	    $("#participantTable td").parent().remove();
//	    $("#sponsorTable td").parent().remove();
//	    $("#addSponsorBtn").prop("disabled", false);
//	    $("#addParticipantsBtn").prop("disabled", false);
	});
	$('#addPeriodModal').modal({backdrop: 'static', keyboard: true})  
	$("#addPeriodModal").modal("show");
});



