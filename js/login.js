var api_url = "praxello.com/tailorsmart/admin/login.php";
$('#login').on('submit',function(event){
    event.preventDefault();
   var loginData = {
    usrname:$('#usrname').val(),
    passwrd:$('#passwrd').val()
   };
   $.ajax({
       url:api_url,
       type:'POST',
       data:loginData,
       dataType:'json',
       success:function(response){
           if(response.Data != null){
            var employeeId = response.Data.employeeId;
            window.location.href = 'createSession.php?employeeId='+employeeId;
           }else{
            alert('Enter Correct Username and password');
           }
       }
   })
});