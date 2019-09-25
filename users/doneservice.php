<?php
include "../connection.php";
mysqli_set_charset($conn,'utf8');

if(isset($_POST['transactionId']) && isset($_POST['serviceId']) && isset($_POST['employeeId'])) {
	extract($_POST);
	$date = date('Y-m-d');
	$dateTime = date('Y-m-d H:i:s');


	
	$query = mysqli_query($conn,"insert into service_completion_master(transactionId, serviceId, employeeId, serviceDate, serviceDateTime) values('$transactionId', '$serviceId', '$employeeId', '$date', '$dateTime')");
		if($query==1){
			$out = array('Message'=>"Service done successfull",'Responsecode'=>200);
		} else {
			$out = array('Message'=>"Service done failed - ".mysqli_error($conn),'Responsecode'=>200);	
		}
} else {
	$out=array("Message"=> "Check query parameters".mysqli_error($conn),"Responsecode"=>403);
}
print json_encode($out);
?>