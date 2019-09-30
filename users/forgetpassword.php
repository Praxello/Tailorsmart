<?php
      include "../connection.php";
	  mysqli_set_charset($conn,'utf8');
	  $response=null;

	extract($_GET);
	if(isset($_GET['username']))
	{
		 $query = mysqli_query($conn,"select * from customer_master where email='$username'");
			if($query!=null)
			{
			$affected=mysqli_num_rows($query);
			$records;
				if($affected>0)
				{
					while($result = mysqli_fetch_assoc($query))
					{
					$records=$result['email'];
$to      = $result['email'];
$subject = 'Password recovery from ECCA';
$message = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional
.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title></title>
    <style type="text/css">
    .choose-link, .choose-link:visited, .choose-link:hover  {text-decoration: none; color:#fff;}
    @media only screen and (max-width: 10000px) {
    .emailer-main{ margin:0 auto;}
    }
    @media only screen and (max-width: 600px) {
    .emailer-main{ width:100% !important; }
    .headlogo img{width:100% }
    }
</style>
</head>

<body>
    <table class="emailer-main" border="0" align="center" cellpadding="0" cellspacing="0" style="border
:solid 1px #ccc; width:600px;">
        <tr>
            <td height="40" align="left" valign="middle" bgcolor="#000" style="border-bottom:solid 1px #ccc;">
                <table border="0" align="left" cellpadding="0" cellspacing="0">
                    <tr>
                            <td align="right" class="headlogo" valign="bottom" style="padding-left:10px;"><img src="http://esmartsolution.in/pottercoup/logo.png" border="0" />
                            </td>
                        </tr>
                </table>
            </td>
        </tr>
        <tr>
                    <td align="left" valign="top" style="padding-left:20px; padding-top:20px; color:#363636; padding-bottom:10px; line-height:12px; font-size:14px; padding-right:20px; font-family:Arial, Helvetica, sans-serif;">Dear User
                    </td>
                </tr>
        <tr>
            <td align="left" valign="top" style="padding-left:20px; padding-top:10px; color:#363636; padding-bottom:15px; line-height:12px; font-size:14px; padding-right:20px; font-family:Arial, Helvetica, sans-serif;">
                Your password for ECCA application is : '.$result['password'].'
            </td>
        </tr>
        <td style="padding:3px 0 15px 20px;  color:#363636; font-size:14px;  font-family:Arial, Helvetica, sans-serif;">
                    Regards
                    </td>
        <tr>
                <td align="left" valign="top" style="padding:10px 15px; background:#3B4851; font-family:Arial, Helvetica, sans-serif; color:#fff; font-size:14px;">&copy; '.date("Y").' ECCA app All rights reserved</td>
              </tr>
    </table>
</body>
</html>';

// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

$headers .= 'From:admin@theecca.com' . "\r\n";
mail($to, $subject, $message, $headers);
					}

			$response=array("Responsecode"=>200,"Message"=>"Your password is delivered to your registered e-Mail");
			//send mail to the client
			   }
			else
			{
				$response=array("Responsecode"=>200,"Message"=>"No active account available!");
			}
		}

	}
	else
	{
			$response=array("Message"=> "Check query parameter","Responsecode"=>403);
	}

	 print json_encode($response);
?>
