<?php
$serverName = 'localhost';
$username   = 'root';
$password   = '';
$databaseName = 'Tailorsmart3';
$conn = new mysqli($serverName,$username,$password,$databaseName)or die(mysqli_connect_error());
?>
