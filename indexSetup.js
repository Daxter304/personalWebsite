var data = getJson();
var tableLocation = 0;

function setupPage() {

  //Create menu
  $("#menuHeader").append("<ul>" +
    "<li><a id='createTableBtn'><label>Create Table</label></a></li>" +
    "<li><a id='createMyDlgBtn'><label>My Dialog Box</label></a></li>" +
    "<li><a id='createImageBtn'><label>Load Image</label></a></li>" +
    //"<li><a id='createDlgBtn'><label>Tracy's Dialog Box</label></a></li>" +
    "<li><a id='viewPageCSSBtn'><label>View Page CSS</label></a></li>" +
    "<li><a id='compareBtn'><label>Comparison</label></a></li>"+
    "<li><a id='findChildBtn'><label>Find Child Elem</label></a></li>"+
    //"<li><a id='dropdownBtn'><label>Dropdown</label></a></li>"+
    "<li><a id='fileExplorerBtn'><label>File Explorer</label></a></li>" +
    "<li><a id='clearPageBtn'><label>Clear Page</label></a></li>" +
    "</ul>");

  $("#footer").append("<Label>Change Background</label><br>" +
    "<button id='background1' class='astext'>Background 1</button>" +
    "<button id='background2' class='astext'>Background 2</button>" +
    "<button id='background3' class='astext'>Background 3</button>");

  //Listen for click events in the menu
  $('#createTableBtn').click(createTable);
  $('#createDlgBtn').click(function() {
    loadDialog();
    openDlgFunc();
  });
  $('#createMyDlgBtn').click(function() {
    loadMyDialog();
    $('#myDialog').dialog('open');
  });
  $('#createImageBtn').click(function() {
    loadPicDialog();
    $('#pictureDialog').dialog('open');
  });
  $('#clearPageBtn').click(clearContentDiv);
  $('#viewPageCSSBtn').click(function() {
    window.open('/css.html', '_newtab');
  });
  $(document.body).on('click', '.editTableBtn', function() {
    editTableDialog();
    openEditTableDlg(this.id);
  }); //Listens for click events anywhere
  $(document.body).on('click', '#addJsonBtn', function() {
    addJsonDialog();
    $('#addJsonDialog').dialog('open');
  });
  $(document.body).on('click', '#background1', function() {
    $(document.body).css('background', "url('background01.jpg') no-repeat center center fixed");
    $(document.body).css('background-size', "cover");
  });
  $(document.body).on('click', '#background2', function() {
    $(document.body).css('background', "url('background02.jpg') no-repeat center center fixed");
    $(document.body).css('background-size', "cover");
  });
  $(document.body).on('click', '#background3', function() {
    $(document.body).css('background', "url('background03.jpg') no-repeat center center fixed");
    $(document.body).css('background-size', "cover");
  });

  $("#compareBtn").click(comparison);
  $('#findChildBtn').click(findChildren);
  $('#dropdownBtn').click(testDropdown);

  //File explorer functions
  fileExplorerSetup();
}

function testDropdown() {
  $("#content.html").html('<li class="dropdown" style="display: block;"><a href="#" data-toggle="dropdown">File<b class="caret"></b></a><ul class="dropdown-menu"><li><a href="edit.html" tabindex="-1">Create/Open</a></li><li><a id="menu_refresh" tabindex="-1">Refresh</a></li><li><a id="menu_save" tabindex="-1">Save</a></li><li class="divider"></li><li><a id="menu_view_json" tabindex="-1">View Json</a></li><li><a id="menu_project_properties" tabindex="-1">Project Properties</a></li></ul></li>');
}

function findChildren() {
  $("#content").html("<div id='testDiv'><ul id='testUl' style='color: white;'><li>one</li><li>two</li><li>three</li><li>four</li></ul></div>");
  if ($("#testUl").children().length == 1) {
    $("#testUl").children().each(function() {
      $(this).addClass('justOne');
  });
  } else {
    $("#testUl").children().each(function() {
      $(this).addClass('moreThanOne');
  });
  }
}

