<?php

 include "../connection.php";

 mysqli_set_charset($conn,'utf8');

$url = 'https://fcm.googleapis.com/fcm/send';

extract($_POST);

$data1 = array('body' => $message);

$records=null;

  $query = mysqli_query($conn,"select distinct(deviceId) from customer_gcm_apns_master where customerid=$customerid");

		if($query!=null)

			{

			$affected=mysqli_num_rows($query);

				if($affected>0)

				{

					while($result = mysqli_fetch_assoc($query))

					{

					$records=$result['deviceId'];
//add API call here

$post = array(

                    'to'  => $records,

                    'data'              => $data1,

              'notification'              => $data1

                 );



        $headers = array(

            'Authorization: key='.'AAAA88gBrOU:APA91bHyWneAMe0taiv9ekzoqm0COt3-vvaskxZIvF3mde2SkyI1VD6UAJ1BQZQ5TY-NtYcDo6NGAhU2IxAvEbaqCGcdK9MDgVUGdHE0p-6-wyGRdvoCgdeG3paF_ShAu0Ul20wvkAC_',

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
  echo $result;

					}

			   }

			}	



// The recipient registration tokens for this notification

// https://developer.android.com/google/gcm/    

//	$ids = array('APA91bEp8jep-nelsho_hNt0I891uF93TqVsl083lr9LJqcLG9x-OT3jFJKjm-Xtc9itvWtQJy4aNSLn4ELM0R0Z-q_LkUvct1132Hvv2NfMZrqTYC8LuBePgJnwc8v_sMw1cD0dcJs_');



			



        // Close connection

        curl_close($ch);

      



?>