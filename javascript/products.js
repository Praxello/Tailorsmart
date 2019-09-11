var api_url = 'http://praxello.com/tailorsmart/admin/';
var pic_url = 'http://praxello.com/tailorsmart/mobileimages/';
getproductdata();
getmiscellaneousdata();
getmeasurementitems();
getstitchstyleitem();
getallfabricdata();

$('#stylestatus').select2({
  allowClear: true,
  placeholder: "Select Style Status"
});
$('#owner').select2({
  allowClear: true,
  placeholder: "Select Owner"
});
$('#parent').select2({
  allowClear: true,
  placeholder: "Select Parent"
});

$('#category').select2({
  allowClear: true,
  placeholder: "Select Category"
});
$('#pricevariable').select2({
  allowClear: true,
  placeholder: "Select Price Variable"
});
var styleData = []; // This variable globally declare save all Style Data in Array
var measurementData = [];
var stitchstyleitemData = [];
var allfabricData =[];
$(document).ready(function() {

});


function getmiscellaneousdata(){
  var selectowner ='',selectparent='',selectcategory='';
  // console.log(api_url);
  $.ajax({
      type: "GET",
      url: api_url+'getmiscellaneousdata.php',
      success: function(response) {

        var countowner= response['Employee'].length;
        selectowner +='<option value="">Select Owner</option>';
        for (var i = 0; i < countowner; i++) {
        selectowner +="<option value='"+response['Employee'][i].employeeId+"'>"+response['Employee'][i].firstName+"</option>";
        }
        $("#owner").html(selectowner);

        var countparent= response['ParentProducts'].length;
        selectparent +='<option value="">Select Parent</option>';
        for (var i = 0; i < countparent; i++) {
        selectparent +="<option value='"+response['ParentProducts'][i].parentId+"'>"+response['ParentProducts'][i].styleTitle+"-"+response['ParentProducts'][i].subStyleTitle+"</option>";
        }
        $("#parent").html(selectparent);

        var countparent= response['Categories'].length;
        selectcategory +='<option value="">Select Category</option>';
        for (var i = 0; i < countparent; i++) {
        selectcategory +="<option value='"+response['Categories'][i].categoryId+"'>"+response['Categories'][i].categoryTitle+"</option>";
        }
        $("#category").html(selectcategory);
      }
    });
}

function getmeasurementitems(){
  var html ='';
  $.ajax({
      type: "GET",
      url: api_url+"getmeasurementitems.php",
      success: function(response) {
        var count= response['Data'].length;
        for(var i=0;i<count;i++){
            measurementData.push(response['Data'][i]);
        }
      }
    });
}

function getstitchstyleitem(){
  var html ='';
  $.ajax({
      type: "GET",
      url: api_url+"getstitchstyleitem.php",
      success: function(response) {
        var count= response['Data'].length;
        for(var i=0;i<count;i++){
            stitchstyleitemData.push(response['Data'][i]);
        }
      }
    });
}

function getallfabricdata(){
  var html ='';
  $.ajax({
      type: "GET",
      url: api_url+"getfabrics.php",
      success: function(response) {
        var count= response['Data'].length;
        for(var i=0;i<count;i++){
            allfabricData.push(response['Data'][i]);
        }
      }
    });
}


