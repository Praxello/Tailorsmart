<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include_once("thumbnailfunct.php");
ini_set('memory_limit', '1024M');
function createThumbs( $pathToImages, $pathToThumbs, $thumbWidth )
{
  // open the directory
  $response = [];
  // $upload300x300_dir = $target_dir.'300x300/';
  $dir = opendir( $pathToImages );

  // loop through it, looking for any/all JPG files:
  while (false !== ($fname = readdir( $dir ))) {
    // parse path for the extension
    $info = pathinfo($pathToImages . $fname);
    // print_r($info);
    if (strtolower($info['extension']) == 'jpg')
   {
     $img = $fname;
     array_push($response,$img);
     // echo "Creating thumbnail for {$fname} <br />";
     createThumbnail($img, 70, 70, $pathToImages, $pathToThumbs);
   }
  }
  print(json_encode($response));
}
createThumbs("mobileimages/ads/","300x300/",100);
?>
