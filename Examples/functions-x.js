var YouTubeVidList;


function CallUploadFunction(path, title) 
{
	$('#outputData').html("<h3> Uploading: " + title + "... please wait");
  
    var tags = "howto," + "how-to," + "electronics," + "test1," + "test2";
    
    //TRM - This function (UploadVideo) is PHP code on the server side.
    //Is there any way for me to invoke that function call without forcing
    //the window object to a new location? What if I want to return to this
    //function after the call? 
    //Would an ajax call work? I don't think it will, because the UploadVideo function
    //will sometimes have to display an account authorization page that the user will
    //need to interact with. It may even require them to login to their google account
	var url = "UploadVideo?VideoPath="+path+"&VideoTitle="+title+"&Tags="+tags;	
	window.location = url;
}

function MultipleUploadList(data) 
{
	var modelCode = $('#modelCode').val();
	var modelYear = $('#modelYear').val();
	var langCode = $('#langCode').val();
    var videoCount = data.length;   
    var content = "";
        
    if(videoCount == 0)
    {
    	content += "<h3> No videos available for this modelCode/modelYear<br></h3>";  	 
    	$("#outputData").html(content);  
    }
    else
  	{
  	    content += "<h3> Select videos to upload <br></h3>";
  	    content += "<style>.rowDisabled { color: PaleVioletRed }</style>";
        content += "<table border='1'>";
  		
  		for(i = 0; i < videoCount; i++) 
  		{	
  	    	//Example path:
  	    	//http://video.chrysler.s3.amazonaws.com/2014/EN_US/720p/tow2578.mp4	
  	    	fullVidPath = "http://video.chrysler.s3.amazonaws.com/" + modelYear + "/" + langCode.toUpperCase() + "/720p/" + data[i]["videoName"];	    

			content += "<tr>";
			var vidText = data[i]["title"] + " [" + data[i]["videoName"] + "]";
			
			content += "<td>"; 
			content += "<input type='checkbox'" + " data-vidpath='" + fullVidPath + "' data-vidtitle='" + data[i]["title"] + "' data-vidname='" + data[i]["videoName"] + "'>";	
			content += "</td>";
			content += "<td>";
			content += "<span class='rowDisabled'>" + data[i]["title"] + "[" + data[i]["videoName"] + "]" + "</span>";
			content += "</td>";
			content += "</tr>";
  		}
  	 	
  		content += "</table><br><br>";	
  		content += "<input type='button' class= 'UploadBtn' value='Upload'>";
  		
  		$("#outputData").html(content);  
		
  		$(':checkbox').each(
             function()
	         {
	            GetRemoteFileSize(this);
	         }
	     );
	         
	    //Set the function to call when Upload button is pushed
	    $('.UploadBtn').click(VidsUploadAction);	  		
  	}		  
}


//Called when the Upload button is pushed
function VidsUploadAction()
{
    var content = "";
        
    content += "<h3> Uploading the selected videos -- This may take some time <br></h3>";
    $("#outputData").html(content);
    
	selectedVids = new Array();
	
    $(':checkbox').each(
   		function()
   		{   			
   			if($(this).is(':checked') == true)
   			{  				   			
   				vid = new Object();
   				vid.vidPath = $(this).attr("data-vidpath");
   				vid.vidTitle = $(this).attr("data-vidtitle");
   				vid.vidName = $(this).attr("data-vidname");
   				//add tags here...which is another array of strings
   				selectedVids.push(vid); 							
   			}
   		}
	);
	
	content = "";
	
	//idea # 1
	//build a table with the selected videos
	//- each row will have a 'tags' button that will adjust the tags
	//- each row will hava an 'upload' button that will upload just the one video
	//- When the upload button is pushed the UploadVideo() function is called and
	//  then returns, the table row for that video should be marked as uploaded
	//- issues:
	//	- how do you return to the page with this table after UploadVideo function
	//    has been called? Because each call to UploadVideo forces a change to a
	//    new page..(i.e. The function CallUploadFunction(path, title) (above) is called
	//var url = "UploadVideo?VideoPath="+path+"&VideoTitle="+title+"&Tags="+tags;	
	//                 window.location = url;)
	//    Kevin wrote this...is this the only way to do this?

	//idea #2
	//Somehow pass the entire array of selectedVids objects to a 'BatchVideoUpload' function
	//and then on the server side have it iterate through uploading each individual video in 
	//the list
	//- issues:
	//  - How do I pass the array of objects (in JS) to the PHP function BatchVideoUpload()?
	//    How do I re-create the video objects on the other side?

}

