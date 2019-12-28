<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response = null;
$records  = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
if (isset($_POST['postdata'])) {
    $someArray = json_decode($postdata, true);
    //    print_r($someArray);        // Dump all data of the Array
    
    $productId = $someArray["productId"];
    
    //first delete mapping
    $query = mysqli_query($conn, "DELETE FROM  product_fabric_mapping_master WHERE productId = $productId");
    
    $measurmentItems = $someArray["fabricId"];
    foreach ($measurmentItems as $key => $value) {
        $measurementId    = $measurmentItems[$key]['fabricId'];
        $measurementValue = $measurmentItems[$key]['value'];
        
        $query = mysqli_query($conn, "INSERT INTO product_fabric_mapping_master(productId, fabricid,mappedFabricPrice) values( $productId,$measurementId,'$measurementValue')");
        if ($query == 1) {
            $last_id  = mysqli_insert_id($conn);
            $s        = strval($last_id);
            $response = array(
                'Message' => "Mapping updated successfully",
                'Responsecode' => 200,
                'RowId' => $last_id
            );
        } else {
            $a = mysqli_error($conn);
            if (strpos($a, 'Duplicate') !== false) {
                $response = array(
                    "Message" => "One or many duplicate combination of Product - Fabric",
                    "Responsecode" => 500
                );
            } else {
                $response = array(
                    "Message" => mysqli_error($conn) . " No data to change or item not present",
                    "Responsecode" => 500
                );
            }
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