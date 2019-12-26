 <!-- The Modal -->
 <div class="modal" id="FabricsModal">
     <div class="modal-dialog modal-lg">
         <div class="modal-content">

             <!-- Modal Header -->
             <div class="modal-header">
                 <h4 class="modal-title">Order Fabrics</h4>
                 <div class='btn-group' role='group' aria-label='Basic example'>
                 <button type="button" class="btn btn-primary btn-sm" data-toggle="tooltip" title="Add Fabric" id="adduserfabrics"><i class="fa fa-plus"></i></button>
                 <button type="button" class="btn btn-success btn-sm" data-toggle="tooltip" title="Refresh" id="refreshFabrics"><i class="fa fa-refresh"></i></button>
                </div>
                </div>
             <!-- Modal body -->
             <div class="modal-body" style="overflow-x: hidden;max-height: 500px;">
             <input type="hidden" id="fabric_row">
             <input type="hidden" id="changeAmount_1"/>
                 <input id="myInput" type="text" placeholder="Search.." class="form-control form-control-sm">
                 <div class="card">
                     <div class="row">

                         <div class="table-responsive">
                             <table class="table table-bordered" id="fabricssampleTbl">
                                 <thead>
                                     <tr>
                                         <th style="width: 30%;">Image</th>
                                         <th>Title</th>
                                         <th>Sku</th>
                                         <th>Price</th>
                                         <th>Select</th>
                                     </tr>
                                 </thead>
                                 <tbody id="fabricsTable">

                                 </tbody>
                             </table>
                         </div>
                     </div>
                 </div>
             </div>

             <!-- Modal footer -->
             <div class="modal-footer">
                 <button type="button" class="btn btn-success btn-sm" id="saveFabricsData">Save</button>
                 <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
             </div>

         </div>
     </div>
 </div>
 <script>
$("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#fabricssampleTbl tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});
var fabrics_TableData;
$('#saveFabricsData').on('click', function(event) {
    event.preventDefault();
    fabrics_TableData = getMeasure();
    var fabricPrice = 0;
    var fabarrhtml="<td><table>";
    // for(var i=0;i<fabrics_TableData.length;i++){
    //     fabricPrice +=parseInt(fabrics_TableData[i].price);
    //     fabarrhtml += (i + 1) + " " +fabrics_TableData[i].Title;
    //     fabarrhtml += " -" + fabrics_TableData[i].price+"-"+fabrics_TableData[i].skuno;
    //     fabarrhtml += "</br >";
    // }
    for (var i=0;i<fabrics_TableData.length;i++) {
        fabricPrice +=parseInt(fabrics_TableData[i].price);
                    fabarrhtml += '<tr><td><img class="img-fluid img-thumbnail mb-10" src="mobileimages/fabric/300x300/' + fabrics_TableData[i].skuno + '.jpg" alt="" height="30px" width="30px"></img></td>';
                    fabarrhtml += "<td>" + fabrics_TableData[i].Title + "</td><td>";
                    fabarrhtml += "</td><td>" + fabrics_TableData[i].price + "</td><td>" + fabrics_TableData[i].skuno;
                    fabarrhtml += "</td></tr>";
                }
                fabarrhtml += "</td></table>"
    var postdata = {
        "orderitemid": fabric_orderItemId,
        "fabrics": fabrics_TableData
    };
    var price = $('#amt' + fabric_orderItemId).val();
    var updateDetails = {
            orderid:orderId,
            orderItemPrice: fabricPrice,
            orderItemId: fabric_orderItemId,
            changeAmount:price
        };
    postdata = JSON.stringify(postdata);
    var rowId =  $('#fabric_row').val();
    $('#productTable tr:nth-child(' + rowId + ') td:nth-child(3)').html(fabricPrice);
    $('#productTable tr:nth-child(' + rowId + ') td:nth-child(2)').html(fabarrhtml);
   addPrice(updateDetails);
    $.ajax({
        url: api_url + 'createorderitemfabric.php',
        type: 'POST',
        data: {
            postdata: postdata
        },
        beforeSend: function() {
              $(".preloader").show();
        },
        success: function(response) {
            alert(response.Message);

                getOrdersOfCustomer(customerId_g);
                customerOrderDetails = [];
                customerOrderDetails = customerOrders[indexRow];
                OrderDetailsOfCustomer = customerOrderDetails.OrderDetails;
                displayOrderDetails(OrderDetailsOfCustomer);
                getPaymentList();
            $('#customerOrdersBlock').hide();
            $('#FabricsModal').modal('toggle');
        },
        complete:function(response){
          $(".preloader").hide();
        }

    });
});

function store_fabricsTblValues() {
    var TableData = new Array();
    $('#fabricssampleTbl').find('input[name="fabrics"]:checked').each(function(row) {
        TableData[row] = {
            "fabricid": $(this).val()
        }
    });
    return TableData;
}
function getMeasure() {
    var TableData = new Array();
    var tableControl = document.getElementById('fabricssampleTbl');
    $('input[name="fabrics"]:checked', tableControl).each(function(row, tr) {
        TableData[row] = {
            "fabricid": $(this).val(),
            "Title": $(this).closest('td').prev().prev().prev().text(),
            "price": $(this).closest('td').prev().text(),
            "skuno": $(this).closest('td').prev().prev().text()    
        }
    });
    return TableData;
}
$('#adduserfabrics').on('click',function(e){
    e.preventDefault();
    window.open('fabric.php', '_blank');
});
$('#refreshFabrics').on('click',function(e){
    e.preventDefault();
    $("#fabricsTable").empty();
    $.ajax({
        url: api_url + 'getfabrics.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var createDropdownOptions = '';
            if (response.Data != null) {
                var count = response.Data.length;
                for (var i = 0; i < count; i++) {
                    
                    createDropdownOptions += "<tr><td><img class='img-thumbnail' src='mobileimages/fabric/300x300/" + response['Data'][i].skuNo + ".jpg' alt='No Image Available'></img></td>";
                    createDropdownOptions += "<td>" + response['Data'][i].fabricTitle + "</td>";
                    createDropdownOptions += "<td>" + response['Data'][i].skuNo + "</td>";
                    createDropdownOptions += "<td>" + response['Data'][i].fabricPrice + "</td>";
                    createDropdownOptions += "<td><input type='checkbox' name='fabrics' value=" + response['Data'][i].fabricId + "></td>";
                    createDropdownOptions += "</tr>";
                }
                $("#fabricsTable").html(createDropdownOptions);
            } else {
                alert('Add Fabrics First');
            }
        }
    })
});
function addPrice(updateDetails){
    $.ajax({
            url: api_url + 'editOrderItemPrice.php',
            type: 'POST',
            data: updateDetails,
            dataType: 'json',
            success: function(response) {
                
            }
        });
}
 </script>
