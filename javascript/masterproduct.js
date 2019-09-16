getmasterproduct();
getmiscellaneousdata();
$('#masterstyle').select2({
  allowClear: true,
  placeholder: "Select Style"
});
$('#mastersubstyle').select2({
  allowClear: true,
  placeholder: "Select Sub Style"
});
$('#masterisgroup').select2({
  allowClear: true,
  placeholder: "Select Is Group"
});
$('#stylestatus').select2({
  allowClear: true,
  placeholder: "Select Master Product Status"
});

var styleData = []; // This variable globally declare save all Style Data in Array

$(document).ready(function() {

});



// This function is created for Get All Style Data.
function getmasterproduct(){
  $('#styletbl').dataTable().fnDestroy();
  $("#styletbldata").empty();
     $.ajax({
         type: "GET",
         url: api_url+"getparentproducts.php",
         success: function(response) {
           var count= response['Data'].length;
            var html ="<tr>";
            styleData.push(...response['Data']);
                var imageUrl ='';
            for (var i = 0; i < count; i++) {
                imageUrl = pic_url+'parent/300x300/'+response['Data'][i].parentId+'.jpg';

                html +="<td><form id='custstyleform"+response['Data'][i].parentId+"' method='post' enctype='multipart/form-data'><input type='file' id='customerstylepic"+response['Data'][i].parentId+"' accept='image/*' style='display:none'/> <img class='img-thumbnail' src='"+imageUrl+"' style='cursor: pointer' onclick='imguplod("+response['Data'][i].parentId+")' alt='No Image'></img></form></td>";
                html +="<td>"+response['Data'][i].styleTitle+"</td>";
                html +="<td>"+response['Data'][i].subStyleTitle+"</td>";
                if(response['Data'][i].isGroup==1){
                  html +='<td><span class="badge badge-pill badge-primary">Active</span></td>';
                }
                else {
                  html +='<td><span class="badge badge-pill badge-warning">InActive</span></td>';
                }
                if(response['Data'][i].isActive==1){
                  html +='<td><span class="badge badge-pill badge-primary">Active</span></td>';
                }
                else {
                  html +='<td><span class="badge badge-pill badge-warning">InActive</span></td>';
                }
                html +='<td ><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Upload Image" onclick="imguplod('+response['Data'][i].parentId+')"><i class="fa fa-upload"></i></button><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+i+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removemaster('+response['Data'][i].parentId+')"><i class="fa fa-remove"></i></button></div></td>';
                html +="  </tr>";
            }
           $("#styletbldata").html(html);
           $('#styletbl').DataTable({
           searching: true,
           retrieve: true,
           bPaginate: $('tbody tr').length>10,
           order: [],
           columnDefs: [ { orderable: false, targets: [0,1,2,3,4,5] } ],
           dom: 'Bfrtip',
           buttons: [],
           destroy: true
           });
         }
     });
}

//This function is useful for upload the image files
function imguplod(imgid){
   var triggerid=$('#customerstylepic'+imgid).trigger('click');
   var fileupload = document.getElementById('customerstylepic'+imgid);
   fileupload.onchange = function () {
                var customerstylepic = $('#customerstylepic'+imgid).val();
                var fd = new FormData();
                var files = $('#customerstylepic'+imgid)[0].files[0];
                // var base64ImageContent = files.replace(/^data:image\/(png|jpg);base64,/, "");
                // var path = "mobileimages/stitchstyle/"+imgid+".jpg";
                fd.append('file',files);
                fd.append('imgname',imgid);
                fd.append('foldername',"parent");
                // fd.append('foldername',"stitchstyle");
                $.ajax({
                    url:"http://praxello.com/tailorsmart/uploadimage.php",
                     type:"POST",
                     contentType: false,
                     cache: false,
                     processData:false,
                     data: fd,
                     dataType:'json',
                     success:function(response){
                       swal(response['Message']);
                      getmasterproduct();
                     }
              });
   };
}

