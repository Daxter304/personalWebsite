function setupPage()
{
	var dropdownMenu = "";
	var content = "";
	var menuHeader = "";
	var footer = "";
	var toggle = false;

	//Create menu
	//menuHeader += "<li><a id='Btn'><label></label></a></li>";
	menuHeader = "<ul>";
	menuHeader += "<li><a id='createTableBtn'><label>Create Table</label></a></li>";
	menuHeader += "<li><a id='createMyDlgBtn'><label>My Dialog Box</label></a></li>";
	menuHeader += "<li><a id='createImageBtn'><label>Load Image</label></a></li>";
	menuHeader += "<li><a id='createDlgBtn'><label>Tracy's Dialog Box</label></a></li>";
	menuHeader += "<li><a id='clearPageBtn'><label>Clear Page</label></a></li>";
	menuHeader += "<li><a id='viewPageCSSBtn'><label>View Page CSS</label></a></li>";
	menuHeader += "</ul>";

	footer = "<Label>Change Background</label><br>";
	footer += "<button id='background1' class='astext'>Background 1</button>";
	footer += "<button id='background2' class='astext'>Background 2</button>";
	footer += "<button id='background3' class='astext'>Background 3</button>";
	
	//$("#menuHeader").append("<ul>");
	$("#menuHeader").append(menuHeader);
	$("#dropdownMenu").append(dropdownMenu);
	$("#content").append(content);
	$("#footer").append(footer);

	loadMyDialog();
	loadDialog();
	loadPicDialog();
	
	//Listen for click events in the menu
	$('#createTableBtn').click(createTable);
	$('#createDlgBtn').click(openDlgFunc);
	$('#createMyDlgBtn').click(openMyDlg);
	$('#createImageBtn').click(openPicDlg);
	$('#clearPageBtn').click(clearContentDiv);
	$('#viewPageCSSBtn').click(viewPageCSS);
	$(document.body).on('click', '#createAlertBtn', createAlertBox);//Listens for click events anywhere
	$(document.body).on('click', '#background1', function() {$(document.body).css('background', "url('background01.jpg') no-repeat center center fixed");$(document.body).css('background-size', "cover")});
	$(document.body).on('click', '#background2', function() {$(document.body).css('background', "url('background02.jpg') no-repeat center center fixed");$(document.body).css('background-size', "cover")});
	$(document.body).on('click', '#background3', function() {$(document.body).css('background', "url('background03.jpg') no-repeat center center fixed");$(document.body).css('background-size', "cover")});
	/*$(document.body).on('click', '#background1', function() {document.body.style.background = "url('background01.jpg')";});
	$(document.body).on('click', '#background2', function() {document.body.style.background = "url('background02.jpg')";});
	$(document.body).on('click', '#background3', function() {document.body.style.background = "url('background03.jpg')";});*/
	/*$(document.body).on('click', '#changeBkgBtn', function() {
	    if(toggle===false) {
	        document.body.style.background = "url('background02.jpg')";
	        toggle = true;
	    }
	    else {
	        document.body.style.background = "url('background01.jpg')";
	        toggle = false;
	    }
	});*/
}

function viewPageCSS()
{
	window.open('/css.html', '_newtab');
}

function clearContentDiv()
{
	$("#content").html("");
}

function createTable()
{
	var data = getFakeJson();
	
	var table="";
	table += "<table>";
	table += "<tr><th>ID</th><th>Name</th><th>Note</th><th>Web Pages</th></tr>";
	for (x=0; x<data.length; x++)
	{
		table += "<tr>";
		//table += "<td id='row" + (x+1) + "'>" + data[x]["id"] + "</td>";
		table += "<td id='one'>" + data[x]["id"] + "</td>";
		table += "<td id='two'>" + data[x]["name"] + "</td>";
		table += "<td id='three'>" + data[x]["note"] + "</td>";
		table += "<td id='four'>" + createAlertButtons(x) + "</td>";
		table += "</tr>";
	}
	table += "</table>";
	$("#content").html(table + "<br>");
}

