<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
    $foldname = $_REQUEST['foldername'];
    $dir = '../'.$foldname;
    $ffs = preg_grep('~\.(jpeg|jpg|png)$~', scandir($dir));
    $response=null;
        foreach($ffs as $ff){
            if($ff != '.' && $ff != '..'){
                $response[]=$ff;
            }
        };
    print json_encode($response);
?>
