var HolidayData = new Map();//from getallstaff.php names only

getholiday();

function setholidaymaster(HolidayData){
  var html ='';
  $('#holidaytbl').dataTable().fnDestroy();
  $("#holidaytbldata").empty();
  for(let k of HolidayData.keys())
  {
        var HoliData= HolidayData.get(k);
        // var HoliName = HoliData.get(HoliData.holidayId);
        html +="<tr>";
        html +="<td>"+HoliData.holidayTitle+"</td>";
        html +="<td>"+HoliData.skipDate+"</td>";
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
  columnDefs: [{ orderable: false, targets: [0,1]}],
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
         }
     });
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
var HoliData=HolidayData.get(id.toString());
$("#holiid").val(HoliData.holidayId);
$("#holidaytitle").val(HoliData.holidayTitle);
$("#holidaydate").val(HoliData.skipDate);
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
  var obj = {
    holidayTitle:holidaytitle,
    skipDate:holidaydate
    };
    $.ajax({
        url:api_url+'createslotholiday.php',
        type:'POST',
        data:obj,
        dataType:'json',
        success:function(response){

            if(response.Responsecode==200){
              $("#customerstyletable").show();
              $("#customerstyletableform").hide();
              swal(response.Message);
              obj.holidayId = response.RowId;
              HolidayData.set(response.RowId,obj);
              setholidaymaster(HolidayData);
            }
            else{
              swal(response.Message);
            }
        }
    });
});

//This function is created For Update Style Data
$('#updatebtncustomerstyle').on('click',function(event){
  event.preventDefault();
  var holidayid = $("#holiid").val();
  var holidaytitle = $("#holidaytitle").val();
  var holidaydate = $("#holidaydate").val();
  var obj = {
    holidayId:holidayid,
    holidayTitle:holidaytitle,
    skipDate:holidaydate
    };
  $.ajax({
      url:api_url+'editholiday.php',
      type:'POST',
      data:obj,
      dataType:'json',
      success:function(response){

          if(response.Responsecode==200){
          $("#customerstyletable").show();
          $("#customerstyletableform").hide();
           HolidayData.delete(holidayid);
           HolidayData.set(holidayid,obj);
           setholidaymaster(HolidayData);
             swal(response.Message);
           }
           else{
             swal(response.Message);
           }
      }
  });
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
      }
  });
}