function createAlertButtons(rowNum)
{
	var button="";
	button += "<input type='button' class='alertButton' id='createAlertBtn' value='Row Number " + rowNum + "'/>";//value='Create Alert'/>";
	return button;
}

function createAlertBox()
{
	//window.alert($(#createAlertBtn).value());
	window.alert("This is an alert box");
}

function addImage()
{
	var str = "";
	var imageObj = $('#image');
	//dump(imageObj);
	//if (imageObj==undefined)
	{
		str += "<a href='https://i.imgur.com/B9SnqJa.jpg' target='_newtab'><img id='image' src='starWars.jpg' height='612' width='816'></a><br>";
		$("#content").html(str);
	}
}

function openPicDlg()
{
	$('#pictureDialog').dialog('open');
}

function loadPicDialog()
{
	//var currentdate = new Date();
	var str = "<form>";
    str += "<div id='pictureDialog'></div>";
	str += "<fieldset>";
	str += "<label>Which pictures do you want to load?</label><br><br>";
	for (x=0; x<3 ; x++)
	{
		str += "<input type='checkbox' id='" + x + "'>Image #" + (x+1) + "<br>";
	}
	str += "</fieldset>";
	str += "</form>";
    $("#pictureDialog").html(str);
	
	$( "#pictureDialog" ).dialog(
    {
    	autoOpen: false,
    	height: 375,
    	width: 350,
        modal: true,
        buttons:
    	{
			
			"Load Image": function()
			{
				str="";

				for (x=0; x<3 ; x++)
				{

					if (document.getElementById(x).checked == true)
					{
						str += "<img src='" + x + ".jpg' id='img" + x + "'><br>";
					}
				}
				clearContentDiv();
				$("#content").html(str);
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

function openMyDlg()
{
	clearContentDiv();
	$('#myDialog').dialog('open');
}

function loadMyDialog()
{
	var currentdate = new Date();
	var str = "<form>";
    str += "<div id='myDialog'></div>";
	str += "<fieldset>";
	//tr += "<label>The Current Time is " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds() + "</label><br>";
	str += "<a href='http://www.tweddle.com/' target='_newtab'><img id='myDialog' src='tweddleLogo.jpg'></a><br>";
	str += "</fieldset>";
	str += "<fieldset>";
	str += "<label for='alert'>Alert Text</label><br>";
	str += "<input type='text' name='alert' id='alert' class='text ui-widget-content ui-corner-all' data-pathx=''><br>";
	str += "</fieldset>";
	str += "</form>";
    $("#myDialog").html(str);
	
	$( "#myDialog" ).dialog(
    {
    	autoOpen: false,
    	height: 375,
    	width: 350,
        modal: true,
        buttons:
    	{
			
			"Create Alert": function()
			{
				var input=$("#alert").val();
				window.alert(input);
				$(this).dialog("close");
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

function dump(obj) {
    var out = '';
    for (var i in obj) {
        out += i + ": " + obj[i] + "\n";
    }

    alert(out);

    // or, if you wanted to avoid alerts...
	/*
    var pre = document.createElement('pre');
    pre.innerHTML = out;
    document.body.appendChild(pre);*/
}

//Tracy's Functions
//VVVVVVVVVVVVVVVVV
//Open dialog box
function openDlgFunc()
{
    var tempTitle = $('#titleVal').val();
    var tempDesc = $('#descVal').val();
    
    $('#title').val(tempTitle);
    $('#description').val(tempDesc);


    $( "#dialog-form" ).dialog( "open" );
	//Title box
	var addBoxes = "<label for='titleVal' style='color:white'>Title</label><br>";
	addBoxes += "<input type='text' id='titleVal'><br>";
	//Description box
	addBoxes += "<label for='descVal' style='color:white'>Description</label><br>";
	addBoxes += "<input type='text' id='descVal'><br>";
	$("#content").html(addBoxes);
	//alert("openDlgFunc");
}

//Dialog box ripped from other page
function loadDialog()
{
    //build the modal dialog form for editing video fields
    var str = "<form>";
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
        	"Update Fields": function()
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

function getFakeJson()
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
        "name": "Admin",
        "note": "Admin all rights"
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
    }
];

 return obj;
}