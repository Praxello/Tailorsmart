<?php
session_start();
if(isset($_SESSION['employeeId'])){
    unset($_SESSION['employeeId']);
}
session_destroy();
header('Location:index.php');
?>
