<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
if (isset($_POST['styleid']) && isset($_POST['substyleid']) && isset($_POST['isgroup']) && isset($_POST['active']) ) {

				$query = mysqli_query($conn,"insert into product_parent_master(styleid,substyleid,isgroup,isactive) values($styleid,$substyleid,$isgroup,$active)");
					if($query==1)
					{
					  			$response = array('Message'=>"New product parent created successfully",'Responsecode'=>200);
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
