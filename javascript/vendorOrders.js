getallorders();
// This function is created for Get All Customer Orders
function getallorders() {
    $('#customerordertbl').dataTable().fnDestroy();
    $("#customerordertbldata").empty();
    var empId = $('#empId').val();
    $.ajax({
        type: "POST",
        url: api_url + "getVendorOrderslist.php",
        data: { ownerId: empId },
        beforeSend: function() {
            $(".preloader").show();
        },
        success: function(response) {
            var count;
            var responseData = "";
            if (response.Data != null) {
                count = response.Data.length;
                for (var i = 0; i < count; i++) {
                    var quantity = 0;
                    if (response.Data[i].orderItems != null) {
                        quantity = response.Data[i].orderItems.length;
                    }
                    responseData += "<tr>";
                    responseData += "<td>" + (i + 1) + "</td>";
                    responseData += "<td><strong>" + response.Data[i].OrderDetails.productTitle + "</strong></td>";
                    responseData += "<td>" + response.Data[i].OrderDetails.productSubTitle + "</td>";
                    responseData += "<td>" + quantity + "</td>";
                    responseData += "<td><button class='btn btn-success btn-sm' data-toggle='tooltip' data-placement='top' title='Edit'><i class='fa fa-edit'></i></button></td>";
                    responseData += "</tr>";
                }
            }
            $("#customerordertbldata").html(responseData);
            table = $('#customerordertbl').DataTable({
                searching: true,
                retrieve: true,
                bPaginate: $('tbody tr').length > 10,
                order: [],
                columnDefs: [{ orderable: false, targets: [0, 1, 2, 3, 4] }],
                dom: 'Bfrtip',
                buttons: [],
                destroy: true
            });
        },
        complete: function(response) {
            $(".preloader").hide();
        }
    });
}