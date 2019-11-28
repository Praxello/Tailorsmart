var CurrencyData = new Map();//from getallstaff.php names only
// $('#slotstatus').select2({
//   allowClear: true,
//   placeholder: "Select Slots"
// });
let confirmationStatus = new Map();
// getConfirmation();
getslots();
function getConfirmation() {
    confirmationStatus.set('0', '<span class="badge badge-pill badge-warning">InActive</span>');
    confirmationStatus.set('1', '<span class="badge badge-pill badge-primary">Active</span>');
}
function setslotmaster(CurrencyData){

  var html ='';
  $('#slottbl').dataTable().fnDestroy();
  $("#slottbldata").empty();
  for(let k of CurrencyData.keys())
  {
        var HoliData= CurrencyData.get(k);
        // let isConfirmed = confirmationStatus.get(HoliData.isActive);
        html +="<tr>";
        html +="<td>"+HoliData.cityName+"</td>";
        html +="<td>"+HoliData.currencyMultiplier+"</td>";
        html +="<td>"+HoliData.currencyCode+"</td>";
        // html +="<td>"+isConfirmed+"</td>";
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
  columnDefs: [{ orderable: false, targets: [0,1,2,3]}],
  dom: 'Bfrtip',
  buttons: [],
  destroy: true
  });

}


// This function is created for Get All Style Data.
function getslots(){
     $.ajax({

         type: "GET",
         url: api_url+"getallcurrencymaster.php",
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
            CurrencyData.set(response.Data[i].cityid,response.Data[i]);
            }
            setslotmaster(CurrencyData);
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
  $("#cityname").val("");
  $("#currencyval").val("");
  $("#currencycode").val("");
  // $("#slotstatus").val("").trigger('change');
  $("#savebtncustomerstyle").show();
  $("#updatebtncustomerstyle").hide();
}

// This function is created For Edit Button
function editStyle(id){
var HoliData=CurrencyData.get(id.toString());
// console.log(HoliData);
$("#cityid").val(HoliData.cityid);
$("#cityname").val(HoliData.cityName);
$("#currencyval").val(HoliData.currencyMultiplier);
$("#currencycode").val(HoliData.currencyCode);
// $("#slotstatus").val(HoliData.isActive).trigger('change');
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
  var cityname = $("#cityname").val();
  var currencyval = $("#currencyval").val();
  var currencycode = $("#currencycode").val();
  if(cityname===""||currencyval===""||currencycode===""){
    swal("Parameter Missing");
  }
  else {
    var obj = {
      cityName:cityname,
      currencyMultiplier:currencyval,
      currencyCode:currencycode
      };
      $.ajax({
          url:api_url+'createcurrency.php',
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
                obj.cityId = response.RowId;
                CurrencyData.set(response.RowId.toString(),obj);
                setslotmaster(CurrencyData);
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
  var cityid = $("#cityid").val();
  var cityname = $("#cityname").val();
  var currencyval = $("#currencyval").val();
  var currencycode = $("#currencycode").val();
  if(cityid===""||cityname===""||currencyval===""||currencycode===""){
    swal("Parameter Missing");
  }
  else {
    var obj =
      {
      cityId : cityid,
      cityName:cityname,
      currencyMultiplier:currencyval,
      currencyCode:currencycode
      };
  $.ajax({
      url:api_url+'editcurrency.php',
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
           CurrencyData.set(cityid,obj);
           setslotmaster(CurrencyData);
           swal(response.Message);
           }
           else{
             swal("Please Retry Again");
             // swal(response.Message);
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
      url:api_url+'deletecurrency.php',
      type:'POST',
      data:{
        cityId:id
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
          CurrencyData.delete(id.toString());
          setslotmaster(CurrencyData);
          swal(response.Message);
        }
        else{
          // swal(response.Message);
          swal("Currency Already Used Can't Delete");
        }
      },
      complete:function(response){

        // console.log("after");
        $(".preloader").hide();
      }
  });
}
