<?php
 session_start();
 $employeeId = $_GET['employeeId'];
 $_SESSION['employeeId'] =  $employeeId;
//  echo $employeeId;
 header('Location:customerappointment.php');
?>