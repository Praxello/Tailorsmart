 <!-- The Modal -->
 <div class="modal" id="myModal">
     <div class="modal-dialog modal-lg">
         <div class="modal-content">

             <!-- Modal Header -->
             <div class="modal-header">
                 <h4 class="modal-title">Order Measurments</h4>
             </div>
             <!-- Modal body -->
             <div class="modal-body" style="overflow-x: hidden;max-height: 500px;">

                 <div class="card">
                     <div class="row">

                         <div class="table-responsive">
                             <table class="table table-bordered" id="sampleTbl">
                                 <thead>
                                     <tr>
                                         <th style="display:none;">Id</th>
                                         <th>Measurements</th>
                                         <th>Value</th>
                                     </tr>
                                 </thead>
                                 <tbody id="measurementTable">

                                 </tbody>
                             </table>
                         </div>
                     </div>
                 </div>
             </div>

             <!-- Modal footer -->
             <div class="modal-footer">
                 <button type="button" class="btn btn-success btn-sm" id="saveMeasurementsData">Save</button>
                 <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
             </div>

         </div>
     </div>
 </div>
 <script>
       jQuery.validator.addMethod("dollarsscents", function (value, element) {
        return this.optional(element) || /^\d{0,2}(\.\d{0,2})?$/i.test(value);
    }, "You must include two decimal places");

    $('#myform').validate({
        rules: {
            field1: {
                required: true,
                dollarsscents: true
            }
        }
    });
var TableData;
var abc =0;
$('#saveMeasurementsData').on('click', function(event) {
    event.preventDefault();
    var rowCount = $("#sampleTbl td").closest("tr").length;
    if (rowCount > 0) {
        TableData = storeTblValues();
        if(abc==0){
          var postdata = {
              "orderitemid": customer_orderItemId,
              "measurements": TableData
          };
          postdata = JSON.stringify(postdata);
          // console.log(postdata);
          $.ajax({
              url: api_url + 'createorderitemmeasurement.php',
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
                  customerOrderDetails = customerOrders[indexRow];
                  $('#customerOrdersBlock').hide();
                  $('#myModal').modal('toggle');
              },
              complete:function(response){
                $(".preloader").hide();
              }
          })
        }
        else{
          alert("Missing Fields");
        }

    } else {
        alert('Add Measurment First');
    }
});

function storeTblValues() {
    var TableData = new Array();
     abc =0;
    $('#sampleTbl tr').each(function(row, tr) {
        var measurmentValue = $(tr).find('td:eq(2) input').val();
        if (measurmentValue == '') {
            measurmentValue = '-';
            abc =1;
        }
        TableData[row] = {
            "measurementid": $(tr).find('td:eq(0)').text(),
            "value": measurmentValue
        }
    });
    TableData.shift(); // first row will be empty - so remove
    return TableData;
}
 </script>
