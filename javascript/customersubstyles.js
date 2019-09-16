
getcustomersubstyles();
var styleData = []; // This variable globally declare save all Style Data in Array
$('#stylestatus').select2({
  allowClear: true,
  placeholder: "Select Style Status"
});
$(document).ready(function() {

});
function doesFileExist(urlToFile)
{
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    // xhr.send();

    if (xhr.status == "404") {
        // console.log("File doesn't exist");
        return false;
    } else {
        // console.log("File exists");
        return true;
    }
}
// This function is created for Get All Style Data.
function getcustomersubstyles(){
  $('#styletbl').dataTable().fnDestroy();
  $("#styletbldata").empty();
     $.ajax({
         type: "GET",
         url: api_url+"getallsubstyle.php",
         success: function(response) {
           var count= response['Data'].length;
            var html ="<tr>";
            styleData=[...response['Data']];
            for (var i = 0; i < count; i++) {
              var imageUrl = pic_url+'substyle/300x300/'+response['Data'][i].subStyleId+'.jpg';
              var file = doesFileExist(imageUrl);
              if(!file){
               imageUrl = pic_url+'substyle/300x300/0.jpg';
              };
                html +="<td>"+(i+1)+"</td>";
                // html +="<td> <form id='custstyleform"+response['Data'][i].subStyleId+"' method='post' enctype='multipart/form-data'><input type='file' id='customerstylepic"+response['Data'][i].styleId+"' accept='image/*' style='display:none'/> <img class='img-thumbnail' src='"+imageUrl+"'  style='cursor: pointer' onclick='imguplod("+response['Data'][i].subStyleId+")'></img></form></td>";
                html +="<td><form id='custstyleform"+response['Data'][i].subStyleId+"' method='post' enctype='multipart/form-data'><input type='file' id='customerstylepic"+response['Data'][i].subStyleId+"' accept='image/*' style='display:none'/> <img class='img-thumbnail' src='"+imageUrl+"'  style='cursor: pointer' onclick='imguplod("+response['Data'][i].subStyleId+")'></img></form></td>";
                html +="<td>"+response['Data'][i].subStyleTitle+"</td>";
                if(response['Data'][i].isActive==1){
                  html +='<td><span class="badge badge-pill badge-primary">Active</span></td>';
                }
                else {
                  html +='<td><span class="badge badge-pill badge-warning">InActive</span></td>';
                }
                html +='<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Upload Image" onclick="imguplod('+response['Data'][i].subStyleId+')"><i class="fa fa-upload"></i></button><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+i+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removesubstyle('+response['Data'][i].subStyleId+')"><i class="fa fa-remove"></i></button></div></td>';
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
                fd.append('file',files);
                fd.append('imgname',imgid);
                fd.append('foldername',"substyle");
                $.ajax({
                     url:"src/addimg.php",
                     type:"POST",
                     contentType: false,
                     cache: false,
                     processData:false,
                     data: fd,
                     dataType:'json',
                     success:function(response){
                       swal(response['Message']);
                       // getcustomerstyles();
                     }
              });
   };
}
// This function is created For Add Button New Style
function addStyle(){
  $("#customerstyletable").hide();
  $("#customerstyletableform").show();
  $("#styletitle").val("");
  $("#stylestatus").val("").trigger('change');
  $("#savebtncustomerstyle").show();
  $("#updatebtncustomerstyle").hide();
}

// This function is created For Edit Button
function editStyle(id){
$("#styleid").val(styleData[id].subStyleId);
$("#styletitle").val(styleData[id].subStyleTitle);
$("#stylestatus").val(styleData[id].isActive).trigger('change');
$("#customerstyletable").hide();
$("#customerstyletableform").show();
$("#savebtncustomerstyle").hide();
$("#updatebtncustomerstyle").show();
}

// This function is created For Remove Button
function removesubstyle(id){
  $.ajax({
      url:api_url+'deletesubstyle.php',
      type:'POST',
      data:{
        substyleId:id
      },
      dataType:'json',
      success:function(response){
          swal(response.Message);
          $("#customerstyletable").show();
          $("#customerstyletableform").hide();
          getcustomersubstyles();
        }
  });
}

// This function is created For Refresh Action / Backbutton
$('#reloadbtn').on('click',function(event){
  event.preventDefault();
  // window.location.reload();
  $("#customerstyletable").show();
  $("#customerstyletableform").hide();
  $("#savebtncustomerstyle").show();
  $("#updatebtncustomerstyle").hide();
});

// This function is created For Save Style Data
function savecustomerstyle()
{
  var styletitle = $("#styletitle").val();
  var stylestatus = $("#stylestatus").val();
  if(styletitle==""||stylestatus==""){
    swal("Please Enter Title / Select Status");
  }
  else{
    $.ajax({
        url:api_url+'createsubstyle.php',
        type:'POST',
        data:{
          substyletitle:styletitle,
          active:stylestatus
        },
        dataType:'json',
        success:function(response){
            swal(response.Message);
            $("#customerstyletable").show();
            $("#customerstyletableform").hide();
            getcustomersubstyles();
        }
    });
  }
}

// This function is created For Update Style Data
function updatecustomerstyle(){
  var styleid = $("#styleid").val();
  var styletitle = $("#styletitle").val();
  var stylestatus = $("#stylestatus").val();
  if(styletitle==""||stylestatus==""){
    swal("Please Enter Title / Select Status");
  }
  else{
  $.ajax({
      url:api_url+'editsubstyle.php',
      type:'POST',
      data:{
        substyleid:styleid,
        substyletitle:styletitle,
        active:stylestatus
      },
      dataType:'json',
      success:function(response){
          swal(response.Message);
          $("#customerstyletable").show();
          $("#customerstyletableform").hide();
          getcustomersubstyles();
      }
  });
  }
}
