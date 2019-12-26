<?php
$serverName = 'localhost';
$username   = 'root';
$password   = '';
$databaseName = 'server_tailor';
$conn = new mysqli($serverName,$username,$password,$databaseName)or die(mysqli_connect_error());
?>
