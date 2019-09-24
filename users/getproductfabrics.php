<?php
     include "../connection.php";
	 mysqli_set_charset($conn,'utf8');
	 $response=null;
	 $records=null;
	
	 extract($_POST);
	  if(isset($_POST['productid']))
	  {
		  $academicQuery = mysqli_query($conn,"SELECT * FROM  product_fabric_master pm where pm.productid=$productid and  pm.isactive=1");
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
	  }
	
	$response = array('Message'=>"products fabrics fetched successfully","Data"=>$records,'Responsecode'=>200);	
	 print json_encode($response,JSON_UNESCAPED_UNICODE);
?>