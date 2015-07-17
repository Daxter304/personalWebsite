
function setupPage()
{
	var url = "";
	var str = "";
    

	str += "<input type='button' id='callFuncBtn' value='Call Function' /><br>";
	str += "<input type='button' id='dlgFuncBtn' value='Open dialog'/><br>";
	str += "<input type='button' id='getGroupsBtn' value='Get Groups'/><br><br>";
	
	str += "<label for='titleVal'>Title</label><br>";
	str += "<input type='text' id='titleVal'><br>";
	
	str += "<label for='descVal'>Description</label><br>";
	str += "<input type='text' id='descVal'>";
	 
    $("#main_area").append(str); 	
          
    loadDialog();
    	
	$('#callFuncBtn').click(callfunc);	 
	$('#dlgFuncBtn').click(openDlgFunc);
	$('#getGroupsBtn').click(getGroupsFunc);		
	        			 
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
                      
                $('#title').val("");
                $('#description').val("");
                
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
	var url = 'TestFunction';
	
	$("#output_area").append("calling TestFunction.......<br>");
	
    //window.location = 'TestFunction';

   
    $.ajax(
	{	
		url: url,
		success: 		  			
			function(data) 
		  	{
		  		//alert('TestFunction returned: ' + data);	
		  		        
  		       $("#output_area").append("TestFunction returned: " + data + "<br>");
		 	},
		error: 
		    function(data) 
			{						    
	   			$("#output_area").append("TestFunction failed!<br>");                    						
			} 
	});	
	
}

function openDlgFunc()
{
    var tempTitle = $('#titleVal').val();
    var tempDesc = $('#descVal').val();
    
    $('#title').val(tempTitle);
    $('#description').val(tempDesc);


    $( "#dialog-form" ).dialog( "open" );
	//alert("openDlgFunc");
}

function getGroupsFunc()
{
   var data = getGroupJson();
   var s = "";
   var i;
   $("#output_area").html(createTable(data) + "<br>");
   /*for(i = 0; i < data.length; i++)
   {	
		s = "ID = " + data[i]["id"] + " NAME = " + data[i]["name"] + " NOTE = " + data[i]["note"];
		$("#output_area").append(s + "<br>");
   }*/
}

function createTable(data)
{
	var table="";
	table += "<table>";
	table += "<tr><th>ID</th><th>Name</th><th>Note</th></tr>";
	for (x=0; x<data.length; x++)
	{
		table += "<tr>";
		table += "<td>" + data[x]["id"] + "</td>";
		table += "<td>" + data[x]["name"] + "</td>";
		table += "<td>" + data[x]["note"] + "</td>";
		table += "</tr>";
	}
	table += "</table>";
	return table;
}

function getGroupJson()
{
var obj = 
[
    {
        "id": "2",
        "name": "Open",
        "note": "Rights available to this group do not need a login"
    },
    {
        "id": "4",
        "name": "VfAdmin",
        "note": "Vectorform all rights"
    },
    {
        "id": "5",
        "name": "Campaign Manager",
        "note": "Message Campaign Manager"
    },
    {
        "id": "6",
        "name": "QA",
        "note": "Quality Assurance"
    },
    {
        "id": "7",
        "name": "Author",
        "note": "Content Creation"
    },
    {
        "id": "9",
        "name": "Legal",
        "note": "Legal Review"
    },
    {
        "id": "10",
        "name": "Tweddle",
        "note": "For Tweddle Employees"
    },
    {
        "id": "11",
        "name": "Mazda Authors",
        "note": "Users can upload content and edit metadata"
    },
    {
        "id": "12",
        "name": "Mazda Translators",
        "note": "Users who are allowed to translate Mazda content"
    },
    {
        "id": "13",
        "name": "Mazda Signoff",
        "note": "Users who are allowed final acceptance of Mazda content"
    },
    {
        "id": "14",
        "name": "Mazda Admin",
        "note": "Users allowed all Mazda workflow actions"
    },
    {
        "id": "15",
        "name": "SME",
        "note": "DTU Subject Matter Expert"
    },
    {
        "id": "16",
        "name": "Recall Manager",
        "note": "Recall Manager"
    },
    {
        "id": "17",
        "name": "Messenger Author",
        "note": "Users who create campaign content"
    },
    {
        "id": "18",
        "name": "Messenger QA",
        "note": "Users who verify campaign content and make it active"
    },
    {
        "id": "19",
        "name": "Messenger Manager",
        "note": "Users who close campaigns"
    },
    {
        "id": "20",
        "name": "Messenger Admin",
        "note": "Users go can do all messenger tasks"
    },
    {
        "id": "21",
        "name": "VfReader",
        "note": "Vectorform Read Only"
    },
    {
        "id": "22",
        "name": "ForestRiverUser",
        "note": "Forest River User"
    },
    {
        "id": "23",
        "name": "Exclude",
        "note": "Exclude group"
    },
    {
        "id": "24",
        "name": "BundleRead",
        "note": "BundleRead group"
    },
    {
        "id": "25",
        "name": "Syzygy",
        "note": "Syzygy group"
    },
    {
        "id": "26",
        "name": "ivh",
        "note": "ivh group"
    },
    {
        "id": "27",
        "name": "Exclude2",
        "note": "Exclude2 group"
    },
    {
        "id": "28",
        "name": "VectorFormExcludes",
        "note": "VectorFormExcludes group"
    },
    {
        "id": "29",
        "name": "MME",
        "note": "MME group"
    },
    {
        "id": "30",
        "name": "Test",
        "note": "Group created for testing purposes"
    },
    {
        "id": "31",
        "name": "Developer",
        "note": "Developer group"
    }
];

 return obj;
}

