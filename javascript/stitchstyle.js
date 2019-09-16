
getstitchstyles();
$('#styletype').select2({
  allowClear: true,
  placeholder: "Select Style Type"
});
$('#stylestatus').select2({
  allowClear: true,
  placeholder: "Select Style Status"
});

var styleData = []; // This variable globally declare save all Style Data in Array

$(document).ready(function() {

});
// This function is created for Get All Style Data.
function getstitchstyles(){
  $('#styletbl').dataTable().fnDestroy();
  $("#styletbldata").empty();
     $.ajax({
         type: "GET",
         // crossDomain:true,
         url: api_url+"getstitchstyleitem.php",
         success: function(response) {
           var count= response['Data'].length;
            var html ="<tr>";
                    var imageUrl ='';
            styleData=[...response['Data']];
            for (var i = 0; i < count; i++) {
                // html +="<td>"+(i+1)+"</td>";
                imageUrl = pic_url+'stitchstyle/300x300/'+response['Data'][i].stitchStyleId+'.jpg';
                html +="<td><form id='custstyleform"+response['Data'][i].stitchStyleId+"' method='post' enctype='multipart/form-data'><input type='file' id='customerstylepic"+response['Data'][i].stitchStyleId+"' accept='image/*' style='display:none'/> <img class='img-thumbnail' src='"+imageUrl+"'  style='cursor: pointer' onclick='imguplod("+response['Data'][i].stitchStyleId+")' alt='No Image'></img></form></td>";
                // html +="<td> <img class='img-thumbnail' src='"+pic_url+"stitchstyle/"+response['Data'][i].stitchStyleId+".jpg' width='10%' height='10%'></img></td>";
                html +="<td>"+response['Data'][i].stitchStyleTitle+"</td>";
                html +="<td>"+response['Data'][i].stitchStyleDetails+"</td>";
                switch(response['Data'][i].stitchStyleType) {
                                case "0":
                                html +="<td> Multiple selection </td>";
                                  break;
                                case "1":
                                  html +="<td>Single Selection</td>";
                                  break;
                                case "2":
                                  html +="<td>Input Field</td>";
                                    break;
                              }
                if(response['Data'][i].isActive==1){
                  html +='<td><span class="badge badge-pill badge-primary">Active</span></td>';
                }
                else {
                  html +='<td><span class="badge badge-pill badge-warning">InActive</span></td>';
                }
                html +='<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Upload Image" onclick="imguplod('+response['Data'][i].stitchStyleId+')"><i class="fa fa-upload"></i></button><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+i+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removestitchStyle('+response['Data'][i].stitchStyleId+')"><i class="fa fa-remove"></i></button></div></td>';
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

//This function is useful for upload the image files
function imguplod(imgid){
   var triggerid=$('#customerstylepic'+imgid).trigger('click');
   var fileupload = document.getElementById('customerstylepic'+imgid);
   fileupload.onchange = function () {
                var customerstylepic = $('#customerstylepic'+imgid).val();
                var fd = new FormData();
                var files = $('#customerstylepic'+imgid)[0].files[0];
                // var base64ImageContent = files.replace(/^data:image\/(png|jpg);base64,/, "");
                var path = "mobileimages/stitchstyle/"+imgid+".jpg";
                fd.append('file',files);
                fd.append('imgname',imgid);
                fd.append('foldername',"stitchstyle");
                // fd.append('foldername',"stitchstyle");
                $.ajax({
                     url:"http://praxello.com/tailorsmart/uploadimage.php",
                     // url :"http://localhost/Tailorsmart/uploadimage.php",
                     type:"POST",
                     contentType: false,
                     cache: false,
                     processData:false,
                     data: fd,
                     dataType:'json',
                     success:function(response){
                       swal(response['Message']);
                        getstitchstyles();
                     }
              });
   };
}
// This function is created For Add Button New Style
function addStyle(){
  $("#customerstyletable").hide();
  $("#customerstyletableform").show();
  $("#styletitle").val("");
  $("#styledetail").val("");
  $("#styletype").val("").trigger('change');
  $("#stylestatus").val("").trigger('change');
  $("#savebtncustomerstyle").show();
  $("#updatebtncustomerstyle").hide();
}

// This function is created For Edit Button
function editStyle(id){
$("#styleid").val(styleData[id].stitchStyleId);
$("#styletitle").val(styleData[id].stitchStyleTitle);
$("#styledetail").val(styleData[id].stitchStyleDetails);
$("#styletype").val(styleData[id].stitchStyleType).trigger('change');
$("#stylestatus").val(styleData[id].isActive).trigger('change');
$("#customerstyletable").hide();
$("#customerstyletableform").show();
$("#savebtncustomerstyle").hide();
$("#updatebtncustomerstyle").show();
}

// This function is created For Remove Button
function removestitchStyle(id){
  $.ajax({
      url:api_url+'deletestitchstyle.php',
      type:'POST',
      data:{
        stitchstyleId:id
      },
      dataType:'json',
      success:function(response){
          swal(response.Message);
          getstitchstyles();
          $("#customerstyletable").show();
          $("#customerstyletableform").hide();
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
function savecustomerstyle()
{
  var styletitle = $("#styletitle").val();
  var styledetail = $("#styledetail").val();
  var styletype = $("#styletype").val();
  var stylestatus = $("#stylestatus").val();
  if(styletitle==""||stylestatus==""||styledetail==""||styletype==""){
    swal("Please Enter Title / Select Status");
  }
  else{
    $.ajax({
        url:api_url+'createstitchstyleitem.php',
        type:'POST',
        data:{
          title:styletitle,
          details:styledetail,
          type:styletype,
          active:stylestatus
        },
        dataType:'json',
        success:function(response){
            swal(response.Message);
            getstitchstyles();
            $("#customerstyletable").show();
            $("#customerstyletableform").hide();
        }
    });
  }
}

// This function is created For Update Style Data
function updatecustomerstyle(){
  var styleid = $("#styleid").val();
  var styletitle = $("#styletitle").val();
  var styledetail = $("#styledetail").val();
  var styletype = $("#styletype").val();
  var stylestatus = $("#stylestatus").val();
  if(styletitle==""||stylestatus==""||styledetail==""||styletype==""){
    swal("Please Enter Title / Select Status");
  }
  else{
  $.ajax({
      url: api_url+'editstitchstyleitem.php',
      type:'POST',
      data:{

        stitchstyleid:styleid,
        title:styletitle,
        details:styledetail,
        type:styletype,
        active:stylestatus
      },
      dataType:'json',
      success:function(response){
          swal(response.Message);
          getstitchstyles();
          $("#customerstyletable").show();
          $("#customerstyletableform").hide();
      }
  });
  }
}
