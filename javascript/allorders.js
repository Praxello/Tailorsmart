var EmployeeData = new Map(); //from getmiscellaneousdata.php names only
var currencyData = [];
let ParentProducts = new Map(); //from getmiscellaneousdata.php
let statusMap = new Map(); //for static status
let confirmationStatus = new Map();
let customerData = new Map(); //data of customers like name,address
getStatusMap();
getConfirmation();
var table;

$.fn.dataTable.ext.search.push(
    function(settings, data, dataIndex) {
        var min = $('#min').datepicker("getDate");
        var max = $('#max').datepicker("getDate");
        // console.log(min);
        var startDate = new Date(data[4]);
        if (min == null && max == null) { return true; }
        if (min == null && startDate <= max) { return true; }
        if (max == null && startDate >= min) { return true; }
        if (startDate <= max && startDate >= min) { return true; }
        return false;
    }
);


// $("#min").datepicker({ onSelect: function () { table.draw(); }, changeMonth: true, changeYear: true });
// $("#max").datepicker({ onSelect: function () { table.draw(); }, changeMonth: true, changeYear: true });
// var table = $('#example').DataTable();

// Event listener to the two range filtering inputs to redraw on input
$('#min, #max').change(function() {
    table.draw();
});

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
    confirmationStatus.set('1', '<span class="badge badge-pill badge-success">Confirmed</span>');
    confirmationStatus.set('0', '<span class="badge badge-pill badge-warning">Not confirmed</span>');
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
            if (response.Currency != null) {
                currencyData = [...response.Currency];
            }
            if (response.ParentProducts != null) {
                var count_ParentProducts = response.ParentProducts.length;

                for (var i = 0; i < count_ParentProducts; i++) {
                    ParentProducts.set(response.ParentProducts[i].parentId, response.ParentProducts[i].styleTitle);
                }
            }

        }
    });
}

getAllCustomers();

function getAllCustomers() {
    $.ajax({
        url: api_url + 'allcustomers.php',
        type: 'GET',
        dataType: 'json',

        beforeSend: function() {
            // console.log('in before');
            // $(".preloader").fadeIn();
        },
        success: function(response) {
            var createDropdownOptions = '';
            if (response.Data != null) {
                var count = response.Data.length;
                // createDropdownOptions += "<option value=''>Select Customer Name</option>";
                for (var i = 0; i < count; i++) {
                    // createDropdownOptions += "<option value=" + response.Data[i].customerId + ">" + response.Data[i].firstName + " " + response.Data[i].lastName + "-" + response.Data[i].mobile + "</option>";
                    customerData.set(response.Data[i].customerId, response.Data[i]);
                }
            } else {
                // createDropdownOptions += "<option value=''>No customers available</option>";
            }
            // $("#customerId").html(createDropdownOptions);
        },
        complete: function() {
            getallorders();
            // console.log('in complete');
            // $(".preloader").fadeOut();
        }
    })
}


