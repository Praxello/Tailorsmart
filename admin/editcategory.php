<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
if (isset($_POST['categoryTitle']) && isset($_POST['isActive']) && isset($_POST['categoryId'])) {


	$tempTitle = mysqli_real_escape_string($conn,$categoryTitle);
	$checkexistquery = mysqli_query($conn,"SELECT categoryId from product_category_master where categoryTitle='$tempTitle'");
	$rowcount=mysqli_num_rows($checkexistquery);
	if($rowcount < 1)
	{

				$query = mysqli_query($conn,"update product_category_master set categoryTitle='$tempTitle', isActive=$isActive where categoryid=$categoryId");
					if($query==1)
					{
					  			$response = array('Message'=>"Category updated successfully",'Responsecode'=>200);
					}
					else
					{
						$response=array("Message"=> mysqli_error($conn)." failed","Responsecode"=>500);
					}
	}
	else {
	$response=array("Message"=> "Duplicate Category  Entry ","Responsecode"=>500);
	}
}
else
{
		    $response = array('Message' => "Parameter missing", "Data" => $records, 'Responsecode' => 402);
}
print json_encode($response);
?>
