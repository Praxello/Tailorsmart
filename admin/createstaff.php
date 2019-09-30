<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

 date_default_timezone_set("Asia/Kolkata");
 $currentDate=date('Y-m-d H:m:s'); //Returns IST
 //roleId, firstName, lastName, email, mobile, city, state, adharId, address, password, birthDate, isActive
if (isset($_POST['roleId']) && isset($_POST['firstName'])  && isset($_POST['lastName'])  && isset($_POST['email']) && isset($_POST['mobile']) && isset($_POST['city']) && isset($_POST['state'])&& isset($_POST['adharId'])&& isset($_POST['address'])&& isset($_POST['password']) && isset($_POST['birthDate'])&& isset($_POST['isActive']) ) {

	$tempAddress = mysqli_real_escape_string($conn,$address);
	$tempFname = mysqli_real_escape_string($conn,$firstName);
	$tempLname = mysqli_real_escape_string($conn,$lastName);
	$tempPassword = mysqli_real_escape_string($conn,$password);


	//employeeId, attendanceDate, latitude, longitude, address, deviceId, model

 			$query = mysqli_query($conn,"insert into employee_master(roleId, firstName, lastName, email, mobile, city, state, adharId, address, password, birthDate, isActive) values ('$roleId', '$tempFname', '$tempLname', '$email', '$mobile', '$city', '$state', '$adharId', '$tempAddress', '$tempPassword', '$birthDate', $isActive)");
					if($query==1)
					{
                  $last_id = mysqli_insert_id($conn);
                  $s = strval($last_id);
					  			$response = array('Message'=>"New user created successfully",'Responsecode'=>200,'RowId'=>$last_id);
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
