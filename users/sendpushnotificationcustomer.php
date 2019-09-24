<?php
 include "connection.php";
 mysqli_set_charset($conn,'utf8');
$url = 'https://fcm.googleapis.com/fcm/send';

	extract($_POST);
	
$data1 = array('body' => $message);
$records=null;
  $query = mysqli_query($conn,"select distinct(deviceId) from customer_gcm_apns_master where osType='Android' and patientid=$patientid");
		if($query!=null)
			{
			$affected=mysqli_num_rows($query);
				if($affected>0)
				{
					while($result = mysqli_fetch_assoc($query))
					{
					$records=$result['deviceId'];
                              
					}
			   }
			}	

// The recipient registration tokens for this notification
// https://developer.android.com/google/gcm/    
//	$ids = array('APA91bEp8jep-nelsho_hNt0I891uF93TqVsl083lr9LJqcLG9x-OT3jFJKjm-Xtc9itvWtQJy4aNSLn4ELM0R0Z-q_LkUvct1132Hvv2NfMZrqTYC8LuBePgJnwc8v_sMw1cD0dcJs_');

			$post = array(
                    'to'  => $records,
                    'data'              => $data1,
              'notification'              => $data1
                 );

        $headers = array(
            'Authorization: key='.'AAAApEGVrG0:APA91bHQjCpDfguY63AI56FWPAyLhSRJw6otbZgeC9fQD92-Vr-DMfqS-kNXOeGvFnCubUJiQY8QdlIzU4YxOIytJ8IQFX9sbKL53f7T8nqkw54-bJ5Z153vnMzQeMXdFBcc3vHeJRkN',
            'Content-Type: application/json'
        );
		
		
		
        // Open connection
        $ch = curl_init();

        // Set the url, number of POST vars, POST data
        curl_setopt($ch, CURLOPT_URL, $url);

        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Disabling SSL Certificate support temporarly
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($post));

        // Execute post
        $result = curl_exec($ch);
        if ($result === FALSE) {
            die('Curl failed: ' . curl_error($ch));
        }

        // Close connection
        curl_close($ch);
        echo $result;

?>