getVersion().done(function(manifestVersion) {
		var currYear = new Date().getFullYear();
	    $(".footer").html(
	    		'<div class="container text-center">'+
	  	      '<p class="navbar-text navbar-center">Personal Finance Planner '+currYear+' - '+manifestVersion+
	  	      '</p>'+
	  	    '</div>'
		)
	}).fail(function(error) {
	   console.log(error);
	});


function getVersion() {
    return $.ajax({
		type : 'GET',
		url : 'AppEngine',
		data : {
			oper : "getVersion"
		},
		dataType : 'text',
		success : function(data) {
			return data;
		},
		error : function(e) {
			console.log("Error: " + JSON.stringify(e));
		}
	});
}