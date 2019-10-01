var statusMap = new Map(); //for static status
var confirmationStatus = new Map();
var EmployeeData = new Map();
getStatusMap();
getConfirmation();

function getStatusMap() {
    statusMap.set('0', '<span class="badge badge-pill badge-danger">Not completed</span>');
    statusMap.set('1', '<span class="badge badge-pill badge-success">Confirmed/span>');
    statusMap.set('2', '<span class="badge badge-pill badge-primary">Processing</span>');
    statusMap.set('3', '<span class="badge badge-pill badge-secondary">Sent for Trial</span>');
    statusMap.set('4', '<span class="badge badge-pill badge-warning">Completed</span>');
    statusMap.set('5', '<span class="badge badge-pill badge-info">Cancelled</span>');
    statusMap.set('6', '<span class="badge badge-pill badge-dark">For Alteration</span>');
}

function getConfirmation() {
    confirmationStatus.set('0', '<span class="badge badge-pill badge-warning">Not Confirmed</span>');
    confirmationStatus.set('1', '<span class="badge badge-pill badge-success">Confirmed</span>');
}
getMicellaneousData();

function getMicellaneousData() {
    $.ajax({
        url: api_url + 'getmiscellaneousdata.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.Employee != null) {
                var count_EmployeeData = response.Employee.length;
                for (var i = 0; i < count_EmployeeData; i++) {
                    EmployeeData.set(response.Employee[i].employeeId, response.Employee[i].firstName + ' ' + response.Employee[i].lastName);
                }
            }

        }
    });
}
getallorders();
// This function is created for Get All Customer Orders
function getallorders() {
    $('#customerordertbl').dataTable().fnDestroy();
    $("#customerordertbldata").empty();
    var empId = $('#empId').val();
    $.ajax({
        type: "POST",
        url: api_url + "getVendorOrderslist.php",
        data: { ownerId: empId },
        beforeSend: function() {
            $(".preloader").show();
        },
        success: function(response) {
            var count;
            var responseData = "";
            var orderStatus = null,
                isConfirmed = null,
                customerExpectedDate = null,
                FinalDeliveryDate = null,
                EmpName, assignEmp;
            if (response.Data != null) {
                count = response.Data.length;
                for (var i = 0; i < count; i++) {
                    EmpName = '-';
                    assignEmp = '-';
                    orderStatus = null;
                    isConfirmed = null;
                    orderStatus = statusMap.get(response.Data[i].OrderDetails.orderStatus);
                    isConfirmed = confirmationStatus.get(response.Data[i].OrderDetails.isConfirmed);
                    if (EmployeeData.has(response.Data[i].OrderDetails.employeeId)) {
                        EmpName = EmployeeData.get(response.Data[i].OrderDetails.employeeId);
                    }
                    if (EmployeeData.has(response.Data[i].OrderDetails.employeeid)) {
                        assignEmp = EmployeeData.get(response.Data[i].OrderDetails.employeeid);
                    }
                    customerExpectedDate = getDate(response.Data[i].OrderDetails.customerExpectedDate);
                    FinalDeliveryDate = getDate(response.Data[i].OrderDetails.FinalDeliveryDate);

                    responseData += "<tr>";
                    responseData += "<td>" + (i + 1) + "</td>";
                    responseData += "<td><strong>" + response.Data[i].OrderDetails.productTitle + '-' + response.Data[i].OrderDetails.styleTitle + "</strong></td>";
                    responseData += "<td>" + orderStatus + "</td>";
                    responseData += "<td>" + isConfirmed + "</td>";
                    responseData += "<td>" + customerExpectedDate + "</td>";
                    responseData += "<td>" + FinalDeliveryDate + "</td>";
                    responseData += "<td>" + EmpName + "</td>";
                    responseData += "<td>" + assignEmp + "</td>";
                    responseData += "<td><button class='btn btn-success btn-sm' data-toggle='tooltip' data-placement='top' title='Edit'><i class='fa fa-edit'></i></button></td>";
                    responseData += "</tr>";
                }
            }
            $("#customerordertbldata").html(responseData);
            table = $('#customerordertbl').DataTable({
                searching: true,
                retrieve: true,
                bPaginate: $('tbody tr').length > 10,
                order: [],
                columnDefs: [{ orderable: false, targets: [0, 1, 2, 3, 4, 5, 6, 7, 8] }],
                dom: 'Bfrtip',
                buttons: [],
                destroy: true
            });
        },
        complete: function(response) {
            $(".preloader").hide();
        }
    });
}

function getDate(date) {
    var output = '-';
    if (date == null) {
        return output;
    } else {
        var d = new Date(date);
        output = d.toDateString(); // outputs to "Thu May 28 2015"
        //output = d.toGMTString(); //outputs to "Thu, 28 May 2015 22:10:21 GMT"
    }
    return output;
}