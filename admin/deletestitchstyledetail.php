<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
if (isset($_POST['stitchsubstyleId']) ) {

				$query = mysqli_query($conn,"DELETE FROM stitch_style_details_template_master WHERE stitchSubStyleId = $stitchsubstyleId");
					if($query==1)
					{
					  			$response = array('Message'=>"Delete Stitch Style Detail successfully",'Responsecode'=>200);
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