function GetRemoteFileSize(item)
{ 
   var url = $(item).attr('data-vidpath');

	$.ajax(
	{
		url: 'getRemoteSize?url=' + url,
		success: 
		  function(data) 
		  {
			var l = parseInt(data);
			if(parseInt(l) > 0) 
			{
			   var spanItem = $(item).parent().next().children('span');
			   $(spanItem).removeClass('rowDisabled');
			   item.disabled = false;
			} 
			else
			{ 
			  var spanItem = $(item).parent().next().children('span');
			  var spanText = $(spanItem).html();
			  
			  $(spanItem).html("<b>" + spanText + " Missing</b>");  
			  item.disabled = true;
			}
		  },
		error: function() 
		{
			alert("ERROR!!!");
		} 
	});	
}


function SingleUploadList(data) 
{
	var modelCode = $('#modelCode').val();
	var modelYear = $('#modelYear').val();
	var langCode = $('#langCode').val();
    var videoCount = data.length; 
    //var langCode = "en_us";     
    var content = "";
        
    if(videoCount == 0)
    {
    	content += "No videos available for this modelCode/modelYear<br>";  	   
    }
   
  	if(videoCount > 0)
  	{
  	    content += "<h3>Select videos to upload<br></h3>";
  	    
        content += "<table border='1'>";
  		content += "<tr><th>Video</th></tr>";
  		
  		for(i = 0; i < videoCount; i++) 
  		{	
  	    	//Example path:
  	    	//http://video.chrysler.s3.amazonaws.com/2014/EN_US/720p/tow2578.mp4	
  	    	fullVidPath = "http://video.chrysler.s3.amazonaws.com/" + modelYear + "/" + langCode.toUpperCase() + "/720p/" + data[i]["videoName"];	    
  	        content += "<tr>";
  	        //content += "<td><div' class='videoItem' data-fullvidpath='" + fullVidPath +"'> " + data[i]["title"] + " " + data[i]["videoName"] + "</td>"; 
   		    content += "<td><div class='myclass'" + " href='" + fullVidPath + "'>" + data[i]["title"] + "   [" + data[i]["videoName"] + "]" + "</div></td>";	 		   
  		    content += "</tr>";
  		}
  	 	
  		content += "</table>";	
  		//content += "<input type='submit' class='uploadBtn' value='Upload' />";

  	}	
  	
	$("#outputData").html(content);
	
		
	$('.myclass').each(
	   function()
	   {
		var url = $(this).attr('href');
		//var url = $(this).attr('data-vidpath');
		handleRemoteSize(url, $(this));
	   }
	   );   
}


function handleRemoteSize(url, elem)
{
	$.ajax({
		url: 'getRemoteSize?url=' + url,
		success: function(data) {
			var l = parseInt(data);
			if(parseInt(l) > 0) {
				elem.click(function(e) {
					var path = $(this).attr('href');
					var title = $(this).text();
					CallUploadFunction(path, title);
				}).css('cursor', 'pointer');
			} else {
				elem.css('color', 'red');
			}
		},
		error: function() {
				elem.css('color', 'red');
		} 
	});
}


