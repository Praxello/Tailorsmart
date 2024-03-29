var styleData = new Map(); // This variable globally declare save all Style Data in Array
let confirmationStatus = new Map();
getConfirmation();
let mapStitchStyle = new Map();
mapstitchstyle();
function mapstitchstyle() {
    mapStitchStyle.set('0', 'Multiple selection');
    mapStitchStyle.set('1', 'Single Selection');
    mapStitchStyle.set('2', 'Input Field');
}
getstitchstyles();
$('#styletype').select2({
  allowClear: true,
  placeholder: "Select Style Type"
});
$('#stylestatus').select2({
  allowClear: true,
  placeholder: "Select Style Status"
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
        let mapStitch = mapStitchStyle.get(AllData.stitchStyleType.toString());
        let isConfirmed = confirmationStatus.get(AllData.isActive);
        html +='<tr>';
        let imageUrl = pic_url+'stitchstyle/300x300/'+k+'.jpg';
        html +="<td><form id='custstyleform"+k+"' method='post' enctype='multipart/form-data'><input type='file' id='customerstylepic"+k+"' accept='image/*' style='display:none'/> <img class='img-thumbnail' src='"+imageUrl+"'  style='cursor: pointer' onclick='imguplod("+k+")' alt='No Image' id='save"+k+"' width='70px' height='70px' title='Upload Image'></img></form></td>";
        html +="<td>"+AllData.stitchStyleTitle+"</td>";
        html +="<td>"+AllData.stitchStyleDetails+"</td>";
        html +="<td>"+mapStitch+"</td>";
        // html +="<td>"+isConfirmed+"</td>";
        html +='<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Upload Image" onclick="imguplod('+k+')"><i class="fa fa-upload"></i></button><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+k+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removestitchStyle('+k+')"><i class="fa fa-remove"></i></button></div></td>';
        html +="</tr>";
  }
  $("#styletbldata").html(html);
  $('#styletbl').DataTable({
  searching: true,
  retrieve: true,
  bPaginate: $('tbody tr').length>10,
  order: [],
  columnDefs: [ { orderable: false, targets: [0,4] } ],
  dom: 'Bfrtip',
  buttons: [],
  destroy: true
  });

}

// This function is created for Get All Style Data.
function getstitchstyles(){
  $('#styletbl').dataTable().fnDestroy();
  $("#styletbldata").empty();
     $.ajax({
         type: "GET",
         // crossDomain:true,
         url: api_url+"getstitchstyleitem.php",
         beforeSend: function() {
               $(".preloader").show();
               // console.log("before");
         },
         success: function(response) {
             var count;
            if(response['Data']!=null){
               count= response['Data'].length;
            }
            for(var i=0;i<count;i++)
            {
            styleData.set(response.Data[i].stitchStyleId,response.Data[i]);
            }
            settabledata(styleData);
         },
         complete:function(response){

           // console.log("after");
           $(".preloader").hide();
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
                     url:img_url,
                     // url :"http://localhost/Tailorsmart/uploadimage.php",
                     type:"POST",
                     contentType: false,
                     cache: false,
                     processData:false,
                     data: fd,
                     dataType:'json',
                     beforeSend: function() {
                           $(".preloader").show();
                           // console.log("before");
                     },
                     success:function(response){
                       if(response['Responsecode']==200){
                         swal(response['Message']);
                         // getcustomersubstyles();
                         var output = document.getElementById('save'+imgid);
                          output.src = URL.createObjectURL(files);

                       }
                       else{
                         swal(response['Message']);
                       }
                     },
                     complete:function(response){
                       // window.location.reload();
                       // console.log("after");
                       $(".preloader").hide();
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
  // $("#stylestatus").val("1").trigger('change');
  $("#savebtncustomerstyle").show();
  $("#updatebtncustomerstyle").hide();
}

// This function is created For Edit Button
function editStyle(id){
var AllData= styleData.get(id.toString());
$("#styleid").val(AllData.stitchStyleId);
$("#styletitle").val(AllData.stitchStyleTitle);
$("#styledetail").val(AllData.stitchStyleDetails);
$("#styletype").val(AllData.stitchStyleType).trigger('change');
// $("#stylestatus").val(AllData.isActive).trigger('change');
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

// This function is created For Save Style Data
$('#savebtncustomerstyle').on('click',function(event){
  event.preventDefault();
  var styletitle = $("#styletitle").val();
  var styledetail = $("#styledetail").val();
  var styletype = $("#styletype").val();
  var stylestatus = 1;
  // $("#stylestatus").val();
  if(styletitle==""||stylestatus==""||styletype==""){
      swal("Missing Parameter");
  }
  else{
    var obj ={
      stitchStyleTitle:styletitle,
      stitchStyleDetails:styledetail,
      stitchStyleType:styletype,
      isActive:stylestatus
    };
    $.ajax({
        url:api_url+'createstitchstyleitem.php',
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
            obj.stitchStyleId = response.RowId.toString();
            styleData.set(response.RowId.toString(),obj);
            settabledata(styleData);
          }
          else {
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
  var styledetail = $("#styledetail").val();
  var styletype = $("#styletype").val();
  var stylestatus =1;
   // $("#stylestatus").val();
  if(styleid==""||styletitle==""||stylestatus==""||styletype==""||styledetail==""){
      swal("Missing Parameter");
  }
  else{
    var obj ={
      stitchStyleId:styleid,
      stitchStyleTitle:styletitle,
      stitchStyleDetails:styledetail,
      stitchStyleType:styletype,
      isActive:stylestatus
    };
  $.ajax({
      url: api_url+'editstitchstyleitem.php',
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
        else {
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
function removestitchStyle(id){
  $.ajax({
      url:api_url+'deletestitchstyle.php',
      type:'POST',
      data:{
        stitchStyleId:id
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
          }
          else {

          swal("Stitch Style Already Used Can't Delete");
          }

      },
      complete:function(response){

        // console.log("after");
        $(".preloader").hide();
      }
  });
}
