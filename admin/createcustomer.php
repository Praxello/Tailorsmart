<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");

//`categoryId`, `fabricTitle`, `fabricBrand`, `fabricDetails`, `skuNo`, `fabricPrice`, `releaseDate`, `isPriceVariable`, `hexColor`, `colorName`, `fabricType`, `isActive`
if (isset($_POST['firstName']) && isset($_POST['lastName'])  && isset($_POST['mobile'])
&& isset($_POST['landline'])&& isset($_POST['city']) && isset($_POST['state']) && isset($_POST['country'])&& isset($_POST['address'])
&& isset($_POST['isMale']) && isset($_POST['password']) && isset($_POST['latitude']) && isset($_POST['longitude'])) {
	$empId = isset($_POST['employeeid']) ? $employeeid : "NULL";
	$date_birth = isset($_POST['date_birth']) ? $_POST['date_birth']:'NULL';
	// $tempDetails = mysqli_real_escape_string($conn,$fabricDetails);
	// $tempTitle = mysqli_real_escape_string($conn,$fabricTitle);
	// $tempBrand = mysqli_real_escape_string($conn,$fabricBrand);
$sql ="INSERT INTO customer_master(firstName, lastName, email, date_birth, mobile, landline, city, state, country, address, isMale, password, latitude, longitude, landmark, isActive, issocial,employeeid)
VALUES ('$firstName', '$lastName', '$email', '$date_birth', '$mobile', '$landline', '$city', '$state', '$country', '$address', '$isMale', '$password', '$latitude','$longitude','$landmark','$isActive','$issocial','$empId')";
				$query = mysqli_query($conn,$sql);
					if($query==1)
					{
						 $last_id = mysqli_insert_id($conn);
						 $s = strval($last_id);
					  			$response = array('Message'=>"New Customer created successfully",'Responsecode'=>200,'RowId'=>$last_id);
					}
					else
					{
						$response=array("Message"=> mysqli_error($conn)." Already Exists","Responsecode"=>500);
					}
}
else
{
		    $response = array('Message' => "Parameter missing", "Data" => $records, 'Responsecode' => 402);
}
print json_encode($response);
?>
