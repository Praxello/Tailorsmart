<?php
     include "../connection.php";
	 mysqli_set_charset($conn,'utf8');
	 $response=null;
	 $records=null;
	
	 extract($_POST);
	 
	 $academicQuery = mysqli_query($conn,"select * from service_area_master where isactive=1");
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
						
					$response = array('Message'=>"Services area fetched successfully","Data"=>$records,'Responsecode'=>200);	
	 print json_encode($response,JSON_UNESCAPED_UNICODE);
?>