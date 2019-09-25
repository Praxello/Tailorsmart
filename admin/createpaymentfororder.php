<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);
date_default_timezone_set("Asia/Kolkata");
$currentDate=date('Y-m-d H:i:s'); //Returns IST
//	customer_order_payments
//paymentId, orderId, paymentType, paymentMode, amount, isSuceed, createdBy, paymentDateTime
date_default_timezone_set("Asia/Kolkata");
if (isset($_POST['orderid']) && isset($_POST['currencyCode']) && isset($_POST['type']) && isset($_POST['mode']) && isset($_POST['amount']) && isset($_POST['employeeid'])  ) {

	$status = 0;
	if($mode == "Cash")
	{
		$status = 1;

	}
			     	$query = mysqli_query($conn,"INSERT INTO customer_order_payments (orderId, paymentType, paymentMode, amount,currency, isSuceed, createdBy, paymentDateTime)  values($orderid,'$type','$mode',$amount,'$currencyCode',$status,$employeeid,'$currentDate')");
					$rowsAffected=mysqli_affected_rows($conn);
						if($rowsAffected > 0)
						{
							//get details of all payments for this orderId
							$response = array('Message'=>"Payment Marked successfully",'Responsecode'=>200);
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
