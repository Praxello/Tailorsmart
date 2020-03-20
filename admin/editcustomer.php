<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response = null;
$records  = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");

if (isset($_POST['customerId']) && isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['email']) && isset($_POST['mobile']) && isset($_POST['landline']) && isset($_POST['city']) && isset($_POST['state']) && isset($_POST['country']) && isset($_POST['address']) && isset($_POST['isMale']) && isset($_POST['password']) && isset($_POST['latitude']) && isset($_POST['longitude'])) {
    $empId        = isset($_POST['employeeId']) ? $employeeId : "NULL";
    $gst          = isset($_POST['gst']) ? $_POST['gst'] : 'NULL';
    $date_birth   = isset($_POST['date_birth']) ? $_POST['date_birth'] : 'NULL';
    $sql          = "UPDATE customer_master SET firstName='$firstName',lastName='$lastName',email='$email',date_birth='$date_birth',
mobile='$mobile',landline='$landline',city='$city',state='$state',country='$country',employeeid = $empId,GST='$gst',
address='$address',isMale='$isMale',
password='$password',latitude='$latitude',longitude='$longitude',landmark='$landmark',
isActive='$isActive',issocial='$issocial' WHERE customerId='$customerId'";
    $query        = mysqli_query($conn, $sql);
    $rowsAffected = mysqli_affected_rows($conn);
    if ($rowsAffected > 0) {
        $response = array(
            'Message' => "Customer updated successfully",
            'Responsecode' => 200
        );
    } else {
        $response = array(
            "Message" => mysqli_error($conn) . "No data to change or user not present",
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