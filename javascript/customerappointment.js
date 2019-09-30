var styleData = new Map();
var EmployeeData = new Map();
var getslotdata = new Map();
var selectitemsdata = new Map();
let confirmationStatus = new Map();
getConfirmation();
getMicellaneousData();

function getConfirmation() {
    confirmationStatus.set('0', '<span class="badge badge-pill badge-primary">Idle</span>');
    confirmationStatus.set('1', '<span class="badge badge-pill badge-success">Confirmed</span>');
    confirmationStatus.set('2', '<span class="badge badge-pill badge-danger">Cancelled</span>');
    confirmationStatus.set('3', '<span class="badge badge-pill badge-warning"> Withdrawn by customer</span>');
    confirmationStatus.set('5', '<span class="badge badge-pill badge-dark">None</span>');

}

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

function getMicellaneousData() {
    var selectemp = '';
    $.ajax({
        type: "GET",
        url: api_url + "getmiscellaneousdata.php",
        success: function(response) {
            var countowner = 0;
            if (response['Employee'] != null) {
                countowner = response['Employee'].length;
            }
            selectemp += '<option value="">Select Employee</option>';
            for (var i = 0; i < countowner; i++) {
                selectemp += "<option value='" + response['Employee'][i].employeeId + "'>" + response['Employee'][i].firstName + " " + response['Employee'][i].lastName + "</option>";
                EmployeeData.set(response.Employee[i].employeeId, response.Employee[i]);
            }
            $("#setemployeeId").html(selectemp);
            getcustomerappointmentdata();
        }
    });
}

var table=$('#appointmenttbl').DataTable({
    searching: true,
    retrieve: true,
    bPaginate: $('tbody tr').length > 10,
    order: [],
    columnDefs: [{ orderable: false, targets: [0, 1, 2, 3, 4, 5, 6, 7, 8,9] }],
    dom: 'Bfrtip',
    buttons: ['copy', 'csv', 'excel', 'pdf'],
    destroy: true
});
$.fn.dataTable.ext.search.push(
    function(settings, data, dataIndex) {
      // var min =$("#min").val();
      //   var max =$("#max").val();
        var min = $('#min').datepicker("getDate");
        var max = $('#max').datepicker("getDate");
        // console.log(data[1]);
        var startDate = new Date(data[1]);
        if (min == null && max == null) { return true; }
        if (min == null && startDate <= max) { return true; }
        if (max == null && startDate >= min) { return true; }
        if (startDate <= max && startDate >= min) { return true; }
        return false;
    }
);


// Event listener to the two range filtering inputs to redraw on input
$('#min, #max').change(function() {
  var min =$("#min").val();
    var max =$("#max").val();
  var min = $('#min').datepicker("getDate");
  var max = $('#max').datepicker("getDate");

  table.draw();
});

function retddmmyyyy(date){
  var nd = new Date(min);
  var ndate =(nd.getDate())+"/"+(parseInt(nd.getMonth())+ 1)+"/"+nd.getFullYear();
  return ndate;
}
// $("input").on("change", function() {
//     this.setAttribute(
//         "data-date",
//         moment(this.value, "YYYY-MM-DD")
//         .format( this.getAttribute("data-date-format") )
//     )
// }).trigger("change");

function settabledata(styleData) {
    var html = '',
        varhtml = '';
    $('#appointmenttbl').dataTable().fnDestroy();
    $("#appointmenttbldata").empty();
    for (let k of styleData.keys()) {
        var AllData = styleData.get(k);
        html += '<tr>';
        if (EmployeeData.has(AllData.servingEmployeeId)) {
            let EmpName = EmployeeData.get(AllData.servingEmployeeId);
            varhtml = "<td>" + EmpName.firstName + " " + EmpName.lastName + "</td>";
        } else {
            varhtml = "<td></td>";
        }
        let newdate =getDate(AllData.appointmentDate);
        let orderStatus = confirmationStatus.get(AllData.appointmentStatus);
        html += "<td>" + AllData.firstName + " " + AllData.lastname + "</td>";
        html += "<td style='display:none;'>" + AllData.appointmentDate + "</td>";
        html += "<td>" + newdate + "</td>";
        html += "<td>" + AllData.slotTime + "</td>";
        html += "<td>" + AllData.address + "</td>";
        html += "<td>" + AllData.city + "</td>";
        html += "<td>" + AllData.mobile + "</td>";
        html += varhtml;
        html += "<td>" + orderStatus + "</td>";
        html += '<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editcustomerappointmentdata(' + k + ')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removeAppointment(' + k + ')"><i class="fa fa-remove"></i></button></div></td>';
        html += "</tr>";
    }
    $("#appointmenttbldata").html(html);
    table = $('#appointmenttbl').DataTable({
        searching: true,
        retrieve: true,
        bPaginate: $('tbody tr').length > 10,
        order: [],
        columnDefs: [{ orderable: false, targets: [0, 1, 2, 3, 4, 5, 6, 7, 8,9] }],
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'excel', 'pdf'],
        destroy: true
    });
}

function getDate(date) {
    var output = '-';
    if (date == null) {
        return output;
    } else {
        var d = new Date(date);
        output = d.toDateString(); // outputs to "Thu May 28 2015"
        // output = d.toGMTString(); //outputs to "Thu, 28 May 2015 22:10:21 GMT"
    }
    return output;
}

