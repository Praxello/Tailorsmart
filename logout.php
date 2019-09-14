<?php
session_start();
if(isset($_SESSION['employeeId']) && isset($_SESSION['employeeName']) ){
    unset($_SESSION['employeeId']);
    unset($_SESSION['employeeName']);
}
session_destroy();
header('Location:index.php');
?>
