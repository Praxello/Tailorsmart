function getpushnotification(customerid, msg) {
    // console.log(customerId_g);

    $.ajax({
        url: api_url + 'sendpushnotification.php',
        type: 'POST',
        data: {
            customerid: customerid,
            message: msg
        },
        beforeSend: function() {
            $(".preloader").show();
        },
        success: function(response) {
            console.log(response);
        },
        complete: function(response) {
            $(".preloader").hide();
        }
    });
}