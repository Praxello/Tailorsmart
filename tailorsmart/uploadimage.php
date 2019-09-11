<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
     $response=null;
	extract($_POST);
//	print($_POST['imageData']);
	//	print($_POST['imageName']);
	$imageData = base64_decode($imageData);
	$source = imagecreatefromstring($imageData);
	$rotate = imagerotate($source, $angle, 0); // if want to rotate the image
	$imageSave = imagejpeg($rotate,$imageName,100)  ;
	
	
	

	imagedestroy($source);
	
$out=array("Message"=> "Image uploaded successfully".$imageSave,"Responsecode"=>200);
 print json_encode($out);
?>