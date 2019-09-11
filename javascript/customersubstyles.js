var api_url = 'http://praxello.com/tailorsmart/admin/';
var pic_url = 'http://praxello.com/tailorsmart/mobileimages/';
getcustomersubstyles();
var styleData = []; // This variable globally declare save all Style Data in Array
$('#stylestatus').select2({
  allowClear: true,
  placeholder: "Select Style Status"
});
$(document).ready(function() {

});
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
            for (var i = 0; i < count; i++) {
                styleData.push(response['Data'][i]);
                html +="<td>"+(i+1)+"</td>";
                html +="<td> <img class='img-thumbnail' src='"+pic_url+"substyle/"+response['Data'][i].subStyleId+".jpg' width='10%' height='10%'></img></td>";
                html +="<td>"+response['Data'][i].subStyleTitle+"</td>";
                if(response['Data'][i].isActive==1){
                  html +='<td><span class="badge badge-pill badge-primary">Active</span></td>';
                }
                else {
                  html +='<td><span class="badge badge-pill badge-warning">InActive</span></td>';
                }
                html +='<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+i+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removesubstyle('+response['Data'][i].subStyleId+')"><i class="fa fa-remove"></i></button></div></td>';
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
  $("#styletitle").val("");
  $("#stylestatus").val("");
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
          window.location.reload();
      }
  });
}

// This function is created For Refresh Action / Backbutton
function reload(){
  window.location.reload();
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
        url:api_url+'createsubstyle.php',
        type:'POST',
        data:{
          substyletitle:styletitle,
          active:stylestatus
        },
        dataType:'json',
        success:function(response){
            swal(response.Message);
            window.location.reload();
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
          window.location.reload();
      }
  });
  }
}
