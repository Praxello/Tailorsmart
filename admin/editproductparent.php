<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
if (isset($_POST['styleId']) && isset($_POST['subStyleId']) && isset($_POST['isGroup']) && isset($_POST['isActive']) && isset($_POST['parentId']) ) {

        $sql= "update product_parent_master set styleid= '$styleId', substyleid = '$subStyleId' , isgroup = '$isGroup', isActive = '$isActive' where parentId=$parentId";
				// echo $sql;
				$query = mysqli_query($conn,$sql) or die(mysqli_error($conn));

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
