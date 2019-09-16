<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
if (isset($_POST['categoryid']) && isset($_POST['fabrictitle']) && isset($_POST['fabricbrand']) && isset($_POST['fabricdetails'])  && isset($_POST['skuno']) && isset($_POST['fabricprice']) && isset($_POST['releasedate'])&& isset($_POST['active']) && isset($_POST['ispricevariable']) && isset($_POST['hexcolor']) && isset($_POST['colorname']) && isset($_POST['fabrictype']) && isset($_POST['fabricid'])) {


	$tempDetails = mysqli_real_escape_string($conn,$fabricdetails);
	$tempTitle = mysqli_real_escape_string($conn,$fabrictitle);
	$tempBrand = mysqli_real_escape_string($conn,$fabricbrand);

    $sql ="update product_fabric_master set fabricTitle='$tempTitle', fabricBrand = '$tempBrand', fabricDetails ='$tempDetails', skuNo='$skuno', fabricPrice=$fabricprice,releasedate='$releasedate', ispricevariable = $ispricevariable,isActive=$active, hexcolor='$hexcolor',colorname = '$colorname',fabrictype= '$fabrictype',categoryid = $categoryid where fabricid = $fabricid";
    // echo $sql;
				$query = mysqli_query($conn,$sql);
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
