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
	
	  if(isset($_POST['customerid'])  && isset($_POST['orderItemId']))
	 {
		$Measurments = null;
		$Styles = null;
		$Fabrics = null;
		$OrderDetails=null;
			$sql_1 = "INSERT INTO customer_order_master(customerid,purchaseDateTime) VALUES ($customerid,'$currentDate')";
		
			$query_1 = mysqli_query($conn,$sql_1);
		
			$rowsAffected_1=mysqli_affected_rows($conn);
				if($rowsAffected_1==1)
				{   
					$OrderDetails = 'Created Successfull';
                    $last_orderid = $conn->insert_id;
					$sql_2 = "INSERT INTO customer_order_items_master(orderId,productId,orderItemPrice) SELECT $last_orderid,productId,orderItemPrice FROM customer_order_items_master WHERE orderItemId = $orderItemId";
					  
					$query_2 = mysqli_query($conn,$sql_2);
                      $rowsAffected_2=mysqli_affected_rows($conn);
						if($rowsAffected_2==1)
						{
							$last_orderitemid = $conn->insert_id;
							$sql_3 = "INSERT INTO customer_order_items_measurement(orderItemid,measurementId,value) SELECT $last_orderitemid,measurementId,value FROM customer_order_items_measurement WHERE orderItemId = $orderItemId";
							$query_3 = mysqli_query($conn,$sql_3);
							$rowsAffected_3=mysqli_affected_rows($conn);
							if($rowsAffected_3 >0)
							{
								$Measurments = 'Measurment Added successfully';
							}
						
							$sql_4 = "INSERT INTO customer_order_item_style_master(orderItemid,stitchStyleId,stitchSubStyleId,value) SELECT $last_orderitemid,stitchStyleId,stitchSubStyleId,value FROM customer_order_item_style_master WHERE orderItemId = $orderItemId";
							$query_4 = mysqli_query($conn,$sql_4);
							$rowsAffected_4=mysqli_affected_rows($conn);
							if($rowsAffected_4 >0)
							{
								$Styles = 'Styles Added successfully';
							}

							$sql_5 = "INSERT INTO customer_order_item_fabric_master(orderItemid,fabricId) SELECT $last_orderitemid,fabricId FROM customer_order_item_fabric_master WHERE orderItemId = $orderItemId";
							$query_5 = mysqli_query($conn,$sql_5);
							$rowsAffected_5=mysqli_affected_rows($conn);
							if($rowsAffected_5 >0)
							{
								$Fabrics = 'Fabrics Added successfully';
							}
						}
					$response = array('Message'=>"Order created successfully","OrderDetails"=>$OrderDetails,"Fabrics"=>$Fabrics,"Styles"=>$Styles ,"Measurments"=>$Measurments,'Responsecode'=>200);	
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