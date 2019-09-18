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
if (isset($_POST['categoryid']) && isset($_POST['parentid']) && isset($_POST['producttitle']) && isset($_POST['productsubtitle']) && isset($_POST['productdetails']) && isset($_POST['price']) && isset($_POST['skuno']) && isset($_POST['releasedate'])&& isset($_POST['ownerid'])&& isset($_POST['sequenceno']) && isset($_POST['active'])  && isset($_POST['ispricevariable'])) {

	$tempDetails = mysqli_real_escape_string($conn,$productdetails);
	$tempTitle = mysqli_real_escape_string($conn,$producttitle);
	$tempSubtitle = mysqli_real_escape_string($conn,$productsubtitle);
	
	
 			$query = mysqli_query($conn,"insert into product_master(categoryId,productTitle, productSubTitle, productDetails, price, releaseDate, ownerId, sequenceNo, isPriceVariable, isActive,skuno,parentid) values( $categoryid, '$tempTitle','$tempSubtitle', '$tempDetails', $price, '$releasedate', $ownerid, $sequenceno, $ispricevariable,$active, '$skuno',$parentid)");
					if($query==1)
					{
					  			$response = array('Message'=>"New product created successfully",'Responsecode'=>200);
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