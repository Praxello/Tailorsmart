<?php
require('connection.php');
$appointmentDate   = $_REQUEST['appointmentDate'];
$slotId            = $_REQUEST['slotId'];
$servingEmployeeId = $_REQUEST['servingEmployeeId'];
$appointmentStatus = $_REQUEST['appointmentStatus'];
$appointmentId     = $_REQUEST['appointmentId'];
$response          = [];

$sql = "UPDATE customer_appointment_master SET appointmentDate = '$appointmentDate',slotId = $slotId,
servingEmployeeId = $servingEmployeeId,appointmentStatus = $appointmentStatus WHERE appointmentId = $appointmentId";
if(mysqli_query($con,$sql)){
    $response['success'] = 'Appointment updated successfull';
}else{
    $response['success'] = 'Appointment not updated';
}
header('Content-type: application/json');
mysqli_close($con);
exit(json_encode($response));
?>
