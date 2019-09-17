$('#products').select2({
    allowClear: true,
    placeholder: "Select Product Name"
});
display_customerInfo();
function display_customerInfo() {
    let cData = customerData.get(customerId_g);
            $('#custName').html(cData.firstName+' '+cData.lastName);
            $('#custEmail').html(cData.email);
            $('#custAddress').html(cData.address);
            $('#custCity').html(cData.city);
            $('#custMobile').html(cData.mobile);
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
          
           getOrdersOfCustomer(customerId_g);
           
            customerOrderDetails = [];
            customerOrderDetails = customerOrders[indexRow];
            $('#customerOrdersBlock').hide(); 
            for (var i = 0; i < count; i++) {
                if (response.Data[i].orderItemId == response.OrderItemId) { //for add only current row data into html table
                    var markup = '';
                    //work from here for case new data add
                    //customerOrderDetails = customerOrders[i];
                    //console.log(customerOrders);

                    markup += "<tr id=" + response.Data[i].orderItemId + "><td>" + response.Data[i].productTitle + "</td><td>" + response.Data[i].productSubTitle + "</td><td>" + response.Data[i].orderItemPrice + "</td>";
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
            let styleTitle = '';
            for (var i = 0; i < count; i++) {
                styleTitle = ParentProducts.get(response.Data[i].parentId);
                createDropdownOptions += "<option value=" + response.Data[i].productId + ">" + response.Data[i].productTitle + '-' +styleTitle + "</option>";
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
            var flag = null;
            for (var i = 0; i < count; i++) {
                if (response.Data[i].productId == productId) {
                    createDropdownOptions += "<tr><td>" + response.Data[i].measurementId + "</td><td>" + response.Data[i].itemTitle + "</td>";
                    if (count_1 > 0) {
                        flag = 0;
                        for (var a = 0; a < count_1; a++) {
                            if (response['Data'][i].measurementId == check_mesurment_exists[a].measurementId) {
                                createDropdownOptions += "<td><input type='text' name='measurmentValues[]'  value=" + check_mesurment_exists[a].value + " class='form-control form-control-sm'></td>";
                                flag = 1;
                            }
                        }
                        if (flag == 0) {
                            createDropdownOptions += "<td><input type='text' name='measurmentValues[]'  class='form-control form-control-sm'></td>";
                        }

                    } else {
                        createDropdownOptions += "<td><input type='text' name='measurmentValues[]'   class='form-control form-control-sm'></td>";
                    }
                    createDropdownOptions += "</tr>";
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
    if (check_styles_exists != null) {
        count_1 = customerOrderDetails.orderItems[rowId].Styles.length;
    }
    $.ajax({
        url: api_url + 'getproductstitchstylemapping.php',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            var firstList = '', secondList = '', thirdList = '';
            var second = '', third = '', nameKey = 0;
            var valFirst = '', valSecond = '', valThird = '';
            var m = 0, flag_0 = null, flag_1 = null;
            var count = response.Data.length;

            for (var i = 0; i < count; i++) {
                if (response.Data[i].StitchStyle.productId == productId) {
                    if (response.Data[i].StitchSubstyle != null) {
                        var StitchSubstyleCount = response.Data[i].StitchSubstyle.length;
                        if (response.Data[i].StitchStyle.stitchStyleType == 0) {
                            valFirst = response.Data[i].StitchStyle.stitchStyleId;
                            firstList += "<tr><td colspan='3' style='text-align:center;'><strong>" + response.Data[i].StitchStyle.stitchStyleTitle + "</strong></td></tr>";
                            for (var j = 0; j < StitchSubstyleCount; j++) {
                                flag_0 = 0;

                                firstList += "<tr><td style='display:none;'>" + response.Data[i].StitchStyle.stitchStyleId + "</td><td>" + response.Data[i].StitchSubstyle[j].stitchSubStyleTitle + "</td>";
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
                        else if (response.Data[i].StitchStyle.stitchStyleType == 1) {
                            second = response.Data[i].StitchStyle.stitchStyleTitle;
                            valSecond = response.Data[i].StitchStyle.stitchStyleId;

                            secondList += "<tr><td colspan='3' style='text-align:center;'><strong>" + response.Data[i].StitchStyle.stitchStyleTitle + "</strong></td></tr>";
                            for (var k = 0; k < StitchSubstyleCount; k++) {
                                secondList += "<tr><td style='display:none;'>" + response.Data[i].StitchStyle.stitchStyleId + "</td><td>" + response.Data[i].StitchSubstyle[k].stitchSubStyleTitle + "</td>";
                                flag_1 = 0;
                                if (count_1 > 0) {

                                    for (var a = 0; a < count_1; a++) {

                                        if (response.Data[i].StitchSubstyle[k].stitchSubStyleId == check_styles_exists[a].stitchSubStyleId) {

                                            secondList += "<td><input type='radio' name='" + response.Data[i].StitchStyle.stitchStyleId + "chek'   value=" + response.Data[i].StitchSubstyle[k].stitchSubStyleId + " checked></td>";
                                            m++;
                                            flag_1 = 1;
                                        }
                                    }
                                    if (flag_1 == 0) {


                                        secondList += "<td><input type='radio' name='" + response.Data[i].StitchStyle.stitchStyleId + "chek'   value=" + response.Data[i].StitchSubstyle[k].stitchSubStyleId + "></td>";

                                    }

                                } else {
                                    secondList += "<td><input type='radio' name='" + nameKey + "singleSelection'   value=" + response.Data[i].StitchSubstyle[k].stitchSubStyleId + "></td>";
                                }
                                secondList += "</tr>";

                            }
                            nameKey++;

                        }
                        else if (response.Data[i].StitchStyle.stitchStyleType == 2) {
                            third = response.Data[i].StitchStyle.stitchStyleTitle;
                            valThird = response.Data[i].StitchStyle.stitchStyleId;
                            thirdList += "<tr><td colspan='3' style='text-align:center;'><strong>" + response.Data[i].StitchStyle.stitchStyleTitle + "</strong></td></tr>";
                            for (var l = 0; l < StitchSubstyleCount; l++) {
                                //console.log('k count '+k);
                                flag_2 = 0;
                                thirdList += "<tr><td style='display:none;'>" + response.Data[i].StitchStyle.stitchStyleId + "</td><td style='display:none;'>" + response.Data[i].StitchSubstyle[l].stitchSubStyleId + "</td>";
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
         count_1 = customerOrderDetails.orderItems[rowId].Fabrics.length;
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
                    createDropdownOptions += "<tr><td><img class='img-thumbnail' src='http://praxello.com/tailorsmart/mobileimages/fabric/300x300/" + response['Data'][i].skuNo + ".jpg' width='20%' height='10%' alt='No Image Available'></img></td>";
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
getPaymentList();
function getPaymentList() {
    var empName = $('#empName').val();
    $.ajax({
        url: api_url + 'getorderpayments.php',
        type: 'POST',
        data: { orderid: orderId },
        success: function (response) {
            var paymentDateTime = null;
            if (response.Data.Payments != null) {
                var count = response.Data.Payments.length;
                var markup = '';
                for (var i = 0; i < count; i++) {
                    var isSuceed = '', isDeleted = '', deleteEntry = '';
                    if (response.Data.Payments[i].isSuceed == 1) {
                        isSuceed = "<td><span class='badge badge-pill badge-success'>completed</span></td>";
                    } else {
                        isSuceed = "<td><span class='badge badge-pill badge-danger'>pending</span></td>";
                    }
                    if (response.Data.Payments[i].isDeleted == 1) {
                        isDeleted = "<td><code>" + empName + "</code></td>";
                        deleteEntry = "<a class='btn btn-primary btn-sm' title='Revert Payment' data-toggle='tooltip' href='#' onclick='updatePaymentFlag(\"" + response.Data.Payments[i].paymentId + "\",\"" + response.Data.OrderDetails.orderId + "\")'><i class='fa fa-info'></i></a>";
                    } else {
                        isDeleted = "<td><code></code></td>";
                        deleteEntry = "<a class='btn btn-danger btn-sm' title='Remove Payment' data-toggle='tooltip' href='#' onclick='removePayment(\"" + response.Data.Payments[i].paymentId + "\",\"" + response.Data.OrderDetails.orderId + "\")'><i class='fa fa-trash'></i></a>";
                    }
                    paymentDateTime = getDate(response.Data.Payments[i].paymentDateTime);
                    markup += "<tr><td>" + (i + 1) + "</td><td>" + response.Data.Payments[i].paymentMode + "</td>";
                    markup += "<td>" + response.Data.Payments[i].paymentType + "</td><td>" + response.Data.Payments[i].amount + "</td>";
                    markup += "<td>" + response.Data.Payments[i].currency + "</td><td>" + empName + "</td><td>" + paymentDateTime + "</td>";
                    markup += isSuceed;
                    markup += isDeleted;
                    markup += "<td><div class='btn-group' role='group' aria-label='Basic example'>";
                    markup += deleteEntry;
                    markup += "</td></div></tr>";
                }
                $("#paymentData").html(markup);
            }


        }
    })
}

function removePayment(paymentid, orderid) {
    var removeData = {
        orderid: orderid,
        paymentid: paymentid,
        employeeid: $('#empId').val()
    };
    $.ajax({
        url: api_url + 'deletepayment.php',
        type: 'POST',
        data: removeData,
        success: function (response) {
            alert(response.Message);
            getPaymentList();
        }
    })
}
function updatePaymentFlag(paymentid) {
    var updateData = {
        paymentid: paymentid,
        employeeid: $('#empId').val()
    };
    // console.log(updateData);
    $.ajax({
        url: api_url + 'revertpayment.php',
        type: 'POST',
        data: updateData,
        success: function (response) {
            alert(response.Message);
            getPaymentList();
        }
    })
}
$(document).on('click','#loadfirstpage',function(e){
e.preventDefault();
$('#loadNewPage').empty();
$('#customerSelectionBlock').show();
$('#customerOrdersBlock').show();
});

