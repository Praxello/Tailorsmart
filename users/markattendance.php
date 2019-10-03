<?php

include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

 date_default_timezone_set("Asia/Kolkata");
 $currentDate=date('Y-m-d H:m:s'); //Returns IST	
if (isset($_POST['employeeid']) && isset($_POST['latitude'])  && isset($_POST['longitude'])  && isset($_POST['address']) && isset($_POST['deviceid']) && isset($_POST['model'])) {

	$tempAddress = mysqli_real_escape_string($conn,$address);
	$tempModel = mysqli_real_escape_string($conn,$model);
	
	//employeeId, attendanceDate, latitude, longitude, address, deviceId, model

 			$query = mysqli_query($conn,"insert into attendance_master(employeeId, latitude, longitude, address, deviceId, model) values ($employeeid,$latitude,$longitude,'$tempAddress','$deviceid','$tempModel')");
					if($query==1)
					{
					  			$response = array('Message'=>"Attendance marked successfully",'Responsecode'=>200);
					}
					else
					{	
						$response=array("Message"=> mysqli_error($conn)." failed","Responsecode"=>500);					
					}
}
else
{
		    $response = array('Message' => "Parameter missing", "Data" => $records, 'Responsecode' => 402);
}
print json_encode($response);
?>