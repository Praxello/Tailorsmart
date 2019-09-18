
getcustomersubstyles();
var styleData = []; // This variable globally declare save all Style Data in Array
$('#stylestatus').select2({
  allowClear: true,
  placeholder: "Select Category Status"
});
$(document).ready(function() {

});

// This function is created for Get All Style Data.
function getcustomersubstyles(){
  $('#styletbl').dataTable().fnDestroy();
  $("#styletbldata").empty();
     $.ajax({
         type: "GET",
         url: api_url+"getallcategory.php",
         success: function(response) {
           var count;
            if(response['Data']!=null){
               count= response['Data'].length;
                styleData=[...response['Data']];
            }
            var html ="<tr>";
            
              var imageUrl ='';
            for (var i = 0; i < count; i++) {
              imageUrl = pic_url+'category/300x300/'+response['Data'][i].categoryId+'.jpg';
              // var file = doesFileExist(imageUrl);
              // if(!file){
              //  imageUrl = pic_url+'category/300x300/0.jpg';
              // };
                // html +="<td>"+(i+1)+"</td>";
                html +="<td><form id='custstyleform"+response['Data'][i].categoryId+"' method='post' enctype='multipart/form-data'><input type='file' id='customerstylepic"+response['Data'][i].categoryId+"' accept='image/*' style='display:none'/> <img class='img-thumbnail' src='"+imageUrl+"'  style='cursor: pointer' onclick='imguplod("+response['Data'][i].categoryId+")' alt='No Image'></img></form></td>";
                // html +="<td> <img class='img-thumbnail' src='"+pic_url+"category/"+response['Data'][i].categoryId+".jpg' width='10%' height='10%'></img></td>";
                html +="<td>"+response['Data'][i].categoryTitle+"</td>";
                if(response['Data'][i].isActive==1){
                  html +='<td><span class="badge badge-pill badge-primary">Active</span></td>';
                }
                else {
                  html +='<td><span class="badge badge-pill badge-warning">InActive</span></td>';
                }
                html +='<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Upload Image" onclick="imguplod('+response['Data'][i].categoryId+')"><i class="fa fa-upload"></i></button><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+i+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removecategory('+response['Data'][i].categoryId+')"><i class="fa fa-remove"></i></button></div></td>';
                html +="  </tr>";
            }
           $("#styletbldata").html(html);
           $('#styletbl').DataTable({
           searching: true,
           retrieve: true,
           bPaginate: $('tbody tr').length>10,
           order: [],
           columnDefs: [ { orderable: false, targets: [0,1,2,3] } ],
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
                fd.append('file',files);
                fd.append('imgname',imgid);
                fd.append('foldername',"category");
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
                        getcustomersubstyles();
                     }
              });
   };
}
// This function is created For Add Button New Style
function addStyle(){
  $("#customerstyletable").hide();
  $("#customerstyletableform").show();
  $("#styletitle").val("");
  $("#stylestatus").val("");
  $("#savebtncustomerstyle").show();
  $("#updatebtncustomerstyle").hide();
}

// This function is created For Edit Button
function editStyle(id){
$("#styleid").val(styleData[id].categoryId);
$("#styletitle").val(styleData[id].categoryTitle);
$("#stylestatus").val(styleData[id].isActive).trigger('change');
$("#customerstyletable").hide();
$("#customerstyletableform").show();
$("#savebtncustomerstyle").hide();
$("#updatebtncustomerstyle").show();
}

// This function is created For Remove Button
function removecategory(id){
  $.ajax({
      url:api_url+'deletecategory.php',
      type:'POST',
      data:{
        categoryid:id
      },
      dataType:'json',
      success:function(response){
        if(response.Responsecode===200){
          swal(response.Message);
          $("#customerstyletable").show();
          $("#customerstyletableform").hide();
          getcustomersubstyles();
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
  var styletitle = $("#styletitle").val();
  var stylestatus = $("#stylestatus").val();
    $.ajax({
        url:api_url+'createcategory.php',
        type:'POST',
        data:{
          categorytitle:styletitle,
          active:stylestatus
        },
        dataType:'json',
        success:function(response){
          if(response.Responsecode===200){
            swal(response.Message);
            $("#customerstyletable").show();
            $("#customerstyletableform").hide();
            getcustomersubstyles();
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
  var styleid = $("#styleid").val();
  var styletitle = $("#styletitle").val();
  var stylestatus = $("#stylestatus").val();
  $.ajax({
      url:api_url+'editcategory.php',
      type:'POST',
      data:{
        categoryid:styleid,
        categorytitle:styletitle,
        active:stylestatus
      },
      dataType:'json',
      success:function(response){
        if(response.Responsecode===200){
          swal(response.Message);
          $("#customerstyletable").show();
          $("#customerstyletableform").hide();
          getcustomersubstyles();
        }
        else {
          swal(response.Message);
        }

      }
  });
});
