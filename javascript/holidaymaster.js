var HolidayData = new Map();//from getallstaff.php names only
var CurrencyData = new Map();//from getallstaff.php names only
getcurrency();
$('#countryname').select2({
  allowClear: true,
  placeholder: "Select Country"
});
function getcurrency(){
  var html ='';
  $.ajax({
      type: "GET",
      url: api_url+"getallcurrency.php",
      beforeSend: function() {
            $(".preloader").show();
      },
      success: function(response) {
        // console.log(response);
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
        getholiday();
        $(".preloader").hide();
      }
    });
}
function setholidaymaster(HolidayData){

  var html ='';
  $('#holidaytbl').dataTable().fnDestroy();
  $("#holidaytbldata").empty();
  
  for(let k of HolidayData.keys())
  {
        let cityName ="-";
        var HoliData= HolidayData.get(k);

        if(CurrencyData.has(HoliData.cityId)){
          let cityData= CurrencyData.get(HoliData.cityId);
           cityName = cityData.cityName;
        }
        html +="<tr>";
        html +="<td>"+HoliData.holidayTitle+"</td>";
        html +="<td>"+HoliData.skipDate+"</td>";
        html +="<td>"+cityName+"</td>";
        html +='<td style="width:10%"><div class="btn-group" role="group" aria-label="Basic Example">';
        html +='<button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+k+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removeStyle('+k+')"><i class="fa fa-remove"></i></button></div></td>';
        html +="</tr>";
  }
  $("#holidaytbldata").html(html);
  $('#holidaytbl').DataTable({
  searching: true,
  retrieve: true,
  bPaginate: $('tbody tr').length>10,
  order: [],
  columnDefs: [{ orderable: false, targets: [2]}],
  dom: 'Bfrtip',
  buttons: [],
  destroy: true
  });

}


// This function is created for Get All Style Data.
function getholiday(){
     $.ajax({
         type: "GET",

         url: api_url+"getslotholidays.php",
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
            HolidayData.set(response.Data[i].holidayId,response.Data[i]);
            }
            setholidaymaster(HolidayData);
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
  $("#holidaytitle").val("");
  $("#holidaydate").val("");
  $("#countryname").val("").trigger('change');
  $("#savebtncustomerstyle").show();
  $("#updatebtncustomerstyle").hide();
}

// This function is created For Edit Button
function editStyle(id){
var HoliData=HolidayData.get(id.toString());
$("#holiid").val(HoliData.holidayId);
$("#holidaytitle").val(HoliData.holidayTitle);
$("#holidaydate").val(HoliData.skipDate);
$("#countryname").val(HoliData.cityId).trigger('change');
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
  var holidaytitle = $("#holidaytitle").val();
  var holidaydate = $("#holidaydate").val();
  var countryname = $("#countryname").val();
  if(holidaytitle===""||holidaydate===""||countryname===""){
    swal("Parameter Missing");
  }
  else{
    var obj = {
      holidayTitle:holidaytitle,
      cityId:countryname,
      skipDate:holidaydate
      };
      $.ajax({
          url:api_url+'createslotholiday.php',
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
                obj.holidayId = response.RowId;
                HolidayData.set(response.RowId.toString(),obj);
                setholidaymaster(HolidayData);
              }
              else{
                swal(response.Message);
              }
          },
          complete:function(response){
            $(".preloader").hide();
          }
      });
  }

});

//This function is created For Update Style Data
$('#updatebtncustomerstyle').on('click',function(event){
  event.preventDefault();
  var holidayid = $("#holiid").val();
  var holidaytitle = $("#holidaytitle").val();
  var holidaydate = $("#holidaydate").val();
    var countryname = $("#countryname").val();
  if(holidaytitle===""||holidaydate===""||countryname===""){
    swal("Parameter Missing");
  }
  else{

  var obj = {
    holidayId:holidayid,
    holidayTitle:holidaytitle,
    cityId:countryname,
    skipDate:holidaydate
    };
  $.ajax({
      url:api_url+'editholiday.php',
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
           HolidayData.set(holidayid,obj);
           setholidaymaster(HolidayData);
             swal(response.Message);
           }
           else{
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
function removeStyle(id){
  $.ajax({
      url:api_url+'deleteslotholiday.php',
      type:'POST',
      data:{
        holidayId:id
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
          HolidayData.delete(id.toString());
          setholidaymaster(HolidayData);
          swal(response.Message);
        }
        else{
          swal(response.Message);
        }
      },
      complete:function(response){

        // console.log("after");
        $(".preloader").hide();
      }
  });
}
