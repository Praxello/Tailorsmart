var EmployeeData = new Map();//from getallstaff.php names only
var RoleData = new Map();//from getmiscellaneousdata.php names only
getalluserrights();
getcustomerstyles();


$('#userrole').select2({
  allowClear: true,
  placeholder: "Select User Roles"
});
$('#stylestatus').select2({
  allowClear: true,
  placeholder: "Select Style Status"
});

function getalluserrights(){
    var userrole ='';
     $.ajax({
         type: "GET",
         url: api_url+"getuserrights.php",
         beforeSend: function() {
               $(".preloader").show();
               // console.log("before");
         },
         success: function(response) {
           var count=0;
            if(response['Data']!=null){
               count= response['Data'].length;
            }
            userrole +="<option value=''>Select User Roles</option>";
            for(var i=0;i<count;i++){
               RoleData.set(response.Data[i].roleId,response.Data[i]);
               userrole +="<option value='"+response.Data[i].roleId+"'>"+response.Data[i].roleName+"</option>";
            }
            // console.log(RoleData);
            $("#userrole").html(userrole);
         },
         complete:function(response){

           // console.log("after");
           $(".preloader").hide();
         }
     });
}

function  setemployeemaster(EmployeeData){
   // console.log(EmployeeData);
  var html ;
  $('#employeetbl').dataTable().fnDestroy();
  $("#employeetbldata").empty();
  for(let k of EmployeeData.keys())
  {
        var EmpData= EmployeeData.get(k);
        var RoleName = RoleData.get(EmpData.roleId);
        html +="<tr>";
        html +="<td>"+EmpData.firstName+" "+EmpData.lastName+"</td>";
        html +="<td>"+EmpData.email+"</td>";
        html +="<td>"+EmpData.mobile+"</td>";
        html +="<td>"+RoleName.roleName+"</td>";
        html +="<td>"+EmpData.address+"</td>";
        html +="<td>"+EmpData.password+"</td>";

        if(EmpData.isActive==1)
        {
              html +='<td style="width:10%" ><span class="badge badge-pill badge-primary">Active</span></td>';
        }
        else
        {
              html +='<td style="width:10%"><span class="badge badge-pill badge-warning">InActive</span></td>';
        }
        html +='<td style="width:10%"><div class="btn-group" role="group" aria-label="Basic Example">';
        html +='<button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+k+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removeStyle('+k+')"><i class="fa fa-remove"></i></button></div></td>';

        html +="</tr>";
  }

 $("#employeetbldata").html(html);
 $('#employeetbl').DataTable({
 searching: true,
 retrieve: true,
 bPaginate: $('tbody tr').length>10,
 order: [],
 columnDefs: [ { orderable: false, targets: [0,1,2,3,4,5,6,7] } ],
 dom: 'Bfrtip',
 buttons: [],
 destroy: true
 });
}


function getcustomerstyles(){
  $('#employeetbl').dataTable().fnDestroy();
  $("#employeetbldata").empty();
     $.ajax({
         type: "GET",
         url: api_url+"getallstaff.php",
         beforeSend: function() {
               $(".preloader").show();
               // console.log("before");
         },
         success: function(response) {
           var count;
            if(response['Data']!=null){
               count= response['Data'].length;
                // styleData=[...response['Data']];
            }
            var html ;
            for(var i=0;i<count;i++)
            {
            EmployeeData.set(response.Data[i].employeeId,response.Data[i]);
            }
            setemployeemaster(EmployeeData);
         },
         complete:function(response){

           // console.log("after");
           $(".preloader").hide();
         }
     });
}

// This function is created For Add Button New Style
function addStyle(){
  $("#customerstyletable").hide();
  $("#customerstyletableform").show();
  $("#firstname").val("");
  $("#lastname").val("");
  $("#userrole").val("").trigger('change');
  $("#email").val("");
  $("#mobileno").val("");
  $("#city").val("");
  $("#state").val("");
  $("#address").val("");
  $("#birthdate").val("");
  $("#adharid").val("");
  $("#password").val("");
  $("#stylestatus").val("").trigger('change');
  $("#savebtncustomerstyle").show();
  $("#updatebtncustomerstyle").hide();
}

function editStyle(id){
var EmpData= EmployeeData.get(id.toString());
$("#empid").val(EmpData.employeeId);
$("#firstname").val(EmpData.firstName);
$("#lastname").val(EmpData.lastName);
$("#userrole").val(EmpData.roleId).trigger('change');
$("#email").val(EmpData.email);
$("#mobileno").val(EmpData.mobile);
$("#city").val(EmpData.city);
$("#state").val(EmpData.state);
$("#address").val(EmpData.address);
$("#birthdate").val(EmpData.birthDate);
$("#adharid").val(EmpData.adharId);
$("#password").val(EmpData.password);
$("#stylestatus").val(EmpData.isActive).trigger('change');
$("#customerstyletable").hide();
$("#customerstyletableform").show();
$("#savebtncustomerstyle").hide();
$("#updatebtncustomerstyle").show();
}

