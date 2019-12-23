 <!-- The Modal -->
 <div class="modal" id="assignWork">
     <div class="modal-dialog modal-sm">
         <div class="modal-content">

             <!-- Modal Header -->
             <div class="modal-header">
                 <h4 class="modal-title">Assign a Sales Person</h4>
                 <h6 ><span id="assignedEmp"></span></h6>
             </div>
             <!-- Modal body -->
             <div class="modal-body">
                 <div class="col-sm-12">
                     <!-- <div class="card"> -->
                     <div class="row">

                         <input type="hidden" id="orderItemIdforassign"/>
                         <div class="col-sm-12">
                             <div class="form-group">
                                 <label for="assignId">Empolyee Name</label>
                                 <select class="form-control form-control-sm" id="assignId" name="assignId">

                                 </select>
                             </div>
                         </div>

                     </div>
                 </div>
                 <!-- </div> -->
             </div>

             <!-- Modal footer -->
             <div class="modal-footer">
                 <button type="button" class="btn btn-success btn-sm" id="saveAssignwork">Assign</button>
                 <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
             </div>

         </div>
     </div>
 </div>
 <script>
     fetchMasterList();
     function fetchMasterList(){
       var count = TailorData.length;
       var tailorsList = '';
       for(var i=0;i<count;i++){
        tailorsList += "<option value=" + TailorData[i].employeeId + ">" + TailorData[i].firstName +' '+  TailorData[i].lastName+"</option>";
       }
       $('#assignId').html(tailorsList);
     }
     $('#saveAssignwork').on('click', function(event) {
         event.preventDefault();
         var employeeid = $('#assignId').val();
         if(employeeid == ''){
             alert('Select Employee first');
         }else{
         var assignData = {
             orderItmeid: $('#orderItemIdforassign').val(),
             employeeid: employeeid
         };
         $.ajax({
             url: api_url + 'assign_orderitem.php',
             type: 'POST',
             data: assignData,
             beforeSend: function() {
                   $(".preloader").show();
             },
             success: function(response) {
                 alert(response.Message);
                 $('#assignId').val(employeeid).trigger('change');
                 $('#assignWork').modal('toggle');

             },
             complete:function(response){
               $(".preloader").hide();
             }
         })
        }
     });

 </script>
