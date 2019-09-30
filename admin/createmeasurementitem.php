
<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
if (isset($_POST['itemTitle']) && isset($_POST['isActive'])) {

	     $tempTitle = mysqli_real_escape_string($conn,$itemTitle);
				$query = mysqli_query($conn,"insert into measurement_item_master(itemTitle, isActive) values( '$tempTitle',$isActive)");
					if($query==1)
					{
						$last_id = mysqli_insert_id($conn);
						$s = strval($last_id);
					  $response = array('Message'=>"New style created successfully",'Responsecode'=>200,'RowId'=>$last_id);
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
