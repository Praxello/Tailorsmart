<?php
session_start();
if(isset($_SESSION['employeeId']) && isset($_SESSION['employeeName']) && isset($_SESSION['roleId']) ){
    unset($_SESSION['employeeId']);
    unset($_SESSION['employeeName']);
    unset($_SESSION['roleId']);
}
session_destroy();
header('Location:index.php');
?>
