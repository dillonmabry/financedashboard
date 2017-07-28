<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Personal Finance Dashboard</title>
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/dashboard.css" rel="stylesheet"> 
<link href="css/toastr.min.css" rel="stylesheet">
</head>
<body style="background: url(img/background.jpg) no-repeat center center fixed; background-size: cover;">
	<div class="navbar navbar-default navbar-fixed-top" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse"
					data-target=".navbar-collapse">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<img src="img/finance-logo.png" class="brand-logo"/>
			</div>
			<div class="collapse navbar-collapse">
				<form id="form" class="navbar-form navbar-right" role="search">
                    <div class="form-group">
                        <input class="form-control" id="email" type="text" placeholder="Email...">
                    </div>
                    <div class="form-group">
                        <input class="form-control" id="password" type="password" placeholder="Password...">
                    </div>
                    <button class="btn btn-primary" id="signInSubmit" type="submit">Sign-In</button>
                    <button class="btn btn-default" id="signInGoogle">
						<img src="img/google-icon.svg" height="15px" width="15px"/>
									&nbsp;Google Sign-In
					</button>	
	                <span>
		                <input type="checkbox" name="checkboxG1" id="checkboxG1" class="css-checkbox" />
		                <label for="checkboxG1" class="css-label">Remember Me</label>
	                </span> 
                </form>
			</div>
			<!--/.nav-collapse -->
		</div>
	</div>
	<div class="loading"></div>
	<div class="container">
		<div class="starter-template">
			<div id="app" class="col-md-6 col-md-offset-3 form-well">
			<h3>Experience Individual Finance</h3>
			<h5>Tailored, personalized options to fit <strong>you</strong></h5>
			<hr/>
			<form id="registerForm">
				<div class="form-group">
					<input class="form-control" id="emailReg" type="text" placeholder="Email...">
				</div>
				<div class="form-group">
					<input class="form-control" id="passwordReg" type="password" placeholder="Password...">
				</div>
				<div class="form-group">
					<input class="form-control" id="userReg" type="text" placeholder="User Name...">
				</div>
				<div id="regOutput"></div>
			</form>
			<button class="btn btn-primary" id="register">Register Now</button>
			</div>
		</div>
	</div>
	<!-- /.container -->
	
	<!-- Footer -->
	<footer id="site-footer" class="navbar-fixed-bottom">
		<div class="container">
			<div class="row">
					<div id="footer-navigation">
						<ul id="menu-footer" class="text-center">
							<li class="footer-item">
								<img class="brand-sm-ft" src="img/finance-logo-sm.png"/><span>&copy;&nbsp;2017</span>
							</li>
							<li class="footer-item mainItem" id="about-ft">About
							</li>
							<li class="footer-item mainItem" id="donate-ft">Donate</li>
							<li class="footer-item mainItem" id="contact-ft">Contact Us</li>
							<li class="footer-item mainItem" id="terms-ft">Terms and Conditions</li>
						</ul>
					</div>
			</div>
		</div>
	</footer> 


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