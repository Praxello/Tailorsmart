<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
     include "../connection.php";
	 mysqli_set_charset($conn,'utf8');
	 $response=null;

	 extract($_POST);

	        $records =null;
          if (isset($_POST['orderItemId'])){
            $sql = "SELECT remarks,orderItemId,DATE_FORMAT(requestDateTime, '%M %d %Y') as requestDateTime FROM request_for_alteration WHERE orderItemId=$orderItemId";
            $academicQuery = mysqli_query($conn,$sql);
  						if($academicQuery!=null)
  						{
  							$academicAffected=mysqli_num_rows($academicQuery);
  							if($academicAffected>0)
  							{
  								while($academicResults = mysqli_fetch_assoc($academicQuery))
  									{
  										$records[]=$academicResults;
  									}
  							$response = array('Message'=>"All data fetched successfully".mysqli_error($conn),"Data"=>$records,'Responsecode'=>200);
  							}
  							else
  							{
  									$response = array('Message'=>"No data availalbe".mysqli_error($conn),"Data"=> $records,'Responsecode'=>403);
  							}
  						}
  						else{
  									$response = array('Message'=>"No data availalbe".mysqli_error($conn),"Data"=> $records,'Responsecode'=>403);
  							}
          }

	 print json_encode($response);
?>
