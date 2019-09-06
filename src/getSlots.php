<?php
require('connection.php');
$response = [];
$sql = "SELECT * FROM appointment_slots";
if($result = mysqli_query($con,$sql)){
    if(mysqli_num_rows($result)>0){
      while($row = mysqli_fetch_array($result)){
     array_push($response,[
        'slotId' => $row['slotId'],
        'slotTime'   => $row['slotTime'],
        'isActive' => $row['isActive']
     ]);
      }
    }
  }
  header('Content-type: application/json');
  mysqli_close($con);
  exit(json_encode($response));
?>