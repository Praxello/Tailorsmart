<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
if (isset($_POST['skipDate']) && isset($_POST['holidayTitle'])) {

	      $tempTitle = mysqli_real_escape_string($conn,$holidayTitle);

				$query = mysqli_query($conn,"insert into holiday_master(skipdate, holidaytitle) values('$skipDate','$tempTitle')");
					if($query==1)
					{
						     $last_id = mysqli_insert_id($conn);
						      $s = strval($last_id);
					  			$response = array('Message'=>"New holiday created successfully",'Responsecode'=>200,'RowId'=>$last_id);
					}
					else
					{
						$a = mysqli_error($conn);
						if (strpos($a, 'Duplicate') !== false) {
								$response=array("Message"=> "Duplicate entry for this date","Responsecode"=>500);
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
