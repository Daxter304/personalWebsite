settings = {
    currentDir: "/"
};

function fileExplorerSetup() {
    $(document.body).on('click', '#fileExplorerBtn', function() {
        fileExplorer();
    });
    $(document.body).on('click', '.deleteFileBtn', function() {
        var file = $(this).attr('data-file');
        deleteFile(file);
    });
    $(document.body).on('click', '.openFolderBtn', function() {
        //settings.currentDir = $(this).attr('data-file');
        fileExplorer($(this).attr('data-file'));
    });
    $(document.body).on('click', '.parentDirBtn', function() {
        //settings.currentDir = dirname(settings.currentDir);
        fileExplorer("parentDir");
    });
}

function dirname(path) {
    return path.replace(/\\/g, '/')
        .replace(/\/[^\/]*\/?$/, '');
}

function fileExplorer(folderName) {
    consoleLog();
    clearContentDiv();
    $.ajax({ url: "/webFileExplorer/fileExplorer.php",
        data: {
            "call": "readFiles",
            "folder": folderName
        },
        type: "GET",
        success: function(output) {
            $("#content").html(output);
            //console.log(output);
        },
        error: function() {
            window.alert("Failed to read dir");
        }
    });
}

function deleteFile(file) {
    var deleteFile = confirm("Are you sure you want to delete this file?");
    if (deleteFile == true){
        $.ajax({ url: "/webFileExplorer/fileExplorer.php",
            data: {
                "call": "deleteFile",
                "file": file
            },
            type: "GET",
            success: function(output) {
                //console.log(output);
                fileExplorer();
            },
            error: function() {
                window.alert("Failed to delete file");
            }
        });
    }
}

function consoleLog() {
    $.ajax({ url: "/webFileExplorer/fileExplorer.php",
        data: {
            "call": "consoleLog"
        },
        type: "GET",
        success: function(output) {
            console.log(output);
        },
        error: function() {
            window.alert("Failed to call function");
        }
    });
}