function setupPage()
{
	var url = "";
	var str = "";
    
    //****  select_area div ******         
    //Model Year select 
 	str = "Year <select id='modelYear' name='modelYear'>";
	str += "<option val='2014'>2014</option>\n";
    str += "<option val='2015'>2015</option>\n";
	str += "<option val='2016'>2016</option>\n";
	str += "</select>";
	$("#select_area").append(str);               
     
    //Brand select           
    str = "Brand: <select id='brand' name='brand'>";
	str += "<option val='Fiat'>Fiat</option>\n";
    str += "<option val='Dodge'>Dodge</option>\n";
	str += "<option val='Chrysler'>Chrysler</option>\n";
	str += "<option val='Jeep'>Jeep</option>\n";
	str += "<option val='Abarth'>Abarth</option>\n"
	str += "</select>";
	$("#select_area").append(str);   
       
    //Model Code select                    
    str = "Model Code: <select id='modelCode' name='modelCode'>";
  	str += "</select>";
    $("#select_area").append(str);
    
    //Language select
  	str = "Language: <select id='langCode' name='langCode'>";
  	str += "<option val='EN_US'>EN_US</option>";
  	str += "<option val='ES_MX'>ES_MX</option>";
  	str += "<option val='FR_CA'>FR_CA</option>";
  	 	
    //Get Video List button
  	str += "<input type='button' id='getVidListBtn' value='Get Video List' />";
  	 
  	$("#select_area").append(str); 	      
    
	//****** auth_area div ***************************
    str = "<input type='button' id='authBtn' value='Authorize'>";
    str += "<input type='button' id='clearAuthBtn' value='Clear'>";
    str += "<input type='button' id='checkAuthBtn' value='Check'>";
    //str += "<input type='button' id='getYTListBtn' value='Get YT List'>";
    str += "<br>"
    $("#auth_area").html(str);
 	$('#authBtn').click(Authorize);
 	$('#clearAuthBtn').click(ClearAuth);
 	$('#checkAuthBtn').click(CheckAuth);
 	//$('#getYTListBtn').click(GetYTList); 	
 	
 	url = 'ReadChryslerModelCodes';
 			
    $.ajax(
	{	
		url: url,
			success: 		  			
		  		function(data) 
		  		{
		  	  	  var i;
		  		  var str = "";
		  					  
		  		  for(i = 0; i < data.length; i++)
		  		  {
		  		  	$("#modelCode").append("<option value='" + data[i].modelCode + "'>" + data[i].modelCode + "</option");
		  		  }		  					  					                                                  
		 	     },
				 error: 
					function(data) 
					{						    
				   	 //$("#output_area").append("getChryslerModelCodes() failed!");                    						
					} 
	});	
	  
	$('#getVidListBtn').click(getVidListClick);	
	
	GetYouTubeUUIDList(); 			 
}  

function getVidList()
{
	var url = 'GetChryslerVideoListWithTags?';
	var Brand = $('#brand').val();
	var modelYear = $('#modelYear').val(); 
	var modelCode = $('#modelCode').val(); 
	var langCode = $('#langCode').val();
	
	url += "&Brand=" + Brand;
	url += "&modelYear=" + modelYear;
	url += "&modelCode=" + modelCode;
	url += "&langCode=" + langCode;
	
	$("#table_output_area").html("Building video list.......");
	
    $.ajax(
	{	
		url: url,
			success: 		  			
		  		function(data) 
		  		{
		  			buildVideoTable(data);		  		
		 	    },
			error: 
			    function(data) 
				{						    
	   		   	    //$("#output_area").append("getChryslerModelCodes() failed!");                    						
				} 
	});	
}


function getVidListClick()
{
    Authorize(); //authorize eventually calls buildVideoTable() after auth is completed
}

