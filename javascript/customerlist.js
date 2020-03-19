var styleData = new Map(); // This variable globally declare save all Style Data in Array
var productData = new Map();
var customerId_g = null;
var cust_product = null;
var EmployeeData = new Map();
var records = [];
getstitchstyles();
$('#cgender').select2({
    allowClear: true,
    placeholder: "Select Gender"
});
$('#refEmp').select2({
    allowClear: true,
    placeholder: "Select Refferal Employee"
});
getMicellaneousData();

function getMicellaneousData() {
    var selectemp = '';
    $.ajax({
        type: "GET",
        url: api_url + "getmiscellaneousdata.php",
        success: function(response) {
            console.log(response);
            var countowner = 0;
            if (response['Employee'] != null) {
                countowner = response['Employee'].length;
            }
            selectemp += '<option value="">Select Employee</option>';
            for (var i = 0; i < countowner; i++) {
                selectemp += "<option value='" + response['Employee'][i].employeeId + "'>" + response['Employee'][i].firstName + " " + response['Employee'][i].lastName + "</option>";
                EmployeeData.set(response.Employee[i].employeeId, response.Employee[i]);
            }
            $("#refEmp").html(selectemp);
        }
    });
}

function settabledata(styleData) {
    var html = '';
    $('#styletbl').dataTable().fnDestroy();
    $("#styletbldata").empty();
    for (let k of styleData.keys()) {
        var AllData = styleData.get(k);
        html += '<tr>';
        html += "<td>" + AllData.firstName + " " + AllData.lastName + "</td>";
        html += "<td>" + AllData.email + "</td>";
        html += "<td>" + AllData.mobile + "</td>";
        html += "<td><address>" + AllData.address + " " + AllData.city + " " + AllData.country + "</address></td>";
        html += '<td>';
        html += '<div class="btn-group" role="group" aria-label="Basic Example">';
        html += '<button class="btn btn-primary btn-sm" data-toggle="tooltip" data-placement="top" title="Edit Measurement" onclick="editMeasurement(' + (k) + ');">';
        html += '<i class="fa fa-balance-scale"></i></button>';

        html += '<button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editCustomers(' + (k) + ');">';
        html += '<i class="fa fa-edit"></i></button>';
        if (data.role != 4 || data.role != 3) {
            html += '<button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="removeStyle(' + (k) + ');">';
            html += '<i class="fa fa-trash"></i></button>';
        }
        html += '</div>';
        html += '</td>';
        html += '</tr>';
    }
    $("#styletbldata").html(html);
    $('#styletbl').DataTable({
        searching: true,
        retrieve: true,
        bPaginate: $('tbody tr').length > 10,
        order: [],
        columnDefs: [{ orderable: false, targets: [] }],
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
        destroy: true
    });

}

// This function is created for Get All Style Data.
function getstitchstyles() {
    $('#styletbl').dataTable().fnDestroy();
    $("#styletbldata").empty();
    $.ajax({
        type: "GET",
        url: api_url + "getcustomerlist.php",
        beforeSend: function() {
            $(".preloader").show();
        },
        success: function(response) {
            var count;
            if (response['Data'] != null) {
                count = response['Data'].length;
            }
            for (var i = 0; i < count; i++) {
                styleData.set(response.Data[i].customerId, response.Data[i]);
            }
            settabledata(styleData);
        },
        complete: function(response) {
            $(".preloader").hide();
        }
    });
}
// This function is created For Add Button New Style
function addStyle() {
    $("#customerstyletable").hide();
    $("#customerdata").show();
    $("#customerId").val("");
    $("#cfname").val("");
    $("#clname").val("");
    $("#cemail").val("");
    $("#cdob").val("");
    $("#cmobile").val("");
    // $("#clandline").val("");
    $("#ccity").val("");
    $("#cstate").val("");
    $("#ccountry").val("");
    $("#caddress").val("");
    $("#cgender").val("");
    $("#cpassword").val("");
    $("#savebtncustomerstyle").show();
    $("#updatebtncustomerstyle").hide();
}
$('#reloadbtn').on('click', function(event) {
    event.preventDefault();
    // window.location.reload();
    $("#customerstyletable").show();
    $("#customerdata").hide();
    $("#savebtncustomerstyle").show();
    $("#updatebtncustomerstyle").hide();
    settabledata(styleData);
});
$('#reloadbtn1').on('click', function(event) {
    event.preventDefault();
    // window.location.reload();
    $("#customerstyletable").show();
    $("#customerdata").hide();
    // $("#savebtncustomerstyle").show();
    // $("#updatebtncustomerstyle").hide();
    // settabledata(styleData);
});

