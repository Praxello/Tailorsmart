<?php
/* include autoloader */
require_once '../dompdf/autoload.inc.php';

/* reference the Dompdf namespace */
use Dompdf\Dompdf;
include '../connection.php';
include '../convert_in_indian_rupee.php';


/* instantiate and use the dompdf class */
$dompdf = new Dompdf();

function company_info($orderId)
{
  $academicResults = null;
  include '../connection.php';
  $sql = "SELECT com.orderId,com.amount,DATE_FORMAT(com.purchaseDateTime,'%d,%M %Y') invDate,cm.firstName,cm.lastName,cm.address,cm.mobile,cm.email,DATE_FORMAT(com.customerExpectedDate,'%d,%M %Y') expDate,cm.city,cm.state,cm.country,COALESCE(cm.GST,'') GST
  FROM customer_order_master com LEFT JOIN customer_master cm ON com.customerId = cm.customerId
  WHERE com.orderId =  $orderId";
  $academicQuery = mysqli_query($conn,$sql);
  if($academicQuery!=null)
  {
    $academicAffected=mysqli_num_rows($academicQuery);
    if($academicAffected>0)
    {
     $academicResults = mysqli_fetch_assoc($academicQuery);
    }
  }
  $company = '';

$company .='
<tr>
<td style="height:30px; border-bottom:1px solid;" valign="top">
<h1 style="text-align:center; font-weight:bolder; text-transform:uppercase; margin-top:3px; margin-bottom:3px;"><b>Tax Invoice</b></h1>
</td>
</tr>

<tr>
<td style="height:60px;" valign="top">

<table width="100%" cellspacing="0" cellpadding="0">
<tr>
<td width="50%" style="height:60px; border-right:1px solid;">
<img src="../images/logo1.png" alt="Smiley face">
</td>
<td width="50%" style="height:60px;" valign="top">
<p style="text-align:center; font-weight:bold; margin-bottom:0px; margin-top:4px;">PJP Tailorsmart Services Pvt Ltd</p>
<p style="text-align:center; font-weight:bold; margin-top:4px; margin-bottom:0px;">102,Wing A,Giri Jyoth,</p>
<p style="text-align:center; font-weight:bold; margin-top:4px; margin-bottom:0px;">S No 20/1 Plot 36 to 39</p>
<p style="text-align:center; font-weight:bold; margin-top:4px; margin-bottom:0px;">NIBM Road Kondhwa,Pune 411048</p>
<p style="text-align:center; font-weight:bold; margin-bottom:0px; margin-top:4px;"><i class="fa fa-phone" aria-hidden="true">joy@tailorsmart.in</i></p>
<p style="text-align:center; font-weight:bold;  margin-top:4px; margin-bottom:4px;"><i class="fa fa-envelope-o" aria-hidden="true"></i>+91 788 7888 666/9225525565</p>
</td>
</tr>
</table>




</td>
</tr>

<tr>
<td width="100%">
<table width="100%" cellspacing="0" cellpadding="0">
<tr>
<td width="50%" style="border-top:1px solid; height:100px; border-right:1px solid; padding-left:10px;" valign="top">
<!-- Invoice Details -->
<table>
<tr>
<td style="height:25px;"><strong>GSTIN:</strong> </td>
<td>27AAICP9162F1Z4</td>
</tr>
<tr>
<td style="height:25px;"><strong>CIN No: </strong></td>
<td>U74999PN2016PTC167699</td>
</tr>
<tr>
<td style="height:25px;"><strong>PAN No:</strong></td>
<td>AAICP9162F</td>
</tr>

</table>
<!-- Invoice Details -->
</td>
<td width="50%" style="border-top:1px solid; padding-left:10px;" valign="top">
<!-- Invoice Other Details -->
<table >
<tr>
<td style="height:20px;"><strong>Ac Name: </strong></td>
<td>PJP Tailorsmart Services Pvt Ltd</td>
</tr>
<tr>
<td style="height:20px;"><strong>Ac No:</strong>  </td>
<td>147405000460</td>
</tr>
<tr>
<td style="height:20px;"><strong>Bank:</strong> </td>
<td>ICICI</td>
</tr>
<tr>
<td style="height:20px;"><strong>Branch:</strong> </td>
<td>Kirkee</td>
</tr>
<tr>
<td style="height:20px;"><strong>IFSC:</strong> </td>
<td>ICIC0001474</td>
</tr>
<tr>
<td style="height:20px;"><strong>Ac Type:</strong> </td>
<td>Current</td>
</tr>

</table>
<!-- Invoice Other Details -->
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td width="100%">
<table width="100%" cellspacing="0" cellpadding="0">
<tr>
<td width="50%" style="border-top:1px solid; height:25px; border-right:1px solid; background-color:#eaeaea; text-align:center;"><strong>Details of Customer (Billed to)</strong></td>
<td width="50%" style="border-top:1px solid; background-color:#eaeaea; height:25px; text-align:center;"><strong>Invoice Details</strong></td>
</tr>
</table>
</td>
</tr>

<tr>
<td width="100%">
<table width="100%" cellspacing="0" cellpadding="0">
<tr>
<td width="50%" style="border-top:1px solid; height:110px; border-right:1px solid; padding-left:10px;" valign="top">
<!--Billed To Details -->

<table >
<tr>
<td style="height:20px;"><strong>Name:</strong></td>
<td>'.$academicResults['firstName'].' '.$academicResults['lastName'].'</td>
</tr>
<tr>
<td style="height:20px;"><strong>Address:</strong></td>
<td>'.$academicResults['address'].' </td>
</tr>

<tr>
<td style="height:20px;"></td>
<td>'.$academicResults['city'].','.$academicResults['state'].','.$academicResults['country'].'</td>
</tr>
<tr>
<td style="height:20px;"><strong>Phone:</strong></td>
<td>'.$academicResults['mobile'].'</td>
</tr>
<tr>
<td style="height:20px;"><strong>Email:</strong></td>
<td>'.$academicResults['email'].'</td>
</tr>
<tr>
<td style="height:20px;"><strong>GST:</strong></td>
<td>'.$academicResults['GST'].'</td>
</tr>
</table>



<!--Billed To Details -->
</td>
<td width="50%" style="border-top:1px solid; padding-left:10px;" valign="top">

<!--Shipped To Details -->

<table >
<tr>
<td style="height:20px;"><strong>Invoice No:</strong></td>
<td>'.$academicResults['orderId'].'</td>
</tr>
<tr>
<td style="height:20px;"><strong>Invoice Amount:</strong></td>
<td>'.number_format($academicResults['amount'],2).'</td>
</tr>
<tr>
<td style="height:20px;"><strong>Invoice Date:</strong></td>
<td>'.$academicResults['invDate'].'</td>
</tr>
<tr>
<td style="height:20px;"><strong>Date of Delivery:</strong></td>
<td>'.$academicResults['expDate'].'</td>
</tr>
</table>

</td>
</tr>
</table>
</td>
</tr>



';
	return $company;
}
function gst()
{
  $gst = '';
 
    $gst .=  '<td style="width:5%;border-top:1px solid black;border-bottom:1px solid black;border-right:1px solid black;"><strong>CGST</strong></td>
  		<td style="width:5%;border-top:1px solid black;border-bottom:1px solid black;"><strong>SGST</strong></td>';
return $gst;
}

