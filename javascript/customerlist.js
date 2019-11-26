var styleData = new Map(); // This variable globally declare save all Style Data in Array

getstitchstyles();
function settabledata(styleData){
   // console.log(styleData);
  var html ='';
  $('#styletbl').dataTable().fnDestroy();
  $("#styletbldata").empty();
  for(let k of styleData.keys())
  {
        var AllData= styleData.get(k);
        // // let mapStitch = mapStitchStyle.get(AllData.stitchStyleType.toString());
        // // let isConfirmed = confirmationStatus.get(AllData.isActive);
        html +='<tr>';
        // let imageUrl = pic_url+'stitchstyle/300x300/'+k+'.jpg';
        // html +="<td><form id='custstyleform"+k+"' method='post' enctype='multipart/form-data'><input type='file' id='customerstylepic"+k+"' accept='image/*' style='display:none'/> <img class='img-thumbnail' src='"+imageUrl+"'  style='cursor: pointer' onclick='imguplod("+k+")' alt='No Image' id='save"+k+"' width='70px' height='70px' title='Upload Image'></img></form></td>";
        html +="<td>"+AllData.firstName+" "+AllData.lastName+"</td>";
        html +="<td>"+AllData.email+"</td>";
        html +="<td>"+AllData.mobile+"</td>";
        // html +="<td>"+AllData.stitchStyleDetails+"</td>";
        html +="<td>"+AllData.address+" "+AllData.city+" "+AllData.country+"</td>";
        // // html +="<td>"+isConfirmed+"</td>";
        // html +='<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Upload Image" onclick="imguplod('+k+')"><i class="fa fa-upload"></i></button><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+k+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removestitchStyle('+k+')"><i class="fa fa-remove"></i></button></div></td>';
        // html +="</tr>";
  }
  $("#styletbldata").html(html);
  $('#styletbl').DataTable({
  searching: true,
  retrieve: true,
  bPaginate: $('tbody tr').length>10,
  order: [],
  columnDefs: [ { orderable: false, targets: [] } ],
  dom: 'Bfrtip',
  buttons: [ 'copy', 'csv', 'excel', 'pdf', 'print' ],
  destroy: true
  });

}

// This function is created for Get All Style Data.
function getstitchstyles(){
  $('#styletbl').dataTable().fnDestroy();
  $("#styletbldata").empty();
     $.ajax({
         type: "GET",
         // crossDomain:true,
         url: api_url+"getcustomerlist.php",
         beforeSend: function() {
               $(".preloader").show();
               // console.log("before");
         },
         success: function(response) {
             var count;
            if(response['Data']!=null){
               count= response['Data'].length;
            }
            for(var i=0;i<count;i++)
            {
            styleData.set(response.Data[i].customerId,response.Data[i]);
            }
            settabledata(styleData);
         },
         complete:function(response){

           // console.log("after");
           $(".preloader").hide();
         }
     });
}
