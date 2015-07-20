<?php
if($_SERVER['REQUEST_METHOD']=="GET") {
    $function = $_GET['call'];
    if(function_exists($function)) {
        call_user_func($function);
    } else {
        echo "Function Not Exists!!\n";
    }
}

function readFiles() {
    $folder = $_GET['folder'];
//    $parentDir = $_GET['parentDir'];
    $parentDir = dirname($folder);
    $files = scandir($folder, 0);
    $fileCount = sizeof($files)-2;
    if ($fileCount > 0) {
        $html = '<ul class="fileList">';
        $html .= '<li><button type="button" class="parentDirBtn fileExplorerBtn" data-parentDir="' . $parentDir . '">Parent</button></li>';
        foreach ($files as $file) {
            if ($file != "." && $file != "..") {
                if (is_dir($folder . "/" . $file)){
                    $html .= '<li><button type="button" class="openFolderBtn fileExplorerBtn" data-file="' . $folder . "/" . $file . '">Open</button> ' . $file . '</li>';
                } else {
                    $html .= '<li><button type="button" class="deleteFileBtn fileExplorerBtn" data-file="' . $folder . "/" . $file . '">Delete</button> ' . $file . '</li>';
                }
            }
        }
        $html .= "</ul>";
        echo $html;
    } else {
        $html = "<h3 style='color:red;margin:0'>No Files Found</h3>";
        $html .= '<button type="button" class="parentDirBtn fileExplorerBtn" data-parentDir="">Parent</button>';
        echo $html;
    }
}

function deleteFile() {
    $file = $_GET['file'];
    if (file_exists($file)) {
//        shell_exec("rm '" . $file . "'");
        unlink($file);
        if (file_exists($file)) echo "Failed to delete " . $file;
        else echo $file . " deleted";
    } else {
        echo $file . " doesn't exist";
    }
}
?>