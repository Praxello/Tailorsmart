 <!-- The Modal -->
 <div class="modal" id="styleModal">
     <div class="modal-dialog modal-lg">
         <div class="modal-content">

             <!-- Modal Header -->
             <div class="modal-header">
                 <h4 class="modal-title">Add Styles</h4>
             </div>
             <!-- Modal body -->
             <div class="modal-body" style="overflow-x: hidden;max-height: 500px;">
                 <div class="card">
                     <div class="card-body">
                         <input type="hidden" id="valFirst">
                         <div class="row">
                             <div class="table-responsive ">
                                 <table class="table table-bordered" id="firstStyle">
                                     <thead>
                                         <tr>
                                             <th style='display:none;'>Main Id</th>
                                             <th style='text-align:center;'>Style</th>
                                             <th style='text-align:center;'>Select multiple</th>
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
                                             <th style='display:none;'>Main Id</th>
                                             <th style='text-align:center;'>Style</th>
                                             <th style='text-align:center;'>Select single</th>
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
                                             <th style='display:none;'>Main Id</th>
                                             <th style='display:none;'>Sub Id</th>
                                             <th style='text-align:center;'>Style</th>
                                             <th style='text-align:center;'>Enter Value</th>
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
                 <button type="button" class="btn btn-danger btn-sm" id="cl" data-dismiss="modal">Close</button>
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

    $.ajax({
        url: api_url + 'createorderitemstyle.php',
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
            $('#cl').click();
        },
        complete:function(response){
          $(".preloader").hide();
        }
    })
});

function store_firstTblValues() {
    var TableData = new Array();
    var stitchstyleid = $('#valFirst').val();

    var tableControl = document.getElementById('firstStyle');
    $('input:checkbox:checked', tableControl).each(function(row) {
        TableData[row] = {
            "stitchstyleid": $(this).parent().prev().prev().text(),
            "stitchsubstyleid": $(this).val(),
            "value": 'yes'
        }
    });
    return TableData;
}

function store_secondTblValues() {
    var TableData = new Array();
    var tableControl = document.getElementById('secondStyle');
    $('input:radio:checked', tableControl).each(function(row) {
        TableData[row] = {
            "stitchstyleid": $(this).parent().prev().prev().text(),
            "stitchsubstyleid": $(this).val(),
            "value": 'yes'
        }
    });

    return TableData;
}

function store_thirdTblValues() {
    var TableData = new Array();
    var stitchstyleid = $('#valThird').val();
    var j = 0;
    $('#thirdStyle tr').each(function(row, tr) {
        if ($(tr).find('td:eq(1)').text() != '') {

            TableData[j] = {
                "stitchstyleid": $(tr).find('td:eq(0)').text(),
                "stitchsubstyleid": $(tr).find('td:eq(1)').text(),
                "value": $(tr).find('td:eq(3) input').val()
            }
            j++;
        }
    });
    //TableData.shift(); // first row will be empty - so remove
    return TableData;
}
 </script>
