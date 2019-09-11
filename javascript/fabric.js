var api_url = 'http://praxello.com/tailorsmart/admin/';
var pic_url = 'http://praxello.com/tailorsmart/mobileimages/';
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
            for (var i = 0; i < count; i++) {
                styleData.push(response['Data'][i]);
                html +="<td>"+(i+1)+"</td>";
                html +="<td> <img class='img-thumbnail' src='"+pic_url+"fabric/"+response['Data'][i].skuNo+".jpg' width='20%' height='20%'></img></td>";
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
                html +='<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+i+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removeFabric('+response['Data'][i].fabricId+')"><i class="fa fa-remove"></i></button></div></td>';
                html +="  </tr>";
            }
           $("#styletbldata").html(html);
           $('#styletbl').DataTable({
           searching: true,
           retrieve: true,
           bPaginate: $('tbody tr').length>10,
           order: [],
           columnDefs: [ { orderable: false, targets: [0,1,2,3,4] } ],
           dom: 'Bfrtip',
           buttons: [],
           destroy: true
           });
         }
     });
}

// This function is created For Add Button New Style
function addStyle(){
  $("#customerstyletable").hide();
  $("#customerstyletableform").show();
   $("#fabricform").trigger("reset");
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
          swal(response.Message);
          window.location.reload();
      }
  });
}

// This function is created For Refresh Action / Backbutton
function reload(){
  window.location.reload();
}

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
  // ||skuno==""||releasedate==""||hexcolor==""||fabriccategory==""||fabriccolorname==""||fabrictype==""||fabricPricevariable==""||fabricactivestatus==""
  if(fabrictitle==""||fabricbrand==""||fabricdetail==""||fabricprice=="")
  {

  }
  else{
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
            swal(response.Message);
            // window.location.reload();
        }
    });
  }

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
          swal(response.Message);
          // window.location.reload();
      }
  });
});
