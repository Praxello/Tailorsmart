<?php
     include "../connection.php";
	 mysqli_set_charset($conn,'utf8');
	 $response=null;
	 $records=null;
	 $visitId=null;
	 extract($_POST);
	  
	 if(isset($_POST['carid']) && isset($_POST['customerid']))
	 {
		 //check if this car is having any active transaction
		 
		  $checkQuotaQuery = mysqli_query($conn,"select * from transaction_master where carid=$carid and isactive = 1");
		 if ($checkQuotaQuery != null) {
        $rowsAffected = mysqli_num_rows($checkQuotaQuery);
        if ($rowsAffected > 0)
		{
				$response = array('Message'=>"You have an active plan on this car".mysqli_error($conn),"Data"=> $records,'Responsecode'=>403);	
		}
		else
		{
			$query = mysqli_query($conn,"update customer_car_master set isactive= 0 where carid=$carid");
			$rowsAffected=mysqli_affected_rows($conn);
				if($rowsAffected==1)
				{
					//now load all details
					$academicQuery = mysqli_query($conn,"select * from customer_car_master where customerid=$customerid and isactive=1");
						if($academicQuery!=null)
						{
							$academicAffected=mysqli_num_rows($academicQuery);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($academicQuery))
									{
										$records[]=$academicResults;
									}
						//	$response = array('Message'=>"Vehicle deleted".mysqli_error($conn),"Data"=>$records,'Responsecode'=>200);	
							}
							
						}
							
						$response = array('Message'=>"Vehicle deleted".mysqli_error($conn),"Data"=>$records,'Responsecode'=>200);	
				}
				else
				{
					$response = array('Message'=>"Vehicle already deleted".mysqli_error($conn),"Data"=> $records,'Responsecode'=>200);	
				}
		}
		 
		 
		 }
		 
		
	 }
	 else
	 {
		$response=array("Message"=> "Parameters missing","Responsecode"=>403);
	 }
	 print json_encode($response);
?>