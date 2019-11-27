<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response = null;

extract($_POST);
if (isset($_POST['customerId']) && isset($_POST['productId'])) {
    $records       = null;
    $sql           = "SELECT * FROM customer_products_measurments WHERE customerId = $customerId AND productId = $productId";
    $academicQuery = mysqli_query($conn, $sql);
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
} else {
    $response = array(
        'Message' => "Parameter Missing",
        'Responsecode' => 403
    );
}
mysqli_close($conn);
print json_encode($response);
?> 