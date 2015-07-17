
function setupPage()
{
	var url = "";
	var str = "";
    

	str += "<input type='button' id='callFuncBtn' value='Call Function' /><br>";
	str += "<input type='button' id='dlgFuncBtn' value='Open dialog'/><br><br>";
	
	str += "<label for='titleVal'>Title</label><br>";
	str += "<input type='text' id='titleVal'><br>";
	
	str += "<label for='descVal'>Description</label><br>";
	str += "<input type='text' id='descVal'>";
	 
    $("#main_area").append(str); 	
          
    loadDialog();
    	
	$('#callFuncBtn').click(callfunc);	 
	$('#dlgFuncBtn').click(openDlgFunc);	        			 
}  

function loadDialog()
{
    //build the modal dialog form for editing video fields
    str = "<form>";
    str += "<div id='dialog_text'></div>";
	str += "<fieldset>";
	str += "<label for='title'>Title</label><br>";
	str += "<input type='text' name='title' id='title' class='text ui-widget-content ui-corner-all' data-pathx=''><br>";
	str += "<br><label for='description'>Description</label><br>";
	str += "<input type='text' name='description' id='description' class='text ui-widget-content ui-corner-all'><br>";			
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
        	    //Get the data out of the forms fields
                var title = $("#title").val();
                var desc = $("#description").val();    
                
                //alert(title + desc);
                  
                //Write the data from the dialog to the form
                $('#titleVal').val(title);
                $('#descVal').val(desc);
                 
                //uncomment these to clear the input fields on 
                //the dialog box just before close.  
               //$('#title').val("");
                //$('#description').val("");
                
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
}

function callfunc()
{
	$("#output_area").append("<br>Button pushed!");
}

//Example ajax call using jquery....requires calling into the local IDN instance
/*
function callfunc()
{
	var url = 'TestFunction';
	
	$("#output_area").html("calling TestFunction.......");
	
    $.ajax(
	{	
		url: url,
		success: 		  			
			function(data) 
		  	{
		  		//alert('TestFunction returned: ' + data);	
  		        $("#output_area").append("<br>TestFunction returned: " + data);
		 	},
		error: 
		    function(data) 
			{						    
	   			$("#output_area").append("<br>TestFunction failed!");                    						
			} 
	});	
}
*/

function openDlgFunc()
{
    $( "#dialog-form" ).dialog( "open" );
	//alert("openDlgFunc");
}

