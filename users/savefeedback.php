<?php

include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

if (isset($_POST['customerid'])  && isset($_POST['rate1'])  && isset($_POST['rate2'])  && isset($_POST['rate3'])  && isset($_POST['rate4']) && isset($_POST['feedback'])) {


 	$tempFeedback = mysqli_real_escape_string($conn,$feedback);
			$query = mysqli_query($conn,"insert into feedback_master(ownerid,rate1,rate2,rate3,rate4,feedback) values ($customerid,$rate1,$rate2,$rate3,$rate4,'$tempFeedback')");
					if($query==1)
					{
					//  $response=array("Message"=> "Please upload the photo now","Responsecode"=>200);	
					  			$response = array('Message'=>"Feedback submitted successfully",'Responsecode'=>200);
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