<?php
require('connection.php');
$response = [];
$customerDetails = [];
$appointmentProductDetails = [];
$appointmentId = $_REQUEST['appointmentId'];


$sql = "SELECT CA.appointmentId ,PM.productTitle,PF.fabricTitle,CM.firstName cfname,CM.lastName clname,
DATE_FORMAT(CAM.appointmentDate,'%d %b %y') appointmentDate,CAM.appointmentDate apDate,AP.slotTime,CAM.slotId,CAM.servingEmployeeId,CAM.appointmentStatus,
EM.firstName efname,EM.lastName elname FROM customer_appointment_products_fabrics CA
INNER JOIN customer_appointment_master CAM ON CAM.appointmentId = CA.appointmentId
LEFT JOIN customer_master CM ON CM.customerId = CAM.customerId LEFT JOIN appointment_slots AP ON AP.slotId = CAM.slotId
LEFT JOIN employee_master EM ON EM.employeeId = CAM.servingEmployeeId
LEFT JOIN  product_master PM ON PM.productId = CA.productId
LEFT JOIN product_fabric_master PF ON PF.fabricId = CA.fabricsId
WHERE CA.appointmentId = $appointmentId ORDER BY CA.productId";

$count = 0;
if($result = mysqli_query($con,$sql)){
    if(mysqli_num_rows($result)>0){
      while($row = mysqli_fetch_array($result)){
        $count++;
        if($count == 1){
                $customerDetails['apDate'] = $row['apDate'];
                $customerDetails['customerName'] = ucfirst($row['cfname']).' '.ucfirst($row['clname']);
                $customerDetails['appointmentDate'] = $row['appointmentDate'];
                $customerDetails['slotId'] = $row['slotId'];
                $customerDetails['slotTime'] = $row['slotTime'];
                $customerDetails['servingEmployeeId'] = $row['servingEmployeeId'];
                $customerDetails['EmployeeName'] = ucfirst($row['efname']).' '.ucfirst($row['elname']);
                $customerDetails['appointmentStatus'] = $row['appointmentStatus'];
        }
        array_push($appointmentProductDetails,[
            'productTitle' => ucfirst($row['productTitle']),
            'fabricTitle' => ucfirst($row['fabricTitle'])
        ]);

      }
    }
  }
  array_push($response,[
    "CustomerData" =>$customerDetails,
    "AppointmentData" => $appointmentProductDetails
    ]);

header('Content-type: application/json');
mysqli_close($con);
echo json_encode($response);
?>
