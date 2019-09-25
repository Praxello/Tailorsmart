//var api_url = "http://praxello.com/tailorsmart/admin/";
//var api_url = './admin/';


$('#login').on('submit', function(event) {
    event.preventDefault();
    var loginData = {
        usrname: $('#usrname').val(),
        passwrd: $('#passwrd').val()
    };
    $.ajax({
        url: api_url + 'login.php',
        type: 'POST',
        data: loginData,
        dataType: 'json',
        // beforeSend: function() {
        //     $(".preloader").show();
        // },
        success: function(response) {
          console.log(response);
            if (response.Data != null) {
                var employeeId = response.Data.employeeId;
                var employeeName = response.Data.firstName + ' ' + response.Data.lastName;
              window.location.href = 'createSession.php?employeeId=' + employeeId + '&employeeName=' + employeeName;
            } else {
                alert('Enter Correct Username and password');
            }
        }
        // ,
        // complete: function(response) {
        //     $(".preloader").hide();
        // }
    });
});
