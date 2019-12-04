<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response = null;
$records  = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
if (isset($_POST['orderId'])) {
    $query        = mysqli_query($conn, "DELETE FROM customer_order_master WHERE orderId= $orderId");
    $rowsAffected = mysqli_affected_rows($conn);
    if ($rowsAffected > 0) {
        $response = array(
            'Message' => "Order deleted successfully",
            'Responsecode' => 200
        );
    } else {
        
        $response = array(
            "Message" => mysqli_error($conn) . " No data to change or item not present",
            "Responsecode" => 500
        );
        
    }
} else {
    $response = array(
        'Message' => "Parameter missing",
        "Data" => $records,
        'Responsecode' => 402
    );
}
mysqli_close($conn);
print json_encode($response);
?>