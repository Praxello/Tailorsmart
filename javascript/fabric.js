
getfabrics();
getallcategory();
var styleData = []; // This variable globally declare save all Style Data in Array
$('#fabriccategory').select2({
  allowClear: true,
  placeholder: "Select Fabric Category"
});
$('#fabricPricevariable').select2({
  allowClear: true,
  placeholder: "Select Fabric Price Variable"
});
$('#fabricactivestatus').select2({
  allowClear: true,
  placeholder: "Select Fabric Status"
});
$(document).ready(function() {

});
function getallcategory(){
  var html ='';
  $.ajax({
      type: "GET",
      url: api_url+"getallcategory.php",
      success: function(response) {
        var count= response['Data'].length;
        html +='<option value="">Select Category</option>';
        for (var i = 0; i < count; i++) {
        html +="<option value='"+response['Data'][i].categoryId+"'>"+response['Data'][i].categoryTitle+"</option>";
      }

        $("#fabriccategory").html(html);
      }
    });
}

// This function is created for Get All Style Data.
function getfabrics(){
  $('#styletbl').dataTable().fnDestroy();
  $("#styletbldata").empty();
     $.ajax({
         type: "GET",
         url: api_url+"getfabrics.php",
         success: function(response) {
           var count= response['Data'].length;
            var html ="<tr>";
            styleData=[...response['Data']];
            var imageUrl ='';
            for (var i = 0; i < count; i++) {
               imageUrl = pic_url+'fabric/300x300/'+response['Data'][i].skuNo+'.jpg';

                html +="<td><form id='custstyleform"+response['Data'][i].skuNo+"' method='post' enctype='multipart/form-data'><input type='file' id='customerstylepic"+response['Data'][i].skuNo+"' accept='image/*' style='display:none'/> <img class='img-thumbnail' alt='No Image' src='"+imageUrl+"'  style='cursor: pointer' onclick='imguplod(\"" + response['Data'][i].skuNo + "\")'></img></form></td>";
                // html +="<td> <img class='img-thumbnail' src='"+pic_url+"fabric/"+response['Data'][i].skuNo+".jpg' width='20%' height='20%'></img></td>";
                html +="<td>"+response['Data'][i].fabricTitle+"</td>";
                html +="<td>"+response['Data'][i].fabricBrand+"</td>";
                html +="<td>"+response['Data'][i].skuNo+"</td>";
                html +="<td>"+response['Data'][i].fabricDetails+"</td>";
                html +="<td>"+response['Data'][i].fabricPrice+"</td>";
                html +="<td>"+response['Data'][i].releaseDate+"</td>";
                if(response['Data'][i].isActive==1){
                  html +='<td><span class="badge badge-pill badge-primary">Active</span></td>';
                }
                else {
                  html +='<td><span class="badge badge-pill badge-warning">InActive</span></td>';
                }
                html +='<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Upload Image" onclick="imguplod(\'' + response['Data'][i].skuNo + '\')"><i class="fa fa-upload"></i></button><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+i+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removeFabric('+response['Data'][i].fabricId+')"><i class="fa fa-remove"></i></button></div></td>';
                html +="  </tr>";
            }
           $("#styletbldata").html(html);
           $('#styletbl').DataTable({
           searching: true,
           retrieve: true,
           bPaginate: $('tbody tr').length>10,
           order: [],
           columnDefs: [ { orderable: false, targets: [0,1,2,3,4,5,6,7,8] } ],
           dom: 'Bfrtip',
           buttons: [],
           destroy: true
           });
         }
     });
}
function imguplod(imgid){
   var triggerid=$('#customerstylepic'+imgid).trigger('click');
   var fileupload = document.getElementById('customerstylepic'+imgid);
   fileupload.onchange = function () {
                var customerstylepic = $('#customerstylepic'+imgid).val();
                var fd = new FormData();
                var files = $('#customerstylepic'+imgid)[0].files[0];
                fd.append('file',files);
                fd.append('imgname',imgid);
                fd.append('foldername',"fabric");
                $.ajax({
                     // url:"src/addimg.php",
                     url:"http://praxello.com/tailorsmart/uploadimage.php",
                     type:"POST",
                     contentType: false,
                     cache: false,
                     processData:false,
                     data: fd,
                     dataType:'json',
                     success:function(response){
                       swal(response['Message']);
                       getcustomerstyles();
                     }
              });
   };
}
// This function is created For Add Button New Style
function addStyle(){
  $("#customerstyletable").hide();
  $("#customerstyletableform").show();
   $("#fabricform").trigger("reset");
   $("#savebtncustomerstyle").show();
   $("#updatebtncustomerstyle").hide();
   $("#fabriccategory").val("").trigger('change');
    $("#fabricPricevariable").val("").trigger('change');
     $("#fabricactivestatus").val("").trigger('change');
}