function buildVideoTable(data)
{
	var i;
	var j;
	var str = "";
	var vidPathName = "";
	var tmp;

    if(data.length == 0)
    {
    	$("#table_output_area").html("No videos found!");
    	return;   
    }
    
    $("#table_output_area").html("");
   
    //build the modal dialog form for editing video fields
    str = "<form>";
    str += "<div id='dialog_text'></div>";
	str += "<fieldset>";
	str += "<label for='title'>Title</label>";
	str += "<input type='text' name='title' id='title' value='' class='text ui-widget-content ui-corner-all' data-pathx=''>";
	str += "<label for='description'>Description</label>";
	str += "<input type='text' name='description' id='description' value='' class='text ui-widget-content ui-corner-all'>";
	str += "<label for='tags'>Tags</label>";
	str += "<input type='text' name='tags' id='tags' value='' class='text ui-widget-content ui-corner-all'>";				
	str += "</fieldset>";	
	str += "</form>";
    $("#dialog-form").html(str);
    
    //associate the dialog form with jquery dialog object 
    $( "#dialog-form" ).dialog(
    {
    	autoOpen: false,
    	height: 400,
    	width: 350,
        modal: true,
        buttons: 
    	{
        	"Update fields": function()
        	{
           		//validate the fields
                var title = $("#title").val();
                var desc = $("#description").val();
                var tags = $("#tags").val();             
                var pathx = $("#title").attr("data-pathx");
                  
                $('[data-pathx="'+ pathx +'"]').find(".vid_title").text(title);
                $('[data-pathx="'+ pathx +'"]').find(".vid_desc").text(desc);
                $('[data-pathx="'+ pathx +'"]').find(".vid_tags").text(tags);   
                
                saveSession();                   		
     
    	        $( this ).dialog( "close" );       
        	},              
        	Cancel: function()
        	{
           		$( this ).dialog( "close" );
        	}
        	},
        	close: function() 
        	{                 
        	}
     });	   

    str = "<br><input type='button' id='uploadVidsBtn' value='Upload Videos'/>";
    str += "<input type='button' id='clearSelectedVidsBtn' value='Clear selected'/>";
    str += "<input type='button' id='selectAllVidsBtn' value='Select All'/>";
    //str += "<input type='button' id='loadSavedSessionBtn' value='Load saved session'/>"; 
    //str += "<input type='button' id='saveSessionBtn' value='Save current session'/>";
    str += "<table id='video_table' border='1'>";	
	str += "<tr >";
	str += "<th>Upload</th>";
	str += "<th>Video Title</th>";
	str += "<th>Description</th>"
	str += "<th>File Name</th>";
	str += "<th>Tags</th>";
	str += "<th>UUID</th>";
	str += "<th>Upload Status</th>";
	str += "<th></th>"; //edit button
	str += "<th></th>"; //Play button
	str += "</tr>";		
			
	for(i = 0; i < data.length; i++)
    {
       vidPathName = data[i].location + "/" + data[i].videoName;    
       str += "<tr class='video_item' data-pathx='"+ vidPathName.replace("http://", "") + "' data-fname='" + data[i].videoName + "'>";
       
       if(data[i].present == "true") //file wasn't on the server
       	str += "<td><input type='checkbox' class='uploadchkbox' name='uploadcheckbox'></td>";
       else
        str += "<td><input type='checkbox' class='uploadchkbox' name='uploadcheckbox' hidden='true' disabled='true'></td>";
       
       str += "<td class='vid_title'>" + data[i].title + "</td>";   
       str += "<td class='vid_desc'>" + "Enter a description" + "</td>";
       str += "<td class='vid_name' data-path='" + vidPathName + "'>" + data[i].videoName + "</td>"; 
       tmp = "";
       for(j = 0; j < data[i].tags.length; j++)
       {
       		tmp += data[i].tags[j] + " ";
       }
    
       str += "<td class='vid_tags'>" + tmp + "</td>";  
       str += "<td class='UUID'>" + "    " + "</td>";
      
       if(data[i].present == "true") 
       {
       	str += "<td class='vid_status'>" + " " + "</td>";
       	str += "<td><input type='button' class='editVideoBtn' data-path='" + vidPathName + "'value='Edit'/></td>";
       	str += "<td><input type='button' class='playVideoBtn' data-path='" + vidPathName + "' value='Play'/></td>";
       }
       else
       {
        str += "<td class='not_found'>" + "Not found on server" + "</td>";
        str += "<td></td>";
        str += "<td></td>";
       }   
      	 
       str += "</tr>";    
	}	
	
	str += "</table>";
	
	$("#table_area").html(str);		
	
	
	FindPreviousUploads();
	
	loadSavedSession();
	
	$('#clearSelectedVidsBtn').click(clearSelectedVids);	
	$('#selectAllVidsBtn').click(selectAllVids);
	$('#uploadVidsBtn').click(uploadVideos);  
	$('.editVideoBtn').click(editVideo);		         
	$('.playVideoBtn').click(playVideo);     
	//$('#loadSavedSessionBtn').click(loadSavedSession);
	//$('#saveSessionBtn').click(saveSession);    	                      
}



