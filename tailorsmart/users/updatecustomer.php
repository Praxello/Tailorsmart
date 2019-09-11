<?php
     include "../connection.php";
	 mysqli_set_charset($conn,'utf8');
	 $response=null;
	 extract($_POST);
	 if(isset($_POST['email']))
	 {
		 $tempAddress = mysqli_real_escape_string($conn,$address);
		 $tempLandmark = mysqli_real_escape_string($conn,$landmark);
		
		$query = mysqli_query($conn,"update customer_master set firstName='$fname',lastName='$lname',date_birth='$date_birth',mobile='$mobile',landline='$landline',city='$city',state='$state',country='$country',address='$tempAddress',isMale='$ismale',password='$password', latitude=$latitude, longitude=$longitude,landmark='$tempLandmark' where email='$email'");
		if($query==1)
			{
			$query = mysqli_query($conn,"select * from customer_master where email='$email'");
				$affected=mysqli_num_rows($query);
			    $records;
				if($affected>0)
				{
					{	
						while($result = mysqli_fetch_assoc($query))
						{
							$records=$result;
						}
					}
				}
			$out = array('Data'=>$records,'Message'=>"User profile updated successfull",'Responsecode'=>200);
			}
			else
			{
			$out = array('Message'=>mysqli_error($conn),'Responsecode'=>403);	
			}
	 }
	 else
	 {
		$out=array("Message"=> "Email is mandatory","Responsecode"=>403);
	 }
	 print json_encode($out);
?>