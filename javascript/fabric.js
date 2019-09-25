var styleData = new Map(); // This variable globally declare save all Style Data in Array
let confirmationStatus = new Map();


getallcategory();
function getallcategory(){
  var html ='';
  $.ajax({
      type: "GET",
      url: api_url+"getallcategory.php",
      success: function(response) {
        var count;
         if(response['Data']!=null){
            count= response['Data'].length;
          }
        html +='<option value="">Select Category</option>';
        for (var i = 0; i < count; i++) {
        html +="<option value='"+response['Data'][i].categoryId+"'>"+response['Data'][i].categoryTitle+"</option>";
      }
        $("#fabriccategory").html(html);
      }
    });
}
$('#fabriccategory').select2({
  allowClear: true,
  placeholder: "Select Fabric Category"
});
$('#fabricPricevariable').select2({
  allowClear: true,
  placeholder: "Select Fabric Price Variable"
});
$('#fabricactivestatus').select2({
  allowClear: true,
  placeholder: "Select Fabric Status"
});
getConfirmation();
function getConfirmation() {
    confirmationStatus.set('0', '<span class="badge badge-pill badge-warning">InActive</span>');
    confirmationStatus.set('1', '<span class="badge badge-pill badge-primary">Active</span>');
}
function settabledata(styleData){
  // console.log(styleData);
  var html ='';
  $('#styletbl').dataTable().fnDestroy();
  $("#styletbldata").empty();
  for(let k of styleData.keys())
  {
        var AllData= styleData.get(k);
        let isConfirmed = confirmationStatus.get(AllData.isActive);
        html +='<tr>';
        let imageUrl = pic_url+'fabric/300x300/'+AllData.skuNo+'.jpg';
        html +="<td><form id='custstyleform"+AllData.skuNo+"' method='post' enctype='multipart/form-data'><input type='file' id='customerstylepic"+AllData.skuNo+"' accept='image/*' style='display:none'/> <img class='img-thumbnail' alt='No Image' src='"+imageUrl+"'  style='cursor: pointer' onclick='imguplod(\"" + AllData.skuNo + "\")'></img></form></td>";
        html +="<td>"+AllData.fabricTitle+"</td>";
        html +="<td>"+AllData.fabricBrand+"</td>";
        html +="<td>"+AllData.skuNo+"</td>";
        html +="<td>"+AllData.fabricDetails+"</td>";
        html +="<td>"+AllData.fabricPrice+"</td>";
        html +="<td>"+AllData.releaseDate+"</td>";
        html +="<td>"+isConfirmed+"</td>";
        html +='<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Upload Image" onclick="imguplod(\'' + AllData.skuNo + '\')"><i class="fa fa-upload"></i></button><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+k+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removeFabric('+k+')"><i class="fa fa-remove"></i></button></div></td>';
        html +="</tr>";
  }
  $("#styletbldata").html(html);
  $('#styletbl').DataTable({
  searching: true,
  retrieve: true,
  bPaginate: $('tbody tr').length>10,
  order: [],
  columnDefs: [ { orderable: false, targets: [0,1,2,3,4,5,6,7,8] } ],
  dom: 'Bfrtip',
  buttons: [],
  destroy: true
  });
}
getfabrics();

// This function is created for Get All Style Data.
function getfabrics(){
  $('#styletbl').dataTable().fnDestroy();
  $("#styletbldata").empty();
     $.ajax({
         type: "GET",
         url: api_url+"getfabrics.php",
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
            styleData.set(response.Data[i].fabricId,response.Data[i]);
            }
            settabledata(styleData);
         },
         complete:function(response){

           // console.log("after");
           $(".preloader").hide();
         }
     });
}
function imguplod(imgid){
   var triggerid=$('#customerstylepic'+imgid).trigger('click');
   var fileupload = document.getElementById('customerstylepic'+imgid);
   fileupload.onchange = function () {
                var customerstylepic = $('#customerstylepic'+imgid).val();
                var fd = new FormData();
                var files = $('#customerstylepic'+imgid)[0].files[0];
                fd.append('file',files);
                fd.append('imgname',imgid);
                fd.append('foldername',"fabric");
                $.ajax({
                     // url:"src/addimg.php",
                     url:img_url,
                     type:"POST",
                     contentType: false,
                     cache: false,
                     processData:false,
                     data: fd,
                     dataType:'json',
                     success:function(response){
                       swal(response['Message']);
                       getcustomerstyles();
                     }
              });
   };
}
// This function is created For Add Button New Style
function addStyle(){
   $("#customerstyletable").hide();
   $("#customerstyletableform").show();
   $("#fabricform").trigger("reset");
   $("#savebtncustomerstyle").show();
   $("#updatebtncustomerstyle").hide();
   $("#fabriccategory").val("").trigger('change');
   $("#fabricPricevariable").val("").trigger('change');
   $("#fabricactivestatus").val("").trigger('change');
}

