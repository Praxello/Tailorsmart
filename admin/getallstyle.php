<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
     include "../connection.php";
	 mysqli_set_charset($conn,'utf8');
	 $response=null;
<<<<<<< HEAD
	$records=null;
	 extract($_POST);


=======
	
	 extract($_POST);
	  
	 
>>>>>>> 65b0eb3eebfdf7dc7611676165c0fe41c1832ee6
		 			$academicQuery = mysqli_query($conn,"select * from product_style_master");
						if($academicQuery!=null)
						{
							$academicAffected=mysqli_num_rows($academicQuery);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($academicQuery))
									{
										$records[]=$academicResults;
									}
<<<<<<< HEAD
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
=======
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
>>>>>>> 65b0eb3eebfdf7dc7611676165c0fe41c1832ee6
