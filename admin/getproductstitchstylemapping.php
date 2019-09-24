<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
     include "../connection.php";
	 mysqli_set_charset($conn,'utf8');
	 $response=null;
	 $records = null;
	 extract($_POST);
	  
		 			$academicQuery = mysqli_query($conn,"select * from product_catalog_style_master pcm inner join product_master pm on pcm.productid = pm.productid inner join stitch_style_template_master pim on pim.stitchStyleId = pcm.stitchStyleId");
						if($academicQuery!=null)
						{
							$academicAffected=mysqli_num_rows($academicQuery);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($academicQuery))
									{
										$selectedStitchStyleId = $academicResults['stitchStyleId'];
										$stitchSubstyles = null;
										//now add all stitchsubstyle objects in this
									$query = mysqli_query($conn,"select * from stitch_style_details_template_master where stitchStyleId=$selectedStitchStyleId");
									if($academicQuery!=null)
									{
										
									$academicAffected=mysqli_num_rows($query);
										if($academicAffected>0)
											{
												while($substyleResults = mysqli_fetch_assoc($query))
													{
													$stitchSubstyles[]=$substyleResults;
													}
											}
									}
									
									//now compost data in one
										$records[]= array("StitchStyle"=>$academicResults, "StitchSubstyle"=>$stitchSubstyles);
									
									}
							$response = array('Message'=>"All data fetched successfully".mysqli_error($conn),"Data"=>$records,'Responsecode'=>200);	
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