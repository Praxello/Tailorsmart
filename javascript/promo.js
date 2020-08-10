var promocodes = new Map();//from getallstaff.php names only
loadPromos();
function loadPromos(){
  var html ='';
  $.ajax({
      type: "POST",
      url: api_url+"getAllPromocodes.php",
      beforeSend: function() {
            $(".preloader").show();
      },
      dataType:'json',
      success: function(response) {
        var count=0;
        if(response.Data!=null){
           count= response.Data.length;
        }
        for(var i=0;i<count;i++)
        {
            promocodes.set(response.Data[i].promoId,response.Data[i]);
        }
      },
      complete:function(response){
        setPromos(promocodes);
        $(".preloader").hide();
      }
    });
}
function setPromos(promocodes){
  var html ='';
  console.log(promocodes);
  $('#slottbl').dataTable().fnDestroy();
  $("#slottbldata").empty();
  for(let k of promocodes.keys())
  {
        var HoliData= promocodes.get(k);
        html +="<tr>";
        html +="<td>"+HoliData.code+"</td>";
        html +="<td>"+HoliData.startDate+"</td>";
        html +="<td>"+HoliData.endDate+"</td>";
        html +='<td style="width:10%"><div class="btn-group" role="group" aria-label="Basic Example">';
        html +='<button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+k+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removeStyle('+k+')"><i class="fa fa-remove"></i></button></div></td>';
        html +="</tr>";
  }
  $("#slottbldata").html(html);
  $('#slottbl').DataTable({
  searching: true,
  retrieve: true,
  bPaginate: $('tbody tr').length>10,
  order: [],
  columnDefs: [{ orderable: false, targets: [0,1,2,3]}],
  dom: 'Bfrtip',
  buttons: [],
  destroy: true
  });

}


// This function is created For Add Button New Style
function addStyle(){
  $("#customerstyletable").hide();
  $("#customerstyletableform").show();
  $("#promocode").val("");
  $("#startdate").val("");
  $("#enddate").val("");
  $("#savebtncustomerstyle").show();
  $("#updatebtncustomerstyle").hide();
}

// This function is created For Edit Button
function editStyle(id){
var HoliData=promocodes.get(id.toString());
$("#promoId").val(HoliData.promoId);
$("#promocode").val(HoliData.code);
$("#startdate").val(HoliData.startDate);
$("#enddate").val(HoliData.endDate);
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
  var code = $("#promocode").val();
  var startDate = $("#startdate").val();
  var endDate = $("#enddate").val();
  if(promocode===""||startDate===""||endDate===""){
    swal("Parameter Missing");
  }
  else {
    var obj = {
        code:code,
      startDate:startDate,
      endDate:endDate
      };
      $.ajax({
          url:api_url+'addPromo.php',
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
                obj.promoId = response.RowId;
                promocodes.set(response.RowId.toString(),obj);
                setPromos(promocodes);
              }
              else{
                swal(response.Message);
                //swal("Please Retry Again");
              }
          },
          complete:function(response){
            $(".preloader").hide();
            // console.log("after");
          }
      });
  }

});

//This function is created For Update Style Data
$('#updatebtncustomerstyle').on('click',function(event){
  event.preventDefault();
  var promoId = $("#promoId").val();
  var promocode = $("#promocode").val();
  var startDate = $("#startdate").val();
  var endDate = $("#enddate").val();
  var obj = {
    promoId: promoId,
    code:promocode,
    startDate:startDate,
    endDate:endDate
    };
    if(promocode===""||startDate===""||endDate===""){
      swal("Parameter Missing");
    }
    else {
  $.ajax({
      url:api_url+'updatePromo.php',
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
          promocodes.set(promoId,obj);
           swal(response.Message);
           setPromos(promocodes);
           }
           else{
              swal(response.Message);
             //swal("Please Retry Again");
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
      url:api_url+'removePromo.php',
      type:'POST',
      data:{
        promoId:id
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
          promocodes.delete(id.toString());
          setPromos(promocodes);
          swal(response.Message);
        }
        else{
          swal(response.Message);
           // swal("Slot Already Used Can't Delete");
        }
      },
      complete:function(response){

        // console.log("after");
        $(".preloader").hide();
      }
  });
}
