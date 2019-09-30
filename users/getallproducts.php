<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn,'utf8');
$response=null;

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