<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
     include "../connection.php";
	 mysqli_set_charset($conn,'utf8');
	 $response=null;
	$categoryRecords = null;
	$styleRecord = null;
	$substyleRecords = null;
	 extract($_POST);

          $categoryRecords=null;
		 			$academicQuery = mysqli_query($conn,"select * from product_category_master");
						if($academicQuery!=null)
						{
							$academicAffected=mysqli_num_rows($academicQuery);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($academicQuery))
									{
										$categoryRecords[]=$academicResults;
									}
							}

						}
           $styleRecord =null;

						$academicQuery = mysqli_query($conn,"select * from product_style_master");
						if($academicQuery!=null)
						{
							$academicAffected=mysqli_num_rows($academicQuery);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($academicQuery))
									{
										$styleRecord[]=$academicResults;
									}
							}

						}

            $substyleRecords =null;
						$academicQuery = mysqli_query($conn,"select * from product_substyle_master");
						if($academicQuery!=null)
						{
							$academicAffected=mysqli_num_rows($academicQuery);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($academicQuery))
									{
										$substyleRecords[]=$academicResults;
									}
							}

						}
           $employeeRecords=null;
						$academicQuery = mysqli_query($conn,"select employeeId, userRole, firstName, lastName from employee_master");
						if($academicQuery!=null)
						{
							$academicAffected=mysqli_num_rows($academicQuery);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($academicQuery))
									{
										$employeeRecords[]=$academicResults;
									}
							}

						}

						$parentProducts =null;
		 			$academicQuery = mysqli_query($conn,"select * from product_parent_master parent inner join product_style_master style on parent.styleid = style.styleid inner join product_substyle_master substyle on parent.substyleid = substyle.substyleid");
						if($academicQuery!=null)
						{
							$academicAffected=mysqli_num_rows($academicQuery);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($academicQuery))
									{
										$parentProducts[]=$academicResults;
						}
						}
						}
						$currencyRecords=null;
						$academicQuery = mysqli_query($conn,"SELECT * FROM supported_cities_master");
						if($academicQuery!=null)
						{
							$academicAffected=mysqli_num_rows($academicQuery);
							if($academicAffected>0)
							{
								while($academicResults = mysqli_fetch_assoc($academicQuery))
									{
										$currencyRecords[]=$academicResults;
									}
							}

						}


						    $response = array('Message' => "Data fetched successfully","Employee"=>$employeeRecords,"Currency"=>$currencyRecords, "Categories" => $categoryRecords,"Style"=>$styleRecord,"Substyle"=>$substyleRecords, "ParentProducts"=>$parentProducts , 'Responsecode' => 200);



	 print json_encode($response);
?>
