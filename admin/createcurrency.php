<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
if (isset($_POST['cityName']) && isset($_POST['currencyMultiplier']) && isset($_POST['currencyCode'])) {

	      $tempTitle = mysqli_real_escape_string($conn,$cityName);
 // INSERT INTO `supported_cities_master`(`cityId`, `cityName`, `currencyMultiplier`, `currencyCode`)
 // VALUES ([value-1],[value-2],[value-3],[value-4])
				$query = mysqli_query($conn,"insert into supported_cities_master(cityName,currencyMultiplier,currencyCode) values('$tempTitle','$currencyMultiplier','$currencyCode')");
					if($query==1)
					{
						     $last_id = mysqli_insert_id($conn);
						      $s = strval($last_id);
					  			$response = array('Message'=>"New Currency Added successfully",'Responsecode'=>200,'RowId'=>$last_id);
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