function comparison() {
  //arrayOne=keywords
  //arrayTwo=index
  //if any same between the two, remove from keywords
  var arrayOne = [1,2,3,3,4,5,6,7];
  var arrayTwo = [7,9,3,10,4];
  var removePositions = [];

  for(var x=0;x<arrayOne.length;x++) {
    for(var y=0;y<arrayTwo.length;y++) {
      if (arrayOne[x]==arrayTwo[y]) {
        removePositions.push(x);
      }
    }
  }
  if(removePositions.length>0)
  {
    for(x=0;x<removePositions.length;x++) {
      removePositions[x]-=x;//When something is spliced out, the positions change, so the removePositions have to be adjusted
      arrayOne.splice(removePositions[x], 1);
    }
  }
  alert(arrayOne + "--" + arrayTwo);
}

function clearContentDiv() {
  $("#content").html("");
}

function createTable() {
  var table = "";
  table += "<table>";
  table += "<tr><th>ID</th><th>Name</th><th>Note</th><th>Web Pages</th></tr>";
  for (x = 0; x < data.length; x++) {
    table += "<tr>";
    table += "<td>" + data[x]["id"] + "</td>";
    table += "<td>" + data[x]["name"] + "</td>";
    table += "<td>" + data[x]["note"] + "</td>";
    table += "<td>" + "<input type='button' class='editTableBtn' id='tableRow" + x + "' value='Edit'/>" + "</td>";
    table += "</tr>";
  }
  table += "</table>";
  table += "<input type='button' id='addJsonBtn' value='Add Data'/>";
  $("#content").html(table + "<br>");
}

function openEditTableDlg(rowNum) {
  tableLocation = Number(rowNum.substring(8));
  $('#chgName').val(data[tableLocation]["name"]);
  $('#chgNote').val(data[tableLocation]["note"]);
  $('#editTableDialog').dialog('open');
}

function editTableDialog() {
  var str = "<form>";
  str += "<div id='editTableDialog'></div>";
  str += "<fieldset>";
  str += "<label>Change Name</label><br>";
  str += "<input type='text' name='name' id='chgName' class='text ui-widget-content ui-corner-all' data-pathx=''><br>";
  str += "<label>Change Note</label><br>";
  str += "<input type='text' name='note' id='chgNote' class='text ui-widget-content ui-corner-all' data-pathx=''><br>";
  str += "</fieldset>";
  str += "</form>";
  $("#editTableDialog").html(str);

  $("#editTableDialog").dialog({
    autoOpen: false,
    height: 375,
    width: 350,
    modal: true,
    buttons: {

      "Save": function() {
        data[tableLocation]["name"] = $('#chgName').val();
        data[tableLocation]["note"] = $('#chgNote').val();
        createTable();
        $(this).dialog("close");
      },

      "Delete": function() {
        data.splice(tableLocation, 1);
        createTable();
        $(this).dialog("close");
      },

      Cancel: function() {
        $(this).dialog("close");
      }

    },
    close: function() {}
  });
}

function addJsonDialog() {
  var str = "<form>";
  str += "<div id='addJsonDialog'></div>";
  str += "<fieldset>";
  str += "<label>Name</label><br>";
  str += "<input type='text' name='name' id='addName' class='text ui-widget-content ui-corner-all' data-pathx=''><br>";
  str += "<label>Note</label><br>";
  str += "<input type='text' name='note' id='addNote' class='text ui-widget-content ui-corner-all' data-pathx=''><br>";
  str += "</fieldset>";
  str += "</form>";
  $("#addJsonDialog").html(str);

  $("#addJsonDialog").dialog({
    autoOpen: false,
    height: 375,
    width: 350,
    modal: true,
    buttons: {

      "Add": function() {
        var length = (Object.keys(data).length);
        var addID = 0;
        for (var x = 0; x < length; x++) {
          if (Number(data[x]["id"]) > addID) {
            addID = Number(data[x]["id"]);
          }
        }
        addID++;
        var addName = $('#addName').val();
        var addNote = $('#addNote').val();
        if (addName === "") {
          window.alert("Must have a name");
        } else if (Object.keys(data).length === 0) {
          data = [{
            "id": "1",
            "name": "",
            "note": ""
          }];
          data[0]["name"] = addName;
          data[0]["note"] = addNote;
          $(this).dialog("close");
        } else {
          data.push({
            id: addID,
            name: addName,
            note: addNote
          });
          $(this).dialog("close");
        }
        createTable();

      },

      Cancel: function() {
        $(this).dialog("close");
      }

    },
    close: function() {}
  });
}


