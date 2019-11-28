var styleData = new Map(); // This variable globally declare save all Style Data in Array
let confirmationStatus = new Map();
getConfirmation();
getcustomersubstyles();
$('#stylestatus').select2({
  allowClear: true,
  placeholder: "Select Sub Style Status"
});
function getConfirmation() {
    confirmationStatus.set('0', '<span class="badge badge-pill badge-warning">InActive</span>');
    confirmationStatus.set('1', '<span class="badge badge-pill badge-primary">Active</span>');
}


function settabledata(styleData){
  // console.log(styleData);
  var html ='';
  $('#styletbl').dataTable().fnDestroy();
  $("#styletbldata").empty();
  for(let k of styleData.keys())
  {
        var AllData= styleData.get(k);
        html +='<tr>';
        let isConfirmed = confirmationStatus.get(AllData.isActive);
        let imageUrl = pic_url+'substyle/300x300/'+k+'.jpg';
        html +="<td><form id='custstyleform"+k+"' method='post' enctype='multipart/form-data'><input type='file' id='customerstylepic"+k+"' accept='image/*' style='display:none'/> <img class='img-thumbnail' src='"+imageUrl+"'  style='cursor: pointer' onclick='imguplod("+k+")' alt='No Image' id='save"+k+"' width='70px' height='70px' title='Upload Image'></img></form></td>";
        html +="<td>"+AllData.subStyleTitle+"</td>";
        // html +="<td>"+isConfirmed+"</td>";
        html +='<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Upload Image" onclick="imguplod('+k+')"><i class="fa fa-upload"></i></button><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+k+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removesubstyle('+k+')"><i class="fa fa-remove"></i></button></div></td>';
        html +="<td style='display:none;'>"+k+"</td>";
        html +="</tr>";
  }
  $("#styletbldata").html(html);
  $('#styletbl').DataTable({
  searching: true,
  retrieve: true,
  bPaginate: $('tbody tr').length>10,
  order: [],
  columnDefs: [ { orderable: false, targets: [0,2,3] } ],
  dom: 'Bfrtip',
  buttons: [],
  destroy: true
  });

}

// This function is created for Get All Style Data.
function getcustomersubstyles(){
     $.ajax({
         type: "GET",
         url: api_url+"getallsubstyle.php",
         async : false,
         success: function(response) {
           var count;
            if(response['Data']!=null){
               count= response['Data'].length;
            }
            for(var i=0;i<count;i++)
            {
            styleData.set(response.Data[i].subStyleId,response.Data[i]);
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
                fd.append('foldername',"substyle");
                $.ajax({
                     // url:"src/addimg.php",
                       url:img_url,
                     type:"POST",
                     contentType: false,
                     cache: false,
                     processData:false,
                     data: fd,
                     dataType:'json',
                     success:function(response){
                       if(response['Responsecode']==200){
                         swal(response['Message']);

                         var output = document.getElementById('save'+imgid);
                          output.src = URL.createObjectURL(files);
                       }
                       else{
                         swal(response['Message']);
                       }
                     }
              });
   };
}
// This function is created For Add Button New Style
function addStyle(){
  $("#customerstyletable").hide();
  $("#customerstyletableform").show();
  $("#styleid").val("0");
  $("#styletitle").val("");
  // $("#stylestatus").val("1").trigger('change');
  $("#savebtncustomerstyle").show();
  $("#updatebtncustomerstyle").hide();
}

// This function is created For Edit Button
function editStyle(id){
var AllData= styleData.get(id.toString());
$("#styleid").val(AllData.subStyleId);
$("#styletitle").val(AllData.subStyleTitle);
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
  settabledata(styleData);
  var productId = $("#styleid").val();
  var table = $('#styletbl').DataTable();
  var row = table.row(function ( idx, data, node ) {
    return data[3] === productId;
  } );
  if (row.length > 0) {
    row.select()
    .show()
    .draw(false);
  }
});

// This function is created For Save Style Data
$('#savebtncustomerstyle').on('click',function(event){
  event.preventDefault();
  var styletitle = $("#styletitle").val();
  var stylestatus =1;
  // $("#stylestatus").val();
  if(styletitle==""||stylestatus==""){
      swal("Missing Parameter");
  }
  else{
    var obj ={
              subStyleTitle:styletitle,
              isActive:stylestatus
            };
    $.ajax({
        url:api_url+'createsubstyle.php',
        type:'POST',
        data:obj,
        dataType:'json',
        beforeSend: function() {
              $(".preloader").show();
              // console.log("before");
        },
        success:function(response){
          if(response.Responsecode===200){
            swal(response.Message);
            // $("#customerstyletable").show();
            // $("#customerstyletableform").hide();
            obj.subStyleId = response.RowId.toString();
            styleData.set(response.RowId.toString(),obj);
            // settabledata(styleData);
            $("#styleid").val(response.RowId.toString());
          }
          else{
            // swal(response.Message);
              swal("Please Retry Again");
          }
        },
        complete:function(response){

          // console.log("after");
          $(".preloader").hide();
        }
    });
  }
});

// This function is created For Update Style Data
$('#updatebtncustomerstyle').on('click',function(event){
  event.preventDefault();
  var styleid = $("#styleid").val();
  var styletitle = $("#styletitle").val();
  var stylestatus = 1;
  // $("#stylestatus").val();
  if(styletitle==""||stylestatus==""||styleid==""){
      swal("Missing Parameter");
  }
  else{
    var obj ={
      subStyleId:styleid,
      subStyleTitle:styletitle,
      isActive:stylestatus
    };
  $.ajax({
      url:api_url+'editsubstyle.php',
      type:'POST',
      data:obj,
      dataType:'json',
      beforeSend: function() {
            $(".preloader").show();
            // console.log("before");
      },
      success:function(response){
        if(response.Responsecode===200){
          swal(response.Message);
          $("#customerstyletable").show();
          $("#customerstyletableform").hide();
          // styleData.delete(styleid.toString());
          styleData.set(styleid.toString(),obj);
          settabledata(styleData);
        }
        else{
          // swal(response.Message);
            swal("Please Retry Again");
        }
      },
      complete:function(response){

        // console.log("after");
        $(".preloader").hide();
      }
  });
}
});

// This function is created For Remove Button
function removesubstyle(id){
  // console.log(id);
  $.ajax({
      url:api_url+'deletesubstyle.php',
      type:'POST',
      data:{
        subStyleId:id
      },
      dataType:'json',
      beforeSend: function() {
            $(".preloader").show();
            // console.log("before");
      },
      success:function(response){
          if(response.Responsecode===200){
            swal(response.Message);
            $("#customerstyletable").show();
            $("#customerstyletableform").hide();
            styleData.delete(id.toString());
            settabledata(styleData);
            let value =0;
            var table = $('#styletbl').DataTable();
            var tottablen = table.column( 0 ).data().length;
            let i =0;
            var row = table.row(function ( idx, data, node ) {
                i++;
              if(parseInt(data[3])<id){
                value =data[3];
                if(i===tottablen){
                    return value;
                }
              }
              else{
                // console.log("valu5e"+value);
                return value;
              }
            } );
            if (row.length > 0) {
              row.select()
              .show()
              .draw(false);
            }
          }
          else {
            // swal(response.Message);
            swal("Customer Style Already Used Can't Delete");
          }

        },
        complete:function(response){

          // console.log("after");
          $(".preloader").hide();
        }
  });
}
