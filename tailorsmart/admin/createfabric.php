<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");

//`categoryId`, `fabricTitle`, `fabricBrand`, `fabricDetails`, `skuNo`, `fabricPrice`, `releaseDate`, `isPriceVariable`, `hexColor`, `colorName`, `fabricType`, `isActive`
if (isset($_POST['categoryid']) && isset($_POST['fabrictitle']) && isset($_POST['fabricbrand']) && isset($_POST['fabricdetails'])  && isset($_POST['skuno']) && isset($_POST['fabricprice']) && isset($_POST['releasedate'])&& isset($_POST['active']) && isset($_POST['ispricevariable']) && isset($_POST['hexcolor']) && isset($_POST['colorname']) && isset($_POST['fabrictype'])) {

	$tempDetails = mysqli_real_escape_string($conn,$fabricdetails);
	$tempTitle = mysqli_real_escape_string($conn,$fabrictitle);
	$tempBrand = mysqli_real_escape_string($conn,$fabricbrand);
	
				$query = mysqli_query($conn,"insert into product_fabric_master(fabricTitle, fabricBrand, fabricDetails, skuNo, fabricPrice,releasedate, ispricevariable,isActive, categoryid,hexcolor,colorname,fabrictype) values( '$tempTitle', '$tempDetails', '$tempBrand', '$skuno', $fabricprice,'$releasedate', $ispricevariable,$active,$categoryid,'$hexcolor','$colorname','$fabrictype')");
					if($query==1)
					{
					  			$response = array('Message'=>"New fabric created successfully",'Responsecode'=>200);
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