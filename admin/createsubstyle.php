<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
if (isset($_POST['substyletitle']) && isset($_POST['active'])) {

	$tempTitle = mysqli_real_escape_string($conn,$substyletitle);

	
				$query = mysqli_query($conn,"insert into product_substyle_master(substyletitle, isActive) values( '$tempTitle',$active)");
					if($query==1)
					{
					  			$response = array('Message'=>"New Substyle created successfully",'Responsecode'=>200);
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