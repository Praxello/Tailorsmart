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
 			$query = mysqli_query($conn,"insert into customer_appointment_master(customerId, productIds, fabricIds, appointmentDate, appointmentStatus,slotid) values ($customerid,'$productids','$fabricids', '$appointmentdate',0,$slotid)");
					if($query==1)
					{
							$last_id = mysqli_insert_id($conn);
									$academicQuery = mysqli_query($conn,"select * from customer_appointment_master where customerid=$customerid");
      						if($academicQuery!=null)
      						{
      							$academicAffected=mysqli_num_rows($academicQuery);
      							if($academicAffected>0)
      							{
      								while($academicResults = mysqli_fetch_assoc($academicQuery))
      									{
      										$records[]=$academicResults;//alll apointment records
      									}
      							$response = array('Message'=>"Appointment marked successfully".mysqli_error($conn),"Data"=>$records,'Responsecode'=>200);

                    $academicQuery1 = mysqli_query($conn,"SELECT slot.slotTime,cam.appointmentId, cam.customerId,cm.email, cm.firstName as fn,cm.lastName as ln,cm.city,cm.state,cm.country,cm.mobile,cam.productIds, cam.fabricIds, cam.appointmentDate, cam.slotId, cam.servingEmployeeId, cam.appointmentStatus , em.firstName as employeename FROM  customer_appointment_master cam inner join appointment_slots slot on cam.slotid = slot.slotId inner join customer_master cm on cam.customerid = cm.customerid left outer join employee_master em on cam.servingEmployeeId = em.employeeId where cam.customerid=$customerid  and cam.appointmentId=$last_id order by cam.appointmentDate desc");
                      if($academicQuery1!=null)
                      {
                        $academicAffected=mysqli_num_rows($academicQuery1);
                        if($academicAffected>0)
                        {

						//	echo($last_id);
	                      while($academicResults = mysqli_fetch_assoc($academicQuery1))
                            {
                              $productids = $academicResults['productIds'];
                              // print($academicResults['appointmentId'] . "-");

                              $fabricIds = $academicResults['fabricIds'];

                              $itemsArray = explode(",", $productids);
                              $fabricArray = explode(";", $fabricIds);

                              $products = null;
                              $index = 0;
                              foreach($itemsArray as $singleItemId)
                              {
                              //	print($singleItemId . "*");
                                if($singleItemId > 0)
                                {
                                  $productQuery = mysqli_query($conn,"select * from product_master where productId=$singleItemId");
                                  if($productQuery!=null)
                                  {
                                    $selectedFabric = null;
                                    $academicAffected=mysqli_num_rows($productQuery);
                                    if($academicAffected>0)
                                    {
                                      //now load fabrics for this
                                      if(count($fabricArray)>0)
                                      {
                                      $innerFabricArray = explode(",", $fabricArray[0]);
                                      $index = $index + 1;
                                        foreach($innerFabricArray as $singleFabric)
                                        {
                                          if($singleFabric > 0)
                                          {

                                            $fabricQuery = mysqli_query($conn,"select * from product_fabric_master where fabricid=$singleFabric");
                                            if($fabricQuery!=null)
                                            {
                                            $academicAffected=mysqli_num_rows($fabricQuery);
                                            if($academicAffected>0)
                                            {
                                              while($fabricResult = mysqli_fetch_assoc($fabricQuery))
                                              {
                                              $selectedFabric[] = $fabricResult;
                                              }
                                            }
                                            }
                                          }
                                        }
                                      }

                                      while($productResult = mysqli_fetch_assoc($productQuery))
                                      {
                                        $products[] = array("Product"=>$productResult, "Fabrics"=>$selectedFabric);

                                      }
                                    }
                                  }
                                }
                              }

//	print_r($products);
                            $appointmentRecords [] =array("AppointmentDetails"=>$academicResults , "SelectedItems"=>$products);
                            // $response = array('Message'=>"All data fetched successfully".mysqli_error($conn),"Data"=>$appointmentRecords,'Responsecode'=>200);
                            $html ='';
                            $aptstatus='';
                            $Allitemdata =$appointmentRecords[0]['SelectedItems'];
                            $apointstat = $appointmentRecords[0]['AppointmentDetails']['appointmentStatus'];

                            switch ( $apointstat) {
                                  case 0:
                                    $aptstatus='<span class="badge badge-pill badge-primary">Idle</span>';
                                      break;
                                  case 1:
                                    $aptstatus='<span class="badge badge-pill badge-success">Confirmed</span>';
                                      break;
                                  case 2:
                                    $aptstatus='<span class="badge badge-pill badge-danger">Cancelled</span>';
                                      break;
                                  case 3:
                                    $aptstatus='<span class="badge badge-pill badge-warning"> Withdrawn by customer</span>';
                                      break;
                                  case 5:
                                    $aptstatus='<span class="badge badge-pill badge-dark">None</span>';
                                      break;
                              }
                              $count = count($Allitemdata);
                              for($i=0;$i<$count;$i++)
                              {
                                if ($Allitemdata[$i]['Product'] != null)
                                {
                                    if($Allitemdata[$i]['Fabrics'] != null)
                                    {
                                       $html .= '<tr>';
                                       $selectfabriclen = count($Allitemdata[$i]['Fabrics']);
                                       $html .= '<td style="color: orange;padding-left:36px;  padding-bottom:10px; line-height:12px; font-size:14px; padding-right:20px; font-family:Arial, Helvetica, sans-serif;">' . $Allitemdata[$i]['Product']['productTitle'] . '</td>';
                                       $html .= '<td style="color:#363636;  line-height:12px; font-size:14px; padding-right:35px; font-family:Arial, Helvetica, sans-serif;float: right;">' . $Allitemdata[$i]['Fabrics'][0]['fabricTitle'] .'<font color="green"><u> '. $Allitemdata[$i]['Fabrics'][0]['colorName'] .  '</u></font></td>';
                                       $html .= '</tr>';
                                       for ($j = 1; $j < $selectfabriclen; $j++)
                                       {
                                           $html .= '<tr>';
                                           $html .= '<td> </td>';
                                           $html .= '<td style="color:#363636; padding-bottom:10px; line-height:12px; font-size:14px; padding-right:35px; font-family:Arial, Helvetica, sans-serif;float: right;">' .$Allitemdata[$i]['Fabrics'][$j]['fabricTitle'] . '<font color="green"><u> '. $Allitemdata[$i]['Fabrics'][$j]['colorName'] .  '</u></font></td>';
                                           $html .= '</tr>';
                                       }
                                    }
                                    else {
                                        $html .= '<tr>';
                                        $html .= '<td style="color: orange;color:#363636; padding-bottom:10px; line-height:12px; font-size:14px; padding-right:20px; font-family:Arial, Helvetica, sans-serif;">'. $Allitemdata[$i]['Product']['productTitle'] .'</td>';
                                        $html .= '<td></td>';
                                        $html .= '</tr>';
                                     }
                                } else
                                {
                                    $html .= '<tr>';
                                    $html .= '<td style="color: orange;color:#363636; padding-bottom:10px; line-height:12px; font-size:14px; padding-right:20px; font-family:Arial, Helvetica, sans-serif;">No Products Available Till Yet</td>';
                                    $html .= '<td></td>';
                                    $html .= '</tr>';
                                }
                              }

                            }
                            // $to ="krkunal29@gmail.com";
                            $to = $appointmentRecords[0]['AppointmentDetails']['email'];
                            $date1=$appointmentRecords[0]['AppointmentDetails']['appointmentDate'];
                            $date = new DateTime($date1);
                            $dateresult1 = $date->format('D, d M Y');
                            // $to      = $appointmentRecords[0]['AppointmentDetails']['email'];
                            $subject = 'Your Appointment is Book';
                            $message = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional
                            .dtd">
                            <html xmlns="http://www.w3.org/1999/xhtml">
                            <head>
                                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
                                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                                <title></title>
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
                        :solid 1px #ccc; width:600px;">
                                <tr>
                                    <td height="40" align="left" valign="middle" bgcolor="#000" style="border-bottom:solid 1px #ccc;">
                                        <table border="0" align="left" cellpadding="0" cellspacing="0">
                                            <tr>
                                                    <td align="right" class="headlogo" valign="bottom" style="padding-left:10px;">
                                                    <img src="http://praxello.com/tailorsmart/mobileimages/ads/logo1.png" border="0" />
                                                    </td>
                                                </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                            <td align="left" valign="top" style="padding-left:20px; padding-top:20px; color:#363636; padding-bottom:10px; line-height:12px; font-size:14px; padding-right:20px; font-family:Arial, Helvetica, sans-serif;">
                                            Dear '.$appointmentRecords[0]['AppointmentDetails']['fn']." ".$appointmentRecords[0]['AppointmentDetails']['ln'].'<br/><br/>
                                            </td>
                                        </tr>

                                <tr>
                                    <td align="left" valign="top" style="padding-left:20px; padding-top:10px; color:#363636; padding-bottom:15px; line-height:12px; font-size:14px; padding-right:20px; font-family:Arial, Helvetica, sans-serif;">
                                      Appointment Date: '.$dateresult1.'
                                    </td>

                                </tr>
                                <tr>
                                    <td align="left" valign="top" style="padding-left:20px; padding-top:10px; color:#363636; padding-bottom:15px; line-height:12px; font-size:14px; padding-right:20px; font-family:Arial, Helvetica, sans-serif;">
                                      Appointment Status: '.$aptstatus.'

                                    </td>

                                </tr>
                                <tr>
                                    <td align="left" valign="top" style="padding-left:20px; padding-top:10px; color:#363636; padding-bottom:15px; line-height:12px; font-size:14px; padding-right:20px; font-family:Arial, Helvetica, sans-serif;">
                                      Appointment Slot: '.$appointmentRecords[0]['AppointmentDetails']['slotTime'].'

                                    </td>

                                </tr>



                            </table>
                            <table border="1" align="center"  cellpadding="3" cellspacing="3" style="border:dotted 3px #d049c1; width:600px;">
                        <thead>
                            <tr>

                                <th style="text-align:center">Product Title</th>
                                <th style="text-align:center">Fabrics Title</th>

                            </tr>
                           </thead>
                            <tbody>
                              '.$html.'
                            </tbody>
                            </table>
                            <table border="1" align="center"  cellpadding="3" cellspacing="3" style="border:solid 3px #000; width:600px;">
  											     <thead>
  													<tr>
  															<th style="text-align:center">Custom Made. Home Delivered.</th>
  													</tr>
                            <tr>
                            <th style="text-align:center">
                            Thank you for choosing TailorSmart.
                            </th>
                            </tr>
  												 </thead>
  													</table>
                            </body>
                            </html>';

                            $headers  = 'MIME-Version: 1.0' . "\r\n";
                            $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
                            $headers .= 'Cc:krkunal29@gmail.com,'."\r\n";

                            $headers .= 'Cc:pravin@tailorsmart.in,'."\r\n";
                            $headers .= 'Cc:joy@tailorsmart.in,'."\r\n";
                            $headers .= 'From:"Tailor-Smart"<tailorsmart.in>' . "\r\n";
                            mail($to, $subject, $message, $headers);


                        }
                        else
                        {
                            $response = array('Message'=>"No data availalbe".mysqli_error($conn),"Data"=> $records,'Responsecode'=>403);
                        }
                      }
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
