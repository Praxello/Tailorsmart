var styleData = new Map(); // This variable globally declare save all Style Data in Array
var productData = new Map();
var customerId_g = null;
var cust_product = null;
var records = [];
getstitchstyles();

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
        html += '<td><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editCustomers(' + (k) + ');"><i class="fa fa-edit"></i></button></div></td></tr>';
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

function editCustomers(customerId) {
    customerId_g = customerId;
    var AllData = styleData.get(customerId.toString());
    $("#customerId").val(customerId);
    $('#customerstyletable').hide();
    $('#customerdata').show();
    $('#customername').html(AllData.firstName + ' ' + AllData.lastName);
    $('#mobilenumber').html(AllData.mobile);
    $('#custEmail').html(AllData.email);
    $('#custAddress').html(AllData.address);
    getcustomerspecificmeasurement(customerId);
}

function getcustomerspecificmeasurement(customerId) {
    $.ajax({
        type: "POST",
        url: api_url + "getcustomerspecificmeasurement.php",
        async: true,
        data:{
        customerId:customerId
        },
        success: function(response) {
          console.log(response);
            var count;
            if (response['Data'] != null) {
                count = response['Data'].length;
            }
            for (var i = 0; i < count; i++) {
                // productData.set(response.Data[i].measurementId, response.Data[i]);
            }
            // setProductData(productData);
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
    var i=0;
    for (let k of productData.keys()) {
       var AllData = productData.get(k);
       // console.log(AllData.itemTitle);
        // let imageUrl = pic_url + 'product/300x300/' + k + '.jpg';
        // shtml += "<tr><td style='width:15%'><img class='img-thumbnail' src='" + imageUrl + "' style='cursor: pointer' alt='No Image'  width='70px' height='70px'></img></td>";
        shtml += "<tr>";
        shtml += "<td>" + (i+1) + "</td>";
        shtml += "<td>" + AllData.itemTitle + "</td>";
        shtml += "<td style='display:none;'>" + AllData.measurementId + "</td>";
        shtml += "<td><input type='text' class='form-control' id='measurment"+k+"'></input></td>";
        // shtml += '<td><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Add your measurments" onclick="addMeasurments(' + (k) + ');"><i class="fa fa-edit"></i></button></div></td>';
        shtml += "</tr>";
        i++;
    }
    $("#productlist").html(shtml);
    // $('#productTable').DataTable();
}

$('#saveMeasurementsData1').on('click', function(event) {

    event.preventDefault();
    var customerId =$("#customerId").val();
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
              complete:function(response){
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
        }
        else{
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
