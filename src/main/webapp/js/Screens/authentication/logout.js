	$("#signOut").click(function() {
		loadSignOut();
		window.location.href = 'index.jsp';
	});
	
	function loadSignOut() {
    	firebase.auth().signOut();	
	}