// This function is created For Edit Button
function editStyle(id){
$("#fabricid").val(styleData[id].fabricId);
$("#fabrictitle").val(styleData[id].fabricTitle);
$("#fabricbrand").val(styleData[id].fabricBrand);
$("#fabricdetail").val(styleData[id].fabricDetails);
$("#fabricprice").val(styleData[id].fabricPrice);
$("#skuno").val(styleData[id].skuNo);
$("#releasedate").val(styleData[id].releaseDate);
$("#hexcolor").val(styleData[id].hexColor);
$("#fabriccategory").val(styleData[id].categoryId).trigger('change');
$("#fabriccolorname").val(styleData[id].colorName);
$("#fabrictype").val(styleData[id].fabricType);
$("#fabricPricevariable").val(styleData[id].isPriceVariable).trigger('change');
$("#fabricactivestatus").val(styleData[id].isActive).trigger('change');

$("#customerstyletable").hide();
$("#customerstyletableform").show();
$("#savebtncustomerstyle").hide();
$("#updatebtncustomerstyle").show();
}

// This function is created For Remove Button
function removeFabric(id){
  $.ajax({
      url:api_url+'deletefabric.php',
      type:'POST',
      data:{
        fabricid:id
      },
      dataType:'json',
      success:function(response){

          if(response.Responsecode===200){
                swal(response.Message);
                getfabrics();
                $("#customerstyletable").show();
                $("#customerstyletableform").hide();
          }
          else {
            swal(response.Message);
          }

      }
  });
}

// This function is created For Refresh Action / Backbutton
$('#reloadbtn').on('click',function(event){
  event.preventDefault();
  $("#customerstyletable").show();
  $("#customerstyletableform").hide();
  $("#savebtncustomerstyle").show();
  $("#updatebtncustomerstyle").hide();
});

// This function is created For Save Style Data
$('#savebtncustomerstyle').on('click',function(event){
  event.preventDefault();
  var fabrictitle = $("#fabrictitle").val();
  var fabricbrand = $("#fabricbrand").val();
  var fabricdetail= $("#fabricdetail").val();
  var fabricprice = $("#fabricprice").val();
  var skuno = $("#skuno").val();
  var releasedate= $("#releasedate").val();
  var hexcolor = $("#hexcolor").val();
  var fabriccategory = $("#fabriccategory").val();
  var fabriccolorname= $("#fabriccolorname").val();
  var fabrictype = $("#fabrictype").val();
  var fabricPricevariable = $("#fabricPricevariable").val();
  var fabricactivestatus= $("#fabricactivestatus").val();
    $.ajax({
        url:api_url+'createfabric.php',
        type:'POST',
        data:{
        categoryid:fabriccategory,
        fabrictitle:fabrictitle,
        fabricbrand:fabricbrand,
        fabricdetails:fabricdetail,
        skuno:skuno,
        fabricprice:fabricprice,
        releasedate:releasedate,
        ispricevariable:fabricPricevariable,
        hexcolor:hexcolor,
        colorname:fabriccolorname,
        fabrictype:fabrictype,
        active:fabricactivestatus
        },
        dataType:'json',
        success:function(response){
          if(response.Responsecode===200){
                swal(response.Message);
                getfabrics();
                $("#customerstyletable").show();
                $("#customerstyletableform").hide();
          }
          else {
            swal(response.Message);
          }
        }
    });


});

// This function is created For Update Style Data
$('#updatebtncustomerstyle').on('click',function(event){
  event.preventDefault();
  var fabricid= $("#fabricid").val();
  var fabrictitle = $("#fabrictitle").val();
  var fabricbrand = $("#fabricbrand").val();
  var fabricdetail= $("#fabricdetail").val();
  var fabricprice = $("#fabricprice").val();
  var skuno = $("#skuno").val();
  var releasedate= $("#releasedate").val();
  // alert(releasedate);
  var hexcolor = $("#hexcolor").val();
  var fabriccategory = $("#fabriccategory").val();
  var fabriccolorname= $("#fabriccolorname").val();
  var fabrictype = $("#fabrictype").val();
  var fabricPricevariable = $("#fabricPricevariable").val();
  var fabricactivestatus= $("#fabricactivestatus").val();

  $.ajax({
      url:api_url+'editfabric.php',
      type:'POST',
      data:{
        fabricid:fabricid,
        categoryid:fabriccategory,
        fabrictitle:fabrictitle,
        fabricbrand:fabricbrand,
        fabricdetails:fabricdetail,
        skuno:skuno,
        fabricprice:fabricprice,
        releasedate:releasedate,
        ispricevariable:fabricPricevariable,
        hexcolor:hexcolor,
        colorname:fabriccolorname,
        fabrictype:fabrictype,
        active:fabricactivestatus
      },
      dataType:'json',
      success:function(response){
        if(response.Responsecode===200){
              swal(response.Message);
              getfabrics();
              $("#customerstyletable").show();
              $("#customerstyletableform").hide();
        }
        else {
          swal(response.Message);
        }
      }
  });
});
