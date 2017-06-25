<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Personal Finance Dashboard</title>
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/main-theme.min.css" rel="stylesheet">
<link href="css/dashboard.css" rel="stylesheet">
<link href="css/toastr.min.css" rel="stylesheet">
<link rel="icon" type="image/png" href="img/favicon.png" />
</head>
<body>
	<div class="navbar navbar-default navbar-fixed-top" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse"
					data-target=".navbar-collapse">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
			</div>
			<a class="navbar-brand text-center center-block" href="#">Personal Finance Dashboard</a>
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
			<h3>Dashboard Login</h3>
			<div id="app" class="col-md-6 col-md-offset-3">
			<hr/>
			<!-- <button id="signInBtn" class="btn btn-default">Authenticate</button> -->
			<form id="form">
				<div class="form-group">
					<label for="email">Email: </label>
					<input class="form-control" id="email" type="text">
				</div>
				<div class="form-group">
					<label for="password">Password: </label>
					<input class="form-control" id="password" type="password">
				</div>
				<div class="alert alert-warning" style="display:none;padding:10px;"
				role="alert">Email and password required!</div>
				<div class="alert alert-danger" style="display:none;padding:10px;"
				role="alert"></div>
				<button class="btn btn-default btn-sm" type="submit">Sign-In</button>&nbsp;
				<button class="btn btn-default btn-sm" id="signInGoogle">
					<img src="img/google-icon.svg" height="15px" width="15px"/>
					&nbsp;Google Sign-In
				</button>
			</form>
			<hr/>
				<div class="row">
					Need to register?&nbsp;
					<button class="btn btn-default btn-sm" id="register">Register Now</button>
					<br/>
				</div>
			</div>
		</div>
			<div class="row" id="dashboardMain" style="display: none">
				<div class="col-sm-12 main">
					<div class="page-header">
					  <center><h2>Overview of Finances</h2></center>
					</div>
					<center><button id="runReport" class="btn btn-primary">Run Report</button></center>
						<div class="row">
							<div id="mainReport" class="col-sm-12 main" style="display:none">
							<h4>Condition: 
								<span id="conditionLabel" class="label label-success">Satisfactory</span>
							</h4>
							</div>
						</div>				
				</div>
			</div>

	</div>
	<!-- /.container -->
	
	<!-- Footer -->
	<div class="navbar navbar-default navbar-fixed-bottom">
	    <div class="container text-center">
	      <p class="navbar-text navbar-center">Personal Finance Planner © 2017
	      </p>
	    </div>
	</div>
	
	<!-- Dialog -->
	<div id="dialog" title="Notification">
  		<p id='dialogContent'></p>
	</div>
    
	<!-- Scripts and dependencies -->
	<script src="js/jquery-3.1.0.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="https://www.gstatic.com/firebasejs/4.1.2/firebase.js"></script>
	<script src="https://www.gstatic.com/firebasejs/4.1.2/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/4.1.2/firebase-auth.js"></script>
	<script src="https://www.gstatic.com/firebasejs/4.1.2/firebase-database.js"></script>
	<script src="js/toastr.min.js"></script>
	<script src="js/config.js"></script>
 	<script src="js/login.js"></script>
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