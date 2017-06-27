<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Personal Finance Dashboard</title>
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/main-theme.min.css" rel="stylesheet">
<link href="css/dashboard.css" rel="stylesheet">
<link href="css/toastr.min.css" rel="stylesheet">
<link rel="stylesheet"
	href="https://cdn.datatables.net/1.10.12/css/jquery.dataTables.min.css">
<link rel="stylesheet"
	href="https://cdn.datatables.net/buttons/1.2.2/css/buttons.dataTables.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/datepicker/0.5.3/datepicker.min.css">
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
					<!-- 	<li><a href="home.jsp"><span class="glyphicon glyphicon-home"></span></a></li> -->
					<li class="active" id="dashboardMenu"><a href="#"> <span
							class="glyphicon glyphicon-home"></span>&nbsp;&nbsp; Dashboard
					</a></li>
					<li id="settingsMenu"><a href="preferences.jsp">Settings</a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li id="signOut"><a href="#"><span class="glyphicon glyphicon glyphicon-log-out">&nbsp;
						</span>Logout</a>
					</li>
				</ul>
			</div>
			<!--/.nav-collapse -->
		</div>
	</div>
	<div class="loading"></div>
	<div class="container">
		<div class="row" id="dashboardMain">
			<div id="main" class="col-sm-12 main">
				<div class="page-header">
					<center>
						<h3>Overview of Finances</h3>
					</center>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label for="reportSelect">Select report:</label> <select
							class="form-control" id="reportSelect"></select>
					</div>
				</div>
				<div class="col-sm-8">
					<div class="form-group text-right">
						<label id="reportRange"></label>
					</div>
				</div>
				<!-- <button id='runReport' class="btn btn-primary center-block">Run Report</button> -->
				<div class="row">
					<div id="mainReport" class="col-sm-12 main">
						<div class="well">
							<div class="row">
								<div class="col-sm-4">
									<h4 class="text-left" id='conditionLabel'></h4>
								</div>
								<div class="col-sm-4">
									<h4 class="text-center">User Reports</h4>
								</div>
								<div class="col-sm-4">
									<button id='addNewPeriod' class="btn btn-default btn-sm pull-right">
										<span class="glyphicon glyphicon-plus-sign"></span>&nbsp;Add New Period
									</button>
								</div>
							</div>
							<hr />
							<table id="mainTable" class="display" cellspacing="0"
								width="100%">
								<thead>
									<tr>
										<th>Pay Period</th>
										<th>Gross Income</th>
										<th>Net Income</th>
										<th>Expenses</th>
										<th>Saved</th>
									</tr>
								</thead>
								<tbody id="mainDataTable">
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div class="text-center">
					<p id="userInfo" class="text-muted"></p>
				</div>
			</div>
		</div>

	</div>
	<!-- /.container -->

	<!-- Footer -->
	<div class="navbar navbar-default navbar-fixed-bottom">
		<div class="container text-center">
			<p class="navbar-text navbar-center">
				Personal Finance Planner 2017
			</p>
		</div>
	</div>
	
	<!-- Add Period modal -->
	<div class="modal fade" id="addPeriodModal" tabindex="-1" role="dialog" aria-labelledby="addPeriodModal" aria-hidden="true">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 class="modal-title" >Add New Pay Period</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
	        <form>
	          <div class="form-group">
		          <label for="periodSpan" class="form-control-label">Pay Period Date: </label>
		            <div class='input-group date'>
						<input type='text' class="form-control" id='periodSpan' /> 
							<span  class="input-group-addon">
							<span class="glyphicon glyphicon-calendar"></span>
						</span>
					</div>
	          </div>
	          <div class="form-group">
	            <label for="message-text" class="form-control-label">Message:</label>
	            <textarea class="form-control" id="message-text"></textarea>
	          </div>
	        </form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	        <button type="button" id="confirmAddPeriod" class="btn btn-primary">Confirm</button>
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
	<script
		src="https://www.gstatic.com/firebasejs/4.1.2/firebase-database.js"></script>
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
	<script src="https://cdnjs.cloudflare.com/ajax/libs/datepicker/0.5.3/datepicker.min.js"></script>
	<script src="js/scripts/toastr.min.js"></script>
	<script src="js/firebase/config.js"></script>
	<script src="js/Screens/authentication/logout.js"></script>
	<script src="js/Screens/dashboard/dashboard.js"></script>
	<script src="js/common.js"></script>
	
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