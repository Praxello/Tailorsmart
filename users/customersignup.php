<?php
include "../connection.php";
mysqli_set_charset($conn,'utf8');
$response=null;
$records=null;
extract($_POST);
$out=null;
if(isset($_POST['email']))
{
	$issocial = $_POST['issocial'];

	$tempAddress = mysqli_real_escape_string($conn,$address);
	$tempLandmark = mysqli_real_escape_string($conn,$landmark);

	if($issocial == 1)
	{
	 	//echo $issocial; exit;
		$query = mysqli_query($conn,"select * from customer_master where email='$email'");
		$affected=mysqli_num_rows($query);
		$records;
		if($affected>0)
		{
			while($result = mysqli_fetch_assoc($query))
			{
				$records=$result;
			}
			$out=array("Data"=>$records,"Responsecode"=>200,"Message"=>"User login successfull");
		} else {
			$query = mysqli_query($conn,"insert into  customer_master(firstName,lastName,email,date_birth,mobile,landline,city,state,country,address,isMale,password,issocial,latitude,longitude,landmark)  values('$fname','$lname','$email','$date_birth','$mobile','$landline','$city','$state','$country','$tempAddress','$ismale','$email','$issocial','$latitude','$longitude','$tempLandmark')");
					//echo $query; echo "Not work"; exit;
			if($query==1) {
				$query = mysqli_query($conn,"select * from customer_master where email='$email'");
				$affected=mysqli_num_rows($query);
				$records;
				if($affected>0)
				{
					while($result = mysqli_fetch_assoc($query))
					{
						$records=$result;
					}
					$out=array("Data"=>$records,"Responsecode"=>200,"Message"=>"User login successfully");
				}
			} else {
				$out = array('Message'=>mysqli_error($conn),'Responsecode'=>403);
			}
		}
	} else {
		$email = $_POST['email'];
		$qry = mysqli_query($conn,"select * from customer_master where email='$email'");
		$affected=mysqli_num_rows($qry);
			//echo $email; echo $query;exit;
		if($affected>0){
			$out = array('Message'=>"Email already registered.",'Responsecode'=>403);
		} else {

			$query = mysqli_query($conn,"insert into  customer_master(firstName,lastName,email,date_birth,mobile,landline,city,state,country,address,isMale,password,issocial,latitude,longitude,landmark)  values('$fname','$lname','$email','$date_birth','$mobile','$landline','$city','$state','$country','$tempAddress','$ismale','$password','$issocial',$latitude,$longitude,'$tempLandmark')");

			if($query==1){
				$query = mysqli_query($conn,"select * from customer_master where email='$email'");
				$affected=mysqli_num_rows($query);
				$records;
				if($affected>0)
				{
					while($result = mysqli_fetch_assoc($query))
					{
						$records=$result;
					}
					$out=array("Data"=>$records,"Responsecode"=>200,"Message"=>"User registration successfully");
				}
			} else {
				$out = array('Message'=>mysqli_error($conn),'Responsecode'=>403);
			}
		}
	}
} else {
	$out=array("Message"=> "Email or Mobile is mandatory","Responsecode"=>403);
}
	 /*if(isset($_POST['email']))
	 {
		$query = mysqli_query($conn,"select * from customer_master where email=$email");
			if($query!=null)
			{
			$affected=mysqli_num_rows($query);
			$records;
			$issocialUser;

				if($affected>0)
				{
					while($result = mysqli_fetch_assoc($query))
					{
					$records[]=$result;
					$issocialUser=$result['issocial'];

				}
				}
			   if($issocialUser==1)
			   $out=array("Data"=>$records,"Responsecode"=>200,"Message"=>"User already registered");
			   else
			   $out=array("Responsecode"=>200,"Message"=>"User already registered with this email");

				}
			   else
			   {
				$query = mysqli_query($conn,"insert into customer_master(firstName,lastName,email,date_birth,mobile,landline,city,state,country,address,isMale,password,issocial)  values('$fname','$lname','$email','$date_birth','$mobile','$landline','$city','$state','$country','$address','$ismale','$password','$issocial')");
				if($query==1)
				{
				$query = mysqli_query($conn,"select * from customer_master where email=$email");
				$affected=mysqli_num_rows($query);
			    $records;
				if($affected>0)
				{
					while($result = mysqli_fetch_assoc($query))
					{
					$records[]=$result;
					}
			    $out=array("Data"=>$records,"Responsecode"=>200,"Message"=>"User registration successfull");
			   }

			}
				else
				{
				$out = array('Message'=>mysqli_error($conn),'Responsecode'=>403);
				}
			}
	 }
	 else
	 {
		$out=array("Message"=> "Email or Mobile is mandatory","Responsecode"=>403);
	}*/
	print json_encode($out);
	?>
