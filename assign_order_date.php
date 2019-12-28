 <!-- The Modal -->
 <div class="modal" id="assignOrderItem">
     <div class="modal-dialog modal-sm">
         <div class="modal-content">

             <!-- Modal Header -->
             <div class="modal-header">
                 <h4 class="modal-title">Assign Date of Delivery of this product</strong></h4>
             </div>
             <!-- Modal body -->
             <div class="modal-body">
                 <div class="col-sm-12">
                     <!-- <div class="card"> -->
                     <div class="row">
                         <input type="hidden" id="aOrderId" />
                        
                         <div class="col-sm-12">
                             <div class="form-group">
                                 <label for="aorderDate">Delivery Date</label>
                                 <input type="date" class="form-control form-control-sm" id="aorderDate"
                                     name="aorderDate" />
                             </div>
                         </div>

                     </div>
                 </div>
             </div>

             <!-- Modal footer -->
             <div class="modal-footer">
                 <button type="button" class="btn btn-success btn-sm" id="assignOrderDate">Update</button>
                 <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
             </div>

         </div>
     </div>
 </div>
 <script>
$('#assignOrderDate').on('click', function(e) {
    e.preventDefault();
    var date = $('#aorderDate').val();
    var aOrderId = $('#aOrderId').val();
    
        $.ajax({
            url: api_url + 'assign_orderDate.php',
            type: 'POST',
            data: {orderItemId:aOrderId,assignDate:date},
            dataType: 'json',
            success: function(response) {
                $('#assignOrderItem').modal('toggle');
            }
        })
});
 </script>