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
	//: customer_order_measurement
	  if(isset($_POST['postdata']))
	 {
		 $someArray = json_decode($postdata,true);
	//	print_r($someArray);        // Dump all data of the Array
  	
	$orderItemId = $someArray["orderitemid"];
	
	//first delete mapping
	$query = mysqli_query($conn,"delete from customer_order_item_fabric_master where orderitemid = $orderItemId");
	
	$measurmentItems = $someArray["fabrics"];
 	foreach ($measurmentItems as $key => $value) {
	$fabricid = $measurmentItems[$key]['fabricid'];
		$query = mysqli_query($conn,"insert into customer_order_item_fabric_master(OrderItemId, fabricid) values ($orderItemId,$fabricid)");
			$rowsAffected=mysqli_affected_rows($conn);
				if($rowsAffected==1)
				{
					$tempOrderItemMeasurements = null;
					//now return set of measurements 
					
					//now get mesausrements of this items
												$QueryMeasurement = mysqli_query($conn,"select * from customer_order_item_fabric_master coim inner join product_fabric_master mim on coim.fabricid = mim.fabricid where coim.orderitemid=$orderItemId");
												$academicAffected2=mysqli_num_rows($QueryMeasurement);
												if($academicAffected2 > 0)
												{
													while($measurementResults = mysqli_fetch_assoc($QueryMeasurement))
													{
														$tempOrderItemMeasurements[] = $measurementResults;
													}
												}
					
					$response = array('Message'=>"Fabrics saved successfully","Data"=>$tempOrderItemMeasurements,'Responsecode'=>200);	
				}
				else
				{
					$response = array('Message'=>mysqli_error($conn)."Message failed",'Responsecode'=>403);	
				}
  }
		
	 }
	 else
	 {
		$response=array("Message"=> "Parameters missing","Responsecode"=>403);
	 }
	 print json_encode($response);
?>