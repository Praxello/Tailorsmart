var styleData = new Map();
var EmployeeData = new Map();
var getslotdata = new Map();
var selectitemsdata = new Map();
let confirmationStatus = new Map();
let confirmationStatus1 = new Map();
const setCity = new Set();
const setAppStatus = new Set();
const setSlot = new Set();
getConfirmation();
getMicellaneousData();
getConfirmation1();
function getConfirmation1(){
  confirmationStatus1.set('0', 'Idle');
  confirmationStatus1.set('1', 'Confirmed');
  confirmationStatus1.set('2', 'Cancelled');
  confirmationStatus1.set('3', 'Withdrawn by customer');
  confirmationStatus1.set('5', 'None');
}
function getConfirmation() {
    confirmationStatus.set('0', 'Idle');
    confirmationStatus.set('1', 'Confirmed');
    confirmationStatus.set('2', 'Cancelled');
    confirmationStatus.set('3', 'Withdrawn by customer');
    confirmationStatus.set('5', 'None');
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
var table;

// function retddmmyyyy(date){
//   var nd = new Date(min);
//   var ndate =(nd.getDate())+"/"+(parseInt(nd.getMonth())+ 1)+"/"+nd.getFullYear();
//   return ndate;
// }


function settabledata(styleData) {
      // console.log(styleData);
    var xhtml = '',ihtml = '',varhtml = '';
    var cid = $("#cid").val();
    var selectslot = '',selectstatus = '',selectcity='';
    $('#appointmenttbl').dataTable().fnDestroy();
    $("#appointmenttbldata").empty();

    for (let k of styleData.keys())
    {
      //  console.log(k);
        var AllData = styleData.get(k);
        setCity.add(AllData.city); // Set is add for filter City Search
        setSlot.add(AllData.slotTime); // Set is add for filter setSlot Search

        if (EmployeeData.has(AllData.servingEmployeeId))
        {
            let EmpName = EmployeeData.get(AllData.servingEmployeeId);
            varhtml = "<td>" + EmpName.firstName + " " + EmpName.lastName + "</td>";
        }
        else
        {
            varhtml = "<td></td>";
        }
        if(cid=="1"){
           if(AllData.appointmentStatus==="0")
           {
             let newdate;
               // console.log(AllData.appointmentDate);
              var m = moment(AllData.appointmentDate, 'YYYY-MM-DD');
             let date1 = new Date(AllData.appointmentDate);
             if(m.isValid())
             {

                newdate =AllData.appointmentDate;
             }
             else{
                newdate ="Please Select Appointment Date";
             }


             let orderStatus = confirmationStatus.get(AllData.appointmentStatus);
             let orderStatus1 = confirmationStatus1.get(AllData.appointmentStatus);
             setAppStatus.add(orderStatus1); // For add filter Appointment Status
             xhtml += "<tr>";
             xhtml += "<td>" + AllData.firstName + " " + AllData.lastname + "</td>";
             xhtml += "<td style='display:none;'>" + AllData.appointmentDate + "</td>";
             xhtml += "<td>" + getDate(newdate) + "</td>";
             xhtml += "<td>" + AllData.slotTime + "</td>";
             xhtml += "<td>" + AllData.address + "</td>";

             xhtml += "<td>" + AllData.city + "</td>";
             xhtml += "<td>" + AllData.mobile + "</td>";
             xhtml += varhtml;
             xhtml += "<td>" + orderStatus + "</td>";
              xhtml += "<td style='display:none;'>" + AllData.appointmentId + "</td>";
              xhtml += "<td>" + getDate(AllData.createdAT) + "</td>";
             xhtml += '<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editcustomerappointmentdata(' + k + ')"><i class="fa fa-edit"></i></button></div></td>';
             xhtml += "</tr>";
           }
         }
        else
        {
          let newdate;
            // console.log(AllData.appointmentDate);
           var m = moment(AllData.appointmentDate, 'YYYY-MM-DD');
          let date1 = new Date(AllData.appointmentDate);
          if(m.isValid())
          {

             newdate =AllData.appointmentDate;
          }
          else{
             newdate ="Please Select Appointment Date";
          }


          let orderStatus = confirmationStatus.get(AllData.appointmentStatus);
          let orderStatus1 = confirmationStatus1.get(AllData.appointmentStatus);
          setAppStatus.add(orderStatus1); // For add filter Appointment Status
          xhtml += "<tr>";
          xhtml += "<td>" + AllData.firstName + " " + AllData.lastname + "</td>";
          xhtml += "<td style='display:none;'>" + AllData.appointmentDate + "</td>";
          xhtml += "<td>" + getDate(newdate) + "</td>";
          xhtml += "<td>" + AllData.slotTime + "</td>";
          xhtml += "<td>" + AllData.address + "</td>";
          xhtml += "<td>" + AllData.city + "</td>";
          xhtml += "<td>" + AllData.mobile + "</td>";
          xhtml += varhtml;
          xhtml += "<td>" + orderStatus + "</td>";
           xhtml += "<td style='display:none;'>" + AllData.appointmentId + "</td>";
             xhtml += "<td>" + getDate(AllData.createdAT) + "</td>";
          xhtml += '<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editcustomerappointmentdata(' + k + ')"><i class="fa fa-edit"></i></button></div></td>';
          xhtml += "</tr>";
        }

    }
     // console.log(setCity);

     selectcity += "<option value=''> Select City </option>";
     for (let item of setCity) {

            selectcity += "<option value='" +item+ "'>" + item + "</option>";
     }
     $("#tblcity").html(selectcity);
     selectslot += "<option value=''> Select Slot </option>";
     for (let item of setSlot) {

            selectslot += "<option value='" +item + "'>" + item + "</option>";
     }
     $("#tblslot").html(selectslot);
     selectstatus += "<option value=''>Select Status </option>";
     for (let item of setAppStatus) {

            selectstatus += "<option value='" + item + "'>" +item + "</option>";
     }
    $("#tblappointmentStatus").html(selectstatus);
    // console.log(xhtml);
    $("#appointmenttbldata").html(xhtml);
    // $('#appointmenttbl').DataTable(
    //   {
    //
    //   }
    // );
  $('#appointmenttbl').DataTable({
   initComplete: function() {
    this.api().columns([1]).every(function() {
      var column = this;
      var select = $('<select><option value=""> Select Appointment Date </option></select>')
        .appendTo($(column.header()).empty())
        .on('change', function() {
          var val = $.fn.dataTable.util.escapeRegex(
            $(this).val()
          );
          column
            .search(val ? '^' + val + '$' : '', true, false)
            .draw();
        });

      column.data().unique().sort().each(function(d, j) {
        select.append('<option value="' + d + '">' + d + '</option>')
      });
    });
    this.api().columns([3]).every(function() {
      var column = this;
      var select = $('<select><option value=""> Select Slot </option></select>')
        .appendTo($(column.header()).empty())
        .on('change', function() {
          var val = $.fn.dataTable.util.escapeRegex(
            $(this).val()
          );
          column
            .search(val ? '^' + val + '$' : '', true, false)
            .draw();
        });

      column.data().unique().sort().each(function(d, j) {
        select.append('<option value="' + d + '">' + d + '</option>')
      });
    });
    this.api().columns([5]).every(function() {
      var column = this;
      var select = $('<select id="tblcity"><option value=""> Select City </option></select>')
        .appendTo($(column.header()).empty())
        .on('change', function() {
          var val = $.fn.dataTable.util.escapeRegex(
            $(this).val()
          );
          column
            .search(val ? '^' + val + '$' : '', true, false)
            .draw();
        });

      column.data().unique().sort().each(function(d, j) {
        select.append('<option value="' + d + '">' + d + '</option>')
      });
    });
    this.api().columns([8]).every(function() {
      var column = this;
      var select = $('<select><option value=""> Select Status </option></select>')
        .appendTo($(column.header()).empty())
        .on('change', function() {
          var val = $.fn.dataTable.util.escapeRegex(
            $(this).val()
          );
          column
            .search(val ? '^' + val + '$' : '', true, false)
            .draw();
        });

      column.data().unique().sort().each(function(d, j) {
        select.append('<option value="' + d + '">' + d + '</option>')
      });
    });
  },
  "order":[[9,"desc"]],
  'pageLength': 10,
  dom: 'Bfrtip',
  buttons: [ 'copy', 'csv', 'excel', 'pdf', 'print' ]
});
  }

// function getDate(date) {
//     var output = '-';
//     if (date == null) {
//         return output;
//     } else {
//         var d = new Date(date);
//         output = d.toDateString(); // outputs to "Thu May 28 2015"
//         // output = d.toGMTString(); //outputs to "Thu, 28 May 2015 22:10:21 GMT"
//     }
//     return output;
// }
function getDate(date) {
    var output = '-';
    if (date == null) {
        return output;
    } else {
        var d = new Date(date);
        output = d.toDateString(); // outputs to "Thu May 28 2015"
        let outarr = output.split(" ");
        let datestr = outarr[0]+","+outarr[2]+" "+outarr[1]+" "+outarr[3];
        output=datestr;
    }
    return output;
}

function getcustomerappointmentdata() {

    $.ajax({
        type: "GET",
        url: api_url + "getappointments.php",
        dataType: "json",
        success: function(response) {
          // console.log(response);
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
    // console.log(AllData);
    $("#appointdetailtbldata").empty();
    $("#customerappointtbl").hide(); // Hide the content Customer Appointment Table.
    $("#customerappointdetailtbl").show(); //  Show the content Customer Appointment Detail
    $("#appointdetailtbldata").empty();
    $("#appointmentdetailaddr").html(AllData.address + "," + AllData.city);
    $("#customername").html(AllData.firstName + " " + AllData.lastname +"<strong><font color='red'> "+AllData.mobile+" </font></strong>");
    $("#appointmentdate").html(getDate(AllData.appointmentDate));
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
                   html += '<td>' + Allitemdata[i].Fabrics[0].fabricTitle + ' <font color="green"><u>' + Allitemdata[i].Fabrics[0].colorName+'</u></font></td>';
                   for (var j = 1; j < selectfabriclen; j++)
                   {
                     // console.log(Allitemdata[i].Fabrics[j]);
                       html += '<tr>';
                       html += '<td> </td>';
                       html += '<td>' + Allitemdata[i].Fabrics[j].fabricTitle + ' <font color="green"><u> '+Allitemdata[i].Fabrics[j].colorName+'</u></font></td>';
                       html += '</tr>';
                   }
                }
                else {
                    html += '<tr>';
                    html += '<td style="color: orange;font-weight: bolder;">' + Allitemdata[i].Product.productTitle +'</td>';
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
    var empid = $('#setemployeeId').val();
    var appdate = $('#updateappointmentdate').val();
    if(appointmentId==""||empid==""||appdate==""){
      swal("Missing Parameter");
    }
    else{
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

}

// function removeAppointment(id){
//   alert(id);
// }
$('#reloadbtn').on('click', function(event) {
    event.preventDefault();
    $("#customerappointdetailtbl").hide();
    $("#customerappointtbl").show();
});
