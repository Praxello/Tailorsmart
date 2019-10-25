<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
if(isset($_POST['postdata']))
	 {
		 $someArray = json_decode($postdata,true);
	//	print_r($someArray);        // Dump all data of the Array
  	
	$productId = $someArray["productId"];
	
	//first delete mapping
	$query = mysqli_query($conn,"delete from  product_catalog_measurement_master where productId = $productId");
	
	$measurmentItems = $someArray["measurementId"];
 	foreach ($measurmentItems as $key => $value) {
	$measurementId = $measurmentItems[$key]['measurmentId'];
	$measurementValue = $measurmentItems[$key]['value'];
							
							$query = mysqli_query($conn,"insert into product_catalog_measurement_master(productid, measurementId,sequenceNumber) values( $productId,$measurementId,$measurementValue)");
					if($query==1)
					{
									$last_id = mysqli_insert_id($conn);
									$s = strval($last_id);
					  			$response = array('Message'=>"Mapping updated successfully",'Responsecode'=>200,'RowId'=>$last_id);
					}
					else
					{
						$a = mysqli_error($conn);
						if (strpos($a, 'Duplicate') !== false) {
								$response=array("Message"=> "One or many duplicate combination of Product - Fabric","Responsecode"=>500);
							}
							else
							{
							$response=array("Message"=> mysqli_error($conn)." No data to change or item not present","Responsecode"=>500);
							}
					}
							
				}
}
else
{
		    $response = array('Message' => "Parameter missing", "Data" => $records, 'Responsecode' => 402);
}
print json_encode($response);
?>