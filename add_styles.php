 <!-- The Modal -->
 <div class="modal" id="styleModal">
     <div class="modal-dialog modal-lg">
         <div class="modal-content">

             <!-- Modal Header -->
             <div class="modal-header">
                 <h4 class="modal-title">Add Styles</h4>
             </div>
             <!-- Modal body -->
             <div class="modal-body">
                 <div class="card">
                     <div class="card-body">
                         <h5 class="card-title" id="first"></h5>
                         <input type="hidden" id="valFirst">
                         <div class="row">
                             <div class="table-responsive ">
                                 <table class="table table-bordered" id="firstStyle">
                                     <thead>
                                         <tr>
                                             <th>Id</th>
                                             <th>Style</th>
                                             <th>select multiple</th>
                                         </tr>
                                     </thead>
                                     <tbody id="FirststyleTable">

                                     </tbody>
                                 </table>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div class="card">
                     <div class="card-body">
                         <h5 class="card-title" id="second"></h5>
                         <input type="hidden" id="valSecond">
                         <div class="row">
                             <div class="table-responsive ">
                                 <table class="table table-bordered" id="secondStyle">
                                     <thead>
                                         <tr>
                                             <th>Style</th>
                                             <th>select single</th>
                                         </tr>
                                     </thead>
                                     <tbody id="SecondstyleTable">

                                     </tbody>
                                 </table>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div class="card">
                     <div class="card-body">
                         <h5 class="card-title" id="third"></h5>
                         <input type="hidden" id="valThird">
                         <div class="row">
                             <div class="table-responsive ">
                                 <table class="table table-bordered" id="thirdStyle">
                                     <thead>
                                         <tr>
                                             <th>Id</th>
                                             <th>Style</th>
                                             <th>select single</th>
                                         </tr>
                                     </thead>
                                     <tbody id="ThirdstyleTable">

                                     </tbody>
                                 </table>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>

             <!-- Modal footer -->
             <div class="modal-footer">
                 <button type="button" class="btn btn-success btn-sm" id="saveStyleData">Save</button>
                 <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
             </div>

         </div>
     </div>
 </div>
 <script>
     var first_TableData, third_TableData, second_TableData;
     $('#saveStyleData').on('click', function(event) {
         event.preventDefault();
         first_TableData = store_firstTblValues();
         third_TableData = store_thirdTblValues();
         second_TableData = store_secondTblValues();
         var allTableData = first_TableData.concat(second_TableData, third_TableData);
         var postdata = {
             "orderitemid": style_orderItemId,
             "styles": allTableData
         };
         postdata = JSON.stringify(postdata);
        //  console.log(postdata);
         $.ajax({
             url: api_url + 'createorderitemstyle.php',
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
                 $('#styleModal').modal('toggle');
             }
         })
     });

     function store_firstTblValues() {
         var TableData = new Array();
         var stitchstyleid = $('#valFirst').val();
         $('#firstStyle').find('input[name="multipleSelection"]:checked').each(function(row) {
             TableData[row] = {
                 "stitchstyleid": stitchstyleid,
                 "stitchsubstyleid": $(this).val(),
                 "value": 'yes'
             }
         });
         return TableData;
     }

     function store_secondTblValues() {
         var TableData = new Array();
         var stitchstyleid = $('#valSecond').val();
         $('#secondStyle').find('input[name="singleSelection"]:checked').each(function(row) {
             TableData[row] = {
                 "stitchstyleid": stitchstyleid,
                 "stitchsubstyleid": $(this).val(),
                 "value": 'yes'
             }
         });
         return TableData;
     }

     function store_thirdTblValues() {
         var TableData = new Array();
         var stitchstyleid = $('#valThird').val();
         $('#thirdStyle tr').each(function(row, tr) {
             TableData[row] = {
                 "stitchstyleid": stitchstyleid,
                 "stitchsubstyleid": $(tr).find('td:eq(0)').text(),
                 "value": $(tr).find('td:eq(2) input').val()
             }
         });
         TableData.shift(); // first row will be empty - so remove
         return TableData;
     }
 </script>