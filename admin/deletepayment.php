<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
if (isset($_POST['paymentid']) && isset($_POST['employeeid'])) {
				$query = mysqli_query($conn,"update customer_order_payments set isdeleted=1 , deletedby=$employeeid where paymentid=$paymentid");
					$rowsAffected=mysqli_affected_rows($conn);
						if($rowsAffected > 0)
						{
					  			$response = array('Message'=>"Payment deleted successfully",'Responsecode'=>200);
						}
						else
						{	
							$response=array("Message"=> mysqli_error($conn)."No data to change or user not present","Responsecode"=>500);					
						}
}
else
{
		    $response = array('Message' => "Parameter missing", "Data" => $records, 'Responsecode' => 402);
}
print json_encode($response);
?>