// var stitchstyleData = new Map(); // This variable globally declare save all Style Data in Array
var styleData = new Map(); // This variable globally declare save all Style Data in Array
let mapStitchStyle = new Map();
mapstitchstyle();
function mapstitchstyle() {
    mapStitchStyle.set('0', 'Multiple selection');
    mapStitchStyle.set('1', 'Single Selection');
    mapStitchStyle.set('2', 'Input Field');
}
let confirmationStatus = new Map();
getConfirmation();
function getConfirmation() {
    confirmationStatus.set('0', '<span class="badge badge-pill badge-warning">InActive</span>');
    confirmationStatus.set('1', '<span class="badge badge-pill badge-primary">Active</span>');
}
getstitchstyleitem();
getstitchstyledetailsitem();
$('#newstitchstyleId').select2({
  allowClear: true,
  placeholder: "Select Stitch Style Id"
});

function getstitchstyleitem(){
  var html ='';
  $.ajax({
      type: "GET",
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
        html +='<option value="">Select Category</option>';
        for(var i=0;i<count;i++)
        {
        stitchstyleData.set(response.Data[i].stitchStyleId,response.Data[i]);
        html +="<option value='"+response['Data'][i].stitchStyleId+"'>"+response['Data'][i].stitchStyleTitle+"</option>";
        }
        $("#newstitchstyleId").html(html);
      },
      complete:function(response){

        // console.log("after");
        $(".preloader").hide();
      }
    });
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
        let mapstatus = mapStitchStyle.get(AllData.stitchStyleType);
        let imageUrl = pic_url+'stitchsubstyle/300x300/'+k+'.jpg';
        html +="<td><form id='custstyleform"+k+"' method='post' enctype='multipart/form-data'><input type='file' id='customerstylepic"+k+"' accept='image/*' style='display:none'/> <img class='img-thumbnail' src='"+imageUrl+"'  style='cursor: pointer' onclick='imguplod("+k+")' alt='No Image' id='save"+k+"' width='70px' height='70px' title='Upload Image'></img></form></td>";
        html +="<td>"+AllData.stitchSubStyleTitle+"</td>";
        html +="<td>"+AllData.stitchStyleTitle+"</td>";
        html +="<td>"+mapstatus+"</td>";
        html +="<td>"+AllData.stitchStyleDetails+"</td>";
        // html +="<td>"+isConfirmed+"</td>";
        html +='<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Upload Image" onclick="imguplod('+k+')"><i class="fa fa-upload"></i></button> <button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+k+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removestitchStyleDetail('+k+')"><i class="fa fa-remove"></i></button></div></td>';
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
function getstitchstyledetailsitem(){
     $.ajax({
         type: "GET",
         url: api_url+"getstitchstyledetailsitem.php",
         async : false,
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
            styleData.set(response.Data[i].stitchSubStyleId,response.Data[i]);
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
                fd.append('file',files);
                fd.append('imgname',imgid);
                fd.append('foldername',"stitchsubstyle");
                $.ajax({
                     // url:"src/addimg.php",
                     url:img_url,
                     type:"POST",
                     contentType: false,
                     async :false,
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


// show image
function showimage(id){

  // let src = pic_url+'stitchsubstyle/'+id+'.jpg';
  // window.open(src);
}
// This function is created For Add Button New Style
function addStyle(){
   $("#customerstyletable").hide();
   $("#customerstyletableform").show();
   $("#savebtncustomerstyle").show();
   $("#updatebtncustomerstyle").hide();
   $("#stitchtitle").val("");
   $("#newstitchstyleId").val("").trigger('change');
}

// This function is created For Edit Button
function editStyle(id){
var AllData= styleData.get(id.toString());
$("#stitchstyleid").val(id);
$("#stitchtitle").val(AllData.stitchSubStyleTitle);
$("#newstitchstyleId").val(AllData.stitchStyleId).trigger('change');

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
  var stitchtitle = $("#stitchtitle").val();
  var stitchstyleid = $("#newstitchstyleId").val();
  var obj ={
            stitchSubStyleTitle:stitchtitle,
            stitchStyleId:stitchstyleid
          };
    $.ajax({
        url:api_url+'createstitchstyledetailitem.php',
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
            let mapData= stitchstyleData.get(stitchstyleid.toString());
            obj.stitchStyleTitle =mapData.stitchStyleTitle;
            obj.stitchStyleType =mapData.stitchStyleType;
            obj.stitchStyleDetails =mapData.stitchStyleDetails;
            obj.isActive=mapData.isActive;

            obj.stitchSubStyleId = response.RowId.toString();
            styleData.set(response.RowId.toString(),obj);
            settabledata(styleData);
          }
          else {
            swal(response.Message);
          }
        },
        complete:function(response){

          // console.log("after");
          $(".preloader").hide();
        }
    });
});

// This function is created For Update Style Data
$('#updatebtncustomerstyle').on('click',function(event){
  event.preventDefault();
  var stitchstyleid= $("#stitchstyleid").val();
  var stitchtitle = $("#stitchtitle").val();
  var newstitchstyleid = $("#newstitchstyleId").val();
  var obj={
    stitchSubStyleId:stitchstyleid,
    stitchSubStyleTitle:stitchtitle,
    stitchStyleId:newstitchstyleid
  }
  $.ajax({
      url:api_url+'editstitchstyledetailitem.php',
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
          let mapData= stitchstyleData.get(newstitchstyleid.toString());
          obj.stitchStyleTitle =mapData.stitchStyleTitle;
          obj.stitchStyleType =mapData.stitchStyleType;
          obj.stitchStyleDetails =mapData.stitchStyleDetails;
          obj.isActive=mapData.isActive;
          styleData.set(stitchstyleid.toString(),obj);
          settabledata(styleData);
        }
        else {
          swal(response.Message);
        }
      },
      complete:function(response){

        // console.log("after");
        $(".preloader").hide();
      }
  });
});

// This function is created For Remove Button
function removestitchStyleDetail(id){
  $.ajax({
      url:api_url+'deletestitchstyledetail.php',
      type:'POST',
      data:{
        stitchsubstyleId:id
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
          swal(response.Message);
        }
      },
      complete:function(response){

        // console.log("after");
        $(".preloader").hide();
      }
  });
}
