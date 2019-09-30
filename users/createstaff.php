<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: *");

include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

 date_default_timezone_set("Asia/Kolkata");
 $currentDate=date('Y-m-d H:m:s'); //Returns IST	
 //userRole, firstName, lastName, email, mobile, city, state, adharId, address, password, birthDate, isActive
if (isset($_POST['userrole']) && isset($_POST['firstname'])  && isset($_POST['lastname'])  && isset($_POST['email']) && isset($_POST['mobile']) && isset($_POST['city']) && isset($_POST['state'])&& isset($_POST['adharid'])&& isset($_POST['address'])&& isset($_POST['password']) && isset($_POST['birthdate'])&& isset($_POST['active']) ) {

	$tempAddress = mysqli_real_escape_string($conn,$address);
	$tempFname = mysqli_real_escape_string($conn,$firstname);
	$tempLname = mysqli_real_escape_string($conn,$lastname);
	$tempPassword = mysqli_real_escape_string($conn,$password);
	
	
	//employeeId, attendanceDate, latitude, longitude, address, deviceId, model

 			$query = mysqli_query($conn,"insert into employee_master(userRole, firstName, lastName, email, mobile, city, state, adharId, address, password, birthDate, isActive) values ('$userrole', '$tempFname', '$tempLname', '$email', '$mobile', '$city', '$state', '$adharid', '$tempAddress', '$tempPassword', '$birthdate', $active)");
					if($query==1)
					{
					  			$response = array('Message'=>"New user created successfully",'Responsecode'=>200);
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