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
	
	  if(isset($_POST['orderid']) && isset($_POST['orderitemid']) && isset($_POST['price']))
	 {
			
			$query = mysqli_query($conn,"delete from  customer_order_items_master where orderitemid = $orderitemid");

				$rowsAffected=mysqli_affected_rows($conn);
				if($rowsAffected > 0)
				{
					$updateAmountQuery = mysqli_query($conn,"UPDATE customer_order_master SET amount = amount - $price WHERE orderId = $orderid");
					  $transactionQuery = mysqli_query($conn,"select * from  customer_order_items_master oi inner join product_master pm on oi.productid = pm.productid where oi.orderid=$orderid");
						if($transactionQuery!=null)
						{
							
							$transactionAffected=mysqli_num_rows($transactionQuery);
							if($transactionAffected>0)
							{
								while($transactionResult = mysqli_fetch_assoc($transactionQuery))
									{
										$records[] = $transactionResult;
									}
							}
						}
		
					$response = array('Message'=>"Item deleted successfully","Data"=>$records ,'Responsecode'=>200);	
				}
				else
				{
					$response = array('Message'=>"No Order Item Present".mysqli_error($conn),'Responsecode'=>403);	
				}
	 }
	 else
	 {
		$response=array("Message"=> "Parameters missing","Responsecode"=>403);
	 }
	 print json_encode($response);
?>