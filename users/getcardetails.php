<?php
     include "../connection.php";
	 mysqli_set_charset($conn,'utf8');
	 $response=null;
	 $subscriptionRecords=null;
	 $accountDetails=null;
	 $completedRecords = null;
	 $serviceRecords = null;
	 
	 
	 extract($_POST);
	 	
	 if(isset($_POST['customerid']) && isset($_POST['vehicleno']))
	 {
			//all service done records individual
				$query = mysqli_query($conn,"SELECT COUNT(scm.serviceid) , sm.servicetitle, sm.serviceid, tm.transactionid FROM service_completion_master scm INNER JOIN transaction_master tm ON tm.transactionid = scm.transactionid INNER JOIN service_master sm ON sm.serviceid = scm.serviceid WHERE tm.userid =$customerid AND tm.isactive =1 GROUP BY sm.servicetitle");
						if($query!=null)
						{
							$academicAffected=mysqli_num_rows($query);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($query))
									{
										//service id and transaction id pair 
										$key = $academicResults["serviceid"]."-".$academicResults["transactionid"]; 
										$completedRecords["$key"]= $academicResults["COUNT(scm.serviceid)"];
									}
							}
						}
						
						
				
				 $query = mysqli_query($conn,"SELECT sm.serviceid,tm.transactionid , ccm.vehicleno, sm.servicetitle, csm.quota FROM customer_subscription_master csm inner join transaction_master tm on csm.transactionid = tm.transactionid inner join  service_master sm on  csm.serviceid = sm.serviceid inner join customer_car_master ccm on ccm.carid = tm.carid where tm.userid = $customerid and tm.isactive = 1");
						if($query!=null)
						{
							//service id and transaction id pair 
									
							$academicAffected=mysqli_num_rows($query);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($query))
									{
										$key = $academicResults["serviceid"]."-".$academicResults["transactionid"]; 
							
										$remaining = 0;
										//if($completedRecords["$key"]!=null)
										{
											if(array_key_exists("$key",$completedRecords))
											{
											$remaining = $completedRecords["$key"];
											}
										}
										$subscriptionRecords[]=array("VehcileNo"=> $academicResults["vehicleno"], "ServiceTitle"=>$academicResults["servicetitle"], "Quota"=>$academicResults["quota"], "Done"=>$remaining);
									}
							}
						}
						
			
			
			//all quota records
 
			$query = mysqli_query($conn,"SELECT ccm.vehicleno, tm.purchasetype, tm.total, tm.serviceStartDate, tm.serviceEndDate FROM  transaction_master tm  inner join  customer_car_master ccm on ccm.carid = tm.carid where tm.isactive = 1 and tm.userid = $customerid");
						if($query!=null)
						{
							$academicAffected=mysqli_num_rows($query);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($query))
									{
										$accountDetails[]=$academicResults;
									}
							}
						}
									
						
					$response = array('Message'=>"Summary fetched successfully","ServiceDetails"=>$serviceRecords,"Account"=>$accountDetails,"Quota"=>$subscriptionRecords,'Responsecode'=>200);	
	 }
		else
			{
				$response=array("Message"=> "Check query parameters".mysqli_error($conn),"Responsecode"=>403);
			}
	print json_encode($response,JSON_UNESCAPED_UNICODE);
?>