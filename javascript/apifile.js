// var api_url = 'http://praxello.com/tailorsmart/admin/';
// var pic_url = 'http://praxello.com/tailorsmart/mobileimages/';
// var img_url = 'http://praxello.com/tailorsmart/uploadimage.php';
var api_url = 'admin/';
var pic_url = 'mobileimages/';
var img_url = 'uploadimage.php';
getallbadgecount();

function getallbadgecount(){
  $.ajax({
      type: "GET",
      url: api_url+"getallstyle.php",
      success: function(response) {
        console.log(response);
        // var count;
        //  if(response['Data']!=null){
        //     count= response['Data'].length;
        //
        //  }
        //  for(var i=0;i<count;i++)
        //  {
        //  styleData.set(response.Data[i].styleId,response.Data[i]);
        //  }
        //  settabledata(styleData);
      }
  });
}
