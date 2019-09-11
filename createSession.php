<?php
 session_start();
 $employeeId = $_GET['employeeId'];
 $_SESSION['employeeId'] =  $employeeId;
 header('Location:customers.php');
?>