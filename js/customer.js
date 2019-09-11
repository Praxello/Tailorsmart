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
getAllCustomers();
function getAllCustomers() {
    $.ajax({
        url: api_url + 'allcustomers.php',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            var createDropdownOptions = '';
            var count = response.Data.length;
            customerData = [...response.Data];
            createDropdownOptions += "<option value=''>Select Customer Name</option>";
            for (var i = 0; i < count; i++) {
                createDropdownOptions += "<option value=" + response.Data[i].customerId + ">" + response.Data[i].firstName + " " + response.Data[i].lastName + "-" + response.Data[i].mobile + "</option>";
            }
            $("#customerId").html(createDropdownOptions);
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
        success: function (response) {
            if (response.Data != null) {
                var count = response.Data.length;
                const orders = response.Data;
                customerOrders = [];
                customerOrders = [...orders];
                // console.log(customerOrders);
                $('#customerOrdersBlock').show();
                var responseData = "";
                for (var i = 0; i < count; i++) {
                    responseData += "<tr>";
                    responseData += "<td>" + response.Data[i].OrderDetails.orderId + "</td>";
                    responseData += "<td>" + response.Data[i].OrderDetails.amount + "</td>";
                    responseData += "<td>" + response.Data[i].OrderDetails.advance + "</td>";
                    responseData += "<td>" + response.Data[i].OrderDetails.purchaseDateTime + "</td>";
                    responseData += "<td>" + response.Data[i].OrderDetails.orderStatus + "</td>";
                    responseData += "<td>" + response.Data[i].OrderDetails.paymentValue + "</td>";
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
                    columnDefs: [{ orderable: false, targets: [0, 1, 2, 3, 4, 5] }],
                    dom: 'Bfrtip',
                    buttons: ['copy', 'csv', 'excel', 'pdf'],
                    destroy: true
                });
            }

        }
    })
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
            markup += "<td>" + customerOrderDetails.orderItems[i].OrderItem.productSubTitle + "</td><td>" + customerOrderDetails.orderItems[i].OrderItem.price + "</td>";
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
                // console.log(orderId);
            }
        })
    }
});
