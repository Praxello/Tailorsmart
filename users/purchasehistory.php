<?php
     include "../connection.php";
	 mysqli_set_charset($conn,'utf8');
	 $response=null;
	 $records=null;
	 if(isset($_GET['customerid']))
	 {
		extract($_GET);
		//   $query = mysqli_query($conn,"SELECT * FROM customer_purchase_master inner join product_master on customer_purchase_master.productid=product_master.productid where customer_purchase_master.customerid=$customerid order by orderDateTime");
			$query = mysqli_query($conn,"SELECT * FROM product_master inner join customer_purchase_master on customer_purchase_master.productid=product_master.productid inner join transaction_master on customer_purchase_master.`orderDateTime`= transaction_master.`orderDateTime` where customer_purchase_master.customerid=$customerid order by transaction_master.orderDateTime");
			if($query!=null)
			{
			$affected=mysqli_num_rows($query);
				if($affected>0)
				{
					while($result = mysqli_fetch_assoc($query))
					{
					$records[]=$result;
					}
				}
			}
	$response=array("Data"=>$records,"Responsecode"=>200,"Message"=> "Transactions fetched successfully".mysqli_error($conn));
	}
	 else
	 {
		$response=array("Message"=> "Check query parameters","Responsecode"=>400);
	 }
	 print json_encode($response);
?>