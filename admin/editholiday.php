<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
if (isset($_POST['holidayId']) && isset($_POST['holidayTitle']) && isset($_POST['skipDate']) && isset($_POST['cityId'])) {

	$tempTitle = mysqli_real_escape_string($conn,$holidayTitle);

				$query = mysqli_query($conn,"update holiday_master set holidayTitle = '$tempTitle' , skipDate='$skipDate' , cityId='$cityId' where holidayId = $holidayId");
					$rowsAffected=mysqli_affected_rows($conn);
						if($rowsAffected > 0)
						{
					  			$response = array('Message'=>"Holiday updated successfully",'Responsecode'=>200);
						}
					else
					{
						$a = mysqli_error($conn);
						if (strpos($a, 'Duplicate') !== false) {
								$response=array("Message"=> "Duplicate entry","Responsecode"=>500);
							}
							else
							{
							$response=array("Message"=> mysqli_error($conn)." No data to change or item not present","Responsecode"=>500);
							}
					}
}
else
{
		    $response = array('Message' => "Parameter missing", "Data" => $records, 'Responsecode' => 402);
}
print json_encode($response);
?>
