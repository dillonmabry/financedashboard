<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Personal Finance Dashboard</title>
<link href="css/bootstrap.min.css" rel="stylesheet">
<!-- <link href="css/main-theme.min.css" rel="stylesheet"> -->
<link href="css/dashboard.css" rel="stylesheet"> 
<link href="css/toastr.min.css" rel="stylesheet">
</head>
<body style="background: url(img/background-snow.png) no-repeat center center fixed; background-size: cover;">
	<div class="navbar navbar-default navbar-fixed-top" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse"
					data-target=".navbar-collapse">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<!-- <a class="navbar-brand text-center center-block" href="#">Personal
				Finance Planner</a>  -->
			</div>
			<div class="collapse navbar-collapse">
				<ul class="nav navbar-nav">
					<li class="active">
						<a href="index.jsp">
						<span class="glyphicon glyphicon glyphicon-log-in"></span>&nbsp;&nbsp;
							Sign-In
						</a>
					</li>
				</ul>
			</div>
			<!--/.nav-collapse -->
		</div>
	</div>
	<div class="loading"></div>
	<div class="container">
		<div class="starter-template">
			<div id="app" class="col-md-6 col-md-offset-3 form-well">
			<h3>User Login</h3> 
			<hr/>
			<form id="form">
				<div class="form-group">
					<label for="email">Email: </label>
					<input class="form-control" id="email" type="text" placeholder="Enter email...">
				</div>
				<div class="form-group">
					<label for="password">Password: </label>
					<input class="form-control" id="password" type="password" placeholder="Enter password...">
				</div>
				<div id="loginOutput"></div>
				<hr/>
				<button class="btn btn-default" id="signInSubmit" type="submit">Sign-In</button>
				<button class="btn btn-default" id="signInGoogle">
				<img src="img/google-icon.svg" height="15px" width="15px"/>
							&nbsp;Google Sign-In
				</button>	
			</form>
			<button class="btn btn-default" id="register">Register Now</button>
			</div>
		</div>
	</div>
	<!-- /.container -->
	
	<!-- Footer -->
	<div class="navbar navbar-default navbar-fixed-bottom footer">
	</div>
	
	<!-- Add Report modal -->
	<div class="modal fade" id="regDialogModal" tabindex="-1" role="dialog" aria-labelledby="regDialogModal" aria-hidden="true">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 class="modal-title" >Register New User</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
	        <form id="registerForm">
				<div class="form-group">
					<label for="emailReg">Email: </label>
					<input class="form-control" id="emailReg" type="text">
				</div>
				<div class="form-group">
					<label for="passwordReg">Password: </label>
					<input class="form-control" id="passwordReg" type="password">
				</div>
				<div class="form-group">
					<label for="userReg">User Name: </label>
					<input class="form-control" id="userReg" type="text">
				</div>
				<div class="row">
					<div class="form-group col-sm-8">
						<label for="photoReg">Profile Avatar URL:</label>	
						<input class="form-control" id="photoReg" type="text">
					</div>
					<div class="form-group col-sm-4">
						<img id="avatarURLPhoto" src="https://fakeimg.pl/100x100/?text=No%20Photo" 
						height="100px" width="100px" />
					</div>
				</div>
				<div id="regOutput"></div>
			</form>
	      </div>
	      <div class="modal-footer">
	      	<div class="inputCheckForm"></div>
	        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	        <button type="button" id="submitRegister" class="btn btn-primary">Confirm</button>
	      </div>
	    </div>
	  </div>
	</div> 
	
	<!-- Scripts and dependencies -->
	<script src="js/scripts/jquery-3.1.0.min.js"></script>
	<script src="js/scripts/bootstrap.min.js"></script>
	<script src="https://www.gstatic.com/firebasejs/4.1.2/firebase.js"></script>
	<script src="https://www.gstatic.com/firebasejs/4.1.2/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/4.1.2/firebase-auth.js"></script>
	<script src="https://www.gstatic.com/firebasejs/4.1.2/firebase-database.js"></script>
	<script src="js/scripts/toastr.min.js"></script>
	<script src="js/firebase/config.js"></script>
 	<script src="js/Screens/authentication/login.js"></script>
 	<script src="js/confighelper/confighelper.js"></script>
	<script>
	$('.navbar li').click(function(e) {
	    $('.navbar li.active').removeClass('active');
	    var $this = $(this);
	    if (!$this.hasClass('active')) {
	        $this.addClass('active');
	    }
	    e.preventDefault();
	});
	</script>
</body>
</html>