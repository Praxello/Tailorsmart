var styleData = new Map(); // This variable globally declare save all Style Data in Array
let confirmationStatus = new Map();
getmeasurementitems();
getConfirmation();
$('#stylestatus').select2({
  allowClear: true,
  placeholder: "Select Measurement Status"
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
        html +="<td>"+AllData.itemTitle+"</td>";
        // html +="<td>"+isConfirmed+"</td>";
        html +='<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+k+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removeMeasurements('+k+')"><i class="fa fa-remove"></i></button></div></td>';
        html +="</tr>";
  }
  $("#styletbldata").html(html);
  $('#styletbl').DataTable({
  searching: true,
  retrieve: true,
  bPaginate: $('tbody tr').length>10,
  order: [],
  columnDefs: [ { orderable: false, targets: [0,1] } ],
  dom: 'Bfrtip',
  buttons: [],
  destroy: true
  });

}
// This function is created for Get All Style Data.
function getmeasurementitems(){
  $('#styletbl').dataTable().fnDestroy();
  $("#styletbldata").empty();
     $.ajax({
         type: "GET",
         url: api_url+"getmeasurementitems.php",
         success: function(response) {
           var count;
            if(response['Data']!=null){
               count= response['Data'].length;
            }
            for(var i=0;i<count;i++)
            {
            styleData.set(response.Data[i].measurementId,response.Data[i]);
            }
            settabledata(styleData);
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
                var formdata = new FormData($("#custstyleform"+imgid));
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
                       window.location.reload();


                     }
              });
   };
}
// This function is created For Add Button New Style
function addStyle(){
  $("#customerstyletable").hide();
  $("#customerstyletableform").show();
  $("#styletitle").val("");
  // $("#stylestatus").val("1").trigger('change');
  $("#savebtncustomerstyle").show();
  $("#updatebtncustomerstyle").hide();
}

// This function is created For Edit Button
function editStyle(id){
var AllData= styleData.get(id.toString());
$("#styleid").val(AllData.measurementId);
$("#styletitle").val(AllData.itemTitle);
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
  var stylestatus =1;
   // $("#stylestatus").val();
  if(styletitle==""||stylestatus==""){
      swal("Missing Parameter");
  }
  else{
    var obj={
            itemTitle:styletitle,
             isActive:stylestatus
           };
    $.ajax({

        url:api_url+'createmeasurementitem.php',
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
            obj.measurementId = response.RowId.toString();
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
    var obj={
      measurementId:styleid,
      itemTitle:styletitle,
      isActive:stylestatus
    };
  $.ajax({
      url:api_url+'editmeasurementitem.php',
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
            swal(response.Message);
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
function removeMeasurements(id){
  $.ajax({
      url:api_url+'deletemeasurements.php',
      type:'POST',
      data:{
        measurementId:id
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
