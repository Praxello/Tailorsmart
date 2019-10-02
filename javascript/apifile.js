var api_url = 'http://praxello.com/tailorsmart/admin/';
var pic_url = 'http://praxello.com/tailorsmart/mobileimages/';
var img_url = 'http://praxello.com/tailorsmart/uploadimage.php';
// var api_url = 'admin/';
// var pic_url = 'mobileimages/';
// var img_url = 'uploadimage.php';
getallbadgecount();

function getallbadgecount() {
    $.ajax({
        type: "GET",
        url: api_url + "getCountForBadges.php",
        success: function(response) {
            var count;
            if (response['Data'] != null) {
                count = response['Data'].length;
                $("#b1").html(response['Data'][0].appointmentCount);
                $("#b2").html(response['Data'][0].ordersCount);
                $("#b3").html(response['Data'][0].productCount);
                $("#b4").html(response['Data'][0].fabricCount);
                $("#b5").html(response['Data'][0].alterCount);
            }
        }
    });
}
