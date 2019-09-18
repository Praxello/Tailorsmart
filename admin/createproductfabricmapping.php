<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
if (isset($_POST['productid']) && isset($_POST['fabricid'])) {

					//first delete mapping
					$query = mysqli_query($conn,"delete from  product_fabric_mapping_master where productid = $productid");
	
					
			   $itemsArray = explode(",", $fabricid);
					
		foreach($itemsArray as $singleItemId)
					{
							if($singleItemId > 0)
							{
							$query = mysqli_query($conn,"insert into product_fabric_mapping_master(productid, fabricid) values( $productid,$singleItemId)");
					if($query==1)
					{
					  			$response = array('Message'=>"Mapping updated successfully",'Responsecode'=>200);
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
else
{
		  			$response = array('Message'=>"Mapping updated successfully",'Responsecode'=>200);
				
}	
				}
}
else
{
		    $response = array('Message' => "Parameter missing", "Data" => $records, 'Responsecode' => 402);
}
print json_encode($response);
?>