function editCustomers(customerId) {
    customerId_g = customerId;
    var AllData = styleData.get(customerId.toString());
    console.log(AllData);
    $("#customerId").val(customerId);
    $('#customerstyletable').hide();
    $('#customerdata').show();
    $("#formcustomer").show();
    $("#formmeasure").hide();
    $("#cfname").val(AllData.firstName);
    $("#clname").val(AllData.lastName);
    $("#cemail").val(AllData.email);
    $("#cdob").val(AllData.date_birth);
    $("#cmobile").val(AllData.mobile);
    // $("#clandline").val(AllData.landline);
    $("#ccity").val(AllData.city);
    $("#cstate").val(AllData.state);
    $("#ccountry").val(AllData.country);
    $("#caddress").val(AllData.address);
    $("#refEmp").val(AllData.employeeId).trigger('change');
    $("#cpassword").val(AllData.password);
    $("#cgender").val(AllData.isMale).trigger('change');
    $("#savebtncustomerstyle").hide();
    $("#updatebtncustomerstyle").show();


}

function editMeasurement(customerId) {
    var AllData = styleData.get(customerId.toString());
    // console.log(AllData);
    $("#customerId").val(customerId);
    $('#customerstyletable').hide();
    $('#customerdata').show();
    $("#formcustomer").hide();
    $("#formmeasure").show();
    getcustomerspecificmeasurement(customerId);
}

function getcustomerspecificmeasurement(customerId) {
    $.ajax({
        type: "POST",
        url: api_url + "getcustomerspecificmeasurement.php",
        async: true,
        data: {
            customerId: customerId
        },
        success: function(response) {
            var count;
            if (response['Data'] != null) {
                count = response['Data'].length;
            }
            for (var i = 0; i < count; i++) {
                $("#measurment" + response.Data[i].measurmentId).val(response.Data[i].value);
            }
        }
    });
}
getproductdata();

function getproductdata() {
    $.ajax({
        type: "GET",
        url: api_url + "getmeasurementitems.php",
        async: true,
        success: function(response) {
            console.log(response);
            var count;
            if (response['Data'] != null) {
                count = response['Data'].length;
            }
            for (var i = 0; i < count; i++) {
                productData.set(response.Data[i].measurementId, response.Data[i]);
            }
            setProductData(productData);
        }
    });
}

function setProductData(productData) {
    // console.log(productData);
    var shtml = '';
    $('#productTable').dataTable().fnDestroy();
    $("#productlist").empty();
    var i = 0;
    for (let k of productData.keys()) {
        var AllData = productData.get(k);
        // console.log(AllData.itemTitle);
        // let imageUrl = pic_url + 'product/300x300/' + k + '.jpg';
        // shtml += "<tr><td style='width:15%'><img class='img-thumbnail' src='" + imageUrl + "' style='cursor: pointer' alt='No Image'  width='70px' height='70px'></img></td>";
        shtml += "<tr>";
        shtml += "<td>" + (i + 1) + "</td>";
        shtml += "<td>" + AllData.itemTitle + "</td>";
        shtml += "<td style='display:none;'>" + AllData.measurementId + "</td>";
        shtml += "<td><input type='text' class='form-control' id='measurment" + k + "'></input></td>";
        // shtml += '<td><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Add your measurments" onclick="addMeasurments(' + (k) + ');"><i class="fa fa-edit"></i></button></div></td>';
        shtml += "</tr>";
        i++;
    }
    $("#productlist").html(shtml);
    // $('#productTable').DataTable();
}

