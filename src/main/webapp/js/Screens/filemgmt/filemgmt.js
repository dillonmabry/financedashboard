$( document ).ready(function() {
	//check current user
	firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
			  isBusy(true);
			  var database = firebase.database();
			  var userId = user.uid;
			  //ensure user
			  var user = getUser(userId, database);
			  //current user info
			  populateUserInfo(user);
			  
			  //listen and trigger file upload
			  $('.browse').unbind("click").on('click', function(){
				  uploadFile(user); 
			  });
			  
			  //update file list for user
			  updateTable(user);
			  
			  isBusy(false);
		  } 
	});
});

function uploadFile(user) {
	  var file = $(".file");
	  file.trigger('click');
	  //listen to file input and update file name
	  $('.file').unbind("change").on('change', function(e){
		  $(".fileName").val($(this).val().replace(/C:\\fakepath\\/i, ''));
		  //get actual file
		  var file = e.target.files[0];
		  //firebase storage ref
		  var storageRef = firebase.storage().ref('user/'+user.uid+'/user_files/'+file.name);
		  //upload
		  var uploadTask = storageRef.put(file);
		  $(".progressStatusSec").show();
		  // Listen for state changes, errors, and completion of the upload.
		  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
		    function(snapshot) {
		      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
		      var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
		      
		      switch (snapshot.state) {
		        case firebase.storage.TaskState.PAUSED: // or 'paused'
		          $("#uploader").attr("value",progress);
		          $(".progressStatus").html("Upload Status:"+progress+"%");
		          break;
		        case firebase.storage.TaskState.RUNNING: // or 'running'
		          $("#uploader").attr("value",progress);
		          $(".progressStatus").html("Upload Status:"+progress+"%");
		          break;
		      }
		    }, function(error) {

		    // A full list of error codes is available at
		    // https://firebase.google.com/docs/storage/web/handle-errors
		    switch (error.code) {
		      case 'storage/unauthorized':
		        // User doesn't have permission to access the object
		        break;

		      case 'storage/canceled':
		        // User canceled the upload
		        break;
		      case 'storage/unknown':
		        // Unknown error occurred, inspect error.serverResponse
		        break;
		    }
		  }, function() {
			//get metadata
			var downloadURL = uploadTask.snapshot.downloadURL;
			var metadata = uploadTask.snapshot.metadata;
			//write file metadata to database
			writeMetadata(metadata, user);
			toastInfo("Success","File uploaded successfully","success");
		  });
		  
	  });
}

function writeMetadata(metadata, user) {
	// Get a reference to the database service
	var database = firebase.database();
	
	//get ref to files
	var fileRef = firebase.database().ref('user_files/' + user.uid);
	var pushKey = fileRef.push().key;
	
	//push new file
	fileRef.child(pushKey).set({
		file_name: metadata.name,
		file_size: metadata.size,
		time_created: metadata.timeCreated,
		content_type: metadata.contentType,
		download_url: metadata.downloadURLs[0]
	});
	
	updateTable(user);
}

function updateTable(user) {
	//clear main table if already created
	if ( $.fn.DataTable.isDataTable('#fileTable') ) {
		  $('#fileTable').DataTable().destroy();
		  $('#fileTable').DataTable().clear();
		}
    
    //retrieve data
	var fileRef = firebase.database().ref('user_files/' + user.uid);
	fileRef.on('value', function(snapshot) {
		if(snapshot.val() == null) {
			$("#fileListInfo").html("<div class='alert alert-primary text-center' " +
					"style='background-color:#d9edf7;color:#31708f;padding:10px;"+
				"role='alert'>You have no files at this time</div>");
			isBusy(false);
			return false;
		}	
		$("#fileListInfo").html("");
		//get the current reports
	    var table = $('#fileTable').DataTable({
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
		       columnDefs: [
		                    { width: 250, targets: 0 },
		                    { width: 175, targets: 1 },
		                    { className: "dt-center", width: 100, targets: 2 },
		                    { className: "dt-center",width: 100, targets:3},
		                    { className: "dt-center", width:150, targets:4}
		                ],
		      fixedColumns: true
	    });
	    $("#fileTable_filter input").addClass("form-control");
		//get files snapshot
		var files = snapshot.val();
		//iterate through files
		for(var key in files) {
			if (files.hasOwnProperty(key)) {
				if(files[key].file_name != null) {
					//modify attributes for presentation layer
					var fileName = files[key].file_name.replace(/\.[^/.]+$/, "");
					var fileSize = parseInt(files[key].file_size);
					var fileSizeInMB = (fileSize / (1024*1024)).toFixed(2)
					//add each row
		    	    table.row.add([
		    	    	fileName,
		    	    	files[key].content_type,
		    	    	fileSizeInMB,
		    	    	moment(files[key].time_created).format("MM-DD-YYYY"),
		    	    	"<a href='"+files[key].download_url+"'>Download</a>"
		    	    ] ).draw();
				}
			}
		}
	});
//    
//    //listen to table row selection	
//    $('#fileTable tbody').unbind('click').on( 'click', 'tr', function () {
//		if ( $(this).hasClass('selected') ) {
//	        $(this).removeClass('selected');
//	        $("#deletePeriod").hide();
//	    }
//	    else {
//	        table.$('tr.selected').removeClass('selected');
//	        $(this).addClass('selected');
//	        $("#deletePeriod").show();
//	    }
//	});
//    
//    //remove previous selected on new page
//    $('#fileTable').on( 'page.dt', function () {
//    	$('#fileTable > tbody > tr').removeClass("selected");
//    	//$("#deletePeriod").hide();
//    } );
//	
//	$('#deletePeriod').unbind('click').click( function () {
//
//	});
}

function getUser(userId, database) {
	  var user = firebase.auth().currentUser;
	  var email, uid, emailVerified;
	  if(user != null) {
		  email = user.email;
		  emailVerified = user.emailVerified;
		  uid = user.uid;
		  return user;
	  }
}

function toastInfo(subject, message, type) {

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
	Command: toastr[type](message, subject);
}

function isBusy(load) {
	if(load) {
		$(".loading").show();
	} else {
		$(".loading").hide();
	}
}

function populateUserInfo(user) {
	//current user info
	$("#userInfo").html(user.displayName);
	if(user.photoURL) {
		$("#userInfoAvatar").attr("src", user.photoURL);
	}
}