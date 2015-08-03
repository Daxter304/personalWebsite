<?php
$currentDir = readfile("../config.txt");


if($_SERVER['REQUEST_METHOD']=="GET") {
    $function = $_GET['call'];
    if(function_exists($function)) {
        call_user_func($function);
    } else {
        echo "Function Not Exists!!\n";
    }
}

function readFiles() {
    $server = file_exists("/server.txt");
    $folder = $_GET['folder'];
    if ($folder == null) $folder = $GLOBALS['currentDir'];
    else if ($folder == "parentDir") {
        $folder = dirname($GLOBALS['currentDir']);
        $GLOBALS['currentDir'] = $folder;
    }
    else {
        $folder = $GLOBALS['currentDir'] . "/" . $folder;
        $GLOBALS['currentDir'] = $folder;
    }

    $files = scandir($folder, 0);
    $fileCount = sizeof($files)-2;
    if ($fileCount > 0 && $server == false) {
        $html = '<ul class="fileList">';
        if ($folder != "/") $html .= '<li><button type="button" class="parentDirBtn fileExplorerBtn">Parent</button></li>';
        foreach ($files as $file) {
            if ($file != "." && $file != ".." && substr($file, 0, 1) != ".") {
                if (is_dir($folder . "/" . $file)){
                    $html .= '<li><button type="button" class="openFolderBtn fileExplorerBtn" data-file="' . $file . '">Open</button> ' . $file . '</li>';
                } else {
                    $html .= '<li><button type="button" class="deleteFileBtn fileExplorerBtn" data-file="' . $file . '">Delete</button> ' . $file . '</li>';
                }
            }
        }
        $html .= "</ul>";
        echo $html;
    } else if ($fileCount <= 0 && $server == false){
        $html = "<h3 style='color:red;margin:0'>No Files Found</h3>";
        $html .= '<button type="button" class="parentDirBtn fileExplorerBtn" data-parentDir="">Parent</button>';
        echo $html;
    } else {
        echo "<h3 style='color:red;margin:0'>Permission Denied</h3>";
    }
}

function deleteFile() {
    $file = $_GET['file'];
    $file = $GLOBALS['currentDir'] . "/" . $file;
    if (file_exists($file)) {
//        shell_exec("rm '" . $file . "'");
        unlink($file);
        if (file_exists($file)) echo "Failed to delete " . $file;
        else echo $file . " deleted";
    } else {
        echo $file . " doesn't exist";
    }
}

function consoleLog() {
    echo "Current Directory: " . $GLOBALS['currentDir'];
}
?>