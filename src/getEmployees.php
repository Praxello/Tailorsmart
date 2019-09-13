<?php
require('connection.php');
$response = [];
$sql = "SELECT * FROM employee_master";
if($result = mysqli_query($con,$sql)){
    if(mysqli_num_rows($result)>0){
      while($row = mysqli_fetch_array($result)){
     array_push($response,[
        'employeeId' => $row['employeeId'],
        'userRole'   => $row['userRole'],
        'firstName' => $row['firstName'],
        'lastName' => $row['lastName'],
        'email' => $row['email'],
        'mobile' => $row['mobile'],
        'city' => $row['city'],
        'state'   => $row['state'],
        'adharId' => $row['adharId'],
        'address' => $row['address'],
        'birthDate' => $row['birthDate'],
        'isActive' => $row['isActive']
     ]);
      }
    }
  }
  header('Content-type: application/json');
  mysqli_close($con);
  exit(json_encode($response));
?>
