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
			<a class="navbar-brand text-center center-block" href="#">Personal
				Finance Dashboard</a>
			<div class="collapse navbar-collapse">
				<ul class="nav navbar-nav">
					<li id="dashboardMenu">
						<a href="dashboard.jsp">
						<span class="glyphicon glyphicon-home"></span>&nbsp;&nbsp; Dashboard
						</a>
					</li>
					<li class="active" id="settingsMenu"><a href="preferences.jsp">Settings</a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li class="text-right">
						<a id="userInfo" class="text-muted"></a>
					</li>
					<li id="signOut"><a href="#"><span class="glyphicon glyphicon glyphicon-log-out">&nbsp;
						</span>Logout</a>
					</li>
				</ul>
			</div>
			<!--/.nav-collapse -->
		</div>
	</div>
	<div class="container">
		<div class="row" id="dashboardMain">
			<div id="main" class="col-sm-12 main">
				<div class="page-header">
					<center>
						<h3>User Preferences</h3>
					</center>
				</div>
				<div class="row">
					<div class="col-sm-12 main">
					<div class="well">
						<div class="row">
								<div class="col-sm-6">
									<div class="form-group">
										<label for="userName">User Name: </label>
										<input class="form-control" id="userName" type="userName">
									</div>
									<div class="form-group ">
										<label for="emailPref">Email: </label>
										<input class="form-control" id="emailPref" type="emailPref" readonly>
									</div>
								</div>
								<div class="col-sm-6">
									<div class="form-group">
										<label for="photoUrl">Photo URL: </label>
										<input class="form-control" id="photoUrl" type="photoUrl">
									</div>
									<div class="form-group ">
										<label for="userId">User ID: </label>
										<input class="form-control" id="userId" type="userId" readonly>
									</div>
								</div>
							</div>
							<div class="input-group">
							   <span class="input-group-btn">
							        <button id="sendVerify" class="btn btn-default">Re-send Verification Email</button>
							   </span>&nbsp;
							   <span class="input-group-btn">
							        <button id="saveUserInfo" class="btn btn-default">Save User Info</button>
							   </span>
							   <h4 id="userVerified" class="text-right"></h4>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
	<!-- /.container -->

	<!-- Footer -->
	<div class="navbar navbar-default navbar-fixed-bottom footer">
	</div>

	<!-- Scripts and dependencies -->
	<script src="js/scripts/jquery-3.1.0.min.js"></script>
	<script src="js/scripts/bootstrap.min.js"></script>
	<script src="https://www.gstatic.com/firebasejs/4.1.2/firebase.js"></script>
	<script src="https://www.gstatic.com/firebasejs/4.1.2/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/4.1.2/firebase-auth.js"></script>
	<script
		src="https://www.gstatic.com/firebasejs/4.1.2/firebase-database.js"></script>
	<script src="js/scripts/toastr.min.js"></script>
	<script src="js/firebase/config.js"></script>
	<script src="js/Screens/preferences/preferences.js"></script>
	<script src="js/Screens/authentication/logout.js"></script>
	<script src="js/confighelper/confighelper.js"></script>
	<script>
	$('.navbar li').click(function(e) {
	    $('.navbar li.active').removeClass('active');
	    var $this = $(this);
	    if (!$this.hasClass('active')) {
	        $this.addClass('active');
	    }
	    //e.preventDefault();
	});
	</script>
</body>
</html>