// This function is created For Refresh Action / Backbutton
$('#reloadbtn').on('click',function(event){
  event.preventDefault();
  $("#customerstyletable").show();
  $("#customerstyletableform").hide();
  $("#savebtncustomerstyle").show();
  $("#updatebtncustomerstyle").hide();
});

// This function is created For Save Style Data
$('#savebtncustomerstyle').on('click',function(event){
    event.preventDefault();
  var firstname =$("#firstname").val();
  var lastname =$("#lastname").val();
  var userrole =$("#userrole").val();
  var email =$("#email").val();
  var mobileno =$("#mobileno").val();
  var city =$("#city").val();
  var state =$("#state").val();
  var address =$("#address").val();
  var birthdate =$("#birthdate").val();
  var adharid =$("#adharid").val();
  var password =$("#password").val();
  var stylestatus =$("#stylestatus").val();
  if(stylestatus==""){
    stylestatus=0;
  }
  if(firstname===""||lastname===""||userrole===""||email===""||mobileno===""||city===""||state===""||address===""||password===""){
    swal("Parameter Missing");
  }
  else{



  var obj = {
    address: address,
    adharId: adharid,
    birthDate:birthdate,
    city: city,
    state:state,
    email: email,
    firstName: firstname,
    isActive:stylestatus,
    lastName: lastname,
    mobile: mobileno,
    password: password,
    roleId:userrole
  };
  $.ajax({
        url:api_url+'createstaff.php',
        type:'POST',
        data:obj,
        dataType:'json',
        beforeSend: function() {
              $(".preloader").show();
              // console.log("before");
        },
        success:function(response){

            if(response.Responsecode==200){
              $("#customerstyletable").show();
              $("#customerstyletableform").hide();
              swal(response.Message);
              obj.employeeId = response.RowId.toString();
              EmployeeData.set(response.RowId.toString(),obj);
              setemployeemaster(EmployeeData);
            }
            else{
              swal(response.Message);
            }
        },
        complete:function(response){

          // console.log("after");
          $(".preloader").hide();
        }
    });
  }
});

// This function is created For Update Style Data
$('#updatebtncustomerstyle').on('click',function(event){
  event.preventDefault();
  var empId =$("#empid").val();
  var firstname =$("#firstname").val();
  var lastname =$("#lastname").val();
  var userrole =$("#userrole").val();
  var email =$("#email").val();
  var mobileno =$("#mobileno").val();
  var city =$("#city").val();
  var state =$("#state").val();
  var address =$("#address").val();
  var birthdate =$("#birthdate").val();
  var adharid =$("#adharid").val();
  var password =$("#password").val();
  var stylestatus =$("#stylestatus").val();
  event.preventDefault();
  if(firstname===""||lastname===""||userrole===""||email===""||mobileno===""||city===""||state===""||address===""||password===""){
    swal("Parameter Missing");
  }
  else{
  var obj = {
    employeeId:empId,
    address: address,
    adharId: adharid,
    birthDate:birthdate,
    city: city,
    state:state,
    email: email,
    firstName: firstname,
    isActive:stylestatus,
    lastName: lastname,
    mobile: mobileno,
    password: password,
    roleId:userrole
  };
  $.ajax({
      url:api_url+'editstaff.php',
      type:'POST',
      data:obj,
      dataType:'json',
      beforeSend: function() {
            $(".preloader").show();
            // console.log("before");
      },
      success:function(response){

            if(response.Responsecode==200){
          $("#customerstyletable").show();
          $("#customerstyletableform").hide();

            EmployeeData.set(empId,obj);
            setemployeemaster(EmployeeData);
             swal(response.Message);
           }
           else{
             swal(response.Message);
           }
      },
      complete:function(response){

        // console.log("after");
        $(".preloader").hide();
      }
  });
}
});

// This function is created For Remove Button
function removeStyle(id){
  $.ajax({
      url:api_url+'deleteemp.php',
      type:'POST',
      data:{
        employeeId:id
      },
      dataType:'json',
      beforeSend: function() {
            $(".preloader").show();
            // console.log("before");
      },
      success:function(response){
        if(response.Responsecode==200){
          $("#customerstyletable").show();
          $("#customerstyletableform").hide();
          EmployeeData.delete(id.toString());
          setemployeemaster(EmployeeData);
          swal(response.Message);
        }
        else{
          swal(response.Message);
        }
      },
      complete:function(response){

        // console.log("after");
        $(".preloader").hide();
      }
  });
}
