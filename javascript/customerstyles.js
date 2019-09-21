var styleData = new Map(); // This variable globally declare save all Style Data in Array
let confirmationStatus = new Map();
getConfirmation();
getcustomerstyles();
$('#stylestatus').select2({
  allowClear: true,
  placeholder: "Select Style Status"
});

function getConfirmation() {
    confirmationStatus.set('0', '<span class="badge badge-pill badge-warning">InActive</span>');
    confirmationStatus.set('1', '<span class="badge badge-pill badge-primary">Active</span>');
}
function settabledata(styleData){
  var html ='';
  $('#styletbl').dataTable().fnDestroy();
  $("#styletbldata").empty();
 console.log(styleData);
  for(let k of styleData.keys())
  {
        var AllData= styleData.get(k);
        html +='<tr>';
        let isConfirmed = confirmationStatus.get(AllData.isActive);
        let imageUrl = pic_url+'style/300x300/'+AllData.styleId+'.jpg';
        html +="<td><form id='custstyleform"+AllData.styleId+"' method='post' enctype='multipart/form-data'><input type='file' id='customerstylepic"+AllData.styleId+"' accept='image/*' style='display:none'/> <img class='img-thumbnail' src='"+imageUrl+"'  style='cursor: pointer'  alt ='No Image' onclick='imguplod("+AllData.styleId+")'></img></form></td>";
        html +="<td>"+AllData.styleTitle+"</td>";
        html +="<td>"+isConfirmed+"</td>";
        html +='<td style="width:10%"><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Upload Image" onclick="imguplod('+AllData.styleId+')"><i class="fa fa-upload"></i></button><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+AllData.styleId+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removeStyle('+AllData.styleId+')"><i class="fa fa-remove"></i></button></div></td>';
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
// This function is created for Get All Style Data.
function getcustomerstyles(){
     $.ajax({
         type: "GET",
         url: api_url+"getallstyle.php",
         success: function(response) {
           var count;
            if(response['Data']!=null){
               count= response['Data'].length;

            }
            for(var i=0;i<count;i++)
            {
            styleData.set(response.Data[i].styleId,response.Data[i]);
            }
            settabledata(styleData);
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
                fd.append('foldername',"style");
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
  $("#styletitle").val("");
  $("#stylestatus").val("").trigger('change');
  $("#savebtncustomerstyle").show();
  $("#updatebtncustomerstyle").hide();
}

// This function is created For Edit Button
function editStyle(id){

var AllData= styleData.get(id);
$("#styleid").val(AllData.styleId);
$("#styletitle").val(AllData.styleTitle);
$("#stylestatus").val(AllData.isActive).trigger('change');
$("#customerstyletable").hide();
$("#customerstyletableform").show();
$("#savebtncustomerstyle").hide();
$("#updatebtncustomerstyle").show();
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
$('#savebtncustomerstyle').on('click',function(event){
  event.preventDefault();
  var styletitle = $("#styletitle").val();
  var stylestatus = $("#stylestatus").val();
  if(styletitle==""||stylestatus==""){
      swal("Missing Parameter");
  }
  else{
    var obj = {
      styleTitle:styletitle,
      isActive:stylestatus
    };
    $.ajax({
        url:api_url+'createstyle.php',
        type:'POST',
        data:obj,
        dataType:'json',
        success:function(response){

            if(response.Responsecode==200){
              $("#customerstyletable").show();
              $("#customerstyletableform").hide();

              swal(response.Message);
              obj.styleId = response.RowId;
              styleData.set(response.RowId,obj);
              settabledata(styleData);
            }
            else{
              swal(response.Message);
            }
        }
    });
  }

});

// This function is created For Update Style Data
$('#updatebtncustomerstyle').on('click',function(event){
  event.preventDefault();
  var styleid = $("#styleid").val();
  var styletitle = $("#styletitle").val();
  var stylestatus = $("#stylestatus").val();
  if(styletitle==""||stylestatus==""||styleid==""){
      swal("Missing Parameter");
  }
  else{
    var obj ={
      styleId:styleid,
      styleTitle:styletitle,
      isActive:stylestatus
    };
  $.ajax({
      url:api_url+'editstyle.php',
      type:'POST',
      data:obj,
      dataType:'json',
      success:function(response){

          if(response.Responsecode==200){
          $("#customerstyletable").show();
          $("#customerstyletableform").hide();
          styleData.delete(styleid.toString());
          styleData.set(styleid.toString(),obj);
          settabledata(styleData);
           swal(response.Message);
           }
           else{
             swal(response.Message);
           }
      }
  });
}
});

// This function is created For Remove Button
function removeStyle(id){
  $.ajax({
      url:api_url+'deletestyle.php',
      type:'POST',
      data:{
        styleId:id
      },
      dataType:'json',
      success:function(response){
        if(response.Responsecode==200){
          $("#customerstyletable").show();
          $("#customerstyletableform").hide();
          styleData.delete(id.toString());
          settabledata(styleData);
          swal(response.Message);
        }
        else{
          swal(response.Message);
        }
      }
  });
}
