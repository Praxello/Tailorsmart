$('#products').select2({
    allowClear: true,
    placeholder: "Select Product Name"
});
display_customerInfo();
function display_customerInfo(){
    var count = customerData.length;
    for(var i=0;i<count;i++){
        if(customerData[i].customerId == customerId_g){
            $('#custName').html(customerData[i].firstName+' '+customerData[i].lastName);
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
    console.log(productId);
    style_orderItemId = orderItemId;
    // console.log(customerOrderDetails);
    var count_1 = 0;
    var check_styles_exists = customerOrderDetails.orderItems[rowId].Styles;
    // console.log(check_styles_exists);
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
            var m = 0;
            var count = response.Data.length;
            for (var i = 0; i < count; i++) {
                if (response.Data[i].StitchStyle.productId == productId) {
                    console.log(response.Data[i].StitchStyle.productId);
                    console.log(response.Data[i].StitchSubstyle);
                    
                   
                    if(response.Data[i].StitchSubstyle !=null)
                    {
                        var StitchSubstyleCount = response.Data[i].StitchSubstyle.length;
                    if (response.Data[i].StitchStyle.stitchStyleType == 0) {
                        first = response.Data[i].StitchStyle.stitchStyleTitle;
                        valFirst = response.Data[i].StitchStyle.stitchStyleId;
                        for (var j = 0; j < StitchSubstyleCount; j++) {
                            //console.log('j count '+j);
                            firstList += "<tr><td>" + response.Data[i].StitchSubstyle[j].stitchStyleId + "</td><td>" + response.Data[i].StitchSubstyle[j].stitchSubStyleTitle + "</td>";
                            if (count_1 > 0) {

                                if (response.Data[i].StitchSubstyle[j].stitchSubStyleId == check_styles_exists[m].stitchSubStyleId) {
                                    //console.log('m in 0 '+m);
                                    firstList += "<td><input type='checkbox' name='multipleSelection' class='form-control form-control-sm' value=" + response.Data[i].StitchSubstyle[j].stitchSubStyleId + " checked></td>";
                                    m++;
                                } else {
                                    firstList += "<td><input type='checkbox' name='multipleSelection' class='form-control form-control-sm' value=" + response.Data[i].StitchSubstyle[j].stitchSubStyleId + "></td>";
                                }


                            } else {
                                firstList += "<td><input type='checkbox' name='multipleSelection' class='form-control form-control-sm' value=" + response.Data[i].StitchSubstyle[j].stitchSubStyleId + "></td>";
                            }
                            firstList += "</tr>";

                        }
                    }
                    if (response.Data[i].StitchStyle.stitchStyleType == 1) {
                        second = response.Data[i].StitchStyle.stitchStyleTitle;
                        valSecond = response.Data[i].StitchStyle.stitchStyleId;

                        for (var k = 0; k < StitchSubstyleCount; k++) {
                            secondList += "<tr><td>" + response.Data[i].StitchSubstyle[k].stitchSubStyleTitle + "</td>";

                            if (count_1 > 0) {
                                // console.log('k count '+k);
                                if (response.Data[i].StitchSubstyle[k].stitchSubStyleId == check_styles_exists[m].stitchSubStyleId) {
                                    // console.log('m in 1 '+m);
                                    secondList += "<td><input type='radio' name='singleSelection' class='form-control form-control-sm' name='substyleName' value=" + response.Data[i].StitchSubstyle[k].stitchSubStyleId + " checked></td>";
                                    m++;
                                } else {
                                    secondList += "<td><input type='radio' name='singleSelection' class='form-control form-control-sm' name='substyleName' value=" + response.Data[i].StitchSubstyle[k].stitchSubStyleId + "></td>";
                                }

                            } else {
                                secondList += "<td><input type='radio' name='singleSelection' class='form-control form-control-sm' name='substyleName' value=" + response.Data[i].StitchSubstyle[k].stitchSubStyleId + "></td>";
                            }
                            secondList += "</tr>";

                        }
                    }
                    if (response.Data[i].StitchStyle.stitchStyleType == 2) {
                        third = response.Data[i].StitchStyle.stitchStyleTitle;
                        valThird = response.Data[i].StitchStyle.stitchStyleId;

                        for (var l = 0; l < StitchSubstyleCount; l++) {
                            //console.log('k count '+k);
                            thirdList += "<tr><td>" + response.Data[i].StitchSubstyle[l].stitchSubStyleId + "</td>";
                            thirdList += "<td>" + response.Data[i].StitchSubstyle[l].stitchSubStyleTitle + "</td>";
                            if (count_1 > 0) {

                                if (response.Data[i].StitchSubstyle[l].stitchSubStyleId == check_styles_exists[m].stitchSubStyleId) {
                                    thirdList += "<td><input type='text' class='form-control form-control-sm' value=" + check_styles_exists[m].value + "></td>";
                                    m++;
                                    // console.log('m in 2 '+m);

                                } else {
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
    //end for load data
    // console.log(fabric_orderItemId);
    $.ajax({
        url: api_url + 'getproductfabricmapping.php',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            var createDropdownOptions = '';
            var count = response.Data.length;
            for (var i = 0; i < count; i++) {
                if (response.Data[i].productId == productId) {
                    console.log(response.Data[i].productId);
                    createDropdownOptions += "<tr><td>" + response['Data'][i].fabricTitle + "</td>";
                    createDropdownOptions += "<td><img class='img-thumbnail' src='http://praxello.com/tailorsmart/mobileimages/fabric/" + response['Data'][i].skuNo + ".jpg' width='20%' height='10%' alt='No Image Available'></img></td>";
                    createDropdownOptions += "<td>" + response['Data'][i].fabricTitle + "</td>";
                    createDropdownOptions += "<td>" + response['Data'][i].skuNo + "</td>";
                    createDropdownOptions += "<td>" + response['Data'][i].fabricPrice + "</td>";
                    if (count_1 > 0) {
                        createDropdownOptions += "<td><input type='checkbox' name='fabrics' value=" + response['Data'][i].fabricId + " checked></td>";
                    } else {
                        createDropdownOptions += "<td><input type='checkbox' name='fabrics' value=" + response['Data'][i].fabricId + "></td>";
                    }
                    createDropdownOptions += "</tr>";
                }
            }
            // alert(createDropdownOptions);
            $("#fabricsTable").html(createDropdownOptions);
            $('#FabricsModal').modal();
        }
    })
}
