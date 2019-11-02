<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

date_default_timezone_set("Asia/Kolkata");
if (isset($_POST['orderId']) && isset($_POST['statusOfOrder']) && isset($_POST['confirmationOfOrder']) && isset($_POST['dateOfExpected']) && isset($_POST['dateOfFinalDelivery']) )
{

				  $query = mysqli_query($conn,"UPDATE customer_order_master SET orderStatus = $statusOfOrder,isConfirmed = $confirmationOfOrder,customerExpectedDate = '$dateOfExpected' ,FinalDeliveryDate = '$dateOfFinalDelivery' WHERE orderId =$orderId");
					$rowsAffected=mysqli_affected_rows($conn);
						if($rowsAffected > 0)
						{
							$academicQuery1 = mysqli_query($conn,"SELECT  cm.firstName as fn,cm.lastName as ln,cm.city,cm.state,cm.country,cm.mobile,cm.email FROM customer_master cm , customer_order_master com where cm.customerId =com.customerId and com.orderId=$orderId");
								if($academicQuery1!=null)
								{
									$academicAffected=mysqli_num_rows($academicQuery1);
									if($academicAffected>0)
									{

					  			$response = array('Message'=>"Order updated successfully",'Responsecode'=>200);
									$academicResults = mysqli_fetch_assoc($academicQuery1);
									$apointmentstat = $statusOfOrder;
									switch ($apointmentstat) {
												case 0:
													$aptst='Not completed';
														break;
												case 1:
													$aptst='Confirmed';
														break;
												case 2:
														$aptst='Processing';
														break;
												case 3:
														$aptst='Sent for Trial';
														break;
												case 4:
														$aptst='Completed';
														break;
												case 5:
													$aptst='Cancelled';
														break;
												case 6:
													$aptst='For Alteration';
													break;
										}
										$confirmationstatus = $confirmationOfOrder;
										switch ($confirmationstatus) {
													case 0:
														$conaptst='Not Confirmed';
															break;
													case 1:
														$conaptst='Confirmed';
														break;
											}
										$to = $academicResults['email'];
									 // $to      = $appointmentRecords[0]['AppointmentDetails']['email'];
									 $subject = 'TailorSmart '.$aptstatus;
									 $message = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional
									 .dtd">
									 <html xmlns="http://www.w3.org/1999/xhtml">
									 <head>
											 <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
											 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
											 <title></title>
											 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
											 <style type="text/css">
											 .choose-link, .choose-link:visited, .choose-link:hover  {text-decoration: none; color:#fff;}
											 @media only screen and (max-width: 10000px) {
											 .emailer-main{ margin:0 auto;}
											 }
											 @media only screen and (max-width: 600px) {
											 .emailer-main{ width:100% !important; }
											 .headlogo img{width:100% }
											 }
									 </style>
									 </head>

									 <body>
									 <table class="emailer-main" border="0" align="center" cellpadding="0" cellspacing="0" style="border
							 :solid 1px #ccc; width:600px;font-weight:600;">
											 <tr>
													 <td height="40" align="left" valign="middle"  style="border-bottom:solid 1px #ccc;">
															 <table border="0" align="left" cellpadding="0" cellspacing="0">
																	 <tr style="background-color:white">
																					 <td align="right" class="headlogo" valign="bottom" style="padding-left:10px;">
																					 <img src="http://praxello.com/tailorsmart/mobileimages/ads/logo1.png" border="0" />
																					 </td>
																			 </tr>
															 </table>
													 </td>
											 </tr>
											 			<tr>
														<td align="left" valign="top" style="padding-left:20px; padding-top:20px; color:#363636; padding-bottom:10px; line-height:12px; font-size:14px; padding-right:20px; font-family:Arial, Helvetica, sans-serif;">
																	 Dear <font color="green">'.$academicResults['fn']." ".$academicResults['ln'].'</font>,<br><br>
													  </td>
														</tr>
															 <tr>
																	 <td align="left" valign="top" style="padding-left:20px; padding-top:10px; color:#363636; padding-bottom:15px; line-height:12px; font-size:14px; padding-right:20px; font-family:Arial, Helvetica, sans-serif;">
																		 Order no: '.$orderId.'
																	 </td>
															 </tr>
											 <tr>
													 <td align="left" valign="top" style="padding-left:20px; padding-top:10px; color:#363636; padding-bottom:15px; line-height:12px; font-size:14px; padding-right:20px; font-family:Arial, Helvetica, sans-serif;">
														 Mobile no: '.$academicResults['mobile'].'
													 </td>
											 </tr>
											 <tr>
													 <td align="left" valign="top" style="padding-left:20px; padding-top:10px; color:#363636; padding-bottom:15px; line-height:12px; font-size:14px; padding-right:20px; font-family:Arial, Helvetica, sans-serif;">
														 Order Status: '.$aptst.'
													 </td>
											 </tr>
											 <tr>
													 <td align="left" valign="top" style="padding-left:20px; padding-top:10px; color:#363636; padding-bottom:15px; line-height:12px; font-size:14px; padding-right:20px; font-family:Arial, Helvetica, sans-serif;">
														 Confirmation Status: '.$conaptst.'
													 </td>
											 </tr>
											 <tr>
													 <td align="left" valign="top" style="padding-left:20px; padding-top:10px; color:#363636; padding-bottom:15px; line-height:12px; font-size:14px; padding-right:20px; font-family:Arial, Helvetica, sans-serif;">
														 Expected Date: '. $dateOfExpected.'
													 </td>
											 </tr>
											 <tr>
											 		<td align="left" valign="top" style="padding-left:20px; padding-top:10px; color:#363636; padding-bottom:15px; line-height:12px; font-size:14px; padding-right:20px; font-family:Arial, Helvetica, sans-serif;">
											 			Final Date: '. $dateOfFinalDelivery.'
											 		</td>
											 </tr>
									 </table>';
									 $academicQuery2 = mysqli_query($conn,"SELECT coim.productId,coifm.fabricId,coim.orderItemId,pm.productTitle,pfm.fabricTitle,pfm.skuNo FROM customer_order_items_master coim inner join product_master pm on pm.productId = coim.productId
										  LEFT JOIN customer_order_item_fabric_master coifm ON coim.orderItemId = coifm.orderItemid
										  LEFT join product_fabric_master pfm on pfm.fabricId = coifm.fabricId WHERE coim.orderId = $orderId ");
										 if($academicQuery2!=null)
		 								{

		 									$academicAffected1=mysqli_num_rows($academicQuery2);
		 									if($academicAffected1>0)
		 									{
												$message .= '<table border="1" align="center"  cellpadding="3" cellspacing="3" style="border:dotted 3px #d049c1; width:600px;">
                           <thead>
                            <tr>
                                <th style="text-align:center">Product Title</th>
                                <th style="text-align:center">Fabrics Title</th>
                            </tr>
                           </thead>
                           <tbody>';
													 $orderitemid =0;
												while($academicResults1 = mysqli_fetch_assoc($academicQuery2))
	      									{

														if($orderitemid!=$academicResults1['orderItemId']){
															$message .= '<tr>';
															$message .= '<td style="color: orange;color:#363636; padding-bottom:10px; line-height:12px; font-size:14px; padding-right:20px; font-family:Arial, Helvetica, sans-serif;">'.$academicResults1['productTitle'].'</td>';
															$message .= '<td>'.$academicResults1['fabricTitle'].'-'.$academicResults1['skuNo'].'</td>';
															$message .= '</tr>';
															$orderitemid = $academicResults1['orderItemId'];
														}
														else
														{
															$message .= '<tr>';
															$message .= '<td style="color: orange;color:#363636; padding-bottom:10px; line-height:12px; font-size:14px; padding-right:20px; font-family:Arial, Helvetica, sans-serif;"></td>';
															$message .= '<td>'.$academicResults1['fabricTitle'].'-'.$academicResults1['skuNo'].'</td>';
															$message .= '</tr>';
														}

													}
													$message .='</tbody>
													</table>
													<table border="1" align="center"  cellpadding="3" cellspacing="3" style="border:solid 3px #000; width:600px;">
													 <thead>
													<tr>
															<th style="text-align:center">Thank You For Staying With Us.</th>
													</tr>
												 </thead>
													</table>';
											}
										}

									 $message .= '</body>
									 </html>';

									 $headers  = 'MIME-Version: 1.0' . "\r\n";
									 $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
									 // $headers .= "Bcc:".$appointmentRecords[0]['AppointmentDetails']['employeeemail']."\r\n";
									 // $headers .= 'Cc:'.$appointmentRecords[0]['AppointmentDetails']['employeeemail'].''."\r\n";
									 $headers .= 'Cc:pravin@tailorsmart.in,'."\r\n";
									 $headers .= 'Cc:joy@tailorsmart.in,'."\r\n";
									 $headers .= 'Cc:krkunal29@gmail.com,'."\r\n";
									 $headers .= 'From:"Tailor-Smart"<tailorsmart.in>' . "\r\n";
									 //$headers .= 'Bcc: krkunal29@gmail.com\r\n';
									 if($apointmentstat != 0){
										 mail($to, $subject, $message, $headers);
									 }
						}
					}
				}
					else
					{
						$a = mysqli_error($conn);
						if (strpos($a, 'Duplicate') !== false) {
								$response=array("Message"=> "Duplicate entry","Responsecode"=>500);
							}
							else
							{
							$response=array("Message"=> mysqli_error($conn)." No data to change or item not present","Responsecode"=>500);
							}
					}
}
else
{
		    $response = array('Message' => "Parameter missing", "Data" => $records, 'Responsecode' => 402);
}
print json_encode($response);
?>
