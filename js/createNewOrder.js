$('#products').select2({
    allowClear: true,
    placeholder: "Select Product Name"
});
display_customerInfo();
function display_customerInfo() {
    var count = customerData.length;
    for (var i = 0; i < count; i++) {
        if (customerData[i].customerId == customerId_g) {
            $('#custName').html(customerData[i].firstName + ' ' + customerData[i].lastName);
            $('#custEmail').html(customerData[i].email);
            $('#custAddress').html(customerData[i].address);
            $('#custCity').html(customerData[i].city);
            $('#custMobile').html(customerData[i].mobile);
        }
    }
}

$(document).on('click', '.add-row', function (e) {
    e.preventDefault();
    var createOrderData = {
        orderid: orderId,
        productid: $('#products').val()
    };
    $.ajax({
        url: api_url + 'createorderitem.php',
        type: 'POST',
        dataType: 'json',
        data: createOrderData,
        success: function (response) {
            var count = response.Data.length;
            //load an orders of customers
            // var customerId = 21;
            // console.log(customerId_g);
            getOrdersOfCustomer(customerId_g);
            // console.log(customerOrders);
            customerOrderDetails = [];
            customerOrderDetails = customerOrders[indexRow];
            // console.log(customerOrderDetails);
            $('#customerOrdersBlock').hide();
            for (var i = 0; i < count; i++) {
                if (response.Data[i].orderItemId == response.OrderItemId) { //for add only current row data into html table
                    var markup = '';
                    //work from here for case new data add
                    //customerOrderDetails = customerOrders[i];
                    //console.log(customerOrders);

                    // markup += "<div class='table-data-feature'><button class='btn btn-success' data-toggle='tooltip' data-placement='top' title='Edit'><i class='fa fa-edit'></i></button><button class='btn btn-danger' data-toggle='tooltip' data-placement='top' title='Delete'><i class='fa fa-remove'></i></button></div>"
                    markup += "<tr id=" + response.Data[i].orderItemId + "><td>" + response.Data[i].productTitle + "</td><td>" + response.Data[i].productSubTitle + "</td><td>" + response.Data[i].price + "</td>";
                    markup += "<td><div class='btn-group' role='group' aria-label='Basic example'>";
                    markup += "<a class='btn btn-success btn-sm' title='Add Measurment' data-toggle='tooltip' onclick='loadMeasurment(\"" + response.Data[i].productId + "\",\"" + response.Data[i].orderItemId + "\",\"" + (i) + "\")' href='#'><i class='fa fa-edit'></i></a>";
                    markup += "<a class='btn btn-primary btn-sm' title='add Style' data-toggle='tooltip' href='#' onclick='loadStyles(\"" + response.Data[i].productId + "\",\"" + response.Data[i].orderItemId + "\",\"" + (i) + "\")'><i class='fa fa-user'></i></a>";
                    markup += "<a class='btn btn-warning btn-sm' title='add Fabrics' data-toggle='tooltip' href='#' onclick='loadFabrics(\"" + response.Data[i].productId + "\",\"" + response.Data[i].orderItemId + "\",\"" + (i) + "\")'><i class='fa fa-user'></i></a>";
                    markup += "<a  class='btn btn-danger btn-sm' title='Remove Item' data-toggle='tooltip' href='#' onclick='removeItem(" + response.Data[i].orderItemId + ")'><i class='fa fa-trash'></i></a></td></div></tr>";
                    $("#productData").append(markup);
                }
            }

        }
    })

});
function removeItem(orderItemId) {
    var removeData = {
        orderitemid: orderItemId,
        orderid: orderId
    };
    $.ajax({
        url: api_url + 'deleteorderitem.php',
        type: 'POST',
        data: removeData,
        dataType: 'json',
        success: function (response) {
            $('#' + orderItemId).remove();
        }
    })
}

getActiveProductsList();
loadTable(mar);
function loadTable(param) {
    $("#productData").html(param);
}

