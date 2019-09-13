<?php

include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);
//customerId, productIds, fabricIds, appointmentDateTime, servingEmployeeId, appointmentStatus
 date_default_timezone_set("Asia/Kolkata");
 $currentDate=date('Y-m-d'); //Returns IST	
if (isset($_POST['customerid']) && isset($_POST['productids']) &&  isset($_POST['fabricids']) &&  isset($_POST['appointmentdate']) && isset($_POST['slotid'])) {

	
	//employeeId, attendanceDate, latitude, longitude, address, deviceId, model

 			$query = mysqli_query($conn,"insert into customer_appointment_master(customerId, productIds, fabricIds, appointmentDate, servingEmployeeId, appointmentStatus,slotid) values ($customerid,'$productids','$fabricids', '$appointmentdate',0,0,$slotid)");
					if($query==1)
					{
					  			$response = array('Message'=>"Appointment marked successfully",'Responsecode'=>200);
									$academicQuery = mysqli_query($conn,"select * from customer_appointment_master where customerid=$customerid");
						if($academicQuery!=null)
						{
							$academicAffected=mysqli_num_rows($academicQuery);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($academicQuery))
									{
										$records[]=$academicResults;
									}
							$response = array('Message'=>"Appointment marked successfully".mysqli_error($conn),"Data"=>$records,'Responsecode'=>200);	
							}
							else
							{
									$response = array('Message'=>"No data availalbe".mysqli_error($conn),"Data"=> $records,'Responsecode'=>403);	
							}
						}
						else{
									$response = array('Message'=>"No data availalbe".mysqli_error($conn),"Data"=> $records,'Responsecode'=>403);	
						}
								
					}
					else
					{	
						$response=array("Message"=> mysqli_error($conn)." failed","Responsecode"=>500);					
					}
}
else
{
		    $response = array('Message' => "Parameter missing", "Data" => $records, 'Responsecode' => 402);
}
print json_encode($response);
?>