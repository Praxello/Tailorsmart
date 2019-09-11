<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
if (isset($_POST['styleid']) && isset($_POST['substyleid']) && isset($_POST['isgroup']) && isset($_POST['active']) && isset($_POST['parentid']) ) {

	
				$query = mysqli_query($conn,"update product_parent_master set styleid= $styleid, substyleid = $substyleid , isgroup = $isgroup, isActive = $active where parentid=$parentid");
					$rowsAffected=mysqli_affected_rows($conn);
						if($rowsAffected > 0)
						{
					  			$response = array('Message'=>"Product parent updated successfully",'Responsecode'=>200);
						}
						else
						{	
					$a = mysqli_error($conn);
						if (strpos($a, 'Duplicate') !== false) {
								$response=array("Message"=> "Duplicate combination of Style - Substyle","Responsecode"=>500);					
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