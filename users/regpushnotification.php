<?php
     include "../connection.php";
	 mysqli_set_charset($conn,'utf8');
	 $response=null;
	 
	 if(isset($_POST['userid']) && isset($_POST['deviceid']) && isset($_POST['ostype']) && isset($_POST['appversion']))
	 {
	extract($_POST);
	
	$query = mysqli_query($conn,"delelte from  customer_gcm_apns_master where customerid =$userid");
	
	$query = mysqli_query($conn,"insert into customer_gcm_apns_master(customerid,deviceId,osType,appVersion) values($userid,'$deviceid','$ostype','$appversion')");
	
	
		if($query==1){
			$out = array('Message'=>"User registration successfull",'Responsecode'=>200);
			}
			else{
		  $out = array('Message'=>"User registration successfull",'Responsecode'=>200);	
			}
	 }
	 else
	 {
		$out=array("Message"=> "Check query parameters","Responsecode"=>403);
	 }
	 print json_encode($out);
?>