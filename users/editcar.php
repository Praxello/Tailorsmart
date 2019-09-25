<?php
     include "../connection.php";
	 mysqli_set_charset($conn,'utf8');
	 $response=null;
	 $records=null;
	 $visitId=null;
	
	  
	 if(isset($_POST['carid']) && isset($_POST['vehicleno']) && isset($_POST['customerid']))
	 {
		 	 extract($_POST);
		
		 	$query = mysqli_query($conn,"update  customer_car_master set vehicleNo ='$vehicleno' where carid=$carid");
			$rowsAffected=mysqli_affected_rows($conn);
				if($rowsAffected == 1)
				{
				
					//now load all details
					$academicQuery = mysqli_query($conn,"select * from customer_car_master where customerId=$customerid and isactive=1");
						if($academicQuery!=null)
						{
							$academicAffected=mysqli_num_rows($academicQuery);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($academicQuery))
									{
										$records[]=$academicResults;
									}
							$response = array('Message'=>"Vehicle updated".mysqli_error($conn),"Data"=>$records,'Responsecode'=>200);	
							}
							else
							{
									$response = array('Message'=>"Vehicle updated".mysqli_error($conn),"Data"=> $records,'Responsecode'=>200);	
				
							}
						}
				}
				else
				{
					$response = array('Message'=>"Vehicle updated".mysqli_error($conn),"Data"=> $records,'Responsecode'=>200);	
				}
	 }
	 else
	 {
		$response=array("Message"=> "Parameters missing","Responsecode"=>403);
	 }
	 print json_encode($response);
?>