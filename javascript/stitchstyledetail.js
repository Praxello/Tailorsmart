
getstitchstyleitem();
getstitchstyledetailsitem();
var styleData = []; // This variable globally declare save all Style Data in Array
$('#newstitchstyleId').select2({
  allowClear: true,
  placeholder: "Select Stitch Style Id"
});
$(document).ready(function() {

});
function getstitchstyleitem(){
  var html ='';
  $.ajax({
      type: "GET",
      url: api_url+"getstitchstyleitem.php",
      success: function(response) {
        var count= response['Data'].length;
        html +='<option value="">Select Category</option>';
        for (var i = 0; i < count; i++) {
        html +="<option value='"+response['Data'][i].stitchStyleId+"'>"+response['Data'][i].stitchStyleTitle+"</option>";
      }
        $("#newstitchstyleId").html(html);
      }
    });
}
// This function is created for Get All Style Data.
function getstitchstyledetailsitem(){
  $('#styletbl').dataTable().fnDestroy();
  $("#styletbldata").empty();
     $.ajax({
         type: "GET",
         url: api_url+"getstitchstyledetailsitem.php",
         success: function(response) {
           var count= response['Data'].length;
            var html ="<tr>";
            styleData=[...response['Data']];
            var imageUrl ='';
            for (var i = 0; i < count; i++) {
                // styleData.push(response['Data'][i]);
                // html +="<td>"+(i+1)+"</td>";
                imageUrl = pic_url+'stitchsubstyle/300x300/'+response['Data'][i].stitchSubStyleId+'.jpg';

                html +="<td><form id='custstyleform"+response['Data'][i].stitchSubStyleId+"' method='post' enctype='multipart/form-data'><input type='file' id='customerstylepic"+response['Data'][i].stitchSubStyleId+"' accept='image/*' style='display:none'/> <img class='img-thumbnail' src='"+imageUrl+"'  style='cursor: pointer' onclick='imguplod("+response['Data'][i].stitchSubStyleId+")' alt='No Image'></img></form></td>";
                // html +="<td> <img class='img-thumbnail' src='"+pic_url+"stitchsubstyle/"+response['Data'][i].stitchSubStyleId+".jpg' width='10%' height='10%'></img></td>";
                html +="<td>"+response['Data'][i].stitchStyleDetails+"</td>";
                html +="<td>"+response['Data'][i].stitchStyleTitle+"</td>";
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
                html +="<td>"+response['Data'][i].stitchSubStyleTitle+"</td>";
                if(response['Data'][i].isActive==1){
                  html +='<td><span class="badge badge-pill badge-primary">Active</span></td>';
                }
                else {
                  html +='<td><span class="badge badge-pill badge-warning">InActive</span></td>';
                }
                // <button class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+i+')"><i class="fa fa-edit"></i></button>
                html +='<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Upload Image" onclick="imguplod('+response['Data'][i].stitchSubStyleId+')"><i class="fa fa-upload"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removestitchStyleDetail('+response['Data'][i].stitchSubStyleId+')"><i class="fa fa-remove"></i></button></div></td>';
                html +="  </tr>";
            }
           $("#styletbldata").html(html);
           $('#styletbl').DataTable({
           searching: true,
           retrieve: true,
           bPaginate: $('tbody tr').length>10,
           order: [],
           columnDefs: [ { orderable: false, targets: [0,1,2,3,4,5,6] } ],
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
                fd.append('foldername',"stitchsubstyle");
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
                       getstitchstyledetailsitem();
                     }
              });
   };
}
// This function is created For Add Button New Style
function addStyle(){
  $("#customerstyletable").hide();
  $("#customerstyletableform").show();
   $("#fabricform").trigger("reset");
   $("#savebtncustomerstyle").show();
   $("#updatebtncustomerstyle").hide();
}

// This function is created For Edit Button
function editStyle(id){
$("#stitchstyleid").val(styleData[id].stitchStyleId);
$("#stitchtitle").val(styleData[id].stitchStyleTitle);
$("#newstitchstyleId").val(styleData[id].stitchStyleType).trigger('change');

$("#customerstyletable").hide();
$("#customerstyletableform").show();
$("#savebtncustomerstyle").hide();
$("#updatebtncustomerstyle").show();
}

// This function is created For Remove Button
function removestitchStyleDetail(id){
  $.ajax({
      url:api_url+'deletestitchstyledetail.php',
      type:'POST',
      data:{
        stitchsubstyleId:id
      },
      dataType:'json',
      success:function(response){
          swal(response.Message);
          $("#customerstyletable").show();
          $("#customerstyletableform").hide();
          getstitchstyledetailsitem();
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
$('#savebtncustomerstyle').on('click',function(event){
  event.preventDefault();
  var stitchtitle = $("#stitchtitle").val();
  var stitchstyleid = $("#newstitchstyleId").val();

  // ||skuno==""||releasedate==""||hexcolor==""||fabriccategory==""||fabriccolorname==""||fabrictype==""||fabricPricevariable==""||fabricactivestatus==""
  if(stitchtitle==""||stitchstyleid=="")
  {
     swal("Parameter Missing");
  }
  else{
    $.ajax({
        url:api_url+'createstitchstyledetailitem.php',
        type:'POST',
        data:{
        title:stitchtitle,
        stitchstyleid:stitchstyleid
        },
        dataType:'json',
        success:function(response){
            swal(response.Message);
            $("#customerstyletable").show();
            $("#customerstyletableform").hide();
            getstitchstyledetailsitem();
        }
    });
  }

});

// This function is created For Update Style Data
$('#updatebtncustomerstyle').on('click',function(event){
  event.preventDefault();
  var stitchstyleid= $("#stitchstyleid").val();
  var stitchtitle = $("#stitchtitle").val();
  var newstitchstyleid = $("#newstitchstyleId").val();


  // $.ajax({
  //     url:'http://praxello.com/tailorsmart/admin/editfabric.php',
  //     type:'POST',
  //     data:{
  //       fabricid:fabricid,
  //       categoryid:fabriccategory,
  //       fabrictitle:fabrictitle,
  //       fabricbrand:fabricbrand,
  //       fabricdetails:fabricdetail,
  //       skuno:skuno,
  //       fabricprice:fabricprice,
  //       releasedate:releasedate,
  //       ispricevariable:fabricPricevariable,
  //       hexcolor:hexcolor,
  //       colorname:fabriccolorname,
  //       fabrictype:fabrictype,
  //       active:fabricactivestatus
  //     },
  //     dataType:'json',
  //     success:function(response){
  //         swal(response.Message);
  //         // window.location.reload();
  //     }
  // });
});
