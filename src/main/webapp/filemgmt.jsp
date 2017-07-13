<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Personal Finance Dashboard - File Management</title>
<link href="css/bootstrap.min.css" rel="stylesheet">
<!-- <link href="css/main-theme.min.css" rel="stylesheet"> -->
<link rel="stylesheet"
	href="https://cdn.datatables.net/1.10.12/css/jquery.dataTables.min.css">
<link rel="stylesheet"
	href="https://cdn.datatables.net/buttons/1.2.2/css/buttons.dataTables.min.css">
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
				<!-- <a class="navbar-brand" href="#">Personal
				Finance Planner</a> -->
			</div>
			
			<div class="collapse navbar-collapse">
				<ul class="nav navbar-nav">
					<li id="dashboardMenu"><a href="dashboard.jsp"> <span
							class="glyphicon glyphicon-home"></span>&nbsp;&nbsp; Dashboard
					</a></li>
					<li class="active"><a href="filemgmt.jsp">Manage Files</a></li>
					<li id="settingsMenu"><a href="preferences.jsp">Settings</a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li class="text-right"><a id="userInfo" class="text-muted"></a>
					</li>
					<li id="signOut"><a href="#"><span
							class="glyphicon glyphicon glyphicon-log-out">&nbsp; </span>Logout</a>
					</li>
				</ul>
			</div>
			<!--/.nav-collapse -->
		</div>
	</div>
	<div class="container">
		<div class="row" id="fileMgmtMain">
			<div id="main" class="col-sm-12 main">
				<div class="page-header">
					<center>
						<h3>File Management System</h3>
					</center>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<input type="file" class="file" id="fileButton">
						<div class="input-group" style="width: 105%">
							<input type="text" class="fileName form-control" disabled
								placeholder="Upload File">
						</div>
					</div>
				</div>
				<div class="col-sm-2">
					<span class="input-group-btn">
						<button class="browse btn btn-default" type="button">
							<i class="glyphicon glyphicon-search"></i>&nbsp;Browse
						</button>
					</span>
				</div>
				<div class="progressStatusSec col-sm-2 pull-right"
					style="display: none">
					<div class="form-group">
						<div class="progressStatus"></div>
					</div>
				</div>
				<div class="col-sm-4 pull-right">
					<div class="form-group">
						<div class="progress">
							<progress class="progress-bar progress-bar-success"
								role="progressbar" value="0" max="100" style="width:100%;"
								id="uploader"> </progress>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12 main">
						<br />
						<div class="well">
							<div class="row">
								<div class="col-md-12">
									<h4 class="text-center">
										<strong>Available Files</strong>
									</h4>
									<hr />
									<table id="fileTable" cellspacing="0" width="100%">
										<thead>
											<tr>
												<th>File Name</th>
												<th>Content Type</th>
												<th>Size</th>
												<th>Date Created</th>
												<th>Download</th>
											</tr>
										</thead>
										<tbody id="mainDataTable">
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div id="fileListInfo"></div>
					</div>
				</div>
			</div>
		</div>

	</div>
	<!-- /.container -->

	<!-- Footer -->
	<div class="navbar navbar-default navbar-fixed-bottom footer"></div>

	<!-- Scripts and dependencies -->
	<script src="js/scripts/jquery-3.1.0.min.js"></script>
	<script src="js/scripts/bootstrap.min.js"></script>
	<script src="https://www.gstatic.com/firebasejs/4.1.2/firebase.js"></script>
	<script src="https://www.gstatic.com/firebasejs/4.1.2/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/4.1.2/firebase-auth.js"></script>
	<script
		src="https://www.gstatic.com/firebasejs/4.1.2/firebase-database.js"></script>
	<script
		src="https://www.gstatic.com/firebasejs/4.1.2/firebase-storage.js"></script>
	<script
		src="https://cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js"></script>
	<script
		src="https://cdn.datatables.net/buttons/1.2.2/js/dataTables.buttons.min.js"></script>
	<script
		src="//cdn.datatables.net/buttons/1.2.2/js/buttons.flash.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js"></script>
	<script
		src="//cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/pdfmake.min.js"></script>
	<script
		src="//cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/vfs_fonts.js"></script>
	<script
		src="//cdn.datatables.net/buttons/1.2.2/js/buttons.html5.min.js"></script>
	<script
		src="//cdn.datatables.net/buttons/1.2.2/js/buttons.print.min.js"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.1/moment.min.js"></script>
	<script src="js/scripts/toastr.min.js"></script>
	<script src="js/firebase/config.js"></script>
	<script src="js/Screens/authentication/logout.js"></script>
	<script src="js/confighelper/confighelper.js"></script>
	<script src="js/Screens/filemgmt/filemgmt.js"></script>
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