function getcustomerappointmentdata() {

    $.ajax({
        type: "GET",
        url: api_url + "getappointments.php",
        dataType: "json",
        success: function(response) {
            var slotcount = 0;
            if (response["Slots"] != null) {
                slotcount = response["Slots"].length;
            }

            var html = '',
                EmpName = '-',
                orderStatus = '-';
            for (var i = 0; i < slotcount; i++) {
                html += "<option value=" + response.Slots[i].slotId + ">" + response.Slots[i].slotTime + "</option>";
                getslotdata.set(response.Slots[i].slotId, response.Slots[i]);
            }
            $("#settimeslot").html(html);

            var count;
            if (response["Data"] != null) {
                count = response["Data"].length; // For Count length of Get All Appointment
            }

            for (var i = 0; i < count; i++) {
                styleData.set(response.Data[i].AppointmentDetails.appointmentId, response.Data[i].AppointmentDetails);
                selectitemsdata.set(response.Data[i].AppointmentDetails.appointmentId, response.Data[i].SelectedItems);
            }
            settabledata(styleData);

        }
    });
}

function editcustomerappointmentdata(id) {
    // setEmployeeData();
    var AllData = styleData.get(id.toString());
    var Allitemdata = selectitemsdata.get(id.toString());

    $("#appointdetailtbldata").empty();
    $("#customerappointtbl").hide(); // Hide the content Customer Appointment Table.
    $("#customerappointdetailtbl").show(); //  Show the content Customer Appointment Detail
    $("#appointdetailtbldata").empty();
    $("#appointmentdetailaddr").html(AllData.address + "," + AllData.city);
    $("#customername").html(AllData.firstName + " " + AllData.lastname);
    $("#appointmentdate").html(AllData.appointmentDate);
    $("#slottime").html(AllData.slotTime);
    $("#setemployeeId").val(AllData.servingEmployeeId).trigger('change');
    $("#appointmentStatus").val(AllData.appointmentStatus).trigger('change');
    $("#settimeslot").val(AllData.slotId).trigger('change');
    var appointmentStatusTitle = $("#appointmentStatus option:selected").text();
    $("#appointmentstatus").html(appointmentStatusTitle);
    $("#employeename").html(AllData.email);
    $("#updateappointmentdate").val(AllData.appointmentDate);
    $("#appointmentdetailid").val(AllData.appointmentId);
    if (Allitemdata != null) {
        var selectitemlen = Allitemdata.length;
        var html = '';
        var selectfabriclen = 0;
        for (var i = 0; i < selectitemlen; i++) {
            if (Allitemdata[i].Product != null) {
                if(Allitemdata[i].Fabrics != null){
                   html += '<tr>';
                   selectfabriclen = Allitemdata[i].Fabrics.length;
                   html += '<td style="color: orange;font-weight: bolder;">' + Allitemdata[i].Product.productTitle + '</td>';
                   html += '<td>' + Allitemdata[i].Fabrics[0].fabricTitle + '</td>';
                   for (var j = 1; j < selectfabriclen; j++)
                   {
                       html += '<tr>';
                       html += '<td> </td>';
                       html += '<td>' + Allitemdata[i].Fabrics[j].fabricTitle + '</td>';
                       html += '</tr>';
                   }
                }
                else {
                    html += '<tr>';
                    html += '<td style="color: orange;font-weight: bolder;">' + Allitemdata[i].Product.productTitle + '</td>';
                    html += '<td></td>';
                    html += '</tr>';
                }
            } else {
                html += '<tr>';
                html += '<td style="color: orange;font-weight: bolder;">No Products Available Till Yet</td>';
                html += '<td></td>';
                html += '</tr>';
            }
        }
        $("#appointdetailtbldata").html(html);
    }


}


function updateAppointmentDetails() {
    var appointmentId = $('#appointmentdetailid').val();
    var obj = {
        appointmentId: appointmentId,
        slotId: $('#settimeslot').val(),
        servingEmployeeId: $('#setemployeeId').val(),
        appointmentDate: $('#updateappointmentdate').val(),
        appointmentStatus: $('#appointmentStatus').val()
    };
    $.ajax({
        url: api_url + 'updatecustomerappointment.php',
        type: 'POST',
        data: obj,
        dataType: 'json',
        beforeSend: function() {
            $(".preloader").show();
            // console.log("before");
        },
        success: function(response) {
            if (response['Responsecode'] === 200) {
                swal(response['Message']);
                $("#customerappointdetailtbl").hide();
                $("#customerappointtbl").show();
                var AllData = styleData.get(appointmentId.toString());
                obj.address = AllData.address;
                obj.city = AllData.city;
                obj.customerId = AllData.customerId;
                obj.email = AllData.email;
                obj.employeename = AllData.employeename;
                obj.fabricIds = AllData.fabricIds;
                obj.firstName = AllData.firstName;
                obj.lastname = AllData.lastname;
                obj.mobile = AllData.mobile;
                obj.productIds = AllData.productIds;
                obj.slotTime = AllData.slotTime;

                styleData.set(appointmentId.toString(), obj);
                settabledata(styleData);
            } else {
                swal(response['Message']);
            }
        },
        complete: function(response) {
            $(".preloader").hide();
        }
    });
}

// function removeAppointment(id){
//   alert(id);
// }
$('#reloadbtn').on('click', function(event) {
    event.preventDefault();
    $("#customerappointdetailtbl").hide();
    $("#customerappointtbl").show();
});