// This function is created for Get All Customer Orders
function getallorders() {
    var aid = $("#aid").val();
    $('#customerordertbl').dataTable().fnDestroy();
    $("#customerordertbldata").empty();
    $.ajax({
        type: "GET",
        url: api_url + "getallcustomerorders.php",
        async : false,
        beforeSend: function() {
            $(".preloader").show();

        },
        success: function(response) {
            // console.log(response);
            var count;
            var orderStatus = null,
                isConfirmed = null,
                customerExpectedDate = null,
                FinalDeliveryDate = null,
                EmpName = '-',
                CustomerName = '-';
            if (response['Data'] != null) {
                count = response['Data'].length;
                // styleData=[...response['Data']];
            }
            let recamt = 0,
                orderamt = 0;
            var responseData = "";
            for (var i = 0; i < count; i++) {
                orderStatus = statusMap.get(response.Data[i].OrderDetails.orderStatus);
                // console.log(response.Data[i].OrderDetails.orderStatus);
                if (aid == "1") {
                    if (response.Data[i].OrderDetails.orderStatus == 0) {

                        isConfirmed = confirmationStatus.get(response.Data[i].OrderDetails.isConfirmed);
                        if (response.Data[i].OrderDetails.promoCode == null) {
                            response.Data[i].OrderDetails.promoCode = '-';
                        }
                        if (response.Data[i].OrderDetails.RecievedAmount == null) {
                            response.Data[i].OrderDetails.RecievedAmount = '0';
                        }
                        CustomerName = customerData.get(response.Data[i].OrderDetails.customerId);
                        EmpName = EmployeeData.get(response.Data[i].OrderDetails.employeeId);
                        customerExpectedDate = getDate(response.Data[i].OrderDetails.customerExpectedDate);
                        FinalDeliveryDate = getDate(response.Data[i].OrderDetails.FinalDeliveryDate);
                        let now = new Date(response.Data[i].OrderDetails.purchaseDateTime);
                        var dateString = moment(now).format('DD-MM-YYYY');

                        recamt = parseInt(recamt) + parseInt(response.Data[i].OrderDetails.RecievedAmount);
                        orderamt = parseInt(orderamt) + parseInt(response.Data[i].OrderDetails.amount);

                        responseData += "<tr>";
                        responseData += "<td>" + CustomerName.firstName + " " + CustomerName.lastName + "</td>";
                        responseData += "<td>" + response.Data[i].OrderDetails.amount + "</td>";
                        responseData += "<td>" + response.Data[i].OrderDetails.RecievedAmount + "</td>";
                        responseData += "<td>" + response.Data[i].OrderDetails.purchaseDateTime + "</td>";
                        responseData += "<td>" + orderStatus + "</td>";
                        responseData += "<td>" + isConfirmed + "</td>";
                        responseData += "<td>" + customerExpectedDate + "</td>";
                        responseData += "<td>" + FinalDeliveryDate + "</td>";
                        responseData += "<td>" + EmpName + "</td>";
                    }
                } else if (aid == "2") {
                    if (response.Data[i].OrderDetails.orderStatus == 6) {

                        isConfirmed = confirmationStatus.get(response.Data[i].OrderDetails.isConfirmed);
                        if (response.Data[i].OrderDetails.promoCode == null) {
                            response.Data[i].OrderDetails.promoCode = '-';
                        }
                        if (response.Data[i].OrderDetails.RecievedAmount == null) {
                            response.Data[i].OrderDetails.RecievedAmount = '0';
                        }
                        CustomerName = customerData.get(response.Data[i].OrderDetails.customerId);
                        EmpName = EmployeeData.get(response.Data[i].OrderDetails.employeeId);
                        customerExpectedDate = getDate(response.Data[i].OrderDetails.customerExpectedDate);
                        FinalDeliveryDate = getDate(response.Data[i].OrderDetails.FinalDeliveryDate);
                        let now = new Date(response.Data[i].OrderDetails.purchaseDateTime);
                        var dateString = moment(now).format('DD-MM-YYYY');

                        recamt = parseInt(recamt) + parseInt(response.Data[i].OrderDetails.RecievedAmount);
                        orderamt = parseInt(orderamt) + parseInt(response.Data[i].OrderDetails.amount);

                        responseData += "<tr>";
                        responseData += "<td>" + CustomerName.firstName + " " + CustomerName.lastName + "</td>";
                        responseData += "<td>" + response.Data[i].OrderDetails.amount + "</td>";
                        responseData += "<td>" + response.Data[i].OrderDetails.RecievedAmount + "</td>";
                        responseData += "<td>" + response.Data[i].OrderDetails.purchaseDateTime + "</td>";
                        responseData += "<td>" + orderStatus + "</td>";
                        responseData += "<td>" + isConfirmed + "</td>";
                        responseData += "<td>" + customerExpectedDate + "</td>";
                        responseData += "<td>" + FinalDeliveryDate + "</td>";
                        responseData += "<td>" + EmpName + "</td>";
                    }
                } else {
                    isConfirmed = confirmationStatus.get(response.Data[i].OrderDetails.isConfirmed);
                    if (response.Data[i].OrderDetails.promoCode == null) {
                        response.Data[i].OrderDetails.promoCode = '-';
                    }
                    if (response.Data[i].OrderDetails.RecievedAmount == null) {
                        response.Data[i].OrderDetails.RecievedAmount = '0';
                    }
                    CustomerName = customerData.get(response.Data[i].OrderDetails.customerId);
                    EmpName = EmployeeData.get(response.Data[i].OrderDetails.employeeId);
                    customerExpectedDate = getDate(response.Data[i].OrderDetails.customerExpectedDate);
                    FinalDeliveryDate = getDate(response.Data[i].OrderDetails.FinalDeliveryDate);
                    let now = new Date(response.Data[i].OrderDetails.purchaseDateTime);
                    var dateString = moment(now).format('DD-MM-YYYY');

                    recamt = parseInt(recamt) + parseInt(response.Data[i].OrderDetails.RecievedAmount);
                    orderamt = parseInt(orderamt) + parseInt(response.Data[i].OrderDetails.amount);

                    responseData += "<tr>";
                    responseData += "<td>" + CustomerName.firstName + " " + CustomerName.lastName + "</td>";
                    responseData += "<td>" + response.Data[i].OrderDetails.amount + "</td>";
                    responseData += "<td>" + response.Data[i].OrderDetails.RecievedAmount + "</td>";
                    responseData += "<td>" + response.Data[i].OrderDetails.purchaseDateTime + "</td>";
                    responseData += "<td>" + orderStatus + "</td>";
                    responseData += "<td>" + isConfirmed + "</td>";
                    responseData += "<td>" + customerExpectedDate + "</td>";
                    responseData += "<td>" + FinalDeliveryDate + "</td>";
                    responseData += "<td>" + EmpName + "</td>";
                }

                // responseData += "<td><div class='btn-group' role='group' aria-label='Basic example'>";
                // responseData += '<button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="showData(' + response.Data[i].OrderDetails.orderId + ',' + (i) + ')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>';
                // responseData += "</div></td></tr>";
            }
            $("#sptotalorder").html(count);
            $("#spreceivedamt").html(recamt);
            $("#sptotalproduct").html(orderamt);
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
            // console.log("after");
        }
    });
}
// To convert given date to string
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
