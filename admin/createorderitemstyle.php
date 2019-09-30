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
	$query = mysqli_query($conn,"delete from  customer_order_item_style_master where orderitemid = $orderItemId");
	
	$measurmentItems = $someArray["styles"];
 	foreach ($measurmentItems as $key => $value) {
	//print($measurmentItems[$key]['id']);
//	print($measurmentItems[$key]['value']);
	$stitchStyleId = $measurmentItems[$key]['stitchstyleid'];
	$stitchSubStyleId = $measurmentItems[$key]['stitchsubstyleid'];
	$styleValue = $measurmentItems[$key]['value'];
	
		$query = mysqli_query($conn,"insert into  customer_order_item_style_master(orderItemId, stitchStyleId, stitchSubStyleId, value) values ($orderItemId,$stitchStyleId,$stitchSubStyleId,'$styleValue')");
			$rowsAffected=mysqli_affected_rows($conn);
				if($rowsAffected==1)
				{
					$tempOrderStyles = null;
					
					//now get Styles data of this items
												$QueryStyles = mysqli_query($conn,"select * from   customer_order_item_style_master  coim inner join stitch_style_details_template_master details on coim.stitchSubStyleId = details.stitchSubStyleId inner join  stitch_style_template_master style  on style.stitchstyleid = coim.stitchstyleid where coim.orderitemid=$orderItemId");
												$academicAffected3 = mysqli_num_rows($QueryStyles);
												if($academicAffected3 > 0)
												{
													while($styleResults = mysqli_fetch_assoc($QueryStyles))
													{
														$tempOrderStyles[] = $styleResults;
													}
												}
					$response = array('Message'=>"Style saved successfully","Data"=>$tempOrderStyles,'Responsecode'=>200);	
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