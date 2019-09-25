<?php
include "../connection.php";
mysqli_set_charset($conn,'utf8');
$response=null;
$records=null;

extract($_POST);

$promotionQuery = mysqli_query($conn,"select * from promotion_master where isactive=1");
$testimonialQuery = mysqli_query($conn,"select * from testimonial_master where isactive=1");
$currentOfferQuery = mysqli_query($conn,"select * from current_offer_master where isactive=1");

if($promotionQuery!=null){
	$promotionAffected=mysqli_num_rows($promotionQuery);
	if($promotionAffected>0){
		while($promotionResults = mysqli_fetch_assoc($promotionQuery)){
			$promotionRecords[]=$promotionResults;
		}
	}
}

if($testimonialQuery!=null){
	$testimonialAffected=mysqli_num_rows($testimonialQuery);
	if($testimonialAffected>0){
		while($testimonialResults = mysqli_fetch_assoc($testimonialQuery)){
			$testimonialRecords[]=$testimonialResults;
		}
	}
}

if($currentOfferQuery!=null){
	$currentOfferAffected=mysqli_num_rows($currentOfferQuery);
	if($currentOfferAffected>0){
		while($currentOfferResults = mysqli_fetch_assoc($currentOfferQuery)){
			$currentOfferRecords[]=$currentOfferResults;
		}
	}
}

$response = array('Message'=>"Data fetched successfully","PromotionData"=>$promotionRecords,"TestimonialData"=>$testimonialRecords,"CurrentOffers"=>$currentOfferRecords,'Responsecode'=>200);	
print json_encode($response,JSON_UNESCAPED_UNICODE);
?>