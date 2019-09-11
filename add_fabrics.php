 <!-- The Modal -->
 <div class="modal" id="FabricsModal">
     <div class="modal-dialog modal-lg">
         <div class="modal-content">

             <!-- Modal Header -->
             <div class="modal-header">
                 <h4 class="modal-title">Add Fabrics</h4>
             </div>
             <!-- Modal body -->
             <div class="modal-body">

                 <div class="card">
                     <div class="row">

                         <div class="table-responsive">
                             <table class="table table-bordered" id="fabricssampleTbl">
                                 <thead>
                                     <tr>
                                         <th>Image</th>
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
         //console.log(postdata);
         $.ajax({
             url: '../Tailorsmart/tailorsmart/admin/createorderitemfabric.php',
             type: 'POST',
             data: {
                 postdata: postdata
             },
             success: function(response) {
                 alert(response.Message);
                //  console.log(customerId_g);
                 getOrdersOfCustomer(customerId_g);
                 customerOrderDetails = customerOrders[indexRow];
                //  console.log(customerOrderDetails);
                 $('#customerOrdersBlock').hide();
                 $('#FabricsModal').modal('toggle');
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