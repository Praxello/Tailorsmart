 <!-- The Modal -->
 <div class="modal" id="editOrderItemPrice">
     <div class="modal-dialog modal-sm">
         <div class="modal-content">

             <!-- Modal Header -->
             <div class="modal-header">
                 <h4 class="modal-title">Change Price of <strong id="pTitle"></strong></h4>
             </div>
             <!-- Modal body -->
             <div class="modal-body">
                 <div class="col-sm-12">
                     <!-- <div class="card"> -->
                     <div class="row">
                         <input type="hidden" id="orderItemId" />
                         <input type="hidden" id="rowId" />
                         <div class="col-sm-12">
                             <div class="form-group">
                                 <label for="amount">Amount</label>
                                 <input type="text" class="form-control form-control-sm" id="sendPrice"
                                     name="sendPrice" />
                             </div>
                         </div>

                     </div>
                 </div>
             </div>

             <!-- Modal footer -->
             <div class="modal-footer">
                 <button type="button" class="btn btn-success btn-sm" id="updatePrice">Update</button>
                 <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
             </div>

         </div>
     </div>
 </div>
 <script>
$('#updatePrice').on('click', function(e) {
    e.preventDefault();
    var amount = $('#sendPrice').val();
    var rowId = $('#rowId').val();

    if (amount == '') {
        alert('Please Enter an amount');
    } else {
        var updateDetails = {
            orderItemPrice: amount,
            orderItemId: $('#orderItemId').val()
        };

        $.ajax({
            url: api_url + 'editOrderItemPrice.php',
            type: 'POST',
            data: updateDetails,
            dataType: 'json',
            success: function(response) {
                $('#editOrderItemPrice').modal('toggle');
                $('#productTable tr:nth-child(' + rowId + ') td:nth-child(3)').html(amount);
                $('#amt' + updateDetails.orderItemId).val(amount);
            }
        })
    }
});
 </script>