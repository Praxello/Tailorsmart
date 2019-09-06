<?php
require('connection.php');
$response = array();
$sql = "SELECT CA.appointmentId,CM.firstName cfname,CM.lastName clname,DATE_FORMAT(CA.appointmentDate,'%d %b %y') appointmentDate,AP.slotTime,
EM.firstName efname,EM.lastName elname FROM customer_appointment_master CA LEFT JOIN
customer_master CM ON CM.customerId = CA.customerId LEFT JOIN appointment_slots AP ON AP.slotId = CA.slotId
LEFT JOIN employee_master EM ON EM.employeeId = CA.servingEmployeeId";
if($result = mysqli_query($con,$sql)){
    if(mysqli_num_rows($result)>0){
      while($row = mysqli_fetch_array($result)){
        array_push($response,[
            'appointmentId' => $row['appointmentId'],
            'customerName' => ucfirst($row['cfname']).' '.ucfirst($row['clname']),
            'appointmentDate' => $row['appointmentDate'],
            'slotTime' => $row['slotTime'],          
            'EmployeeName' => ucfirst($row['efname']).' '.ucfirst($row['elname'])
        ]);
      }
    }
  }
  header('Content-type: application/json');
  mysqli_close($con);
  exit(json_encode($response));
?>
