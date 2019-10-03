<?php
      include "../connection.php";
	  mysqli_set_charset($conn,'utf8');
	  $response=null;
	  $finalRecords=null;
	 
	 if(isset($_GET['userid']))
	 {
		extract($_GET);
		    $transactionQuery = mysqli_query($conn,"select * from transaction_master where userid=$userid and isSucceed=1 order by purchaseTime desc");
			if($transactionQuery!=null)
			{
			$transactionAffected=mysqli_num_rows($transactionQuery);
				if($transactionAffected>0)
				{
					$selectedVendor=null;
					while($result = mysqli_fetch_assoc($transactionQuery))
					{
						$transactionId = $result['transactionId'];
						$purshaseTime = $result['purchaseTime'];
						$purshaseType = $result['purchaseType'];
						$purshaseCost = $result['total'];
						$isSucceeded = $result['isSucceed'];
						$isActive = $result['isActive'];
						$purchaseItems = $result['items'];
						$quantityOfItems = $result['quantity'];
						
						
						$itemsArray = explode(",", $purchaseItems);
						$quantityArray = explode(",", $quantityOfItems);
						
		
				   
						//if($purshaseType=='Medicine')
						{
							$index=0;
							$medicineItemsResult=null;
							$medicineQuery = mysqli_query($conn,"select * from package_master");
								if($medicineQuery!=null)
								{
										$medicineAffected=mysqli_num_rows($medicineQuery);
										if($medicineAffected>0)
										{
											while($medicineresult = mysqli_fetch_assoc($medicineQuery))
											{
											
												$packageId = $medicineresult['packageId'];
												foreach($itemsArray as $singleItemId)
												{
														if((int)$singleItemId == (int)$packageId)
														{
																$medicineresult['quantity'] = $quantityArray[$index];
																$index = $index+1;
																$medicineItemsResult[]= $medicineresult;	
														}
												}
											}
										}
									
								}
								$finalRecords[] = array("isActive"=>$isActive,"TransactionId"=>$transactionId ,"TotalCost"=>$purshaseCost,"PurchaseDateTime"=>$purshaseTime, "PurchasedItems"=>$medicineItemsResult,"PurchaseType"=>$purshaseType,"status"=>$isSucceeded);
						}
						
				
						
				   }  //single transaction ends here - loop enclosed

					$response=array("Data"=>$finalRecords,"Responsecode"=>200,"Message"=> "Transactions fetched successfully");
				}
			else
			{
			$response=array("Message"=> "No item(s) available..!","Responsecode"=>200);
			}
		}
	}
	 else
	 {
		$response=array("Message"=> "Check transactionQuery parameters","Responsecode"=>400);
	 }
	 print json_encode($response);
?>