
// setEmployeeData();
var styleData = [];
// var getallfabmap =[];
var getallemployee  = [];
var getslotdata =[];
var selectitemsdata =[];


setEmployeeData();
// getallfabricmapping();

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
function setEmployeeData(){
  var selectemp='';
  $.ajax({
      type: "GET",
      url: api_url+"getmiscellaneousdata.php",
      success: function(response) {
        var countowner= response['Employee'].length;
        getallemployee = [...response['Employee']];
        // console.log("Emp"+getallemployee);
        selectemp +='<option value="">Select Employee</option>';
        for (var i = 0; i < countowner; i++) {
        selectemp +="<option value='"+response['Employee'][i].employeeId+"'>"+response['Employee'][i].firstName+" "+response['Employee'][i].lastName+"</option>";
        }
        $("#setemployeeId").html(selectemp);
      }
    });
}
// function getallfabricmapping(){
//   $.ajax({
//       type: "GET",
//       url: api_url+"getproductfabricmapping.php",
//       success: function(response) {
//         getallfabmap.push(response['Data']);
//       }
//     });
// }

function getcustomerappointmentdata(){
  $('#appointmenttbl').dataTable().fnDestroy();
  $("#appointmenttbldata").empty();
     $.ajax({
         type: "GET",
         // url: api_url+"getappointments.php",
         url:api_url+"getappointments.php",
         dataType:"json",
         success: function(response) {
           // alert(response[0].customerName);
            getslotdata=[...response["Slots"]];

            var html='';
            var slotcount =getslotdata.length; // For Count length of slot
            for(var i=0;i<slotcount;i++){
              html +="<option value="+getslotdata[i].slotId+">"+getslotdata[i].slotTime+"</option>";
            }
            $("#settimeslot").html(html);
            var count= response["Data"].length;  // For Count length of Get All Appointment
            var html ="<tr>";
           // alert(getallemployee);

            var emplength = getallemployee.length;
            styleData = [...response["Data"]];
            for (var i = 0; i < count; i++) {


                // styleData.push(response["Data"][i].AppointmentDetails);
                // html +="<td>"+(i+1)+"</td>";
                html +="<td>"+response["Data"][i].AppointmentDetails.firstName+" "+response["Data"][i].AppointmentDetails.lastname+"</td>";
                html +="<td>"+response["Data"][i].AppointmentDetails.appointmentDate+"</td>";
                html +="<td>"+response["Data"][i].AppointmentDetails.slotTime+"</td>";
                html +="<td>"+response["Data"][i].AppointmentDetails.address+"</td>";
                html +="<td>"+response["Data"][i].AppointmentDetails.city+"</td>";
                html +="<td>"+response["Data"][i].AppointmentDetails.mobile+"</td>";
                // console.log(getallemployee);
                for(var j=0;j<emplength;j++){
                if(getallemployee[j].employeeId===response["Data"][i].AppointmentDetails.servingEmployeeId){
                  html +="<td>"+getallemployee[j].firstName+" "+getallemployee[j].lastName+"</td>";
                }
                }
                if(response["Data"][i].AppointmentDetails.servingEmployeeId==0){
                  html +="<td></td>";
                }
                switch(response["Data"][i].AppointmentDetails.appointmentStatus) {
                      case "0":
                         html +="<td> Idle </td>";
                      break;
                      case "1":
                        html +="<td> Confirmed </td>";
                      break;
                      case "2":
                        html +="<td> Cancelled </td>";
                      break;
                      case "3":
                          html +="<td> Withdrawn by customer </td>";
                      break;
                      case "5":
                          html +="<td> None </td>";
                      break;
                      // code block
                }

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
        // html +='<td>'+(j+1)+'</td>';
        html +='<td style="color: orange;font-weight: bolder;">'+styleData[id].SelectedItems[i].Product.productTitle+'</td>';
        html +='<td>'+styleData[id].SelectedItems[i].Fabrics[0].fabricTitle+'</td>';
        html +='</tr>';
        for(var j=1;j<selectfabriclen;j++){
           html +='<tr>';
           // html +='<td>'+(j+1)+'</td>';
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
