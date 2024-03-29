<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
if(isset($_POST['stitchSubStyleTitle']) &&  isset($_POST['stitchStyleId']))
{

	$tempTitle = mysqli_real_escape_string($conn,$stitchSubStyleTitle);

// stitchStyleTitle, stitchStyleDetails, stitchStyleType, isActive
				$query = mysqli_query($conn,"insert into stitch_style_details_template_master(stitchStyleId, stitchSubStyleTitle) values($stitchStyleId,'$tempTitle')");
					if($query==1)
					{
									$last_id = mysqli_insert_id($conn);
					 				$s = strval($last_id);
					  			$response = array('Message'=>"New item created successfully",'Responsecode'=>200,'RowId'=>$last_id);
					}
					else
					{
						$a = mysqli_error($conn);
						if (strpos($a, 'Duplicate') !== false) {
								$response=array("Message"=> "Duplicate entry","Responsecode"=>500);
							}
							else
							{
							$response=array("Message"=> mysqli_error($conn)." or No data to change or item not present","Responsecode"=>500);
							}
					}
}
else
{
		    $response = array('Message' => "Parameter missing", "Data" => $records, 'Responsecode' => 402);
}
print json_encode($response);
?>
