<?php
     include "../connection.php";
	 mysqli_set_charset($conn,'utf8');
	 $response=null;
	$records = null;
	$generatedCardId = null;
	 if(isset($_POST['customerid']) && isset($_POST['vehicleno']))
	 {
			extract($_POST);
			$query = mysqli_query($conn,"insert into customer_car_master(customerid,vehicleno) values($customerid,'$vehicleno')");
	
			if($query==1){
				$out = array('Message'=>"Vehicle registration successfull",'Responsecode'=>200);
					 $academicQuery = mysqli_query($conn,"select * from customer_car_master where customerid=$customerid and isactive=1");
						if($academicQuery!=null)
						{
							$academicAffected=mysqli_num_rows($academicQuery);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($academicQuery))
									{
										$records[]=$academicResults;
										if($academicResults["vehicleNo"] == $vehicleno)
										{
											$generatedCardId = $academicResults["carId"];
											
										}
									}
							}
								$out = array('Message'=>"Vehicle registration successful".mysqli_error($conn),"Data"=>$records,"CardId"=>$generatedCardId,'Responsecode'=>200);	
						}
			}
			else{
				$out = array('Message'=>"Vehicle registration failed - ".mysqli_error($conn),'Responsecode'=>403);	
			}
	 }
			else
			{
				$out=array("Message"=> "Check query parameters".mysqli_error($conn),"Responsecode"=>403);
			}
	 print json_encode($out);
?>