function fetch_data($orderId)
{
	
  $output = '';
  $academicResults = null;
  include '../connection.php';
  $sql = "SELECT coim.orderItemPrice,pm.productTitle,pm.productSubTitle,pm.skuNo,psm.styleTitle FROM customer_order_items_master coim LEFT JOIN product_master pm ON pm.productId = coim.productId LEFT JOIN product_parent_master ppm ON pm.parentId = ppm.parentId LEFT JOIN product_style_master psm ON psm.styleId = ppm.styleId
  WHERE coim.orderId = $orderId";
  $academicQuery = mysqli_query($conn,$sql);
  if($academicQuery!=null)
  {
    $academicAffected=mysqli_num_rows($academicQuery);
    if($academicAffected>0)
    {
      $totalAmt = 0;
      $totalTax = 0;
      $finalAmt = 0;
      $i=1;
     while($academicResults = mysqli_fetch_assoc($academicQuery)){
       if($academicResults['orderItemPrice']!=0){
        $taxRate = ($academicResults['orderItemPrice']*18)/(100+18);
        $taxAmt =  $taxRate/2;
        $rate = $academicResults['orderItemPrice'] - $taxRate;
       }else{
        $taxRate = 0;
        $taxAmt = 0;
        $rate = $academicResults['orderItemPrice'];
       }
       $totalAmt = $totalAmt + $rate;
       $totalTax = $totalTax + $taxAmt;
       $finalAmt = $academicResults['orderItemPrice'] + $finalAmt;
      $output .='
      <tr>
        <td style="width:5%;border:1px solid black;text-align:center;">'.$i.'</td>
        <td style="width:40%;text-align:left; padding-left:10px;border-top:1px solid black;border-bottom:1px solid black;text-align:le;"><h3>'.$academicResults['styleTitle'].'-'.$academicResults['productTitle'].'</h3></td>
        <td style="width:10%;border:1px solid black;text-align:center;">'.$academicResults['skuNo'].'</td>
        <td style="width:8%;border-top:1px solid black;border-bottom:1px solid black;text-align:center;">'.number_format($rate,2).'</td>
        <td style="width:5%;border:1px solid black;text-align:center;">1</td>';
  
         
            $output .='
          <td style="width:7%;border-top:1px solid black;border-bottom:1px solid black;border-right:1px solid black;text-align:center;">'.number_format($taxAmt,2).'</td>
          <td style="width:7%;border-top:1px solid black;border-bottom:1px solid black;text-align:center;">'.number_format($taxAmt,2).'</td>';
        
       
        $output .='
        <td style="width:10%;border:1px solid black;text-align:center;">'.number_format($academicResults['orderItemPrice'],2).'</td>
    </tr>';
    $i++;
     }
    }
  }

  
		
  
    $output .='

		</table>
  <table  cellpadding="0" cellspacing="0" style="width:50%;float:left;border-left:1px solid black;border-bottom:1px solid black;" >
			<tr>
					<td style="width:5%;border-left: 1px solid black;">&nbsp;&nbsp;&nbsp;&nbsp;<strong>Term & Conditions:</strong></td>
					<td style="width:27%;text-align:left; padding-left:10px;">Terms and conditions</td>
          <td style="width:10%;"></td>
          <td style="width:8%;"></td>
          </tr>';
            $output .='
          </table>
        <table style="float:right;width:50%;border-left:1px solid black;border-right:1px solid black;border-bottom:1px solid black;">
          <tr>
					<td  style="width=20%;border-bottom:1px solid black;border-right:1px solid black"  ><strong>
					 SUBTOTAL  </strong>
					</td>
          <td  style="width=20%;border-bottom:1px solid black;"  >
          '.number_format($totalAmt,2).'
          </td>
					</tr> ';
      
      $output .='
      <tr>
					<td  style="width=10%;border-bottom:1px solid black;border-right:1px solid black">
					<strong> CGST</strong>
					</td>
					<td style="width=10%;border-bottom:1px solid black;" >
          '.number_format($totalTax,2).'
					</td>
			</tr>
			<tr >
					<td  style="width=10%;border-bottom:1px solid black;border-right:1px solid black" >
					 <strong>SGST</strong>
					</td>
					<td style="width=10%;border-bottom:1px solid black;">
          '.number_format($totalTax,2).'
					</td>
			</tr>';
    
    $output .='
   
      <tr>
          <td  style="width=20%;border-bottom:1px solid black;border-right:1px solid black"  >
           <strong>GRAND TOTAL</strong>
          </td>
          <td style="width=50%;border-bottom:1px solid black;" >
           <strong> '.number_format($finalAmt,2).'</strong>
          </td>
      </tr>
      <tr>
      <td>
          <div style="text-align:right;color:green;">
           <strong> '.convertToIndianCurrency($finalAmt).'</strong>
           </div>
          </td>
      </tr>
      </table>
        ';
	return $output;
}
if(isset($_REQUEST['orderId'])){
function repeatcode(){
  $orderId = $_REQUEST['orderId'];
  $html1 = '';

        $html1 .='
      	<table width="100%" style="border:1px solid;" cellspacing="0" cellpadding="0">
      	'.company_info($orderId).'
        	<div id="content">
            <div id="invoice_body"><br>
            <table cellspacing="0" cellpadding="0" width="100%">
              <tr style="background:#fff;">
                  <td style="width:5%;border:1px solid black;text-align:center;"><strong>SR No.</strong></td>
                  <td style="width:40%;border-bottom:1px solid black;border-top:1px solid black;text-align:left; padding-left:10px;">
                  <strong>PRODUCT/SERVICES</strong></td>
                  <td style="width:10%;border:1px solid black;text-align:center;"><strong>SKU</strong></td>
                  <td style="width:8%;border-top:1px solid black;border-bottom:1px solid black;text-align:center;"><strong>Rate</strong></td>
                  <td style="width:5%;border:1px solid black;text-align:center;"><strong>QTY</strong></td>
                  '.gst().'
                  <td style="width:10%;color: #000000;border:1px solid black;text-align:center;"><strong>TOTAL</strong></td>
              </tr>
              '.fetch_data($orderId).'
              </div>
          </div>
          </table>
            ';
      


  return $html1;
}
}else{
  echo "Parameter Misiing";
}

$html = '


<body style="font-family:verdana;font-size:12px;">

	<div id="page-wrap">
  '.repeatcode().'
	</div>

</body>';
$dompdf->setPaper('A4', 'portrait');
$dompdf->loadHtml($html);
$dompdf->render();
$dompdf->stream("invoice", array("Attachment" => false));

exit(0);
?>