function getmiscellaneousdata(){
  var selectmasterstyle ='',selectmastersubstyle='';
  // console.log(api_url);
  $.ajax({
      type: "GET",
      url: api_url+'getmiscellaneousdata.php',
      success: function(response) {

        var countowner= response['Style'].length;

        selectmasterstyle +='<option value="">Select Style</option>';
        for (var i = 0; i < countowner; i++) {
        selectmasterstyle +="<option value='"+response['Style'][i].styleId+"'>"+response['Style'][i].styleTitle+"</option>";
        }

        $("#masterstyle").html(selectmasterstyle);

        var countparent= response['Substyle'].length;
        selectmastersubstyle +='<option value="">Select Sub Style</option>';
        for (var i = 0; i < countparent; i++) {
        selectmastersubstyle +="<option value='"+response['Substyle'][i].subStyleId+"'>"+response['Substyle'][i].subStyleTitle+"</option>";
        }
        $("#mastersubstyle").html(selectmastersubstyle);
      }
    });
}

// This function is created For Add Button New Style
function addStyle(){
  $("#customerstyletable").hide();
  $("#customerstyletableform").show();
  $("#masterstyle").val("").trigger('change');
  $("#mastersubstyle").val("").trigger('change');
  $("#masterisgroup").val("").trigger('change');
  $("#stylestatus").val("").trigger('change');
  $("#savebtncustomerstyle").show();
  $("#updatebtncustomerstyle").hide();
}

// This function is created For Edit Button
function editStyle(id){

$("#masterstyleid").val(styleData[id].parentId);
$("#masterstyle").val(styleData[id].styleId).trigger('change');
$("#mastersubstyle").val(styleData[id].subStyleId).trigger('change');
$("#masterisgroup").val(styleData[id].isGroup).trigger('change');
$("#stylestatus").val(styleData[id].isActive).trigger('change');

$("#customerstyletable").hide();
$("#customerstyletableform").show();
$("#savebtncustomerstyle").hide();
$("#updatebtncustomerstyle").show();
}

// This function is created For Remove Button
function removemaster(id){
  $.ajax({
      url:api_url+'deleteproductparent.php',
      type:'POST',
      data:{
        parentid:id
      },
      dataType:'json',
      success:function(response){
          swal(response.Message);
          $("#customerstyletable").show();
          $("#customerstyletableform").hide();
          getmasterproduct();
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

// This function is created for saved Product Measurement Mapping Function
$('#savebtncustomerstyle').on('click',function(event){
  event.preventDefault();

  var masterstyle= $("#masterstyle").val();
  var mastersubstyle= $("#mastersubstyle").val();
  var masterisgroup= $("#masterisgroup").val();
  var stylestatus= $("#stylestatus").val();
  $.ajax({
      url:api_url+'createproductparent.php',
      type:'POST',
      data:{
        styleid:masterstyle,
        substyleid:mastersubstyle,
        isgroup:masterisgroup,
        active:stylestatus
      },
      dataType:'json',
      success:function(response){
          swal(response.Message);
          $("#customerstyletable").show();
          $("#customerstyletableform").hide();
          getmasterproduct();
      }
  });
});
// This function is created for saved Product Stitch Style Mapping Function
$('#updatebtncustomerstyle').on('click',function(event){
  event.preventDefault();
  var masterstyleid= $("#masterstyleid").val();
  var masterstyle= $("#masterstyle").val();
  var mastersubstyle= $("#mastersubstyle").val();
  var masterisgroup= $("#masterisgroup").val();
  var stylestatus= $("#stylestatus").val();

  $.ajax({
      url:api_url+'editproductparent.php',
      type:'POST',
      data:{
        parentid : masterstyleid,
        styleid:masterstyle,
        substyleid:mastersubstyle,
        isgroup:masterisgroup,
        active:stylestatus
      },
      dataType:'json',
      success:function(response){
          swal(response.Message);
          $("#customerstyletable").show();
          $("#customerstyletableform").hide();
          getmasterproduct();
      }
  });
});
