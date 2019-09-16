var api_url = 'http://praxello.com/tailorsmart/admin/';
var customerOrders = [];//all the customers orders
var customerOrderDetails = [];//for particular order id details
var orderId = null;//order id for another page reference createNewOrderPage
var mar = '';//for load all data in view mode of a particular order
var customerData = [];//data of customers like name,address
var customer_orderItemId = null;//for send orderItemid to save the orderId and measurments corresponding
var fabric_orderItemId = null;//for send orderItemid to save the orderId and fabrics corresponding
var style_orderItemId = null;//for send orderItemid to save the orderId and styles corresponding
var customerId_g = null;
var indexRow = null;//pass a parameter to get particular order id objects
var EmployeeData = [];//from getmiscellaneousdata.php
var currencyData = [];//from getmiscellaneousdata.php
var ParentProducts = [];//from getmiscellaneousdata.php for show active products styleTitle

getMicellaneousData();
function getMicellaneousData(){
    $.ajax({
        url: api_url + 'getmiscellaneousdata.php',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.Employee != null) {
                EmployeeData = [...response.Employee];
            }
            if(response.Currency !=null){
                currencyData = [...response.Currency];
<<<<<<< HEAD

=======
            }
            if(response.ParentProducts !=null){
                ParentProducts = [...response.ParentProducts];
>>>>>>> 4e279b401d1f27df97d73e6ced647bca11d0ed22
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
        beforeSend:function(){
            console.log('in before');
            $(".preloader").fadeIn();
        },
        success: function (response) {
            var createDropdownOptions = '';
            var count = response.Data.length;
            customerData = [...response.Data];

            createDropdownOptions += "<option value=''>Select Customer Name</option>";
            for (var i = 0; i < count; i++) {
                createDropdownOptions += "<option value=" + response.Data[i].customerId + ">" + response.Data[i].firstName + " " + response.Data[i].lastName + "-" + response.Data[i].mobile + "</option>";
            }
            $("#customerId").html(createDropdownOptions);
        },
        complete:function(){
            console.log('in complete');
            $(".preloader").fadeOut();
        }
    })
}
$('#customerId').select2({
    allowClear: true,
    placeholder: "Select Customer Name"
});
//first select customer then customerOrders[] intialize to all order details of that customer
function getOrdersOfCustomer(customerId) {
    customerId_g = customerId;
    $('#customerOrdersDataTable').dataTable().fnDestroy();
    $("#customerOrdersData").empty();
    $.ajax({
        url: api_url + 'customerorders.php',
        type: 'POST',
        async: false,
        data: { customerid: customerId },
        dataType: 'json',
        beforeSend:function(){
            $(".preloader").fadeIn();
        },
        success: function (response) {
            var EmpCount = EmployeeData.length;
            if (response.Data != null) {
                var count = response.Data.length;
                const orders = response.Data;
                customerOrders = [];
                customerOrders = [...orders];
                var orderStatus = null, isConfirmed = null, customerExpectedDate = null, FinalDeliveryDate = null,EmpName='-';
                $('#customerOrdersBlock').show();
                var responseData = "";
                for (var i = 0; i < count; i++) {
                    orderStatus = getStatus(response.Data[i].OrderDetails.orderStatus);
                    isConfirmed = getConfirmation(response.Data[i].OrderDetails.isConfirmed);
                    if (response.Data[i].OrderDetails.promoCode == null) {
                        response.Data[i].OrderDetails.promoCode = '-';
                    }
                    EmpName = getEmployeeName(response.Data[i].OrderDetails.employeeId,EmpCount);
                    customerExpectedDate = getDate(response.Data[i].OrderDetails.customerExpectedDate);
                    FinalDeliveryDate = getDate(response.Data[i].OrderDetails.FinalDeliveryDate);
                    responseData += "<tr>";
                    responseData += "<td>" + response.Data[i].OrderDetails.amount + "</td>";
                    responseData += "<td>" + response.Data[i].OrderDetails.promoCode + "</td>";
                    responseData += "<td>" + orderStatus + "</td>";
                    responseData += "<td>" + isConfirmed + "</td>";
                    responseData += "<td>" + customerExpectedDate + "</td>";
                    responseData += "<td>" + FinalDeliveryDate + "</td>";
                    responseData += "<td>" + EmpName + "</td>";
                    responseData += "<td><div class='btn-group' role='group' aria-label='Basic example'>";
                    responseData += '<button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="showData(' + response.Data[i].OrderDetails.orderId + ',' + (i) + ')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>';
                    responseData += "</div></td></tr>";
                }
                $("#customerOrdersData").html(responseData);

                $('#customerOrdersDataTable').DataTable({
                    searching: true,
                    retrieve: true,
                    bPaginate: $('tbody tr').length > 10,
                    order: [],
                    columnDefs: [{ orderable: false, targets: [0, 1, 2, 3, 4, 5,6,7] }],
                    dom: 'Bfrtip',
                    buttons: ['copy', 'csv', 'excel', 'pdf'],
                    destroy: true
                });
            }

        },
        complete:function(){

            $(".preloader").fadeOut();
        }
    });
}
function getStatus(orderStatus) {
    var status;
    switch (orderStatus) {
        case '0':
            status = '<span class="badge badge-pill badge-danger">Not completed</span>';
            break;
        case '1':
            status = '<span class="badge badge-pill badge-success">Confirmed/span>';
            break;
        case '2':
            status = '<span class="badge badge-pill badge-primary">Processing</span>';
            break;
        case '3':
            status = '<span class="badge badge-pill badge-secondary">Sent for Trial</span>';
            break;
        case '4':
            status = '<span class="badge badge-pill badge-warning">Completed</span>';
            break;
        case '5':
            status = '<span class="badge badge-pill badge-info">Cancelled</span>';
            break;
        case '6':
            status = '<span class="badge badge-pill badge-dark">For Alteration</span>';
    }
    return status;
}
function getConfirmation(isConfirmed) {
    var confirmation;
    if (isConfirmed == 0) {
        confirmation = '<span class="badge badge-pill badge-success">Confirmed</span>';
    } else {
        confirmation = '<span class="badge badge-pill badge-warning">Not confirmed</span>';
    }
    return confirmation;
}
function getDate(date) {
    var output = '-';
    if (date == null) {
        return output;
    } else {
        var d = new Date(date);
        //output = d.toDateString(); // outputs to "Thu May 28 2015"
        output = d.toGMTString(); //outputs to "Thu, 28 May 2015 22:10:21 GMT"
    }
    return output;
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
//load an particular order of a customer for edit/update purpose
function showData(orderid, rowId) {
    orderId = orderid;
    customerOrderDetails = customerOrders[rowId];
    // console.log(customerOrderDetails);
    // console.log("rowId " + rowId);
    indexRow = rowId;
    if (customerOrderDetails.orderItems != null) {
        var count = customerOrderDetails.orderItems.length;
        var markup = '';
        for (var i = 0; i < count; i++) {
            markup += "<tr id=" + customerOrderDetails.orderItems[i].OrderItem.orderItemId + "><td>" + customerOrderDetails.orderItems[i].OrderItem.productTitle + "</td>";
            markup += "<td>" + customerOrderDetails.orderItems[i].OrderItem.productSubTitle + "</td><td>" + customerOrderDetails.orderItems[i].OrderItem.orderItemPrice + "</td>";
            markup += "<td><div class='btn-group' role='group' aria-label='Basic example'>";
            markup += "<a class='btn btn-success btn-sm' title='Add Measurment' data-toggle='tooltip' onclick='loadMeasurment(\"" + customerOrderDetails.orderItems[i].OrderItem.productId + "\",\"" + customerOrderDetails.orderItems[i].OrderItem.orderItemId + "\",\"" + (i) + "\")' href='#'><i class='fa fa-edit'></i></a>";
            markup += "<a class='btn btn-primary btn-sm' title='add Style' data-toggle='tooltip' href='#' onclick='loadStyles(\"" + customerOrderDetails.orderItems[i].OrderItem.productId + "\",\"" + customerOrderDetails.orderItems[i].OrderItem.orderItemId + "\",\"" + (i) + "\")'><i class='fa fa-user'></i></a>";
            markup += "<a class='btn btn-warning btn-sm' title='add Fabrics' data-toggle='tooltip' href='#' onclick='loadFabrics(\"" + customerOrderDetails.orderItems[i].OrderItem.productId + "\",\"" + customerOrderDetails.orderItems[i].OrderItem.orderItemId + "\",\"" + (i) + "\")'><i class='fa fa-user'></i></a>";
            markup += "<a class='btn btn-danger btn-sm' title='Remove Item' data-toggle='tooltip' href='#' onclick='removeItem(" + customerOrderDetails.orderItems[i].OrderItem.orderItemId + ")'><i class='fa fa-trash'></i></a></td></div></tr>";
        }
        mar = markup;
    }
    $('#customerSelectionBlock').hide();
    $('#customerOrdersBlock').hide();
    $('#loadNewPage').empty();
    $('#loadNewPage').load('createNewOrder.php');
    $("#productData").empty();

}
//create new order data using customerid
$('#createOrder').on('click', function (event) {
    $('#loadNewPage').empty();
    event.preventDefault();
    var custId = $('#customerId');
    customerId_g = custId.val();
    if (custId.val() === '') {
        alert("Please select an Customer from the list and then proceed!");
        $('#customerId').focus();
        return false;
    }
    else {
        var OrderData = {
            customerid: $('#customerId').val(),
            employeeid: $('#empId').val()
        };
        $.ajax({
            url: api_url + 'createorder.php',
            type: 'POST',
            dataType: 'json',
            data: OrderData,
            success: function (response) {
                // console.log(response);
                alert(response.Message);
                var OrderId = response.OrderId;
                orderId = OrderId;
                indexRow = 0;
                $('#customerSelectionBlock').hide();
                $('#customerOrdersBlock').hide();
                $('#loadNewPage').load('createNewOrder.php');
                //console.log(orderId);
            }
        })
    }
});
