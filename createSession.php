<?php
 session_start();
 $employeeId = $_GET['employeeId'];
 $employeeName = $_GET['employeeName'];
 $_SESSION['employeeId'] =  $employeeId;
 $_SESSION['employeeName'] =  $employeeName;
 header('Location:customerappointment.php');
?>