function FindPreviousUploads()
{
	//loop through each item in the video table and look-up each to find a previous upload record 
	//grab the uuid for each match and write it to the uuid column

	var brand = $('#brand').val();
	var modelYear = $('#modelYear').val(); 
	var modelCode = $('#modelCode').val(); 
	var langCode = $('#langCode').val();

	$(".video_item").each(
    	function()
		{       
	 		var url = "FindChryslerVideoUpload?";	
	 		var fname = $(this).find(".vid_name").text();
	 		
	 		url += "Brand=" + brand + "&";
	 		url += "modelYear=" + modelYear + "&";
	 		url += "modelCode=" + modelCode + "&";
	 		url += "langCode=" + langCode + "&";
	 		url += "filename=" + fname;
/* 		
[
    {
        "id": "25",
        "brand": "Fiat",
        "year": "2014",
        "model": "500",
        "language": "EN_US",
        "uuid": "U1eKT0e2MFA",
        "filename": "5002740.mp4",
        "date": "Wed Aug 13 2014 11:31:40 GMT-0400 (EDT)"
    }
]
*/
	 			 		
    		$.ajax(
    		{
				url: url,
				success: 	  			
  					function(data) 
		  			{                     
				       //if the data object comes back as an array of > 0, then this 
				       //video has a record of upload for this brand/year/model/lang...
				       var tr;
				       var i;
	                  
	                   tr = $('[data-fname="'+ fname + '"]');
				   
				       if(data.length > 0)
				       {	
				       		//tr = $('[data-fname="'+ data[0]["filename"] + '"]');
				       		tr.find(".UUID").text(data[0]["uuid"]);     
				       		
				       		for(i = 0; i < YouTubeVidList.length; i++)
				       		{
				       			if(YouTubeVidList[i].uuid == data[0]["uuid"])
				       			{
				       				tr.find(".vid_status").text("Uploaded to YouTube");
				       				//tr.find(".editVideoBtn").attr("disabled", true);
				       				tr.find(".editVideoBtn").remove();				       				
				       				break;
				       			}				             
				       		}	      		      				       			       
				       }			       
		 			},
			    	error: function() 
			    	{
				 	  alert("ERROR!!!");
			    	} 
			});	 
			   	     	   	          		        			    
		} 
	);	
}


function GetYouTubeUUIDList()
{
	var url = "GetYouTubeVideoList";
	
    $.ajax(
    {
		url: url,
		success: 	  			
  			function(data) 
		  	{         	            
				YouTubeVidList = data;
		 	},
			error: function() 
			{
				//alert("ERROR in GetYouTubeUUIDList!");
			} 
	});	 

}


function editVideo()
{
   var item = $(this).parent().parent();
   var desc = item.find(".vid_desc").text();
   var title = item.find(".vid_title").text();
   var tags = item.find(".vid_tags").text();
   var pathx = item.attr('data-pathx');
   var filename = item.find(".vid_name").text();
  
   $("#dialog_text").text(filename);
   $("#title").val(title);
   $("#title").attr("data-pathx", pathx);
   $("#description").val(desc);
   $("#tags").val(tags);
  
   $( "#dialog-form" ).dialog( "open" );
   
   //saveSession();
}

function playVideo()
{
	var VidPathName = $(this).attr('data-path');
	window.open(VidPathName, "_newtab");
}

