getcustomerappointmentdata();

function getcustomerappointmentdata(){
  $("#appointmenttbldata").empty();

     $.ajax({
         type: "GET",
         url: "./src/getCustomerappointments.php",
         dataType:"json",
         success: function(response) {
           // alert(response[0].customerName);
            var count= response.length;
            var html ="<tr>";
            for (var i = 0; i < count; i++) {

               html +="<td>"+(i+1)+"</td>";
                html +="<td>"+response[i].customerName+"</td>";
                html +="<td>"+response[i].appointmentDate+"</td>";
                html +="<td>"+response[i].slotTime+"</td>";
                html +="<td>"+response[i].EmployeeName+"</td>";

                html +='<td style=""><div class="table-data-feature"><button class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editcustomerappointmentdata('+response[i].appointmentId+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removeSponsers('+response[i].appointmentId+')"><i class="fa fa-remove"></i></button></div></td>';
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
function editcustomerappointmentdata(appointmentId){
      $("#customerappointtbl").hide(); // Hide the content Customer Appointment Table.
      $("#customerappointdetailtbl").show(); //  Show the content Customer Appointment Detail
      $("#appointdetailtbldata").empty();
      $("#appointmentdetailid").html(appointmentId);
     setEmployeeData();
     setTimeSlot();
         $.ajax({
             type: "POST",
             data : {
               appointmentId : appointmentId
             },
             url: "./src/getCustomerappointmentsDetails.php",
             dataType:"json",
             success: function(response) {

               $("#customername").html(response[0].CustomerData.customerName);
               $("#appointmentdate").html(response[0].CustomerData.appointmentDate);
               $("#slottime").html(response[0].CustomerData.slotTime);
               $("#employeename").html(response[0].CustomerData.EmployeeName);
               $("#setemployeeId").val(response[0].CustomerData.servingEmployeeId).trigger('change');
                $("#appointmentStatus").val(response[0].CustomerData.appointmentStatus).trigger('change');
                 $("#settimeslot").val(response[0].CustomerData.slotId).trigger('change');
                 $("#updateappointmentdate").val(response[0].CustomerData.apDate);
                var appointmentStatusTitle =$("#appointmentStatus option:selected").text();
              $("#appointmentstatus").html(appointmentStatusTitle);
              var count= response[0].AppointmentData.length;
                var html ="<tr>";
                for (var i = 0; i < count; i++) {

                   html +="<td>"+(i+1)+"</td>";
                    html +="<td>"+response[0].AppointmentData[i].productTitle+"</td>";
                    html +="<td>"+response[0].AppointmentData[i].fabricTitle+"</td>";
                    html +="  </tr>";
                    }
               $("#appointdetailtbldata").html(html);
             }
         });
}

function setEmployeeData(){

  $.ajax({
      type: "GET",
      url: "./src/getEmployees.php",
      dataType:"json",
      success: function(response) {
       var html='';
       var count = response.length;
       for(var i=0;i<count;i++){
         html +="<option value="+response[i].employeeId+">"+response[i].firstName+""+response[i].lastName+"</option>";
       }
       $("#setemployeeId").html(html);
      }
    });
}
function setTimeSlot(){
  $.ajax({
      type: "GET",
      url: "./src/getSlots.php",
      dataType:"json",
      success: function(response) {
        var html='';
        var count = response.length;
        for(var i=0;i<count;i++){
          html +="<option value="+response[i].slotId+">"+response[i].slotTime+"</option>";
        }
        $("#settimeslot").html(html);
      }
    });
}
function updateAppointmentDetails(){
    var updateData = {
        appointmentId:$('#appointmentdetailid').text(),
        slotId:$('#settimeslot').val(),
        servingEmployeeId:$('#setemployeeId').val(),
        appointmentDate:$('#updateappointmentdate').val(),
        appointmentStatus:$('#appointmentStatus').val()
    };
    $.ajax({
        url:'./src/updatecustomerappointment.php',
        type:'POST',
        data:updateData,
        dataType:'json',
        success:function(response){
            alert(response.success);
        }
    });
}