function getActiveProductsList() {
    $.ajax({
        url: api_url + 'getactiveproducts.php',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            var createDropdownOptions = '';
            var count = response.Data.length;
            for (var i = 0; i < count; i++) {
                createDropdownOptions += "<option value=" + response.Data[i].productId + ">" + response.Data[i].productTitle + "</option>";
            }
            $("#products").html(createDropdownOptions);
        }
    })
}
function loadMeasurment(productId, orderItemId, rowId) {//for mapping product id and measurment id
    customer_orderItemId = orderItemId;
    // console.log(customer_orderItemId);
    var count_1 = 0;
    // console.log(customerOrderDetails);
    var check_mesurment_exists = customerOrderDetails.orderItems[rowId].Measurements;

    if (check_mesurment_exists != null) {
        count_1 = customerOrderDetails.orderItems[rowId].Measurements.length;
    }
    $.ajax({
        url: api_url + 'getproductmeasurementmapping.php',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            var createDropdownOptions = '';
            var count = response.Data.length;
            for (var i = 0; i < count; i++) {
                if (response.Data[i].productId == productId) {
                    createDropdownOptions += "<tr><td>" + response.Data[i].measurementId + "</td><td>" + response.Data[i].itemTitle + "</td>";
                    if (count_1 > 0) {
                        createDropdownOptions += "<td><input type='text' name='measurmentValues[]'  value=" + check_mesurment_exists[i].value + " class='form-control form-control-sm'></td>";
                    } else {
                        createDropdownOptions += "<td><input type='text' name='measurmentValues[]'   class='form-control form-control-sm'></td>";
                    }
                    createDropdownOptions += "</tr>";
                    // createDropdownOptions += "<option value=" + response.Data[i].measurementId + ">" + response.Data[i].itemTitle + "</option>";
                }
            }
            $("#measurementTable").html(createDropdownOptions);
            $('#myModal').modal();
        }
    })

}
function loadStyles(productId, orderItemId, rowId) {
    style_orderItemId = orderItemId;
    // console.log(customerOrderDetails);
    var count_1 = 0;
    var check_styles_exists = customerOrderDetails.orderItems[rowId].Styles;
    console.log(check_styles_exists);
    if (check_styles_exists != null) {
        count_1 = customerOrderDetails.orderItems[rowId].Styles.length;
    }
    $.ajax({
        url: api_url + 'getproductstitchstylemapping.php',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            var firstList = '', secondList = '', thirdList = '';
            var first = '', second = '', third = '';
            var valFirst = '', valSecond = '', valThird = '';
            var m = 0, flag_0 = null, flag_1 = null;
            var count = response.Data.length;
            for (var i = 0; i < count; i++) {
                if (response.Data[i].StitchStyle.productId == productId) {
                    if (response.Data[i].StitchSubstyle != null) {
                        var StitchSubstyleCount = response.Data[i].StitchSubstyle.length;
                        if (response.Data[i].StitchStyle.stitchStyleType == 0) {
                         
                            first = response.Data[i].StitchStyle.stitchStyleTitle;
                            valFirst = response.Data[i].StitchStyle.stitchStyleId;
                            for (var j = 0; j < StitchSubstyleCount; j++) {
                                flag_0 = 0;
                                firstList += "<tr><td>" + response.Data[i].StitchSubstyle[j].stitchStyleId + "</td><td>" + response.Data[i].StitchSubstyle[j].stitchSubStyleTitle + "</td>";
                                if (count_1 > 0) {
                                    
                                    for (var a = 0; a < count_1; a++) {
                                        if (response.Data[i].StitchSubstyle[j].stitchSubStyleId == check_styles_exists[a].stitchSubStyleId) {
                                          
                                            firstList += "<td><input type='checkbox' name='multipleSelection'  value=" + response.Data[i].StitchSubstyle[j].stitchSubStyleId + " checked></td>";
                                            m++;
                                            flag_0 = 1;

                                        }
                                    }
                                    if (flag_0 == 0) {
                                        firstList += "<td><input type='checkbox' name='multipleSelection'  value=" + response.Data[i].StitchSubstyle[j].stitchSubStyleId + "></td>";
                                    }


                                } else {
                                    firstList += "<td><input type='checkbox' name='multipleSelection'  value=" + response.Data[i].StitchSubstyle[j].stitchSubStyleId + "></td>";
                                }
                                firstList += "</tr>";

                            }
                        }
                        if (response.Data[i].StitchStyle.stitchStyleType == 1) {
                            second = response.Data[i].StitchStyle.stitchStyleTitle;
                            valSecond = response.Data[i].StitchStyle.stitchStyleId;
                            
                            for (var k = 0; k < StitchSubstyleCount; k++) {
                                secondList += "<tr><td>" + response.Data[i].StitchSubstyle[k].stitchSubStyleTitle + "</td>";
                                flag_1 = 0;
                                if (count_1 > 0) {
                                    // console.log('k count '+k);
                                    for (var a = 0; a < count_1; a++) {
                                        if (response.Data[i].StitchSubstyle[k].stitchSubStyleId == check_styles_exists[a].stitchSubStyleId) {
                                            // console.log('m in 1 '+m);
                                            secondList += "<td><input type='radio' name='singleSelection'  name='substyleName' value=" + response.Data[i].StitchSubstyle[k].stitchSubStyleId + " checked></td>";
                                            m++;
                                            flag_1 = 1;
                                        }
                                    }
                                    if (flag_1 == 0) {
                                        secondList += "<td><input type='radio' name='singleSelection'  name='substyleName' value=" + response.Data[i].StitchSubstyle[k].stitchSubStyleId + "></td>";
                                    }

                                } else {
                                    secondList += "<td><input type='radio' name='singleSelection'  name='substyleName' value=" + response.Data[i].StitchSubstyle[k].stitchSubStyleId + "></td>";
                                }
                                secondList += "</tr>";

                            }
                        }
                        if (response.Data[i].StitchStyle.stitchStyleType == 2) {
                            third = response.Data[i].StitchStyle.stitchStyleTitle;
                            valThird = response.Data[i].StitchStyle.stitchStyleId;
                            console.log('style type ' + response.Data[i].StitchStyle.stitchStyleType);
                            for (var l = 0; l < StitchSubstyleCount; l++) {
                                //console.log('k count '+k);
                                flag_2 = 0;
                                thirdList += "<tr><td>" + response.Data[i].StitchSubstyle[l].stitchSubStyleId + "</td>";
                                thirdList += "<td>" + response.Data[i].StitchSubstyle[l].stitchSubStyleTitle + "</td>";
                                if (count_1 > 0) {
                                    for (var a = 0; a < count_1; a++) {
                                        if (response.Data[i].StitchSubstyle[l].stitchSubStyleId == check_styles_exists[a].stitchSubStyleId) {
                                            thirdList += "<td><input type='text' class='form-control form-control-sm' value=" + check_styles_exists[a].value + "></td>";
                                            m++;
                                            flag_2 = 1;
                                            // console.log('m in 2 '+m);

                                        }
                                    }
                                    if (flag_2 == 0) {
                                        thirdList += "<td><input type='text' class='form-control form-control-sm'></td>";
                                    }

                                } else {
                                    thirdList += "<td><input type='text' class='form-control form-control-sm'></td>";
                                }
                                thirdList += "</tr>";

                            }
                        }
                    }

                }
            }

            valThird = Number(valThird);
            valFirst = Number(valFirst);
            valSecond = Number(valSecond);
            $("#FirststyleTable").html(firstList);
            $("#SecondstyleTable").html(secondList);
            $("#ThirdstyleTable").html(thirdList);
            $('#first').html(first);
            $('#second').html(second);
            $('#third').html(third);
            $('#valFirst').val(valFirst);
            $('#valSecond').val(valSecond);
            $('#valThird').val(valThird);
            $('#styleModal').modal();
        }
    });
}
function loadFabrics(productId, orderItemId, rowId) {
    fabric_orderItemId = orderItemId;
    //load fabrics data if exists and checked associative checkboxes
    var count_1 = 0;
    var check_fabrics_exists = customerOrderDetails.orderItems[rowId].Fabrics;
    if (check_fabrics_exists != null) {
        var count_1 = customerOrderDetails.orderItems[rowId].Fabrics.length;
    }
    var flag = null;
    //end for load data

    $.ajax({
        url: api_url + 'getproductfabricmapping.php',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            var createDropdownOptions = '';
            var count = response.Data.length;
            for (var i = 0; i < count; i++) {
                if (response.Data[i].productId == productId) {
                    //createDropdownOptions += "<td>" + response['Data'][i].fabricTitle + "</td>";
                    createDropdownOptions += "<tr><td><img class='img-thumbnail' src='http://praxello.com/tailorsmart/mobileimages/fabric/" + response['Data'][i].skuNo + ".jpg' width='20%' height='10%' alt='No Image Available'></img></td>";
                    createDropdownOptions += "<td>" + response['Data'][i].fabricTitle + "</td>";
                    createDropdownOptions += "<td>" + response['Data'][i].skuNo + "</td>";
                    createDropdownOptions += "<td>" + response['Data'][i].fabricPrice + "</td>";
                    if (count_1 > 0) {
                        flag = 0;
                        for (var j = 0; j < count_1; j++) {
                            if (response['Data'][i].fabricId == check_fabrics_exists[j].fabricId) {
                                createDropdownOptions += "<td><input type='checkbox' name='fabrics' value=" + response['Data'][i].fabricId + " checked></td>";
                                flag = 1;
                            }
                        }
                        if (flag == 0) {
                            createDropdownOptions += "<td><input type='checkbox' name='fabrics' value=" + response['Data'][i].fabricId + "></td>";
                        }

                    } else {
                        createDropdownOptions += "<td><input type='checkbox' name='fabrics' value=" + response['Data'][i].fabricId + "></td>";
                    }
                    createDropdownOptions += "</tr>";
                }
            }

            $("#fabricsTable").html(createDropdownOptions);
            $('#FabricsModal').modal();
        }
    })
}
function getPaymentList(){
$.ajax({
    url: api_url + 'getorderpayments.php',
    type: 'POST',
    data: {orderid:orderId},
    success: function(response) {
        var count = response.Data.Payments.length;
        var markup = '';
        for (var i = 0; i < count; i++) {
        markup += "<tr><td>" + response.Data.Payments[i].paymentId + "</td><td>" + response.Data.Payments[i].paymentMode + "</td>";
        markup += "<td>" + response.Data.Payments[i].paymentType + "</td><td>" + response.Data.Payments[i].amount + "</td>";
        markup += " <td>" + response.Data.Payments[i].createdBy + "</td><td>" + response.Data.Payments[i].paymentDateTime + "</td>";
        markup += "<td><a class='btn btn-danger btn-sm' title='Remove Payment' data-toggle='tooltip' href='#' onclick='removePayment(\"" + response.Data.Payments[i].paymentId + "\",\"" + response.Data.OrderDetails.orderId + "\")'><i class='fa fa-trash'></i></a></td></tr>";
    }
        $("#paymentData").html(markup);
    }
})
}

function removePayment(paymentid,orderid){
    var removeData = {
        orderid:orderid,
        paymentid:paymentid,
        employeeid:$('#empId').val()
    };
    $.ajax({
        url: api_url + 'deletepayment.php',
        type: 'POST',
        data:removeData,
        success: function(response) {
            console.log(response.Message);
            getPaymentList();
        }
    })
}