function uploadVideos()
{
	var VidCount = 0;
	var CheckedVidCount = 0;
	var text = "";
	var VidTitle;
	var VidDesc;
	var VidPath;
	var VidTags;
	var url;
	var modelYear = $('#modelYear').val(); 
	var modelCode = $('#modelCode').val(); 
	var langCode = $('#langCode').val();
	var type;
	var vidArray = Array();
	var i;
	var sendNextOne;
			
	$(".video_item").each(
		function()
		{   	   
		   var checkbox;
		   var uploadComplete = false;
	
		   VidCount++;
	          
	       checkbox = $(this).find(".uploadchkbox");
	                 
	       if(checkbox.prop("checked") == false)
	       {
		   		return;
		   }

		          		
	       CheckedVidCount++;
           
           VidTitle = $(this).find(".vid_title").html();
           VidDesc = $(this).find(".vid_desc").html();
           VidPath = $(this).find(".vid_name").attr("data-path");  
           VidTags = $(this).find(".vid_tags").html();
                    
		   var video = new Object();
		   var tmpTag;
			
		   video.path = VidPath;
		   video.title = VidTitle;   
		   video.description = VidDesc; 
		   video.categoryID = "22";
		   video.status = "private";	   
		   video.tags = VidTags.split(" ");	  
		   video.tags.pop();//why is there a blank tag at the end??
		   
		   for(var i = 0; i < video.tags.length; i++)
		   {
		    	tmpTag = video.tags[i];		    	
		    	video.tags[i] = tmpTag.replace(/_/g, " ");   	
		   }
			  
     	   vidArray.push(video);
			    	   	          		        			    
		} 
	);	
		
	sendNextOne = function()
    {
		if(vidArray.length == 0)
		{
			//list is done, exit this chain
			//$("#table_output_area").append("sendNextOne() video array is empty <br>");
			return;
		}
		
		var statusName;
		var videoObj = vidArray.shift();
		var tmpTitle = videoObj.title;	
		var vidItem;
		var StatusItem;
		var str;
		var tmp;
		
		videoObj.title = encodeURIComponent(tmpTitle);
		
		//var url = "http://idndev.tweddle.com/videoupload/UploadYouTubeVideo?VideoString=" + JSON.stringify(videoObj);	  
		var url = "UploadYouTubeVideo?VideoString=" + JSON.stringify(videoObj);	
		
		//Find the row object and write 'uploading' to the status column		
		tmp = videoObj.path.replace("http://", "");
		//$('table_output_area').append("new str = " + tmp + "<br>");
        
        $('[data-pathx="'+ tmp +'"]').find(".vid_status").html('UPLOADING');
		
	    	
		//$("#table_output_area").append("sendNextOne() path: " + videoObj.path + " title: " + videoObj.title + "<br>");
        
		$.ajax(
	    {	
				url: url,
				success: 		  			
		  			  function(data) 
		  			  {                   
                            var VideoPath = data["VideoPath"];                           
        					var returnValue = data["returnValue"]; 
                            var description = data["description"];
                            var uploadID = data["uploadID"];
                            var uploadStatus = data["uploadStatus"];
                            var vidID;
                            var fname;
                          
                            vidID = VideoPath.replace("http://", "");
                            $('[data-pathx="'+ vidID +'"]').find(".vid_status").text('Uploaded to YouTube');
                            $('[data-pathx="'+ vidID +'"]').find(".editVideoBtn").remove();
                            $('[data-pathx="'+ vidID +'"]').find(".UUID").text(uploadID);
                            fname = $('[data-pathx="'+ vidID +'"]').find(".vid_name").text();
                            
                            //$('.upload_status[data-vidname="' + VideoPath + '"]').html("COMPLETED");   
                           
                            //$("#table_output_area").append("* success * VideoPath= " + data["VideoPath"] + 
                            //           " uploadStatus = " + uploadStatus + 
                            //           " returnValue = " + returnValue + 
                            //           " description = " + description +
                            //           " uploadID = " + uploadID + "<br><br>");
                            
                            //Log this upload to the IDN DB
                            var log_url = "StoreChryslerVideoUploadItem?";
                            //var log_url = "http://idndev.tweddle.com/videoupload/StoreChryslerVideoUploadItem?";
                                                                                   
                            log_url += "Brand=" + $('#brand').val() + "&";
                            log_url += "modelYear=" + modelYear + "&";
                            log_url += "modelCode=" + modelCode + "&";
                            log_url += "langCode=" + langCode + "&";
                            log_url += "uuid=" + uploadID + "&";
                            log_url += "filename=" + fname + "&";                        
                            log_url += "date=" + Date();
   
                            //alert("Storing: " + log_url);
   
                            $.ajax(
                            {
                            	url : log_url,
                            	success:
                            		function(data)
                            		{
                            		
                            		},
                            	error: 
                            		function(data)
                            		{
                            			alert("Logging ERROR! " + data);          		
                            		}                   	                          
                            });
           
                            sendNextOne();
                             
		 			  },
					  error: 
						function(data) 
					    {						    	
  		                    $("#table_output_area").append("* success * VideoPath= " + data["VideoPath"] + 
                                       " uploadStatus = " + uploadStatus + 
                                       " returnValue = " + returnValue + 
                                       " description = " + description +
                                       " uploadID = " + uploadID + "<br><br>");
		  				    sendNextOne();			                    						
					    } 
		});		  	
    }
    
    sendNextOne(); //start the sequence of uploads

	//$("#table_output_area").append("VidCount = " + VidCount + "<br>");
	//$("#table_output_area").append("checked count = " + CheckedVidCount);
}

