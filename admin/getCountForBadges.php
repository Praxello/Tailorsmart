<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
     include "../connection.php";
	 mysqli_set_charset($conn,'utf8');
	 $response=null;

	 extract($_POST);

                    $sql = "SELECT  (SELECT COUNT(fabricId) FROM   product_fabric_master WHERE isActive = 0) AS fabricCount,
                    (SELECT COUNT(productId) FROM   product_master WHERE isActive = 0) AS productCount,
                    (SELECT COUNT(appointmentId) FROM   customer_appointment_master WHERE appointmentStatus = 0) AS appointmentCount,
                    (SELECT COUNT(orderId) FROM   customer_order_master WHERE orderStatus = 0) AS ordersCount FROM dual";
		 			$academicQuery = mysqli_query($conn,$sql);
						if($academicQuery!=null)
						{
							$academicAffected=mysqli_num_rows($academicQuery);
							if($academicAffected>0)
							{
								$academicResults = mysqli_fetch_assoc($academicQuery);
									
								$records[]=$academicResults;
									
							$response = array('Message'=>"All staff fetched successfully".mysqli_error($conn),"Data"=>$records,'Responsecode'=>200);
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
