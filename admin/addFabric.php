<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response = null;
$records  = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
$dir = "../mobileimages/fabric/300x300/";
//`categoryId`, `fabricTitle`, `fabricBrand`, `fabricDetails`, `skuNo`, `fabricPrice`, `releaseDate`, `isPriceVariable`, `hexColor`, `colorName`, `fabricType`, `isActive`
if (isset($_POST['productId']) && isset($_POST['fabricTitle']) && isset($_POST['fabricBrand']) && isset($_POST['fabricDetails']) && isset($_POST['skuNo']) && isset($_POST['fabricPrice']) ) {
    
    $tempDetails = mysqli_real_escape_string($conn, $fabricDetails);
    $tempTitle   = mysqli_real_escape_string($conn, $fabricTitle);
    $tempBrand   = mysqli_real_escape_string($conn, $fabricBrand);
    $categoryId  = 1;
    $releaseDate = date('Y-m-d');
    $isPriceVariable = 1;
    $hexColor = '#000000';
    $colorName = 'Dark brown';
    $fabricType = 'Worsted';
    $isActive = 1;
    $ownerid = 1;
    $abc=0;
    $query = mysqli_query($conn, "insert into product_fabric_master(fabricTitle, fabricBrand, fabricDetails,ownerid, skuNo,fabricPrice,releaseDate, isPriceVariable,isActive, categoryId,hexColor,colorName)values( '$tempTitle', '$tempDetails', '$tempBrand', '$ownerid', '$skuNo', '$fabricPrice','$releaseDate', '$isPriceVariable','$isActive','$categoryId','$hexColor','$colorName')");
    if ($query == 1) {
        $last_id  = mysqli_insert_id($conn);
        $s        = strval($last_id);
        mysqli_query($conn, "INSERT INTO product_fabric_mapping_master(productId, fabricId) VALUES($productId,'$s')");
        if (isset($_FILES["userPic"]["type"])) {
            $imgname    = $_FILES["userPic"]["name"];
            $sourcePath = $_FILES['userPic']['tmp_name']; // Storing source path of the file in a variable
            $targetPath = $dir . $skuNo  . ".jpg"; // Target path where file is to be stored
            move_uploaded_file($sourcePath, $targetPath);
            $abc=2;
           }else{
               $abc=1;
           }
        $response = array(
            'Message' => "New fabric created successfully",
            'Responsecode' => 200,
            'RowId' => $last_id,
            'abc'=>$abc
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