function clearSelectedVids()
{
    $(":checkbox").each(
   		function()
   		{   			 				
   			$(this).prop("checked", false);  				
   		}
	);
}

function selectAllVids()
{
    $(':checkbox').each(
   		function()
   		{   			  			
   			$(this).prop("checked", true);  		
   		}
	);
}

function loadSavedSession()
{
	//alert("loadSavedSession()");
	var brand = $('#brand').val();
	var modelYear = $('#modelYear').val(); 
	var modelCode = $('#modelCode').val(); 
	var langCode = $('#langCode').val();
	
	
	var url = "GetChryslerUploadSession";	
  
    $.ajax(
    {
        type: "POST",
		url: url,
		data:
		{
		  Brand:  brand,
	      modelYear: modelYear,
	      modelCode: modelCode,
	      langCode: langCode,
		},
		success: 	  			
  			function(data) 
		  	{                    
		  	    var outStr;
		  	    var vidArray = Array();
		  	    var i;
		  	    var j;
		  	    var vidArr = JSON.parse(data[0]['video_array']);
		  	    var tr;
		  	    var tagArr;
		  	    var tagStr = "";
		  	    var VidTitle;
		  	   	  	   
		  	    //outStr =  data[0]['brand'] + " ";
		  	    //outStr += data[0]['year'] + " ";
		  	    //outStr += data[0]['model'] + " ";  
		  	    //outStr += data[0]['language'] + "<br>";    
		  	    //outStr += "vid count = " + vidArr.length + " ";
		  	    		  	 
		  	    //for(i = 0; i < vidArr.length; i++)
		  	    //{
		  	    //	outStr += vidArr[i]['videoName'] + "<br>";   	
		  	    //}
		  	  			
				//alert("success: ");
				//$("#debug_area").append(outStr);
				
				for(i = 0; i < vidArr.length; i++)
				{
				  //I have the videoName...find the table item and update the fields 		
            
                  
                  tr = $('[data-fname="'+ vidArr[i]['videoName'] + '"]');
                  //need to check ensure the video was found...
                  //if(tr == null) //is this the
                  //{
                  //
                  //}
                  
                  //maybe html encode?
                  tr.find(".vid_title").text(vidArr[i]['title']);	
                  tr.find(".vid_desc").text(vidArr[i]['description']);
              
                  tagArr = vidArr[i]['tags'];
                  tagStr = "";
                  for(j = 0; j < tagArr.length; j++)
                  {
                    if(j > 0)
                      tagStr += " ";
                  	tagStr += tagArr[j];
                  }
                                
                  tr.find(".vid_tags").text(tagStr);            
				}
				
				
				
				
				
		 	},
			error: function() 
			{
				alert("ERROR!!!");
			} 
	});		

}


/*
 [
    {
        "videoName": "cuf3013.mp4",
        "title": "INTRODUCTION",
        "description": "Description",
        "tags": [
            "howto",
            "how-to",
            "2015",
            "Chrysler_200",
            "en-us"
        ]
    },
    {
        "videoName": "cuf3014.mp4",
        "title": "KEY FOB",
        "description": "How to use the Key Fob",
        "tags": [
            "howto",
            "how-to",
            "2015",
            "Chrysler_200",
            "en-us"
        ]
    }
]
*/


function saveSession()
{
	//alert("saveSession()");
	var brand = $('#brand').val();
	var modelYear = $('#modelYear').val(); 
	var modelCode = $('#modelCode').val(); 
	var langCode = $('#langCode').val();
	var i;
	var j;
	var vidArray = Array();
	var JsonArray;


	//iterate through the table of videos and build the object
	$(".video_item").each(
		function()
		{                 
		   VidTitle = $(this).find(".vid_title").text();
		   //alert("VidTitle = " + VidTitle);
		   
           VidDesc = $(this).find(".vid_desc").text();
           VidPath = $(this).find(".vid_name").attr("data-path");
           VidFname = $(this).find(".vid_name").text();
           VidTags = $(this).find(".vid_tags").text();
                       
		   var video = new Object();	
		   video.videoName = VidFname;
		   video.title = VidTitle;
		   video.description = VidDesc; 
		   video.tags = VidTags.split(" ");			     
		   vidArray.push(video);
			    	   	          		        			    
		} 
	);	
    
    JsonArray = JSON.stringify(vidArray);
    
    //$("#debug_area").text(JsonArray);	

    
    
    
	var url = "StoreChryslerVideoUploadSession";	
  
    $.ajax(
    {
        type: "POST",
		url: url,
		data:
		{
		  Brand:  brand,
	      modelYear: modelYear,
	      modelCode: modelCode,
	      langCode: langCode,
		  vidArr: JsonArray,
		  overwrite: true
		},
		success: 	  			
  			function(data) 
		  	{  
		  	  //$("#debug_area").text(data);	              
				//alert("success: " + data);
		 	},
			error: function() 
			{
				alert("ERROR!!!");
			} 
	});		

}