$('#saveMeasurementsData1').on('click', function(event) {

    event.preventDefault();
    var customerId = $("#customerId").val();
    var rowCount = $("#productTable td").closest("tr").length;

    TableData = storeTblValues();

    var postdata = {
        "customerId": customerId,
        "measurements": TableData
    };
    postdata = JSON.stringify(postdata);
    // console.log(postdata);
    $.ajax({
        url: api_url + 'createcustomermeasurement.php',
        type: 'POST',
        data: {
            postdata: postdata
        },
        beforeSend: function() {
            $(".preloader").show();
        },
        success: function(response) {
            alert(response.Message);
            // getOrdersOfCustomer(customerId_g);
            // customerOrderDetails = customerOrders[indexRow];
            // $('#customerOrdersBlock').hide();
            // $('#myModal').modal('toggle');
        },
        complete: function(response) {
            $(".preloader").hide();
        }
    });

});

function storeTblValues() {
    var TableData = new Array();
    // abc =0;
    $('#productTable tr').each(function(row, tr) {
        var measurmentValue = $(tr).find('td:eq(3) input').val();
        if (measurmentValue == '') {
            measurmentValue = '-';
            // abc =1;
        } else {
            TableData[row] = {
                "measurementid": $(tr).find('td:eq(2)').text(),
                "value": measurmentValue
            }
        }

    });
    TableData.shift(); // first row will be empty - so remove
    return TableData;
}

