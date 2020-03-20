<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response = null;

$records       = null;
$academicQuery = mysqli_query($conn, "SELECT * FROM customer_master WHERE isActive=1 ORDER BY customerId DESC");
if ($academicQuery != null) {
    $academicAffected = mysqli_num_rows($academicQuery);
    if ($academicAffected > 0) {
        while ($academicResults = mysqli_fetch_assoc($academicQuery)) {
            $records[] = $academicResults;
        }
        $response = array(
            'Message' => "All data fetched successfully" . mysqli_error($conn),
            "Data" => $records,
            'Responsecode' => 200
        );
    } else {
        $response = array(
            'Message' => "No data availalbe" . mysqli_error($conn),
            "Data" => $records,
            'Responsecode' => 403
        );
    }
} else {
    $response = array(
        'Message' => "No data availalbe" . mysqli_error($conn),
        "Data" => $records,
        'Responsecode' => 403
    );
}
mysqli_close($conn);
print json_encode($response);
?>
