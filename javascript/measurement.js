
getmeasurementitems();
$('#stylestatus').select2({
  allowClear: true,
  placeholder: "Select Style Status"
});

var styleData = []; // This variable globally declare save all Style Data in Array

$(document).ready(function() {

});
// This function is created for Get All Style Data.
function getmeasurementitems(){
  $('#styletbl').dataTable().fnDestroy();
  $("#styletbldata").empty();
     $.ajax({
         type: "GET",
         url: api_url+"getmeasurementitems.php",
         success: function(response) {
           var count= response['Data'].length;
            var html ="<tr>";
              styleData=[...response['Data']];
            for (var i = 0; i < count; i++) {
                // styleData.push(response['Data'][i]);
                html +="<td>"+(i+1)+"</td>";
                // html ='<td><input  name="eventprofile'+response['Data'][i].styleId+'" accept="image/*"  ></td>';
                  // <form id="eventform"   method="post" enctype="multipart/form-data">
                // html +="<td><form id='custstyleform"+response['Data'][i].styleId+"' method='post' enctype='multipart/form-data'><input type='file' id='customerstylepic"+response['Data'][i].styleId+"' accept='image/*' style='display:none'/> <img class='img-thumbnail' src='"+pic_url+"style/"+response['Data'][i].styleId+".jpg' width='10%' height='10%' style='cursor: pointer' onclick='imguplod("+response['Data'][i].styleId+")'></img></form></td>";
                html +="<td>"+response['Data'][i].itemTitle+"</td>";
                if(response['Data'][i].isActive==1){
                  html +='<td><span class="badge badge-pill badge-primary">Active</span></td>';
                }
                else {
                  html +='<td><span class="badge badge-pill badge-warning">InActive</span></td>';
                }
                html +='<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+i+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removeMeasurements('+response['Data'][i].measurementId+')"><i class="fa fa-remove"></i></button></div></td>';
                html +="  </tr>";
            }
           $("#styletbldata").html(html);
           $('#styletbl').DataTable({
           searching: true,
           retrieve: true,
           bPaginate: $('tbody tr').length>10,
           order: [],
           columnDefs: [ { orderable: false, targets: [] } ],
           dom: 'Bfrtip',
           buttons: [],
           destroy: true
           });
         }
     });
}

//This function is useful for upload the image files
function imguplod(imgid){
  // alert(imgid);
   var triggerid=$('#customerstylepic'+imgid).trigger('click');
   var fileupload = document.getElementById('customerstylepic'+imgid);
   fileupload.onchange = function () {
                var customerstylepic = $('#customerstylepic'+imgid).val();
                // alert(customerstylepic);
                // alert(imgid);
                var formdata = new FormData($("#custstyleform"+imgid));
                // var formdata = new FormData(document.querySelector("custstyleform"+imgid));
                // alert(formdata);
                // var formdata= document.getElementById("custstyleform"+imgid).submit();
                 // alert(formdata);
                $.ajax({
                     url:"src/addimg.php",
                     type:"POST",
                     contentType: false,
                     cache: false,
                     processData:false,
                     data: {
                       imgnameid:imgid,
                       imgpic :customerstylepic
                     },
                     success:function(response){
                       // alert(response);

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
}

// This function is created For Edit Button
function editStyle(id){
$("#styleid").val(styleData[id].measurementId);
$("#styletitle").val(styleData[id].itemTitle);
$("#stylestatus").val(styleData[id].isActive).trigger('change');
$("#customerstyletable").hide();
$("#customerstyletableform").show();
$("#savebtncustomerstyle").hide();
$("#updatebtncustomerstyle").show();
}

// This function is created For Remove Button
function removeMeasurements(id){
  $.ajax({
      url:api_url+'deletemeasurements.php',
      type:'POST',
      data:{
        measureId:id
      },
      dataType:'json',
      success:function(response){
          swal(response.Message);
          $("#customerstyletable").show();
          $("#customerstyletableform").hide();
          getmeasurementitems();
          // window.location.reload();
      }
  });
}

// This function is created For Refresh Action / Backbutton
function reload(){
  $("#customerstyletable").show();
  $("#customerstyletableform").hide();
}

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
        url:api_url+'createmeasurementitem.php',
        type:'POST',
        data:{
          title:styletitle,
          active:stylestatus
        },
        dataType:'json',
        success:function(response){
            swal(response.Message);
            $("#customerstyletable").show();
            $("#customerstyletableform").hide();
            getmeasurementitems();
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
      url:api_url+'editmeasurementitem.php',
      type:'POST',
      data:{
        itemid:styleid,
        title:styletitle,
        active:stylestatus
      },
      dataType:'json',
      success:function(response){
          swal(response.Message);
          $("#customerstyletable").show();
          $("#customerstyletableform").hide();
          getmeasurementitems();
      }
  });
  }
}
