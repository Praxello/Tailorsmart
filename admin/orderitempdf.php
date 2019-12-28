<?php
require_once '../dompdf/autoload.inc.php';
use Dompdf\Dompdf;
ini_set('max_execution_time', 300); //300 seconds = 5 minutes
ini_set('memory_limit', '3000M'); //This might be too large, but depends on the data set
$dompdf = new Dompdf();
// function order_info()
// {
//  $person='';
//   include '../connection.php';
//   $tempOrderItemId = $_REQUEST['orderitemid'];
//      $tempOrderItemMeasurements = null;
//      $tempOrderStyles = null;
//      $tempOrderFabrics = null;
//      $person.='<table>';
//      $person.='   <tr>';
//      $person.='         <td colspan="2">';
//      $person.='             <img src="img1.png" style="width: 40%;margin-left: 69%">';
//      $person.='       </td>';
//      $person.='   </tr>';
//      $person.='</table>';
//      $QueryCustomer = mysqli_query($conn,"SELECT * FROM customer_order_items_master com LEFT JOIN employee_master em ON em.employeeId = com.employeeid LEFT JOIN product_master pm ON pm.productId = com.productId WHERE com.orderItemId  = $tempOrderItemId");
//      $academicAffected1=mysqli_num_rows($QueryCustomer);
//      if($academicAffected1 > 0)
//      {
//         $customerResults = mysqli_fetch_array($QueryCustomer);
//          $person.='<center><div style="font-size: 12px;font-weight: bolder;">Master Name :'.$customerResults['firstName'].' '.$customerResults['lastName'].'</div></center>';
//          $person.='<center><div style="font-size: 12px;font-weight: bolder;">Product Name :'.$customerResults['productTitle'].'('.$customerResults['skuNo'].')</div></center>';
//          $person.='<center><div style="font-size: 12px;font-weight: bolder;">Mobile No :'.$customerResults['mobile'].'</div></center>';
//      }
//
//      $person.='<div><table cellspacing="2" cellpadding="2" width="100%">';
//      $QueryMeasurement = mysqli_query($conn,"select * from customer_order_items_measurement coim inner join measurement_item_master mim on coim.measurementid = mim.measurementid where coim.orderitemid=$tempOrderItemId");
//      $academicAffected2=mysqli_num_rows($QueryMeasurement);
//      if($academicAffected2 > 0)
//      {
//        $person.='<tr>';
//        $person.='<td  colspan="3" style="border:1px solid black;height:25px;text-align:center;"><b >Product Measurement</b> </td>';
//        $person.='</tr>';
//        $i=0;
//        while($measurementResults = mysqli_fetch_assoc($QueryMeasurement))
//        {
//          $i++;
//          $person.='<tr>';
//          $person.='<td style="border:1px solid black;width:10%;text-align:center;">'.$i.'</td>';
//          $person.='<td style="border:1px solid black;width:70%;text-align:center;">'.$measurementResults['itemTitle'].'</td>';
//          $person.='<td style="border:1px solid black;width:20%;text-align:center;">'.$measurementResults['value'].'</td>';
//          $person.='</tr>';
//        }
//      }
//
//
//      $QueryStyles = mysqli_query($conn,"select * from   customer_order_item_style_master  coim inner join stitch_style_details_template_master details on coim.stitchSubStyleId = details.stitchSubStyleId inner join  stitch_style_template_master style  on style.stitchstyleid = coim.stitchstyleid where coim.orderitemid=$tempOrderItemId");
//      $academicAffected3 = mysqli_num_rows($QueryStyles);
//      if($academicAffected3 > 0)
//      {
//        $person.='<tr>';
//        $person.='<td colspan="3" style="border:1px solid black;height:25px;text-align:center; margin-top:10%;"><b>Stitch Style</b></td>';
//        $person.='</tr>';
//        $i=0;
//        while($styleResults = mysqli_fetch_assoc($QueryStyles))
//        {
//             $i++;
//          $person.='<tr>';
//          $person.='<td style="border:1px solid black;width:10%;text-align:center;">'.$i.'</td>';
//          $person.='<td style="border:1px solid black;width:70%;text-align:center;">'.$styleResults['stitchSubStyleTitle'].'</td>';
//          $person.='<td style="border:1px solid black;width:30%;text-align:center;">'.$styleResults['value'].'</td>';
//          $person.='</tr>';
//        }
//      }
//
//
//
//      $QueryFabrics = mysqli_query($conn,"select * from customer_order_item_fabric_master coim inner join product_fabric_master mim on coim.fabricid = mim.fabricid where coim.orderitemid=$tempOrderItemId");
//      $academicAffected4 = mysqli_num_rows($QueryFabrics);
//      if($academicAffected4 > 0)
//      {
//        $person.='<tr>';
//        $person.='<td  colspan="3" style="border:1px solid black;height:25px;text-align:center;"><b>Fabrics</b> </td>';
//        $person.='</tr>';
//        $i=0;
//        while($fabricResults = mysqli_fetch_assoc($QueryFabrics))
//        {
//             $i++;
//          $tempOrderFabrics[] = $fabricResults;
//          $person.='<tr>';
//          $person.='<td style="border:1px solid black;width:10%;text-align:center;">'.$i.'</td>';
//          $person.='<td style="border:1px solid black;width:70%;text-align:center;">'.$fabricResults['fabricTitle'].'</td>';
//          $person.='<td style="border:1px solid black;width:30%;text-align:center;">'.$fabricResults['fabricBrand'].'</td>';
//          $person.='</tr>';
//        }
//      }
//     $person.='</table></div>';
//     return $person;
// }
function order_info1()
{
       $person='';
       include '../connection.php';
        $tempOrderItemId = $_REQUEST['orderitemid'];
        $tempOrderItemMeasurements = null;
        $tempOrderStyles = null;
        $tempOrderFabrics = null;

        $person.='<table>';
        $person.='   <tr>';
        $person.='         <td colspan="2">';
        $person.='             <img src="img1.png" style="width: 30%;margin-left: 89%">';
        $person.='       </td>';
        $person.='   </tr>';
        $person.='</table>';
        $sql ="SELECT com.orderItemPrice,com.employeeid,comaster.customerId,comaster.purchaseDateTime,comaster.orderStatus,
        comaster.customerExpectedDate,comaster.FinalDeliveryDate,
        cm.firstName cfn, cm.lastName  cln,cm.email cemail,cm.city ccity,cm.state cstate,cm.address cadd,cm.country ccountry,cm.mobile cmobile,
        em.firstName efn, em.lastName eln,em.mobile emobile,em.email eemail,pm.productTitle,pm.skuNo,com.orderId
        FROM customer_order_items_master com
        LEFT JOIN customer_order_master comaster ON com.orderId=comaster.orderId
        LEFT JOIN customer_master cm ON cm.customerId = comaster.customerId
        LEFT JOIN employee_master em ON em.employeeId = com.employeeid
        LEFT JOIN product_master pm ON pm.productId = com.productId
        WHERE com.orderItemId  = $tempOrderItemId";
        $QueryCustomer = mysqli_query($conn,$sql);
        $academicAffected1=mysqli_num_rows($QueryCustomer);
        if($academicAffected1 > 0)
        {
                $customerResults = mysqli_fetch_array($QueryCustomer);
                 $person.='<table style="width:100%;">';
                 $person.='<tr>';
                 $person.='<td >';
                 $person.='Tailor Name: '.$customerResults['efn'].' '.$customerResults['eln'].'';
                 $person.='</td>';
                 $person.='<td style="padding-left:10%;">';
                 $person.='Trail Date: '.$customerResults['customerExpectedDate'].'';
                 $person.='</td>';
                 $person.='</tr>';
                 $person.='<tr>';
                 $person.='<td >';
                 $person.='Order Item ID: '.$tempOrderItemId.'';
                 $person.='</td>';
                 $person.='<td style="padding-left:10%;">';
                 $person.='Final Delivery Date: '.$customerResults['FinalDeliveryDate'].'';
                 $person.='</td>';
                 $person.='</tr>';
                 $person.='<tr colspan="2">';
                 $person.='<td >';
                 $person.='Product Name: '.$customerResults['productTitle'].'('.$customerResults['skuNo'].')';
                 $person.='</td>';
                 $person.='<td style="padding-left:10%;">';
                 $person.='Order Id: '.$customerResults['orderId'];
                 $person.='</td>';
                 $person.='</tr>';
                 $person.='</tr>';
                 $person.='</table>';
        }
        // $person.='<center><div style="font-size: 12px;font-weight: bolder;">Master Name :'.$customerResults['firstName'].' '.$customerResults['lastName'].'</div></center>';
        // $person.='<center><div style="font-size: 12px;font-weight: bolder;">Product Name :'.$customerResults['productTitle'].'('.$customerResults['skuNo'].')</div></center>';
        // $person.='<center><div style="font-size: 12px;font-weight: bolder;">Mobile No :'.$customerResults['mobile'].'</div></center>';

        $person.='<table><tr><td>';

                       $QueryMeasurement = mysqli_query($conn,"select * from customer_order_items_measurement coim inner join measurement_item_master mim on coim.measurementid = mim.measurementid where coim.orderitemid=$tempOrderItemId");
                       $academicAffected2=mysqli_num_rows($QueryMeasurement);
                       if($academicAffected2 > 0)
                       {
                         $person.='<table style="">';
                         $person.='<tr>';
                         $person.='<td  colspan="2" style="border:1px solid black;height:25px;text-align:center;"><b >Product Measurement</b> </td>';
                         $person.='</tr>';
                         $i=0;
                         while($measurementResults = mysqli_fetch_assoc($QueryMeasurement))
                         {
                           $i++;
                           $person.='<tr>';
                           // $person.='<td style="border:1px solid black;width:10%;text-align:center;">'.$i.'</td>';
                           $person.='<td style="border:1px solid black;width:70%;text-align:center;">'.$measurementResults['itemTitle'].'</td>';
                           $person.='<td style="border:1px solid black;width:20%;text-align:center;">'.$measurementResults['value'].'</td>';
                           $person.='</tr>';
                         }
                         $person.='</table>';
                       }

          $person.='</td><td>';

               $QueryStyles = mysqli_query($conn,"select * from   customer_order_item_style_master  coim inner join stitch_style_details_template_master details on coim.stitchSubStyleId = details.stitchSubStyleId inner join  stitch_style_template_master style  on style.stitchstyleid = coim.stitchstyleid where coim.orderitemid=$tempOrderItemId");
               $academicAffected3 = mysqli_num_rows($QueryStyles);
               if($academicAffected3 > 0)
               {
                 $person.='<table style="">';
                 $person.='<tr>';
                 $person.='<td colspan="2" style="border:1px solid black;height:25px;text-align:center; margin-top:10%;"><b>Stitch Style</b></td>';
                 $person.='</tr>';
                 $i=0;
                 while($styleResults = mysqli_fetch_assoc($QueryStyles))
                 {
                      $i++;
                   $person.='<tr>';
                   $person.='<td style="border:1px solid black;width:70%;text-align:center;">'.$styleResults['stitchSubStyleTitle'].'</td>';
                   $person.='<td style="border:1px solid black;width:30%;text-align:center;">'.$styleResults['value'].'</td>';
                   $person.='</tr>';
                 }
                   $person.='</table>';
               }

          $person.='</td><td>';

              $QueryFabrics = mysqli_query($conn,"select * from customer_order_item_fabric_master coim inner join product_fabric_master mim on coim.fabricid = mim.fabricid where coim.orderitemid=$tempOrderItemId");
              $academicAffected4 = mysqli_num_rows($QueryFabrics);
              if($academicAffected4 > 0)
              {
                $person.='<table style="font-size: 8px;">';
                $person.='<tr>';
                $person.='<td  colspan="2" style="border:1px solid black;height:25px;text-align:center;"><b>Fabrics</b> </td>';
                $person.='</tr>';
                $i=0;
                while($fabricResults = mysqli_fetch_assoc($QueryFabrics))
                {
                     $i++;
                  $tempOrderFabrics[] = $fabricResults;
                  $person.='<tr>';

                  $person.='<td style="border:1px solid black;width:70%;text-align:center;">'.$fabricResults['fabricTitle'].'</td>';
                  $person.='<td style="border:1px solid black;width:30%;text-align:center;">'.$fabricResults['skuNo'].'</td>';
                  $person.='</tr>';
                }
                $person.='</table>';
              }

              return $person;
}
   $html='<body>
      <style type="text/css">
          * {
              font-family: Verdana, Arial, sans-serif;
          }
          table{
              font-size: xx-small;
          }
          tfoot tr td{
              font-weight: bold;
              font-size: xx-small;
          }
          .gray {
              background-color: lightgray
          }
          .right {
            text-align: right;
            margin-right: 1em;
          }
          .left {
            text-align: left;
            margin-left: 1em;
          }
          footer {
            position: fixed;
            bottom: -1px;
            left: 0px;
            right: 0px;
            height: 30%;
            text-align: center;
            line-height: 20px;
        }
        @page {  margin-top: 0px;
        margin-bottom: 0px; }
        body { margin-top: 0px;
        margin-bottom: 0px; }
      </style>
	   <div id="page-wrap">
     <main>
     '.order_info1().'
     </main>
     </div></body>';
  // $html.=''.order_info().'';




$dompdf->set_option('isHtml5ParserEnabled', false);
$dompdf->setPaper('A5', 'portrait');
$dompdf->loadHtml($html);
$dompdf->render();
$canvas = $dompdf->get_canvas();
$canvas->page_text(16, 800, "Page: {PAGE_NUM} of {PAGE_COUNT}", "Helvetica", 8, array(0,0,0));
$dompdf->stream("Order.pdf", array("Attachment" => false));
exit(0);
?>
