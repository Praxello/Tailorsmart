 <!-- The Modal -->
 <div class="modal" id="paymentLinkModal">
     <div class="modal-dialog modal-lg">
         <div class="modal-content">

             <!-- Modal Header -->
             <div class="modal-header">
                 <h4 class="modal-title">Create Payment Link</h4>
             </div>
             <!-- Modal body -->
             <div class="modal-body">
                 <div class="col-sm-12">
                     <!-- <div class="card"> -->
                     <div class="row">
                         <div class="col-sm-3">
                             <div class="form-check-inline">
                                 <label for="radio">Select Payment Mode</label>
                             </div>
                             <div class="form-check-inline">
                                 <label class="form-check-label" for="radio1">
                                     <input type="radio" class="form-check-input" id="radio1" name="modeofpayment" value="Cash" checked>Cash
                                 </label>
                             </div>
                             <div class="form-check-inline">
                                 <label class="form-check-label" for="radio2">
                                     <input type="radio" class="form-check-input" id="radio2" name="modeofpayment" value="NEFT">NEFT
                                 </label>
                             </div>
                         </div>
                         <div class="col-sm-3">
                             <div class="form-group">
                                 <label for="currency">Currency</label>
                                 <select class="form-control form-control-sm" id="currency" name="currency">

                                 </select>
                             </div>
                         </div>
                         <div class="col-sm-3">
                             <div class="form-group">
                                 <label for="paymenttype">Payment Type</label>
                                 <select class="form-control form-control-sm" id="paymenttype" name="paymenttype">
                                     <option>Advance</option>
                                     <option>Partial</option>
                                     <option>Final</option>
                                 </select>
                             </div>
                         </div>
                         <div class="col-sm-3">
                             <div class="form-group">
                                 <label for="amount">Amount</label>
                                 <input type="text" class="form-control form-control-sm" id="amount" name="amount">
                             </div>
                         </div>
                     </div>
                 </div>
                 <!-- </div> -->
             </div>

             <!-- Modal footer -->
             <div class="modal-footer">
                 <button type="button" class="btn btn-success btn-sm" id="savePaymentLinkData">Save</button>
                 <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
             </div>

         </div>
     </div>
 </div>
 <script>
     currencyCode();
     function currencyCode(){
       var count = currencyData.length;
       var currencyCode = '';
       for(var i=0;i<count;i++){
        currencyCode += "<option value=" + currencyData[i].currencyCode + ">" + currencyData[i].currencyCode +"</option>";
       }
       $('#currency').html(currencyCode);
     }
     $('#savePaymentLinkData').on('click', function(event) {
         event.preventDefault();
         if (document.querySelector('input[name="modeofpayment"]:checked')) {
             var mode = document.querySelector('input[name="modeofpayment"]:checked').value;
         }
         var paymenttype = $('#paymenttype').val();
         var amount = $('#amount').val();
         var Orderamount = $('#Orderamount').html();
         var totalpayment = $('#totalpayment').val();
         // console.log("totalpayment"+totalpayment);
         // console.log("Amt"+amount);
         // console.log("OrderAMT"+Orderamount);
         // console.log(typeof(Orderamount));
         var currencyCode = $('#currency').val();

         if(amount == ''){
             amount = 0;
         }
         var calamt = parseFloat(totalpayment)+parseFloat(amount);
         var totorderamt = parseFloat(Orderamount);
         //    console.log("calamt"+calamt);
         // console.log(typeof(calamt));
         if(calamt<=totorderamt){
           var paymentData = {
               orderid: orderId,
               mode: mode,
               type: paymenttype,
               employeeid: $('#empId').val(),
               amount: amount,
               currencyCode:currencyCode
           };
           $.ajax({
               url: api_url + 'createpaymentfororder.php',
               type: 'POST',
               data: paymentData,
               beforeSend: function() {
                     $(".preloader").show();
               },
               success: function(response) {
                   alert(response.Message);
                  getPaymentList();
                   $('#paymentLinkModal').modal('toggle');
               },
               complete:function(response){
                 $(".preloader").hide();
               }
           });
         }
         else{
            alert("Generated link amount exceeds order amount");
         }


     });
 </script>
