<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");

if (isset($_POST['categoryId']) && isset($_POST['fabricTitle']) && isset($_POST['ownerid'])  && isset($_POST['fabricBrand']) && isset($_POST['fabricDetails'])&& isset($_POST['skuNo']) && isset($_POST['fabricPrice']) && isset($_POST['releaseDate'])&& isset($_POST['isActive'])&& isset($_POST['isPriceVariable']) && isset($_POST['hexColor']) && isset($_POST['colorName']) && isset($_POST['fabricType'])  && isset($_POST['fabricId'])) {


	$tempDetails = mysqli_real_escape_string($conn,$fabricDetails);
	$tempTitle = mysqli_real_escape_string($conn,$fabricTitle);
	$tempBrand = mysqli_real_escape_string($conn,$fabricBrand);

				$query = mysqli_query($conn,"update product_fabric_master set fabricTitle='$tempTitle', fabricBrand = '$tempBrand', fabricDetails ='$tempDetails',ownerid='$ownerid', skuNo='$skuNo',fabricPrice='$fabricPrice',releaseDate='$releaseDate', isPriceVariable = '$isPriceVariable',isActive='$isActive', hexColor='$hexColor',colorName = '$colorName',fabricType= '$fabricType',categoryId = '$categoryId' where fabricId = $fabricId");
					$rowsAffected=mysqli_affected_rows($conn);
						if($rowsAffected > 0)
						{
					  			$response = array('Message'=>"Fabric updated successfully",'Responsecode'=>200);
						}
						else
						{
							$response=array("Message"=> mysqli_error($conn)."No data to change or user not present","Responsecode"=>500);
						}
}
else
{
		    $response = array('Message' => "Parameter missing", "Data" => $records, 'Responsecode' => 402);
}
print json_encode($response);
?>
