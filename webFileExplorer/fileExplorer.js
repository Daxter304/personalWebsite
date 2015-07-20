settings = {
    currentDir: "../../files",
    parentDir: "../.."
};

function fileExplorerSetup() {
    $(document.body).on('click', '#fileExplorerBtn', function() {
        fileExplorer(settings.currentDir);
    });
    $(document.body).on('click', '.deleteFileBtn', function() {
        var file = $(this).attr('data-file');
        deleteFile(file);
    });
    $(document.body).on('click', '.openFolderBtn', function() {
        settings.parentDir = settings.currentDir;
        settings.currentDir = $(this).attr('data-file');
        fileExplorer();
    });
    $(document.body).on('click', '.parentDirBtn', function() {
        //settings.parentDir = settings.currentDir;
        settings.currentDir = $(this).attr('data-parentDir');
        fileExplorer();
    });
}

function fileExplorer() {
    clearContentDiv();
    $.ajax({ url: "/webFileExplorer/fileExplorer.php",
        data: {
            "call": "readFiles",
            "folder": settings.currentDir,
            "parentDir": settings.parentDir
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
        //var fileName = $(this).attr('data-filename');
        $.ajax({ url: "/webFileExplorer/fileExplorer.php",
            data: {
                "call": "deleteFile",
                "file": file
            },
            type: "GET",
            success: function(output) {
                console.log(output);
                fileExplorer();
            },
            error: function() {
                window.alert("Failed to delete file");
            }
        });
    }
}