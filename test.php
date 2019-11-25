<?php

$date = new DateTime('2000-01-01');
// $result = $date->format('Y-m-d');
// // $date = new \DateTime();
// $string = $date->format(DATE_RFC2822);
//
// echo $string. "<br>";

$result = $date->format('D, d M Y');
echo $result . "<br>";


?>
