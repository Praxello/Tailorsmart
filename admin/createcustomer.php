<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response = null;
$records  = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");

if (isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['mobile']) && isset($_POST['landline']) && isset($_POST['city']) && isset($_POST['state']) && isset($_POST['country']) && isset($_POST['address']) && isset($_POST['isMale']) && isset($_POST['password']) && isset($_POST['latitude']) && isset($_POST['longitude'])) {
    $empId      = isset($_POST['employeeid']) ? $employeeid : "NULL";
    $date_birth = isset($_POST['date_birth']) ? $_POST['date_birth'] : 'NULL';
    $gst        = isset($_POST['gst']) ? $_POST['gst'] : 'NULL';
    $sql        = "INSERT INTO customer_master(firstName, lastName, email, date_birth, mobile, landline, city, state, country, address, isMale, 
password, latitude, longitude, landmark, isActive, issocial,employeeid,GST)
VALUES ('$firstName', '$lastName', '$email', '$date_birth', '$mobile', '$landline', '$city', '$state', '$country', '$address', 
'$isMale', '$password', '$latitude','$longitude','$landmark','$isActive','$issocial','$empId','$gst')";
    $query      = mysqli_query($conn, $sql);
    if ($query == 1) {
        $last_id  = mysqli_insert_id($conn);
        $s        = strval($last_id);
        $response = array(
            'Message' => "New Customer created successfully",
            'Responsecode' => 200,
            'RowId' => $last_id
        );
    } else {
        $response = array(
            "Message" => mysqli_error($conn) . " Already Exists",
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
print json_encode($response);
?>