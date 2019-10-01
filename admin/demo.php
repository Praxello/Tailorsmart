<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
     include "../connection.php";
	 mysqli_set_charset($conn,'utf8');
	 $response=null;
	$records= null;
	 extract($_POST);
	 if (isset($_POST['ownerId']))
	 {
		 			$academicQuery = mysqli_query($conn,"SELECT * from product_master pm INNER JOIN customer_order_items_master com ON com.productId = pm.productId INNER JOIN customer_order_master cm ON cm.orderId = com.orderId where pm.ownerId = $ownerId  order by pm.productId desc");
						if($academicQuery!=null)
						{
							$academicAffected=mysqli_num_rows($academicQuery);
							if($academicAffected > 0)
							{
								while($academicResults = mysqli_fetch_assoc($academicQuery))
									{
										$tempProductDetails = $academicResults;
										$temporderItemId = $academicResults['orderItemId'];
										$tempOrderItems = null;
										$orderItemDetails = null;
										$tempOrderItemMeasurements = null ;
										$tempOrderStyles = null;
												$tempOrderItemMeasurements = null;
												$tempOrderStyles = null;
												$tempOrderFabrics = null;
												//now get mesausrements of this items
												$QueryMeasurement = mysqli_query($conn,"select * from customer_order_items_measurement coim inner join measurement_item_master mim on coim.measurementid = mim.measurementid where coim.orderitemid=$temporderItemId");
												$academicAffected2=mysqli_num_rows($QueryMeasurement);
												if($academicAffected2 > 0)
												{
													while($measurementResults = mysqli_fetch_assoc($QueryMeasurement))
													{
														$tempOrderItemMeasurements[] = $measurementResults;
													}
												}

												//now get Styles data of this items
												$QueryStyles = mysqli_query($conn,"select * from   customer_order_item_style_master  coim inner join stitch_style_details_template_master details on coim.stitchSubStyleId = details.stitchSubStyleId inner join  stitch_style_template_master style  on style.stitchstyleid = coim.stitchstyleid where coim.orderitemid=$temporderItemId");
												$academicAffected3 = mysqli_num_rows($QueryStyles);
												if($academicAffected3 > 0)
												{
													while($styleResults = mysqli_fetch_assoc($QueryStyles))
													{
														$tempOrderStyles[] = $styleResults;
													}
												}
												//now get fabrics for this
												//QueryFabrics
												$QueryFabrics = mysqli_query($conn,"select * from customer_order_item_fabric_master coim inner join product_fabric_master mim on coim.fabricid = mim.fabricid where coim.orderitemid=$temporderItemId");
												$academicAffected4 = mysqli_num_rows($QueryFabrics);
												if($academicAffected4 > 0)
												{
													while($fabricResults = mysqli_fetch_assoc($QueryFabrics))
													{
														$tempOrderFabrics[] = $fabricResults;
													}
                                                 }
						$tempOrderItems[] = array("Fabrics"=>$tempOrderFabrics,"Measurements"=> $tempOrderItemMeasurements,'Styles'=>$tempOrderStyles);
                    }		
                }
                $records[] =  array('OrderDetails'=>$tempProductDetails ,"orderItems"=> $tempOrderItems);
                else{
								$response = array('Message'=>"No data availalbe".mysqli_error($conn),"Data"=> $records,'Responsecode'=>403);
              }
            }else{
                  $response = array('Message'=>"No data availalbe".mysqli_error($conn),"Data"=> $records,'Responsecode'=>403);
                }
            }else{
		 		    $response = array('Message' => "Parameter missing", "Data" => $records, 'Responsecode' => 402);
	           }
	 print json_encode($response);
?>