function addMeasurments(productId) { //for mapping product id and measurment id
    cust_product = productId;
    loadMesurementData(productId, customerId_g);
    var count_1 = 0;
    var check_mesurment_exists = records;

    if (records.length > 0) {
        count_1 = records.length;
    }

    $.ajax({
        url: api_url + 'getproductmeasurementmapping.php',
        type: 'GET',
        dataType: 'json',
        beforeSend: function() {
            $(".preloader").show();
        },
        success: function(response) {
            var createDropdownOptions = '';
            if (response.Data != null) {
                var count = response.Data.length;
                var flag = null;
                for (var i = 0; i < count; i++) {

                    if (response.Data[i].productId == productId) {
                        createDropdownOptions += "<tr><td style='display:none;'>" + response.Data[i].measurementId + "</td><td>" + response.Data[i].itemTitle + "</td>";
                        if (count_1 > 0) {
                            flag = 0;
                            for (var a = 0; a < count_1; a++) {
                                if (response['Data'][i].measurementId == check_mesurment_exists[a].measurmentId) {
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
            } else {
                alert('Add Measurment First');
            }
        },
        complete: function(response) {
            $(".preloader").hide();
        }
    });

}

function loadMesurementData(productId, customerId) {
    $.ajax({
        url: api_url + 'getcustomer_productmeasurments.php',
        type: 'POST',
        async: false,
        data: { productId: productId, customerId: customerId },
        dataType: 'json',
        beforeSend: function() {
            $(".preloader").show();
        },
        success: function(response) {
            records = [];
            if (response.Responsecode == 200) {
                records = [...response.Data];
            }
        },
        complete: function(response) {
            $(".preloader").hide();
        }
    });
}

// This function is created For Save Style Data
$('#savebtncustomerstyle').on('click', function(event) {
    event.preventDefault();
    var cfname = $("#cfname").val();
    var clname = $("#clname").val();
    var cemail = $("#cemail").val();
    var cdob = $("#cdob").val();
    var cmobile = $("#cmobile").val();
    // $("#clandline").val(AllData.landline);
    var ccity = $("#ccity").val();
    var cstate = $("#cstate").val();
    var ccountry = $("#ccountry").val();
    var caddress = $("#caddress").val();
    var cgender = $("#cgender").val();
    var cpassword = $("#cpassword").val();
    var employeeId = $('#refEmp').val();
    if (cfname === "" || clname === "" || cemail === "" ||
        cmobile === "" || ccity === "" || cstate === "" || ccountry === "" || caddress === "" || cgender === "" || cpassword === "") {
        swal("Parameter Missing");
    } else {
        var obj = {
            firstName: cfname,
            lastName: clname,
            email: cemail,
            date_birth: cdob,
            mobile: cmobile,
            landline: '0',
            city: ccity,
            state: cstate,
            country: ccountry,
            address: caddress,
            isMale: cgender,
            password: cpassword,
            latitude: '0',
            longitude: '0',
            landmark: '',
            isActive: '1',
            issocial: '1',
            employeeId: employeeId
        };
        $.ajax({
            url: api_url + 'createcustomer.php',
            type: 'POST',
            data: obj,
            dataType: 'json',
            beforeSend: function() {
                $(".preloader").show();
                // console.log("before");
            },
            success: function(response) {

                if (response.Responsecode == 200) {
                    $("#customerstyletable").show();
                    $("#customerdata").hide();
                    swal(response.Message);
                    obj.customerId = response.RowId;
                    styleData.set(response.RowId.toString(), obj);
                    settabledata(styleData);
                } else {
                    // swal(response.Message);
                    swal(response.Message);
                }
            },
            complete: function(response) {
                $(".preloader").hide();
                // console.log("after");
            }
        });
    }

});

//This function is created For Update Style Data
$('#updatebtncustomerstyle').on('click', function(event) {
    event.preventDefault();
    var customerId = $("#customerId").val();
    var cfname = $("#cfname").val();
    var clname = $("#clname").val();
    var cemail = $("#cemail").val();
    var cdob = $("#cdob").val();
    var cmobile = $("#cmobile").val();
    // $("#clandline").val(AllData.landline);
    var ccity = $("#ccity").val();
    var cstate = $("#cstate").val();
    var ccountry = $("#ccountry").val();
    var caddress = $("#caddress").val();
    var cgender = $("#cgender").val();
    var cpassword = $("#cpassword").val();
    var employeeId = $('#refEmp').val();
    if (cfname === "" || clname === "" || cemail === "" ||
        cdob === "" || cmobile === "" || ccity === "" || cstate === "" || ccountry === "" || caddress === "" || cgender === "" || cpassword === "") {
        swal("Parameter Missing");
    } else {
        var obj = {
            customerId: customerId,
            firstName: cfname,
            lastName: clname,
            email: cemail,
            date_birth: cdob,
            mobile: cmobile,
            landline: '0',
            city: ccity,
            state: cstate,
            country: ccountry,
            address: caddress,
            isMale: cgender,
            password: cpassword,
            latitude: '0',
            longitude: '0',
            landmark: '',
            isActive: '1',
            issocial: '1',
            employeeId: employeeId
        };
        $.ajax({
            url: api_url + 'editcustomer.php',
            type: 'POST',
            data: obj,
            dataType: 'json',
            beforeSend: function() {
                $(".preloader").show();
                // console.log("before");
            },
            success: function(response) {
                if (response.Responsecode == 200) {
                    $("#customerstyletable").show();
                    $("#customerdata").hide();
                    styleData.set(customerId, obj);
                    settabledata(styleData);
                    swal(response.Message);
                } else {
                    // swal(response.Message);
                    swal("Please Retry Again");
                }
            },
            complete: function(response) {

                // console.log("after");
                $(".preloader").hide();
            }
        });
    }
});

// This function is created For Remove Button
function removeStyle(id) {
    $.ajax({
        url: api_url + 'deletecustomer.php',
        type: 'POST',
        data: {
            customerId: id
        },
        dataType: 'json',
        beforeSend: function() {
            $(".preloader").show();
            // console.log("before");
        },
        success: function(response) {
            if (response.Responsecode == 200) {
                $("#customerstyletable").show();
                $("#customerdata").hide();
                styleData.delete(id.toString());
                settabledata(styleData);
                swal(response.Message);
            } else {
                // swal(response.Message);
                swal("Already Used Can't Delete");
            }
        },
        complete: function(response) {

            // console.log("after");
            $(".preloader").hide();
        }
    });
}