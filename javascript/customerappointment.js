var api_url = 'http://praxello.com/tailorsmart/admin/';
var pic_url = 'http://praxello.com/tailorsmart/mobileimages/';
setEmployeeData();
getcustomerappointmentdata();
getallfabricmapping();
// setEmployeeData();
var styleData = [];
var slotData = [];
var getallfabmap =[];
$('#setemployeeId').select2({
  allowClear: true,
  placeholder: "Select Employee"
});
$('#settimeslot').select2({
  allowClear: true,
  placeholder: "Select Time Slot"
});
$('#appointmentStatus').select2({
  allowClear: true,
  placeholder: "Select Appoointment Status"
});
function setEmployeeData(){
  var selectemp='';
  $.ajax({
      type: "GET",
      url: api_url+"getmiscellaneousdata.php",
      success: function(response) {
        var countowner= response['Employee'].length;
        selectemp +='<option value="">Select Employee</option>';
        for (var i = 0; i < countowner; i++) {
        selectemp +="<option value='"+response['Employee'][i].employeeId+"'>"+response['Employee'][i].firstName+" "+response['Employee'][i].lastName+"</option>";
        }
        $("#setemployeeId").html(selectemp);
      }
    });
}
function getallfabricmapping(){
  $.ajax({
      type: "GET",
      url: api_url+"getproductfabricmapping.php",
      success: function(response) {
        // alert(response['Data'].length);
        getallfabmap.push(response['Data']);
      }
    });
}
function getcustomerappointmentdata(){
  $("#appointmenttbldata").empty();

     $.ajax({
         type: "GET",
         url: api_url+"getappointments.php",
         dataType:"json",
         success: function(response) {
           // alert(response[0].customerName);
            slotData.push(response["Slots"]);
            var html='';
            var slotcount = response["Slots"].length;
            for(var i=0;i<slotcount;i++){
              html +="<option value="+response["Slots"][i].slotId+">"+response["Slots"][i].slotTime+"</option>";
            }
            $("#settimeslot").html(html);
            var count= response["Data"].length;
            // alert(count);
            var html ="<tr>";
            // alert(response["Data"][0].AppointmentDetails.firstName);
            for (var i = 0; i < count; i++) {
                styleData.push(response["Data"][i].AppointmentDetails);

                html +="<td>"+(i+1)+"</td>";
                html +="<td>"+response["Data"][i].AppointmentDetails.firstName+"</td>";
                html +="<td>"+response["Data"][i].AppointmentDetails.appointmentDate+"</td>";
                html +="<td>"+response["Data"][i].AppointmentDetails.slotTime+"</td>";
                html +="<td>"+response["Data"][i].AppointmentDetails.lastName+"</td>";

                html +='<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editcustomerappointmentdata('+i+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removeSponsers('+i+')"><i class="fa fa-remove"></i></button></div></td>';
                html +="  </tr>";
                }
           $("#appointmenttbldata").html(html);

           $('#appointmenttbl').DataTable({
           searching: true,
           retrieve: true,
           bPaginate: $('tbody tr').length>10,
           order: [],
           columnDefs: [ { orderable: false, targets: [0,1,2,3,4,5] } ],
           dom: 'Bfrtip',
           buttons: ['copy','csv', 'excel', 'pdf'],
           destroy: true
           });
         }
     });
}
function editcustomerappointmentdata(id){
      // setEmployeeData();
      $("#customerappointtbl").hide(); // Hide the content Customer Appointment Table.
      $("#customerappointdetailtbl").show(); //  Show the content Customer Appointment Detail
      $("#appointdetailtbldata").empty();
      $("#appointmentdetailid").html(styleData[id].city+","+styleData[id].state+","+styleData[id].country);
      $("#customername").html(styleData[id].firstName+" "+styleData[id].lastName);
      $("#appointmentdate").html(styleData[id].appointmentDate);
      $("#slottime").html(styleData[id].slotTime);
      $("#setemployeeId").val(styleData[id].servingEmployeeId).trigger('change');
      // alert(styleData[id].appointmentStatus);
      $("#appointmentStatus").val(styleData[id].appointmentStatus).trigger('change');
      $("#settimeslot").val(styleData[id].slotId).trigger('change');
      var appointmentStatusTitle =$("#appointmentStatus option:selected").text();
      $("#appointmentstatus").html(appointmentStatusTitle);
      $("#employeename").html(styleData[id].email);
      $("#updateappointmentdate").val(styleData[id].appointmentDate);

      var productarray  = (styleData[id].productIds).split(",");
      var fabricarray = (styleData[id].fabricIds).split(";");
      var pcount = productarray.length;
      var fcount =fabricarray.length;
      for(var i=0;i<pcount;i++){
       
        var fabidarray = fabricarray[i].split(",");
        var fabidarraycount = fabidarray.length;
        for(var j=0;j<fabidarraycount;j++){
         
        }
      }
}

// function setEmployeeData(){
//
//   $.ajax({
//       type: "GET",
//       url: "./src/getEmployees.php",
//       dataType:"json",
//       success: function(response) {
//        var html='';
//        var count = response.length;
//        for(var i=0;i<count;i++){
//          html +="<option value="+response[i].employeeId+">"+response[i].firstName+""+response[i].lastName+"</option>";
//        }
//        $("#setemployeeId").html(html);
//       }
//     });
// }
// function setTimeSlot(){
//   $.ajax({
//       type: "GET",
//       url: "./src/getSlots.php",
//       dataType:"json",
//       success: function(response) {
//         var html='';
//         var count = response.length;
//         for(var i=0;i<count;i++){
//           html +="<option value="+response[i].slotId+">"+response[i].slotTime+"</option>";
//         }
//         $("#settimeslot").html(html);
//       }
//     });
// }
function updateAppointmentDetails(){
    var updateData = {
        appointmentId:$('#appointmentdetailid').text(),
        slotId:$('#settimeslot').val(),
        servingEmployeeId:$('#setemployeeId').val(),
        appointmentDate:$('#updateappointmentdate').val(),
        appointmentStatus:$('#appointmentStatus').val()
    };
    $.ajax({
        url:api_url+'updatecustomerappointment.php',
        type:'POST',
        data:updateData,
        dataType:'json',
        success:function(response){
            alert(response.success);
        }
    });
}
