<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
     include "connection.php";
	 mysqli_set_charset($conn,'utf8');
	 $response=null;

	 extract($_POST);
	  $records= null;
	  $appointmentRecords = null;

	  // customer_appointment_master
		 			$academicQuery = mysqli_query($conn,"SELECT * FROM customer_appointment_master cam inner join appointment_slots slot on cam.slotid = slot.slotId inner join customer_master cm on cam.customerid = cm.customerid");
						if($academicQuery!=null)
						{
							$academicAffected=mysqli_num_rows($academicQuery);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($academicQuery))
									{
										$productids = $academicResults['productIds'];
									//	print($academicResults['appointmentId'] . "-");

										$fabricIds = $academicResults['fabricIds'];

										$itemsArray = explode(",", $productids);
										$fabricArray = explode(";", $fabricIds);

										$products = null;
										$index = 0;
										foreach($itemsArray as $singleItemId)
										{
										//	print($singleItemId . "*");
											if($singleItemId > 0)
											{
												$productQuery = mysqli_query($conn,"select * from product_master where productId=$singleItemId");
												if($productQuery!=null)
												{
													$selectedFabric = null;
													$academicAffected=mysqli_num_rows($productQuery);
													if($academicAffected>0)
													{
														//now load fabrics for this
														if(count($fabricArray)>0)
														{
														$innerFabricArray = explode(",", $fabricArray[$index]);
														$index = $index + 1;
															foreach($innerFabricArray as $singleFabric)
															{
																if($singleFabric > 0)
																{

																	$fabricQuery = mysqli_query($conn,"select * from product_fabric_master where fabricid=$singleFabric");
																	if($fabricQuery!=null)
																	{
																	$academicAffected=mysqli_num_rows($fabricQuery);
																	if($academicAffected>0)
																	{
																		while($fabricResult = mysqli_fetch_assoc($fabricQuery))
																		{
																		$selectedFabric[] = $fabricResult;
																		}
																	}
																	}
																}
															}
														}

														while($productResult = mysqli_fetch_assoc($productQuery))
														{
															$products[] = array("Product"=>$productResult, "Fabrics"=>$selectedFabric);

														}
													}
												}
											}

										}

									$appointmentRecords [] =array("AppointmentDetails"=>$academicResults , "SelectedItems"=>$products);
									}


										$academicQuery = mysqli_query($conn,"SELECT * FROM  appointment_slots pm where pm.isactive=1");
										if($academicQuery!=null)
											{
											$academicAffected=mysqli_num_rows($academicQuery);
											if($academicAffected>0)
											{
												while($academicResults1 = mysqli_fetch_assoc($academicQuery))
												{
													$slots[]=$academicResults1;
												}
											}
											}

										$academicQuery = mysqli_query($conn,"SELECT * FROM  holiday_master");
										if($academicQuery!=null)
											{
												$academicAffected=mysqli_num_rows($academicQuery);
											if($academicAffected>0)
												{
													while($academicResults2 = mysqli_fetch_assoc($academicQuery))
													{
													$holidays[]=$academicResults2;
													}
												}
										}


							$response = array('Message'=>"All data fetched successfully".mysqli_error($conn),"Data"=>$appointmentRecords,"Holiday"=>$holidays,"Slots"=>$slots,'Responsecode'=>200);
							}
							else
							{
									$response = array('Message'=>"No data availalbe".mysqli_error($conn),"Data"=> $records,'Responsecode'=>403);
							}
						}
						else{
									$response = array('Message'=>"No data availalbe".mysqli_error($conn),"Data"=> $records,'Responsecode'=>403);
							}

	 print json_encode($response);
?>
