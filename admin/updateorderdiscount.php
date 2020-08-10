<?php header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records=null;
extract($_POST);
date_default_timezone_set("Asia/Kolkata");
if (isset($_POST['orderId']) && isset($_POST['discount'])) {
    $query=mysqli_query($conn, "UPDATE customer_order_master SET discount = $discount WHERE orderId =$orderId");
    $rowsAffected=mysqli_affected_rows($conn);
    if($rowsAffected > 0) {
        $response=array('Message'=>'Updated records', 'Responsecode'=> 200);
    }
    else {
        $response=array('Message'=> "No data change", 'Responsecode'=> 402);
    }
}
else {
    $response=array('Message'=> "Parameter missing", 'Responsecode'=> 404);
}
mysqli_close($conn);
print json_encode($response);
?>