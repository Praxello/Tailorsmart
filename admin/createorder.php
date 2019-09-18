<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
     include "../connection.php";
	 mysqli_set_charset($conn,'utf8');
	 $response=null;
	 $records=null;
	 $transactionId=null;
	 extract($_POST);
	  
	 date_default_timezone_set("Asia/Kolkata");
	 $currentDate=date('Y-m-d H:i:s'); //Returns IST	
	
	  if(isset($_POST['customerid']) && isset($_POST['employeeid']))
	 {
			
			$query = mysqli_query($conn,"insert into customer_order_master(customerid,employeeid,purchaseDateTime) values ($customerid,$employeeid,'$currentDate')");
		
			$rowsAffected=mysqli_affected_rows($conn);
				if($rowsAffected==1)
				{
					
					  $transactionQuery = mysqli_query($conn,"select * from  customer_order_master where customerid=$customerid and purchaseDateTime='$currentDate'");
						if($transactionQuery!=null)
						{
							
							$transactionAffected=mysqli_num_rows($transactionQuery);
							if($transactionAffected>0)
							{
								while($transactionResult = mysqli_fetch_assoc($transactionQuery))
									{
										$transactionDetails=$transactionResult;
									}
							}
						}
					$response = array('Message'=>"Order created successfully","OrderDetails"=>$transactionDetails ,'Responsecode'=>200);	
				}
				else
				{
					$response = array('Message'=>mysqli_error($conn)."Message failed",'Responsecode'=>403);	
				}
	 }
	 else
	 {
		$response=array("Message"=> "Parameters missing","Responsecode"=>403);
	 }
	 print json_encode($response);
?>