
<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
if (isset($_POST['stitchSubStyleId']) &&   isset($_POST['stitchSubStyleTitle']) && isset($_POST['stitchStyleId']) ) {

	$tempTitle = mysqli_real_escape_string($conn,$stitchSubStyleTitle);
        $sql ="update stitch_style_details_template_master set stitchSubStyleTitle ='$tempTitle', stitchStyleId = '$stitchStyleId' where stitchSubStyleId = '$stitchSubStyleId'";

				$query = mysqli_query($conn,$sql);
					$rowsAffected=mysqli_affected_rows($conn);
						if($rowsAffected > 0)
						{
					  			$response = array('Message'=>"Item updated successfully",'Responsecode'=>200);
						}
					else
					{
						$a = mysqli_error($conn);
						if (strpos($a, 'Duplicate') !== false) {
								$response=array("Message"=> "Duplicate entry","Responsecode"=>500);
							}
							else
							{
							$response=array("Message"=> mysqli_error($conn)." No data to change or item not present","Responsecode"=>500);
							}
					}
}
else
{
		    $response = array('Message' => "Parameter missing", "Data" => $records, 'Responsecode' => 402);
}
print json_encode($response);
?>
