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
	
	  if(isset($_POST['orderid']) && isset($_POST['productid']) && isset($_POST['orderItemPrice']) && isset($_POST['totalValue']))
	 {
			$discount = isset($_POST['discount']) ? $_POST['discount']:'0';
			$query = mysqli_query($conn,"insert into customer_order_items_master(orderid,productid,orderItemPrice,creationDateTime,discount) values ($orderid,$productid,$orderItemPrice,'$currentDate','$discount')");
		
			$rowsAffected=mysqli_affected_rows($conn);
				if($rowsAffected==1)
				{
					$updateAmountQuery = mysqli_query($conn,"UPDATE customer_order_master SET amount = amount + $totalValue WHERE orderId = $orderid");
					
					$transactionQuery = mysqli_query($conn,"select * from  customer_order_items_master oi inner join product_master pm on oi.productid = pm.productid where oi.orderid=$orderid");
					if($transactionQuery!=null)
						{
							
							$transactionAffected=mysqli_num_rows($transactionQuery);
							if($transactionAffected>0)
							{
								while($transactionResult = mysqli_fetch_assoc($transactionQuery))
									{
										if($transactionResult['creationDateTime'] == $currentDate)
										{
										$transactionId=$transactionResult['orderItemId'];
										}
										$records[] = $transactionResult;
									}
							}
						}
		
					$response = array('Message'=>"Item created successfully","Data"=>$records,"OrderItemId"=>$transactionId ,'Responsecode'=>200);	
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