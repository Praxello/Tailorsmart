<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

 //userRole, firstName, lastName, email, mobile, city, state, adharId, address, password, birthDate, isActive
if (isset($_POST['employeeId']) && isset($_POST['roleId']) && isset($_POST['firstName'])  && isset($_POST['lastName'])  && isset($_POST['email']) && isset($_POST['mobile']) && isset($_POST['city']) && isset($_POST['state'])&& isset($_POST['adharId'])&& isset($_POST['address'])&& isset($_POST['password']) && isset($_POST['birthDate'])&& isset($_POST['isActive']) ) {

	$tempAddress = mysqli_real_escape_string($conn,$address);
	$tempFname = mysqli_real_escape_string($conn,$firstName);
	$tempLname = mysqli_real_escape_string($conn,$lastName);
	$tempPassword = mysqli_real_escape_string($conn,$password);


	//employeeId, attendanceDate, latitude, longitude, address, deviceId, model

				$query = mysqli_query($conn,"update employee_master set roleId='$roleId', firstName='$tempFname', lastName='$tempLname', email='$email', mobile='$mobile', city='$city', state='$state', adharId='$adharId', address='$tempAddress', password='$tempPassword', birthDate = '$birthDate', isActive= $isActive where employeeId = $employeeId");
				$rowsAffected=mysqli_affected_rows($conn);
						if($rowsAffected > 0)
						{
					  			$response = array('Message'=>"User updated successfully",'Responsecode'=>200);
						}
						else
						{
							$response=array("Message"=> mysqli_error($conn)."No data to change or user not present","Responsecode"=>500);
						}
}
else
{
		    $response = array('Message' => "Parameter missing", "Data" => $records, 'Responsecode' => 402);
}
print json_encode($response);
?>
