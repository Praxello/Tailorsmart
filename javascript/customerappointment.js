var styleData = [];
var EmployeeData  = [];
var getslotdata =[];
var selectitemsdata =[];

getMicellaneousData();


setTimeout(function(){
getcustomerappointmentdata();
}, 5000);


$(document).ready(function() {

});

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

function getMicellaneousData(){
  var selectemp='';
  $.ajax({
      type: "GET",
      url: api_url+"getmiscellaneousdata.php",
      success: function(response) {
        var countowner= response['Employee'].length;
        EmployeeData = [...response['Employee']];
        selectemp +='<option value="">Select Employee</option>';
        for (var i = 0; i < countowner; i++) {
        selectemp +="<option value='"+response['Employee'][i].employeeId+"'>"+response['Employee'][i].firstName+" "+response['Employee'][i].lastName+"</option>";
        }
        $("#setemployeeId").html(selectemp);
      }
    });
}
function getEmployeeName(empId,count) {
    var empName = '';
    for(var i=0;i<count;i++){
        if(empId == EmployeeData[i].employeeId){
            empName = EmployeeData[i].firstName + ' '+EmployeeData[i].lastName;
        }
    }
    return empName;
}
function getAppointmentStatus(appointmentId) {
  var status ='';
  switch(appointmentId) {
        case "0":
           status +='<span class="badge badge-pill badge-primary">Idle</span>';
        break;
        case "1":
          status +='<span class="badge badge-pill badge-success">Confirmed</span>';
        break;
        case "2":
          status +='<span class="badge badge-pill badge-danger">Cancelled</span>';
        break;
        case "3":
            status +='<span class="badge badge-pill badge-warning"> Withdrawn by customer</span>';
        break;
        case "5":
            status += '<span class="badge badge-pill badge-dark">None</span>';
        break;
        // code block
  }
  return status;
}


function getcustomerappointmentdata(){
  $('#appointmenttbl').dataTable().fnDestroy();
  $("#appointmenttbldata").empty();
     $.ajax({
         type: "GET",
         url:api_url+"getappointments.php",
         dataType:"json",
         success: function(response) {
           // alert(response[0].customerName);
            getslotdata=[...response["Slots"]];

            var html='',EmpName='-',orderStatus='-';
            var slotcount =getslotdata.length; // For Count length of slot
            for(var i=0;i<slotcount;i++){
              html +="<option value="+getslotdata[i].slotId+">"+getslotdata[i].slotTime+"</option>";
            }
            $("#settimeslot").html(html);
            var count= response["Data"].length;  // For Count length of Get All Appointment
            var html ="<tr>";
            var EmpCount = EmployeeData.length;
            styleData = [...response["Data"]];
            for (var i = 0; i < count; i++) {
                EmpName = getEmployeeName(response["Data"][i].AppointmentDetails.servingEmployeeId,EmpCount);
                orderStatus = getAppointmentStatus(response["Data"][i].AppointmentDetails.appointmentStatus);
                html +="<td>"+response["Data"][i].AppointmentDetails.firstName+" "+response["Data"][i].AppointmentDetails.lastname+"</td>";
                html +="<td>"+response["Data"][i].AppointmentDetails.appointmentDate+"</td>";
                html +="<td>"+response["Data"][i].AppointmentDetails.slotTime+"</td>";
                html +="<td>"+response["Data"][i].AppointmentDetails.address+"</td>";
                html +="<td>"+response["Data"][i].AppointmentDetails.city+"</td>";
                html +="<td>"+response["Data"][i].AppointmentDetails.mobile+"</td>";
                html +="<td>"+EmpName+"</td>";
                html +="<td>"+orderStatus+"</td>";
                html +='<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editcustomerappointmentdata('+i+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removeSponsers('+i+')"><i class="fa fa-remove"></i></button></div></td>';
                html +="</tr>";
                }
           $("#appointmenttbldata").html(html);

           $('#appointmenttbl').DataTable({
           searching: true,
           retrieve: true,
           bPaginate: $('tbody tr').length>10,
           order: [],
           columnDefs: [ { orderable: false, targets: [0,1,2,3,4,5,6,7] } ],
           dom: 'Bfrtip',
           buttons: ['copy','csv', 'excel', 'pdf'],
           destroy: true
           });

         }
     });
}
function editcustomerappointmentdata(id){
      // setEmployeeData();
      $("#appointdetailtbldata").empty();
      // console.log(styleData[id]);
      $("#customerappointtbl").hide(); // Hide the content Customer Appointment Table.
      $("#customerappointdetailtbl").show(); //  Show the content Customer Appointment Detail
      $("#appointdetailtbldata").empty();
      $("#appointmentdetailaddr").html(styleData[id].AppointmentDetails.address+","+styleData[id].AppointmentDetails.city);
      $("#customername").html(styleData[id].AppointmentDetails.firstName+" "+styleData[id].AppointmentDetails.lastname);
      $("#appointmentdate").html(styleData[id].AppointmentDetails.appointmentDate);
      $("#slottime").html(styleData[id].AppointmentDetails.slotTime);
      $("#setemployeeId").val(styleData[id].AppointmentDetails.servingEmployeeId).trigger('change');
      // alert(styleData[id].appointmentStatus);
      $("#appointmentStatus").val(styleData[id].AppointmentDetails.appointmentStatus).trigger('change');
      $("#settimeslot").val(styleData[id].AppointmentDetails.slotId).trigger('change');
      var appointmentStatusTitle =$("#appointmentStatus option:selected").text();
      $("#appointmentstatus").html(appointmentStatusTitle);
      $("#employeename").html(styleData[id].AppointmentDetails.email);
      $("#updateappointmentdate").val(styleData[id].AppointmentDetails.appointmentDate);
      $("#appointmentdetailid").val(styleData[id].AppointmentDetails.appointmentId);
      var selectitemlen = styleData[id].SelectedItems.length;
      var html ='';
      for(var i=0;i<selectitemlen;i++){
        var selectfabriclen = styleData[id].SelectedItems[i].Fabrics.length;
        html +='<tr>';
        html +='<td style="color: orange;font-weight: bolder;">'+styleData[id].SelectedItems[i].Product.productTitle+'</td>';
        html +='<td>'+styleData[id].SelectedItems[i].Fabrics[0].fabricTitle+'</td>';
        html +='</tr>';
        for(var j=1;j<selectfabriclen;j++){
           html +='<tr>';
           html +='<td> </td>';
           html +='<td>'+styleData[id].SelectedItems[i].Fabrics[j].fabricTitle+'</td>';
           html +='</tr>';
        }
        $("#appointdetailtbldata").html(html);
      }
}

function updateAppointmentDetails(){
    $.ajax({
        url:api_url+'updatecustomerappointment.php',
        type:'POST',
        data:
        {
          appointmentid:$('#appointmentdetailid').val(),
          slotId:$('#settimeslot').val(),
          employeeid:$('#setemployeeId').val(),
          appointmentDate:$('#updateappointmentdate').val(),
          status:$('#appointmentStatus').val()
        },
        dataType:'json',
        success:function(response){
            swal(response['Message']);
            $("#customerappointdetailtbl").hide();
            $("#customerappointtbl").show();
            getcustomerappointmentdata();
        }
    });
}

$('#reloadbtn').on('click',function(event){
  event.preventDefault();
  $("#customerappointdetailtbl").hide();
  $("#customerappointtbl").show();
});
