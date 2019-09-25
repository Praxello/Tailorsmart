<?php
     include "../connection.php";
	 mysqli_set_charset($conn,'utf8');
	 $response=null;
	 $records=null;
	 $transactionId=null;
	 extract($_POST);
	  
	 date_default_timezone_set("Asia/Kolkata");
	 $currentDate=date('Y-m-d H:i:s'); //Returns IST	
	
	 $serviceStartDate=date('Y-m-d'); //Returns IST	
	 $serviceEndtDate=date('Y-m-d'); //Returns IST	
		
	  if(isset($_POST['carid']) && isset($_POST['userid']) && isset($_POST['purchasetype']) && isset($_POST['items']) && isset($_POST['total']) && isset($_POST['quantity']))
	 {
			$totalQuantity = $quantity;
			$d = strtotime("+".($quantity * 1)." months",strtotime($serviceStartDate));
			$serviceEndtDate = date("Y-m-d",$d); // This will print **2015-06-25** 
		 
			$query = mysqli_query($conn,"insert into transaction_master(userid,purchaseType,items,quantity,total,purchaseTime,isSucceed, serviceStartDate, serviceEndDate,carid) values ($userid,'$purchasetype',$items,$quantity,$total,'$currentDate',0, '$serviceStartDate','$serviceEndtDate',$carid)");
		
			$rowsAffected=mysqli_affected_rows($conn);
				if($rowsAffected==1)
				{
					
					  $transactionQuery = mysqli_query($conn,"select * from  transaction_master where userid=$userid and purchaseTime='$currentDate'");
						if($transactionQuery!=null)
						{
							
							$transactionAffected=mysqli_num_rows($transactionQuery);
							if($transactionAffected>0)
							{
								while($transactionResult = mysqli_fetch_assoc($transactionQuery))
									{
										$transactionId=$transactionResult['transactionId'];
									}
								
							}
						}
		
					$response = array('Message'=>"Order created successfully","TransactionId"=>$transactionId ,'Responsecode'=>200);	
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