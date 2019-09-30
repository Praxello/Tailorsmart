<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
     include "../connection.php";
	 mysqli_set_charset($conn,'utf8');
	 $response=null;
	 $records=null;
	 $fabricrecords=null;
	 $slots = null;
	 $holidays = null;
	 
	
	 extract($_POST);
	 
	 $academicQuery = mysqli_query($conn,"SELECT * FROM product_master pm inner join product_parent_master parent on pm.parentid = parent.parentid inner join  product_category_master pcm on pm.categoryid = pcm.categoryid inner join product_style_master psm on parent.styleid = psm.StyleId inner join product_substyle_master psm1 on parent.substyleid = psm1.substyleid where pm.isactive=1");
						if($academicQuery!=null)
						{
							$academicAffected=mysqli_num_rows($academicQuery);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($academicQuery))
									{
										$records[]=$academicResults;
									}
							}
						}
						
						$academicQuery = mysqli_query($conn,"SELECT * FROM product_fabric_mapping_master pf inner join  product_fabric_master pm on pf.fabricid = pm. fabricid where pm.isactive=1");
						if($academicQuery!=null)
						{
							$academicAffected=mysqli_num_rows($academicQuery);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($academicQuery))
									{
										$fabricrecords[]=$academicResults;
									}
							}
						}
						
						$academicQuery = mysqli_query($conn,"SELECT * FROM  appointment_slots pm where pm.isactive=1");
						if($academicQuery!=null)
						{
							$academicAffected=mysqli_num_rows($academicQuery);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($academicQuery))
									{
										$slots[]=$academicResults;
									}
							}
						}
						
						
						
						$academicQuery = mysqli_query($conn,"SELECT * FROM  holiday_master");
						if($academicQuery!=null)
						{
							$academicAffected=mysqli_num_rows($academicQuery);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($academicQuery))
									{
										$holidays[]=$academicResults;
									}
							}
						}
						
						$academicQuery = mysqli_query($conn,"select * from testimonial_master where isactive=1");
						if($academicQuery!=null)
						{
							$academicAffected=mysqli_num_rows($academicQuery);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($academicQuery))
									{
										$testimonialRecords[]=$academicResults;
									}
							}
						}
						// currency codes
						
						// 
						
						$academicQuery = mysqli_query($conn,"select * from supported_cities_master");
						if($academicQuery!=null)
						{
							$academicAffected=mysqli_num_rows($academicQuery);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($academicQuery))
									{
										$currenyRecords[]=$academicResults;
									}
							}
						}
						
					$response = array('Message'=>"products fetched successfully","Currency"=>$currenyRecords,"Holiday"=>$holidays,"Testimonial"=>$testimonialRecords,"Slots"=>$slots,"Data"=>$records,"Fabrics"=>$fabricrecords,'Responsecode'=>200);	
	 print json_encode($response,JSON_UNESCAPED_UNICODE);
?>