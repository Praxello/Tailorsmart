<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);
//customer_order_payments
if (isset($_POST['orderid'])) {

    $jobQuery = mysqli_query($conn, "select * from  customer_order_master where orderid=$orderid");
    if ($jobQuery != null) {
        $academicAffected = mysqli_num_rows($jobQuery);
        if ($academicAffected > 0) {
            while ($academicResults = mysqli_fetch_assoc($jobQuery)) {
               
			   //now get all payment records
			   $payments = null;
			    $paymentQuery = mysqli_query($conn, "select * from  customer_order_payments where orderid=$orderid");
				if ($paymentQuery != null) {
					 if ($academicAffected > 0) {
						while ($results = mysqli_fetch_assoc($paymentQuery)) {
							$payments[]=$results;
					}
				}
			   
			   $records = array("OrderDetails"=>$academicResults, "Payments"=>$payments);
            
			   $response = array('Message' => "Payment records fetched successfully", "Data" => $records, 'Responsecode' => 200);
                break;
            }
        } 
    }
	else
	{
					    $response = array('Message' => "No order available",  'Responsecode' => 402);

	}
}
else
{
			    $response = array('Message' => "Parameter missing", "Data" => $records, 'Responsecode' => 402);
}
}
print json_encode($response);
?>