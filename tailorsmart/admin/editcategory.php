<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
if (isset($_POST['categorytitle']) && isset($_POST['active']) && isset($_POST['categoryid'])) {

	$tempTitle = mysqli_real_escape_string($conn,$categorytitle);

	
				$query = mysqli_query($conn,"update product_category_master set categoryTitle='$tempTitle', isActive=$active where categoryid=$categoryid");
					if($query==1)
					{
					  			$response = array('Message'=>"Category updated successfully",'Responsecode'=>200);
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