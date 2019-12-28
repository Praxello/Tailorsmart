<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response = null;
$records  = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");

//`categoryId`, `fabricTitle`, `fabricBrand`, `fabricDetails`, `skuNo`, `fabricPrice`, `releaseDate`, `isPriceVariable`, `hexColor`, `colorName`, `fabricType`, `isActive`
if (isset($_POST['categoryId']) && isset($_POST['fabricTitle']) && isset($_POST['fabricBrand']) && isset($_POST['ownerid']) && isset($_POST['fabricDetails']) && isset($_POST['skuNo']) && isset($_POST['fabricPrice']) && isset($_POST['releaseDate']) && isset($_POST['isActive']) && isset($_POST['isPriceVariable']) && isset($_POST['hexColor']) && isset($_POST['colorName'])) {
    
    $tempDetails = mysqli_real_escape_string($conn, $fabricDetails);
    $tempTitle   = mysqli_real_escape_string($conn, $fabricTitle);
    $tempBrand   = mysqli_real_escape_string($conn, $fabricBrand);
    
    $query = mysqli_query($conn, "insert into product_fabric_master(fabricTitle, fabricBrand, fabricDetails,ownerid, skuNo,fabricPrice,releaseDate, isPriceVariable,isActive, categoryId,hexColor,colorName)values( '$tempTitle', '$tempDetails', '$tempBrand', '$ownerid', '$skuNo', '$fabricPrice','$releaseDate', '$isPriceVariable','$isActive','$categoryId','$hexColor','$colorName')");
    if ($query == 1) {
        $last_id  = mysqli_insert_id($conn);
        $s        = strval($last_id);
        $response = array(
            'Message' => "New fabric created successfully",
            'Responsecode' => 200,
            'RowId' => $last_id
        );
    } else {
        $response = array(
            "Message" => mysqli_error($conn) . " failed",
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