// This function is created For Edit Button
function editStyle(id){
var AllData= styleData.get(id.toString());
$("#fabricid").val(AllData.fabricId);
$("#fabrictitle").val(AllData.fabricTitle);
$("#fabricbrand").val(AllData.fabricBrand);
$("#fabricdetail").val(AllData.fabricDetails);
$("#fabricprice").val(AllData.fabricPrice);
$("#skuno").val(AllData.skuNo);
$("#releasedate").val(AllData.releaseDate);
$("#hexcolor").val(AllData.hexColor);
$("#fabriccategory").val(AllData.categoryId).trigger('change');
$("#fabriccolorname").val(AllData.colorName);
$("#fabrictype").val(AllData.fabricType);
$("#fabricPricevariable").val(AllData.isPriceVariable).trigger('change');
$("#fabricactivestatus").val(AllData.isActive).trigger('change');
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
  var fabrictitle = $("#fabrictitle").val();
  var fabricbrand = $("#fabricbrand").val();
  var fabricdetail= $("#fabricdetail").val();
  var fabricprice = $("#fabricprice").val();
  var skuno = $("#skuno").val();
  var releasedate= $("#releasedate").val();
  var hexcolor = $("#hexcolor").val();
  var fabriccategory = $("#fabriccategory").val();
  var fabriccolorname= $("#fabriccolorname").val();
  var fabrictype = $("#fabrictype").val();
  var fabricPricevariable = $("#fabricPricevariable").val();
  var fabricactivestatus= $("#fabricactivestatus").val();
   // if(fabrictitle==""||fabricbrand==""||fabricdetail==""||fabricprice==""||skuno==""||releasedate==""||hexcolor==""||fabriccategory==""||fabriccolorname==""||fabrictype==""||fabricPricevariable==""||fabricactivestatus==""){
   //   swal("Parameter missing");
   // }
   // else{
     var obj ={
       categoryId:fabriccategory,
       colorName: fabriccolorname,
       fabricBrand:fabricbrand,
       fabricDetails: fabricdetail,
       fabricPrice: fabricprice,
       fabricTitle: fabrictitle,
       fabricType: fabrictype,
       hexColor: hexcolor,
       isActive: fabricactivestatus,
       isPriceVariable: fabricPricevariable,
       releaseDate: releasedate,
       skuNo: skuno
     }
     $.ajax({
         url:api_url+'createfabric.php',
         type:'POST',
         data:obj,
         dataType:'json',
         beforeSend: function() {
               $(".preloader").show();
               // console.log("before");
         },
         success:function(response){
           if(response.Responsecode===200){
                 swal(response.Message);

                 $("#customerstyletable").show();
                 $("#customerstyletableform").hide();
                 obj.fabricId = response.RowId.toString();
                 styleData.set(response.RowId.toString(),obj);
                 settabledata(styleData);
           }
           else {
             swal(response.Message);
           }
         },
         complete:function(response){

           // console.log("after");
           $(".preloader").hide();
         }
     });
   // }
});

// This function is created For Update Style Data
$('#updatebtncustomerstyle').on('click',function(event){
  event.preventDefault();
  var fabricid= $("#fabricid").val();
  var fabrictitle = $("#fabrictitle").val();
  var fabricbrand = $("#fabricbrand").val();
  var fabricdetail= $("#fabricdetail").val();
  var fabricprice = $("#fabricprice").val();
  var skuno = $("#skuno").val();
  var releasedate= $("#releasedate").val();
  // alert(releasedate);
  var hexcolor = $("#hexcolor").val();
  var fabriccategory = $("#fabriccategory").val();
  var fabriccolorname= $("#fabriccolorname").val();
  var fabrictype = $("#fabrictype").val();
  var fabricPricevariable = $("#fabricPricevariable").val();
  var fabricactivestatus= $("#fabricactivestatus").val();
  // if(fabricid==""||fabrictitle==""||fabricbrand==""||fabricdetail==""||fabricprice==""||skuno==""||releasedate==""||hexcolor==""||fabriccategory==""||fabriccolorname==""||fabrictype==""||fabricPricevariable==""||fabricactivestatus==""){
  //   swal("Parameter missing");
  // }
  // else{
    var obj ={
      categoryId:fabriccategory,
      colorName: fabriccolorname,
      fabricBrand:fabricbrand,
      fabricDetails: fabricdetail,
      fabricId: fabricid,
      fabricPrice: fabricprice,
      fabricTitle: fabrictitle,
      fabricType: fabrictype,
      hexColor: hexcolor,
      isActive: fabricactivestatus,
      isPriceVariable: fabricPricevariable,
      releaseDate: releasedate,
      skuNo: skuno
    }
  $.ajax({
      url:api_url+'editfabric.php',
      type:'POST',
      data:obj,
      dataType:'json',
      beforeSend: function() {
            $(".preloader").show();
            // console.log("before");
      },
      success:function(response){
        if(response.Responsecode===200){
              swal(response.Message);

              $("#customerstyletable").show();
              $("#customerstyletableform").hide();
              styleData.set(fabricid.toString(),obj);
              settabledata(styleData);
        }
        else {
          swal(response.Message);
        }
      },
      complete:function(response){

        // console.log("after");
        $(".preloader").hide();
      }
  });
// }
});

// This function is created For Remove Button
function removeFabric(id){
  $.ajax({
      url:api_url+'deletefabric.php',
      type:'POST',
      data:{
        fabricId:id
      },
      dataType:'json',
      beforeSend: function() {
            $(".preloader").show();
            // console.log("before");
      },
      success:function(response){

          if(response.Responsecode===200){
                swal(response.Message);
                // getfabrics();
                $("#customerstyletable").show();
                $("#customerstyletableform").hide();
                styleData.delete(id.toString());
                settabledata(styleData);
          }
          else {
            swal(response.Message);
          }

      },
      complete:function(response){

        // console.log("after");
        $(".preloader").hide();
      }
  });
}