function Authorize()
{
	//alert("Authorize()");

	var url = "GetAppAuthFromGoogle";			            	
  
    $.ajax(
    {
		url: url,
			success: 	  			
  				function(data) 
		  		{                     
				   //alert("Success: " + data["MustAuth"] + "\n" + data["AuthURL"]);
				   var url = data["AuthURL"];
		  				   
		  		   if(data["MustAuth"] == "true")
		  		   {
				   		//$("#auth_output_area").html("opening new tab for authorization<br>");
				   		alert("Opening a new tab for authorization");
		  				$("#auth_output_area").html("");
		  				window.open(url, "_newtab");
		  		   }
		  		   else
		  		   {
		  			    //$("#auth_output_area").html("Already authorized");
		  			    getVidList();
		  		   }

                   GetYouTubeUUIDList();
		 		 },
			     error: function() 
			     {
				   		alert("ERROR!!!");
				   		return false;
				 } 
	});	    

}

function ClearAuth()
{
	var url = "UnsetToken";			            	
  
    $.ajax(
    {
    	url: url,
			success: 	  					  	    
		  	   function(data) 
		  		{                     
		  			//$("#auth_output_area").html("Authorization token cleared");		  			
		 	    },
				error: function() 
				{
					alert("ERROR!!!");
				} 
	});	           	         	
}

function CheckAuth()
{
	var url = "IsGoogleAuthorized";			            	
  
    $.ajax(
    {
		url: url,
			success: 	  			
		  		function(data) 
		  		{                     
			   		$("#auth_output_area").html("Authorized = " + data.Authorized + "<br>");		  			
		 	    },
				error: function() 
				{
					alert("ERROR!!!");
				} 
	});	           	         	
}

/*
[
    {
        "title": "EVIC CONTROLS/INSTRUMENT CLUSTER",
        "description": "Enter a description",
        "uuid": "Q66nQ3rb25s"
    },
    {
        "title": "BLUE&ME™ - PAIRING YOUR PHONE",
        "description": "Enter a description",
        "uuid": "yel3_VkNaac"
    },
    {
        "title": "INTRODUCTION",
        "description": "Enter a description",
        "uuid": "U1eKT0e2MFA"
    },
    {
        "title": "20131015 153419",
        "description": "",
        "uuid": "Rd-bClbu3es"
    }
]
*/


function GetYTList()
{
	var s = "";
	var i;
		  		   
    for(i = 0; i < YouTubeVidList.length; i++)
	{
		s += "title: " + YouTubeVidList[i]["title"] + "<br>";
		s += "description:" + YouTubeVidList[i]["description"] + "<br>";
		s += "uuid: " + YouTubeVidList[i]["uuid"] + "<br>";
		s += "<br>";  		    
	}
		  		                 
    $("#debug_area").html(s);	


/*
	var url = "GetYouTubeVideoList";

	$.ajax(
    {
		url: url,
			success: 	  			
		  		function(data) 
		  		{    
		  		    var s = "";
		  		    var i;
		  		   
		  		    for(i = 0; i < data.length; i++)
		  		    {
		  		    	s += "title: " + data[i]["title"] + "<br>";
		  		    	s += "description:" + data[i]["description"] + "<br>";
		  		    	s += "uuid: " + data[i]["uuid"] + "<br>";
		  		    	s += "<br>";  		    
		  		    }
		  		                 
			   		$("#debug_area").html(s);		  			
		 	    },
				error: function() 
				{
					alert("ERROR!!!");
				} 
	});	     
	
	
*/
}

  







