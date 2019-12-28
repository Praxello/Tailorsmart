<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response = null;
$records  = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
if (isset($_POST['orderItemId']) && isset($_POST['assignDate'])) {
    
    
    $query        = mysqli_query($conn, "UPDATE customer_order_items_master SET deliveryDate = '$assignDate'  WHERE orderItemId = $orderItemId");
    $rowsAffected = mysqli_affected_rows($conn);
    if ($rowsAffected > 0) {
        
        $response = array(
            'Message' => "Date updated successfully",
            'Responsecode' => 200
        );
    } else {
        $a = mysqli_error($conn);
        if (strpos($a, 'Duplicate') !== false) {
            $response = array(
                "Message" => "Duplicate entry",
                "Responsecode" => 500
            );
        } else {
            $response = array(
                "Message" => mysqli_error($conn) . " No data to change or item not present",
                "Responsecode" => 500
            );
        }
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