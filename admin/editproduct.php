<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

  //productId, categoryId, styleId, subStyleId, productTitle, productSubTitle, productDetails, price, releaseDate, ownerId, sequenceNo, isPriceVariable, isActive
if (isset($_POST['productid']) && isset($_POST['categoryid']) && isset($_POST['parentid'])  && isset($_POST['skuno']) && isset($_POST['producttitle']) && isset($_POST['productsubtitle']) && isset($_POST['productdetails']) && isset($_POST['price']) && isset($_POST['releasedate'])&& isset($_POST['ownerid'])&& isset($_POST['sequenceno']) && isset($_POST['active'])  && isset($_POST['ispricevariable'])) {

	$tempDetails = mysqli_real_escape_string($conn,$productdetails);
	$tempTitle = mysqli_real_escape_string($conn,$producttitle);
	$tempSubtitle = mysqli_real_escape_string($conn,$productsubtitle);
	
					$query = mysqli_query($conn,"update product_master set categoryId = $categoryid , productTitle = '$tempTitle', productSubTitle = '$tempSubtitle', productDetails ='$tempDetails', price=$price, releaseDate='$releasedate',ownerId=$ownerid , sequenceNo=$sequenceno , isPriceVariable = $ispricevariable, isActive = $active, skuno='$skuno',parentid=$parentid where productid=$productid");
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