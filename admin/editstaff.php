<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

 //userRole, firstName, lastName, email, mobile, city, state, adharId, address, password, birthDate, isActive
if (isset($_POST['employeeid']) && isset($_POST['userrole']) && isset($_POST['firstname'])  && isset($_POST['lastname'])  && isset($_POST['email']) && isset($_POST['mobile']) && isset($_POST['city']) && isset($_POST['state'])&& isset($_POST['adharid'])&& isset($_POST['address'])&& isset($_POST['password']) && isset($_POST['birthdate'])&& isset($_POST['active']) ) {

	$tempAddress = mysqli_real_escape_string($conn,$address);
	$tempFname = mysqli_real_escape_string($conn,$firstname);
	$tempLname = mysqli_real_escape_string($conn,$lastname);
	$tempPassword = mysqli_real_escape_string($conn,$password);
	
	
	//employeeId, attendanceDate, latitude, longitude, address, deviceId, model
				
				$query = mysqli_query($conn,"update employee_master set userRole='$userrole', firstName='$tempFname', lastName='$tempLname', email='$email', mobile='$mobile', city='$city', state='$state', adharId='$adharid', address='$tempAddress', password='$tempPassword', birthDate = '$birthdate', isActive= $active where employeeId = $employeeid");
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