var styleData = new Map();
let confirmationStatus = new Map();
getmiscellaneousdata();
getConfirmation();
function getConfirmation() {
    confirmationStatus.set('0', '<span class="badge badge-pill badge-warning">InActive</span>');
    confirmationStatus.set('1', '<span class="badge badge-pill badge-primary">Active</span>');
}
getmasterproduct();
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


function settabledata(styleData){
   console.log(styleData);
  var html ='';
  $('#styletbl').dataTable().fnDestroy();
  $("#styletbldata").empty();
  for(let k of styleData.keys())
  {
        var AllData= styleData.get(k);
        let imageUrl = pic_url+'parent/300x300/'+k+'.jpg';
        html +='<tr>';
        let isGroup = confirmationStatus.get(AllData.isGroup);
        let isConfirmed = confirmationStatus.get(AllData.isActive);
        html +="<td><form id='custstyleform"+k+"' method='post' enctype='multipart/form-data'><input type='file' id='customerstylepic"+k+"' accept='image/*' style='display:none'/> <img class='img-thumbnail' src='"+imageUrl+"' style='cursor: pointer' onclick='imguplod("+k+")' alt='No Image'></img></form></td>";
        html +="<td>"+AllData.styleTitle+"</td>";
        html +="<td>"+AllData.subStyleTitle+"</td>";
        html +="<td>"+isGroup+"</td>";
        html +="<td>"+isConfirmed+"</td>";
        html +='<td ><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Upload Image" onclick="imguplod('+k+')"><i class="fa fa-upload"></i></button><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+k+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removemaster('+k+')"><i class="fa fa-remove"></i></button></div></td>';
        html +="</tr>";
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

// This function is created for Get All Style Data.
function getmasterproduct(){

     $.ajax({
         type: "GET",
         url: api_url+"getparentproducts.php",
         success: function(response) {
           var count;
           if(response['Data']!=null){
               count= response['Data'].length;
           }
           for(var i=0;i<count;i++)
           {
           styleData.set(response.Data[i].parentId,response.Data[i]);
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
  $.ajax({
      type: "GET",
      url: api_url+'getmiscellaneousdata.php',
      success: function(response) {
         var countowner =0;
          if(response['Style']!=null){
          countowner= response['Style'].length;
          }
          selectmasterstyle +='<option value="">Select Style</option>';
          for (var i = 0; i < countowner; i++) {
          selectmasterstyle +="<option value='"+response['Style'][i].styleId+"'>"+response['Style'][i].styleTitle+"</option>";
          }
          $("#masterstyle").html(selectmasterstyle);
         // -----------
          var countparent =0;
          if(response['Substyle']!=null){
            countparent= response['Substyle'].length;
          }
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
var AllData= styleData.get(id.toString());
$("#masterstyleid").val(AllData.parentId);
$("#masterstyle").val(AllData.styleId).trigger('change');
$("#mastersubstyle").val(AllData.subStyleId).trigger('change');
$("#masterisgroup").val(AllData.isGroup).trigger('change');
$("#stylestatus").val(AllData.isActive).trigger('change');

$("#customerstyletable").hide();
$("#customerstyletableform").show();
$("#savebtncustomerstyle").hide();
$("#updatebtncustomerstyle").show();
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

          if(response.Responsecode===200){
            swal(response.Message);
            $("#customerstyletable").show();
            $("#customerstyletableform").hide();
            getmasterproduct();
          }
          else {
            swal(response.Message);
          }

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
        if(response.Responsecode===200){
            swal(response.Message);
          $("#customerstyletable").show();
          $("#customerstyletableform").hide();
          getmasterproduct();
        }
        else {
            swal(response.Message);
        }
      }
  });
});

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
        if(response.Responsecode===200){
          swal(response.Message);
          $("#customerstyletable").show();
          $("#customerstyletableform").hide();
          getmasterproduct();
        }
        else {
            swal(response.Message);
        }
      }
  });
}
