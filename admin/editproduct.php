<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

  //productId, categoryId, styleId, subStyleId, productTitle, productSubTitle, productDetails, price, releaseDate, ownerId, sequenceNo, isPriceVariable, isActive
if (isset($_POST['productId']) && isset($_POST['categoryId']) && isset($_POST['parentId'])  && isset($_POST['skuNo']) && isset($_POST['productTitle']) && isset($_POST['productSubTitle']) && isset($_POST['productDetails']) && isset($_POST['price']) && isset($_POST['releaseDate'])&& isset($_POST['ownerId'])&& isset($_POST['sequenceNo']) && isset($_POST['isActive'])  && isset($_POST['isPriceVariable'])) {

	$tempDetails = mysqli_real_escape_string($conn,$productDetails);
	$tempTitle = mysqli_real_escape_string($conn,$productTitle);
	$tempSubtitle = mysqli_real_escape_string($conn,$productSubTitle);

					$query = mysqli_query($conn,"update product_master set categoryId = $categoryId,productTitle = '$tempTitle',productSubTitle = '$tempSubtitle', productDetails ='$tempDetails', price=$price, releaseDate='$releaseDate',ownerId=$ownerId , sequenceNo=$sequenceNo , isPriceVariable = '$isPriceVariable', isActive ='$isActive', skuno='$skuNo',parentid='$parentId' where productId=$productId");
						$rowsAffected=mysqli_affected_rows($conn);
						if($rowsAffected > 0)
						{
					  			$response = array('Message'=>"Product updated successfully",'Responsecode'=>200);
						}
						else
						{
							$response=array("Message"=> mysqli_error($conn)."No data to change or product not present","Responsecode"=>500);
						}
}
else
{
		    $response = array('Message' => "Parameter missing", "Data" => $records, 'Responsecode' => 402);
}
print json_encode($response);
?>
