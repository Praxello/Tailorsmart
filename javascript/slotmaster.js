var SlotData = new Map();//from getallstaff.php names only
$('#slotstatus').select2({
  allowClear: true,
  placeholder: "Select Slots"
});
$('#countryname').select2({
  allowClear: true,
  placeholder: "Select Country"
});
let confirmationStatus = new Map();
var CurrencyData = new Map();//from getallstaff.php names only
getcurrency();
function getcurrency(){
  var html ='';
  $.ajax({
      type: "GET",
      url: api_url+"getallcurrency.php",
      beforeSend: function() {
            $(".preloader").show();
            // console.log("before");
      },
      success: function(response) {
        var count;
        if(response['Data']!=null){
           count= response['Data'].length;
        }
        html +='<option value="">Select Country</option>';
        for(var i=0;i<count;i++)
        {
        CurrencyData.set(response.Data[i].cityid,response.Data[i]);
        html +="<option value='"+response['Data'][i].cityid+"'>"+response['Data'][i].cityName+"</option>";
        }
        $("#countryname").html(html);
      },
      complete:function(response){
        getslots();
        $(".preloader").hide();
      }
    });
}
getConfirmation();

function getConfirmation() {
    confirmationStatus.set('0', '<span class="badge badge-pill badge-warning">InActive</span>');
    confirmationStatus.set('1', '<span class="badge badge-pill badge-primary">Active</span>');
}
function setslotmaster(SlotData){
  // console.log(SlotData);
  var html ='';
  $('#slottbl').dataTable().fnDestroy();
  $("#slottbldata").empty();
  for(let k of SlotData.keys())
  {
        let cityName ="-";
        var HoliData= SlotData.get(k);
        let isConfirmed = confirmationStatus.get(HoliData.isActive);

        if(CurrencyData.has(HoliData.cityId)){
        let cityData= CurrencyData.get(HoliData.cityId);
           cityName = cityData.cityName;
        }
        html +="<tr>";
        html +="<td>"+HoliData.slotTime+"</td>";
        html +="<td>"+cityName+"</td>";
        html +="<td>"+isConfirmed+"</td>";
        html +='<td style="width:10%"><div class="btn-group" role="group" aria-label="Basic Example">';
        html +='<button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+k+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removeStyle('+k+')"><i class="fa fa-remove"></i></button></div></td>';
        html +="</tr>";
  }
  $("#slottbldata").html(html);
  $('#slottbl').DataTable({
  searching: true,
  retrieve: true,
  bPaginate: $('tbody tr').length>10,
  order: [],
  columnDefs: [{ orderable: false, targets: [2,3]}],
  dom: 'Bfrtip',
  buttons: [],
  destroy: true
  });

}


// This function is created for Get All Style Data.
function getslots(){
     $.ajax({
         type: "GET",
         url: api_url+"getAllSlots.php",
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
            SlotData.set(response.Data[i].slotId,response.Data[i]);
            }
            setslotmaster(SlotData);
         },
         complete:function(response){

           // console.log("after");
           $(".preloader").hide();
         }
     });
}

// This function is created For Add Button New Style
function addStyle(){
  $("#customerstyletable").hide();
  $("#customerstyletableform").show();
  $("#slottitle").val("");
  $("#slotstatus").val("").trigger('change');
  $("#savebtncustomerstyle").show();
  $("#updatebtncustomerstyle").hide();
}

// This function is created For Edit Button
function editStyle(id){
var HoliData=SlotData.get(id.toString());
$("#slotid").val(HoliData.slotId);
$("#slottitle").val(HoliData.slotTime);
$("#countryname").val(HoliData.cityId).trigger('change');
$("#slotstatus").val(HoliData.isActive).trigger('change');
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
  var slottitle = $("#slottitle").val();
  var slotstatus = $("#slotstatus").val();
  var countryname = $("#countryname").val();
  if(slottitle===""||slotstatus===""||countryname===""){
    swal("Parameter Missing");
  }
  else {
    var obj = {
      slotTime:slottitle,
      cityId:countryname,
      isActive:slotstatus
      };
      $.ajax({
          url:api_url+'createslot.php',
          type:'POST',
          data:obj,
          dataType:'json',
          beforeSend: function() {
                $(".preloader").show();
                // console.log("before");
          },
          success:function(response){

              if(response.Responsecode==200){
                $("#customerstyletable").show();
                $("#customerstyletableform").hide();
                swal(response.Message);
                obj.slotId = response.RowId;
                SlotData.set(response.RowId.toString(),obj);
                setslotmaster(SlotData);
              }
              else{
                // swal(response.Message);
                swal("Please Retry Again");
              }
          },
          complete:function(response){
            $(".preloader").hide();
            // console.log("after");
          }
      });
  }

});

//This function is created For Update Style Data
$('#updatebtncustomerstyle').on('click',function(event){
  event.preventDefault();
  var slotid = $("#slotid").val();
  var slottitle = $("#slottitle").val();
  var countryname = $("#countryname").val();
  var slotstatus = $("#slotstatus").val();
  var obj = {
    slotId: slotid,
    slotTime:slottitle,
    cityId:countryname,
    isActive:slotstatus
    };
    if(slottitle===""||slotstatus===""||countryname===""){
      swal("Parameter Missing");
    }
    else {
  $.ajax({
      url:api_url+'editslot.php',
      type:'POST',
      data:obj,
      dataType:'json',
      beforeSend: function() {
            $(".preloader").show();
            // console.log("before");
      },
      success:function(response){
          if(response.Responsecode==200){
          $("#customerstyletable").show();
          $("#customerstyletableform").hide();
           SlotData.set(slotid,obj);
           setslotmaster(SlotData);
           swal(response.Message);
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
function removeStyle(id){
  $.ajax({
      url:api_url+'deleteslot.php',
      type:'POST',
      data:{
        slotId:id
      },
      dataType:'json',
      beforeSend: function() {
            $(".preloader").show();
            // console.log("before");
      },
      success:function(response){
        if(response.Responsecode==200){
          $("#customerstyletable").show();
          $("#customerstyletableform").hide();
          SlotData.delete(id.toString());
          setslotmaster(SlotData);
          swal(response.Message);
        }
        else{
          // swal(response.Message);
            swal("Slot Already Used Can't Delete");
        }
      },
      complete:function(response){

        // console.log("after");
        $(".preloader").hide();
      }
  });
}