// This function is created for Get All Style Data.
function getproductdata(){
  $('#styletbl').dataTable().fnDestroy();
  $("#styletbldata").empty();
     $.ajax({
         type: "GET",
         url: api_url+"getallproducts.php",
         success: function(response) {
           // alert(response);
           var count= response['Data'].length;
            var html ="<tr>";
            for (var i = 0; i < count; i++) {
                styleData.push(response['Data'][i]);
                html +="<td>"+(i+1)+"</td>";
                html +="<td><form id='custstyleform"+response['Data'][i].productId+"' method='post' enctype='multipart/form-data'><input type='file' id='customerstylepic"+response['Data'][i].productId+"' name='file' accept='image/*' style='display:none;' /> <img  accept='image/*' class='img-thumbnail' src='"+pic_url+"product/"+response['Data'][i].productId+".jpg' width='20%' height='20%' style='cursor: pointer' onclick='imguplod("+response['Data'][i].productId+")'></img></form></td>";
                // html +='<td><div class="content"><form action="./src/uploadeventgallary.php" class="dropzone" id="myAwesomeDropzone">';
                // html +='<input type="hidden" id="eventgallery" name="eventgallery" />';
                // html +='</form></div></td>';
                html +="<td>"+response['Data'][i].productTitle+"</td>";
                html +="<td>"+response['Data'][i].productSubTitle+"</td>";
                html +="<td>"+response['Data'][i].parentId+"</td>";
                html +="<td>"+response['Data'][i].skuNo+"</td>";
                html +="<td>"+response['Data'][i].price+"</td>";
                html +="<td>"+response['Data'][i].releaseDate+"</td>";
                html +="<td>"+response['Data'][i].sequenceNo+"</td>";
                if(response['Data'][i].isActive==1){
                  html +='<td><span class="badge badge-pill badge-primary">Active</span></td>';
                }
                else {
                  html +='<td><span class="badge badge-pill badge-warning">InActive</span></td>';
                }
                html +='<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+i+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removeProduct('+response['Data'][i].productId+')"><i class="fa fa-remove"></i></button></div></td>';
                html +="  </tr>";
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
     });
}

//This function is useful for upload the image files
function imguplod(imgid){
   var triggerid=$('#customerstylepic'+imgid).trigger('click');
   var fileupload = document.getElementById('customerstylepic'+imgid);
   fileupload.onchange = function () {
                var customerstylepic = $('#customerstylepic'+imgid).val();
                var fd = new FormData();
                var files = $('#customerstylepic'+imgid)[0].files[0];
                fd.append('file',files);
                fd.append('imgname',imgid);
                fd.append('foldername',"product");
                $.ajax({
                     url:"src/addimg.php",
                     type:"POST",
                     contentType: false,
                     cache: false,
                     processData:false,
                     data: fd,
                     success:function(response){
                       // alert(response);
                       window.location.reload();
                     }
              });
   };
}
// This function is created For Add Button New Style
function addStyle(){
  $("#customerstyletable").hide();
  $("#customerstyletableform").show();
  $("#productform").trigger("reset");
  $("#hidenavtab").hide();
}

// This function is created For Edit Button
function editStyle(id){
$("#hidenavtab").show();
$("#productId").val(styleData[id].productId);
$("#producttitle").val(styleData[id].productTitle);
$("#productsubtitle").val(styleData[id].productSubTitle);
$("#productdetials").val(styleData[id].productDetails);
$("#owner").val(styleData[id].ownerId).trigger('change');
$("#productsequenceno").val(styleData[id].sequenceNo);
$("#parent").val(styleData[id].parentId).trigger('change');
$("#skuno").val(styleData[id].skuNo);
$("#releasedate").val(styleData[id].releaseDate);
$("#category").val(styleData[id].categoryId).trigger('change');
$("#price").val(styleData[id].price);
$("#pricevariable").val(styleData[id].isPriceVariable).trigger('change');
$("#stylestatus").val(styleData[id].isActive).trigger('change');
$("#customerstyletable").hide();
$("#customerstyletableform").show();
$("#savebtnproducts").hide();
$("#updatebtnproducts").show();
}

// This function is created For Remove Button
function removeProduct(id){
  $.ajax({
      url:api_url+'deleteproduct.php',
      type:'POST',
      data:{
        productId:id
      },
      dataType:'json',
      success:function(response){
          swal(response.Message);
          window.location.reload();
      }
  });
}

// This function is created For Refresh Action / Backbutton
function reload(){
  window.location.reload();
}

// This function is created For Save Style Data
$('#savebtnproducts').on('click',function(event){
  event.preventDefault();
  var producttitle = $("#producttitle").val();
  var productsubtitle = $("#productsubtitle").val();
  var productdetials= $("#productdetials").val();
  var owner = $("#owner").val();
  var productsequenceno = $("#productsequenceno").val();
  var parent= $("#parent").val();
  var skuno = $("#skuno").val();
  var releasedate = $("#releasedate").val();
  var category= $("#category").val();
  var price = $("#price").val();
  var pricevariable = $("#pricevariable").val();
  var stylestatus= $("#stylestatus").val();
    $.ajax({
        url:api_url+'createproduct.php',
        type:'POST',
        data:{
          producttitle:producttitle,
          productsubtitle:productsubtitle,
          productdetails:productdetials,
          ownerid:owner,
          sequenceno:productsequenceno,
          releasedate:releasedate,
          categoryid:category,
          price:price,
          ispricevariable:pricevariable,
          active:stylestatus,
          parentid :parent,
          skuno : skuno
        },
        dataType:'json',
        success:function(response){
            swal(response.Message);
            window.location.reload();
        }
    });


});

// This function is created For Update Style Data
$('#updatebtnproducts').on('click',function(event){
  event.preventDefault();
  var productId= $("#productId").val();
  var producttitle = $("#producttitle").val();
  var productsubtitle = $("#productsubtitle").val();
  var productdetials= $("#productdetials").val();
  var owner = $("#owner").val();
  var productsequenceno = $("#productsequenceno").val();
  var parent= $("#parent").val();
  var skuno = $("#skuno").val();
  var releasedate = $("#releasedate").val();
  var category= $("#category").val();
  var price = $("#price").val();
  var pricevariable = $("#pricevariable").val();
  var stylestatus= $("#stylestatus").val();

  $.ajax({
      url:api_url+'editproduct.php',
      type:'POST',
      data:{
        productid : productId,
        producttitle:producttitle,
        productsubtitle:productsubtitle,
        productdetails:productdetials,
        ownerid:owner,
        sequenceno:productsequenceno,
        releasedate:releasedate,
        categoryid:category,
        price:price,
        ispricevariable:pricevariable,
        active:stylestatus,
        parentid :parent,
        skuno : skuno
      },
      dataType:'json',
      success:function(response){
          swal(response.Message);
          // window.location.reload();
      }
  });
});

// This function Display Product Fabric Mapping Table Data
function fabricmapping(){
  $('#fabricmaptbl').dataTable().fnDestroy();
  $("#fabricmaptbldata").empty();
    var productId= $("#productId").val();
    var selfabricmap='',unselfabricmap='',fabricmap='';
      $.ajax({
          type: "GET",
          url: api_url+"getproductfabricmapping.php",
          success: function(response) {
            var temparray = [];
            if(response['Data']==null){

            }
            else
            {
              var count= response['Data'].length;
              for (var i = 0; i < count; i++) {
              if(response['Data'][i].productId===productId){
                   temparray.push(response['Data'][i].fabricId);
              }
              }
            }


            var allfabricDatacount =allfabricData.length;
            for(var j=0;j<allfabricDatacount;j++)
            {
                if(temparray.includes(allfabricData[j].fabricId)){
                    selfabricmap +='<tr><td><label class="checkbox" >';
                    selfabricmap +='<input id="check'+allfabricData[j].fabricId+'" type="checkbox" name="fabricmapcheck"  value="'+allfabricData[j].fabricId+'" checked>';
                    selfabricmap +='</label></td>';
                    selfabricmap +="<td> <img class='img-thumbnail' src='"+pic_url+"fabric/"+allfabricData[j].fabricId+".jpg' width='10%' height='10%' checked></img></td>";
                    selfabricmap +="<td>"+allfabricData[j].fabricTitle+"</td>";
                    selfabricmap +="<td>"+allfabricData[j].skuNo+"</td></tr>";

                }
                else {
                    unselfabricmap +='<tr><td><label class="checkbox" >';
                    unselfabricmap +='<input id="check'+allfabricData[j].fabricId+'" type="checkbox" name="fabricmapcheck" value="'+allfabricData[j].fabricId+'" >';
                    unselfabricmap +='</label></td>';
                    unselfabricmap +="<td> <img class='img-thumbnail' src='"+pic_url+"fabric/"+allfabricData[j].fabricId+".jpg' width='10%' height='10%'></img></td>";
                    unselfabricmap +="<td>"+allfabricData[j].fabricTitle+"</td>";
                    unselfabricmap +="<td>"+allfabricData[j].skuNo+"</td></tr>";
                }
            }
            fabricmap +=selfabricmap;
            fabricmap +=unselfabricmap;

            $("#fabricmaptbldata").html(fabricmap);
            $('#fabricmaptbl').DataTable({
            searching: true,
            retrieve: true,
            bPaginate: $('tbody tr').length>10,
            order: [],
            columnDefs: [ { orderable: false, targets: [0,1,2,3] } ],
            dom: 'Bfrtip',
            buttons: [],
            destroy: true
            });
          }
        });
}
// This function Display Product Measurement Mapping Table Data
function measurementmapping(){
  $('#measurementmaptbl').dataTable().fnDestroy();
  $("#measurementmaptbldata").empty();
    var productId= $("#productId").val();
    var selmeasurement='',unselmeasurement='',measurementhtml='';
      $.ajax({
          type: "GET",
          url: api_url+"getproductmeasurementmapping.php",
          success: function(response) {

            var tempmeasurementarray = [];
            if(response['Data']==null){

            }
            else
            {
              var count= response['Data'].length;
              for (var i = 0; i < count; i++) {
              if(response['Data'][i].productId===productId){
                  tempmeasurementarray.push(response['Data'][i].measurementId);
              }
              }
            }
            var measurementDatacount =measurementData.length;
            // console.log(measurementData);
            for(var j=0;j<measurementDatacount;j++)
            {
                if(tempmeasurementarray.includes(measurementData[j].measurementId)){
                  // alert(measurementData[j].measurementId);
                  selmeasurement +='<tr><td><label class="checkbox" >';
                  selmeasurement +='<input id="check'+measurementData[j].measurementId+'" type="checkbox"  name="measurementcheck" value="'+measurementData[j].measurementId+'" checked>';
                  selmeasurement +='</label></td>';
                  selmeasurement +="<td>"+measurementData[j].itemTitle+"</td></tr>";
                }
                else {
                  unselmeasurement +='<tr><td><label class="checkbox" >';
                  unselmeasurement +='<input id="check'+measurementData[j].measurementId+'" type="checkbox" name="measurementcheck" value="'+measurementData[j].measurementId+'">';
                  unselmeasurement +='</label></td>';
                  unselmeasurement +="<td>"+measurementData[j].itemTitle+"</td></tr>";
                }
            }
            measurementhtml += selmeasurement;
            measurementhtml += unselmeasurement;
            $("#measurementmaptbldata").html(measurementhtml);
            // $("#measurementmaptbldata").append(unselmeasurement);
            $('#measurementmaptbl').DataTable({
            searching: true,
            retrieve: true,
            bPaginate: $('tbody tr').length>10,
            order: [],
            columnDefs: [ { orderable: false, targets: [] } ],
            dom: 'Bfrtip',
            buttons: [],
            destroy: true
            });
          }
        });
}

// This function Display Product Stitvh Style Mapping Table Data
function stitchstylemapping(){
  $('#stitchstylemaptbl').dataTable().fnDestroy();
  $("#stitchstylemaptbldata").empty();
    var productId= $("#productId").val();
    var selstitchhtml='',unstitchhtml='',stitchhtml='';
      $.ajax({
          type: "GET",
          url: api_url+"getproductstitchstylemapping.php",
          success: function(response) {

            var tempstitcharray = [];
            if(response['Data']==null){

            }
            else
            {
              var count= response['Data'].length;
              for (var i = 0; i < count; i++) {
              if(response['Data'][i].productId===productId){
              tempstitcharray.push(response['Data'][i].stitchStyleId);
              }
              }
            }
              var stitchstyleitemDatacount =stitchstyleitemData.length;

            for(var j=0;j<stitchstyleitemDatacount;j++)
            {
                if(tempstitcharray.includes(stitchstyleitemData[j].stitchStyleId)){
                  // alert(measurementData[j].measurementId);
                  selstitchhtml +='<tr><td><label class="checkbox" >';
                  selstitchhtml +='<input id="check'+stitchstyleitemData[j].stitchStyleId+'" type="checkbox" name="stitchstyleitemcheck" value="'+stitchstyleitemData[j].stitchStyleId+'" checked>';
                  selstitchhtml +='</label></td>';
                  selstitchhtml +="<td>"+stitchstyleitemData[j].stitchStyleTitle+"</td></tr>";
                }
                else {
                  unstitchhtml +='<tr><td><label class="checkbox" >';
                  unstitchhtml +='<input id="check'+stitchstyleitemData[j].stitchStyleId+'" type="checkbox" name="stitchstyleitemcheck" value="'+stitchstyleitemData[j].stitchStyleId+'" >';
                  unstitchhtml +='</label></td>';
                  unstitchhtml +="<td>"+stitchstyleitemData[j].stitchStyleTitle+"</td></tr>";
                }
            }
            stitchhtml += selstitchhtml;
            stitchhtml += unstitchhtml;
            $("#stitchstylemaptbldata").html(stitchhtml);
            $('#stitchstylemaptbl').DataTable({
            searching: true,
            retrieve: true,
            bPaginate: $('tbody tr').length>10,
            order: [],
            columnDefs: [ { orderable: false, targets: [] } ],
            dom: 'Bfrtip',
            buttons: [],
            destroy: true
            });
          }
        });
}
// This function is created for saved Product Fabric Mapping Function
$('#savefabric').on('click',function(event){
  event.preventDefault();
  var TableData = new Array();
   $('#fabricmaptbl').find('input[name="fabricmapcheck"]:checked').each(function(row) {
     TableData.push($(this).val());
   });
  var productId= $("#productId").val();
  var fabricidarray = TableData.toString();
  $.ajax({
      url:api_url+'createproductfabricmapping.php',
      type:'POST',
      data:{
        productid : productId,
        fabricid:fabricidarray,
      },
      dataType:'json',
      success:function(response){
          swal(response.Message);
          fabricmapping();
      }
  });
});

// This function is created for saved Product Measurement Mapping Function
$('#savemeasurement').on('click',function(event){
  event.preventDefault();
  var TableData = new Array();
   $('#measurementmaptbl').find('input[name="measurementcheck"]:checked').each(function(row) {
     TableData.push($(this).val());
   });
  var productId= $("#productId").val();
  var measurementidarray = TableData.toString();
  $.ajax({
      url:api_url+'createproductmeasurementmapping.php',
      type:'POST',
      data:{
        productid : productId,
        measurementid:measurementidarray,
      },
      dataType:'json',
      success:function(response){
          swal(response.Message);
          measurementmapping();
      }
  });
});
// This function is created for saved Product Stitch Style Mapping Function
$('#savestitchbtn').on('click',function(event){
  event.preventDefault();
  var TableData = new Array();
   $('#stitchstylemaptbl').find('input[name="stitchstyleitemcheck"]:checked').each(function(row) {
     TableData.push($(this).val());
   });
  var productId= $("#productId").val();
  var stitchstyleidarray = TableData.toString();
  $.ajax({
      url:api_url+'createproductstitchstylemapping.php',
      type:'POST',
      data:{
        productid : productId,
        stitchstyleid:stitchstyleidarray,
      },
      dataType:'json',
      success:function(response){
          swal(response.Message);
          stitchstylemapping();
      }
  });
});
