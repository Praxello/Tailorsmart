<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

 date_default_timezone_set("Asia/Kolkata");
 $currentDate=date('Y-m-d H:m:s'); //Returns IST
// `parentId`, `categoryId`, `productTitle`, `productSubTitle`, `productDetails`, `price`, `skuNo`, `releaseDate`, `ownerId`, `sequenceNo`, `isPriceVariable`, `isActive`
if (isset($_POST['categoryId']) && isset($_POST['parentId']) && isset($_POST['productTitle']) && isset($_POST['productSubTitle'])&& isset($_POST['productDetails']) && isset($_POST['price']) && isset($_POST['skuNo']) && isset($_POST['releaseDate'])&& isset($_POST['ownerId'])&& isset($_POST['sequenceNo']) && isset($_POST['isActive'])  && isset($_POST['isPriceVariable'])) {

	$tempDetails = mysqli_real_escape_string($conn,$productDetails);
	$tempTitle = mysqli_real_escape_string($conn,$productTitle);
	$tempSubtitle = mysqli_real_escape_string($conn,$productSubTitle);


 			$query = mysqli_query($conn,"insert into product_master(categoryId,productTitle, productSubTitle, productDetails,price, releaseDate, ownerId, sequenceNo, isPriceVariable, isActive,skuNo,parentId)values( $categoryId, '$tempTitle','$tempSubtitle', '$tempDetails', $price, '$releaseDate','$ownerId', '$sequenceNo', '$isPriceVariable','$isActive', '$skuNo',$parentId)");
					if($query==1)
					{
                  $last_id = mysqli_insert_id($conn);
                  $s = strval($last_id);
					  			$response = array('Message'=>"New product created successfully",'Responsecode'=>200,'RowId'=>$last_id);
					}
					else
					{
						$response=array("Message"=> mysqli_error($conn)." failed","Responsecode"=>500);
					}
}
else
{
		    $response = array('Message' => "Parameter missing", "Data" => $records, 'Responsecode' => 402);
}
print json_encode($response);
?>
