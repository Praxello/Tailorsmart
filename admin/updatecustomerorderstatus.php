<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
if (isset($_POST['orderId']) && isset($_POST['statusOfOrder']) && isset($_POST['confirmationOfOrder']) && isset($_POST['dateOfExpected']) && isset($_POST['dateOfFinalDelivery']) ) {

				  $query = mysqli_query($conn,"UPDATE customer_order_master SET orderStatus = $statusOfOrder,isConfirmed = $confirmationOfOrder,customerExpectedDate = '$dateOfExpected' ,FinalDeliveryDate = '$dateOfFinalDelivery' WHERE orderId =$orderId");
					$rowsAffected=mysqli_affected_rows($conn);
						if($rowsAffected > 0)
						{
					  			$response = array('Message'=>"Order updated successfully",'Responsecode'=>200);
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
