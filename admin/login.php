<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include "../connection.php";
mysqli_set_charset($conn, 'utf8');
$response=null;
$records = null;
extract($_POST);

if (isset($_POST['usrname']) && isset($_POST['passwrd'])) {

    $jobQuery = mysqli_query($conn, "select * from  employee_master where mobile='$usrname' and password='$passwrd' and isactive=1");
    if ($jobQuery != null) {
        $academicAffected = mysqli_num_rows($jobQuery);
        if ($academicAffected > 0) {
            while ($academicResults = mysqli_fetch_assoc($jobQuery)) {
                $records = $academicResults;
                $response = array('Message' => "Login Successfully", "Data" => $records, 'Responsecode' => 200);
                break;
            }
        } else {
            $response = array('Message' => "No user present/ Invalid username or password", "Data" => $records, 'Responsecode' => 200);
        }
    }
}
print json_encode($response);
?>