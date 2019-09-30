<?php
     include "../connection.php";
	 mysqli_set_charset($conn,'utf8');
	 $response=null;
	 $subscriptionRecords=null;
	 $accountDetails=null;
	 $completedRecords = null;
	 $serviceRecords = null;
	 
	 
	 extract($_POST);
	 	
	 if(isset($_POST['customerid']))
	 {
			//all service done records individual
				$query = mysqli_query($conn,"SELECT scm.serviceid , sm.servicetitle, sm.serviceid, tm.transactionid FROM service_completion_master scm INNER JOIN transaction_master tm ON tm.transactionid = scm.transactionid INNER JOIN service_master sm ON sm.serviceid = scm.serviceid WHERE tm.userid =$customerid AND tm.isactive =1");
						if($query!=null)
						{
							$academicAffected=mysqli_num_rows($query);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($query))
									{	
										//service id and transaction id pair 
										$key = $academicResults["serviceid"]."-".$academicResults["transactionid"]; 
										
										if(isset($completedRecords["$key"]))
										{
											$count = $completedRecords["key"];
											$count = $count+1;
											$completedRecords["$key"] = $count;
										}
										else
										{
										$completedRecords["$key"]= 1;
										}
									}
							}
						}
						
				
				
					//list of person who done service with time
				
					$query = mysqli_query($conn,"SELECT um.firstname, um.lastname,ccm.vehicleno, scm.`serviceDateTime`,sm.servicetitle FROM `service_completion_master` scm inner join transaction_master tm on scm.transactionid = tm.transactionid inner join customer_car_master ccm on ccm.carid = tm.carid inner join user_master um on um.userid = scm.employeeid inner join  service_master sm on scm.serviceid = sm.serviceid where tm.userid=$customerid and tm.isactive = 1");
						if($query!=null)
						{
							$academicAffected=mysqli_num_rows($query);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($query))
									{
										$serviceRecords[]=$academicResults;
									}
							}
						}
						
				
				 $query = mysqli_query($conn,"SELECT sm.serviceid,tm.transactionid ,ccm.carid, ccm.vehicleno, sm.servicetitle, csm.quota, scm.categoryTitle FROM customer_subscription_master csm inner join transaction_master tm on csm.transactionid = tm.transactionid inner join  service_master sm on  csm.serviceid = sm.serviceid inner join customer_car_master ccm on ccm.carid = tm.carid inner join service_category_master scm on sm.categoryId = scm.categoryId where tm.userid = $customerid and tm.isactive = 1");
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
										$subscriptionRecords[]=array("Category"=> $academicResults["categoryTitle"], "CarId"=>$academicResults["carid"],"ServiceId" =>$academicResults["serviceid"],"TransactionId" =>$academicResults["transactionid"], "VehcileNo"=> $academicResults["vehicleno"], "ServiceTitle"=>$academicResults["servicetitle"], "Quota"=>$academicResults["quota"], "Done"=>$remaining);
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