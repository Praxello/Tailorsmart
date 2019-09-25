<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include_once("thumbnailfunct.php");
ini_set('memory_limit', '1024M');

// $mainpath = "../mobileimages/";
$mainpath = "http://praxello.com/tailorsmart/mobileimages/";
$filename = $_FILES['file']['name'];
// echo $filename;
$response = [];
$ImageNameId      = $_REQUEST['imgname'];
$Foldername     = $_REQUEST['foldername'];
$target_dir = $mainpath.$Foldername."/";
$upload300x300_dir = $target_dir.'300x300/';
$upload600x600_dir = $target_dir;

$response['Message'] = "Image Type Error";
if(!isset($_FILES["file"]["type"])){
    // $imgname = '../Events/sponser.jpg';
    // echo $imgname;
  }
  else {
    $imgname = $_FILES["file"]["name"];
    // print_r($imgname);
    // $extension = end(explode(".", $imgname));
    $sourcePath = $_FILES['file']['tmp_name']; // Storing source path of the file in a variable
    // echo $sourcePath;
    $targetPath = $target_dir.$ImageNameId.".jpg"; // Target path where file is to be stored
    move_uploaded_file($sourcePath,$targetPath) ; // Moving Uploaded file
    $newimagename = $ImageNameId.".jpg";
    createThumbnail($newimagename, 100, 100, $target_dir, $upload300x300_dir);
    createThumbnail($newimagename, 600, 600, $target_dir, $upload600x600_dir);
    $response['Message'] = "Image Uploaded Successfully";
  }

exit(json_encode($response));
?>
