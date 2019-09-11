<?php
require '../config/connection.php';
ini_set('memory_limit','1024M');
$target_dir = "../Events/"; // Upload directory
$upload800x800_dir = '../Events/800x800/';
$thumb_width = 800;
$thumb_height = 800;
$EventId        = $_POST['eventgallery'];
// echo $EventId;
$response=[];
include_once("thumbnailfunct.php");
$request = 1;


// $sql1 ="SELECT pictureid from EventsGallary where EventId=$EventId ORDER by GallaryId DESC LIMIT 1";
// $result1 = mysqli_query($con,$sql1);
// $TransactionNumber=0;
// if(mysqli_num_rows($result1)>0)
// {
// 		$row1 = mysqli_fetch_array($result1);
// 		$TransactionNumber =$row1['pictureid']+1;
// }
// else
// {
// 	 $TransactionNumber=1;
// }
//
// if($request == 1){
//
// 	$target_file = $target_dir . basename($_FILES["file"]["name"]);
//   $filename = basename($_FILES["file"]["name"]);
// 	$targetPath = $target_dir.$EventId.$TransactionNumber.".jpg";
// 	$msg = "";
// 	 $newimagename = $EventId.$TransactionNumber.".jpg";
// 	if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetPath)) {
//       createThumbnail($newimagename, $thumb_width, $thumb_height, $target_dir, $upload800x800_dir);
// 			$response['msg'] = "Successfully uploaded";
// 			$sql = "INSERT INTO EventsGallary(EventId, pictures, pictureid) VALUES ($EventId,'$newimagename','$TransactionNumber')";
// 			mysqli_query($con,$sql);
// 	}else{
// 	    $response['msg'] = "Error while uploading";
// 	}
//
// }


mysqli_close($con);
exit(json_encode($response));
?>
