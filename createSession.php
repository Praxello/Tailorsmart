<?php
 session_start();
 $employeeId = $_GET['employeeId'];
 $employeeName = $_GET['employeeName'];
 $roleId = $_GET['roleId'];
 $_SESSION['employeeId'] =  $employeeId;
 $_SESSION['employeeName'] =  $employeeName;
 $_SESSION['roleId'] = $roleId;
 if($roleId == 1 || $roleId == 3){
    header('Location:allorders.php');
 }else if($roleId == 2){
    header('Location:products.php');
 }else if($roleId == 4){
    header('Location:vendorOrders.php');
 }else{
   echo "ok";
 }
 
?>