function loadPicDialog() {
  var str = "<form>";
  str += "<div id='pictureDialog'></div>";
  str += "<fieldset>";
  str += "<label>Which pictures do you want to load?</label><br><br>";
  for (x = 0; x < 3; x++) {
    str += "<input type='checkbox' id='" + x + "' unchecked>Image #" + (x + 1) + "<br>";
  }
  str += "</fieldset>";
  str += "</form>";
  $("#pictureDialog").html(str);

  $("#pictureDialog").dialog({
    autoOpen: false,
    height: 375,
    width: 350,
    modal: true,
    buttons: {

      "Load Image": function() {
        str = "";

        for (x = 0; x < 3; x++) {

          if (document.getElementById(x).checked === true) {
            str += "<img src='" + x + ".jpg' id='img" + x + "'><br>";
          }
        }
        $("#content").html(str);
        $(this).dialog("close");
      },

      Cancel: function() {
        $(this).dialog("close");
      }

    },
    close: function() {}
  });
}

function loadMyDialog() {
  var currentdate = new Date();
  var str = "<form>";
  str += "<div id='myDialog'></div>";
  str += "<fieldset>";
  str += "<a href='http://www.tweddle.com/' target='_newtab'><img id='myDialog' src='tweddleLogo.jpg'></a><br>";
  str += "</fieldset>";
  str += "<fieldset>";
  str += "<label for='alert'>Alert Text</label><br>";
  str += "<input type='text' name='alert' id='alert' class='text ui-widget-content ui-corner-all' data-pathx=''><br>";
  str += "</fieldset>";
  str += "</form>";
  $("#myDialog").html(str);

  $("#myDialog").dialog({
    autoOpen: false,
    height: 375,
    width: 350,
    modal: true,
    buttons: {

      "Create Alert": function() {
        var input = $("#alert").val();
        window.alert(input);
        $(this).dialog("close");
      },

      Cancel: function() {
        $(this).dialog("close");
      }

    },
    close: function() {}
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
function openDlgFunc() {
  var tempTitle = $('#titleVal').val();
  var tempDesc = $('#descVal').val();

  $('#title').val(tempTitle);
  $('#description').val(tempDesc);


  $("#dialog-form").dialog("open");
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
function loadDialog() {
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
  $("#dialog-form").dialog({
    autoOpen: false,
    height: 400,
    width: 350,
    modal: true,
    buttons: {
      "Update Fields": function() {
        //Get the data out of the forms fields
        var title = $("#title").val();
        var desc = $("#description").val();

        //alert(title + desc);

        //Write the data from the dialog to the form
        $('#titleVal').val(title);
        $('#descVal').val(desc);

        $('#title').val("");
        $('#description').val("");

        $(this).dialog("close");
      },

      Cancel: function() {
        $(this).dialog("close");
      }



    },
    close: function() {}
  });
}

function getJson() {
  var obj = [{
    "id": "2",
    "name": "Open",
    "note": "Rights available to this group do not need a login"
  }, {
    "id": "4",
    "name": "Admin",
    "note": "Admin all rights"
  }, {
    "id": "5",
    "name": "Campaign Manager",
    "note": "Message Campaign Manager"
  }, {
    "id": "6",
    "name": "QA",
    "note": "Quality Assurance"
  }, {
    "id": "42",
    "name": "Deep Thought",
    "note": "Life, Universe and Everything"
  }, {
    "id": "10",
    "name": "This",
    "note": ""
  }, {
    "id": "23",
    "name": "Is",
    "note": ""
  }, {
    "id": "15",
    "name": "A",
    "note": ""
  }, {
    "id": "33",
    "name": "Test",
    "note": ""
  }, {
    "id": "21",
    "name": "Please",
    "note": ""
  }, {
    "id": "9",
    "name": "Ignore",
    "note": ""
  }, {
    "id": "8",
    "name": "This",
    "note": ""
  }];

  return obj;
}
