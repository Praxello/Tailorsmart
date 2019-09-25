 <!-- The Modal -->
 <div class="modal" id="FabricsModal">
     <div class="modal-dialog modal-lg">
         <div class="modal-content">

             <!-- Modal Header -->
             <div class="modal-header">
                 <h4 class="modal-title">Add Fabrics</h4>
             </div>
             <!-- Modal body -->
             <div class="modal-body" style="overflow-x: hidden;max-height: 500px;">
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
    //store_fabricsTblValues();
    fabrics_TableData = store_fabricsTblValues();
    var postdata = {
        "orderitemid": fabric_orderItemId,
        "fabrics": fabrics_TableData
    };
    postdata = JSON.stringify(postdata);

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
            //  console.log(customerId_g);
            getOrdersOfCustomer(customerId_g);
            customerOrderDetails = customerOrders[indexRow];
            //  console.log(customerOrderDetails);
            $('#customerOrdersBlock').hide();
            $('#FabricsModal').modal('toggle');
        },
        complete:function(response){
          $(".preloader").hide();
        }

    })
});

function store_fabricsTblValues() {
    var TableData = new Array();
    $('#fabricssampleTbl').find('input[name="fabrics"]:checked').each(function(row) {
        TableData[row] = {
            "fabricid": $(this).val()
        }
    });
    // TableData.shift(); // first row will be empty - so remove
    return TableData;
}
 </script>
