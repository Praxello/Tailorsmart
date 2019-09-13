<?php

include_once("thumbnailfunct.php");
ini_set('memory_limit', '1024M');

$mainpath = "../Tailorsmart/mobileimages/";
$filename = $_FILES['file']['name'];
// echo $filename;

$ImageNameId      = $_REQUEST['imgname'];
$Foldername     = $_REQUEST['foldername'];
$target_dir = "../Events/";
$upload300x300_dir = '../Events/300x300/';
$upload600x303_dir = '../Events/600x303/';
$response = [];

if(!isset($_FILES["file"]["type"])){
    $imgname = '../Events/sponser.jpg';
    // echo $imgname;
  }
  else {
    $imgname = $_FILES["file"]["name"];
    // print_r($imgname);
    // $extension = end(explode(".", $imgname));
    $sourcePath = $_FILES['file']['tmp_name']; // Storing source path of the file in a variable
    // echo $sourcePath;
    $targetPath = "../Events/".$ImageNameId.".jpg"; // Target path where file is to be stored
    move_uploaded_file($sourcePath,$targetPath) ; // Moving Uploaded file
    $newimagename = $ImageNameId.".jpg";

    createThumbnail($newimagename, 1900, 960,$target_dir, $upload1900x960_dir);
    createThumbnail($newimagename, 300, 300, $target_dir, $upload300x300_dir);
    createThumbnail($newimagename, 600, 303, $target_dir, $upload600x303_dir);
    createThumbnail($newimagename, 800, 800, $target_dir, $upload800x800_dir);
  }
// $sql = "INSERT INTO Events(EventName,EventDate,EventTime,Description,Venue,VenueCity,EventProfile) VALUES('$EventName','$EventDate','$EventTime','$Description','$Venue','$VenueCity','$newimagename')";
// if(mysqli_query($con,$sql)){
//     $response['msg'] = 'Event Added SuccessFully';
// }
// else{
//     $response['msg'] = 'Server Error Please Try again';
// }

exit(json_encode($response));
?>
