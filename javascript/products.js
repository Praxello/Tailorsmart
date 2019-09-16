
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
var productData = []; // This variable globally declare save all Style Data in Array
var measurementData = [];
var stitchstyleitemData = [];
var allfabricData =[];
$(document).ready(function() {

});


function getmiscellaneousdata(){
  var selectowner ='',selectparent='',selectcategory='';
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
        measurementData = [...response['Data']];

      }
    });
}

function getstitchstyleitem(){
  var html ='';
  $.ajax({
      type: "GET",
      url: api_url+"getstitchstyleitem.php",
      success: function(response) {
        stitchstyleitemData = [...response['Data']];
        // console.log(stitchstyleitemData);
      }
    });
}

function getallfabricdata(){
  var html ='';
  $.ajax({
      type: "GET",
      url: api_url+"getfabrics.php",
      success: function(response) {
        allfabricData = [...response['Data']];
          // console.log(allfabricData);
      }
    });
}


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
              var imageUrl ='';
            productData=[...response['Data']];
            for (var i = 0; i < count; i++) {
                imageUrl = pic_url+'product/300x300/'+response['Data'][i].productId+'.jpg';

                html +="<td style='width:15%'><form id='custstyleform"+response['Data'][i].productId+"' method='post' enctype='multipart/form-data'><input type='file' id='customerstylepic"+response['Data'][i].productId+"' name='file' accept='image/*' style='display:none;' /> <img  accept='image/*' class='img-thumbnail' src='"+imageUrl+"' style='cursor: pointer' alt='No Image' onclick='imguplod("+response['Data'][i].productId+")'></img></form></td>";
                html +="<td>"+response['Data'][i].productTitle+"</td>";
                html +="<td style='width:15%'>"+response['Data'][i].productSubTitle+"</td>";
                html +="<td style='width:5%'>"+response['Data'][i].parentId+"</td>";
                html +="<td style='width:5%'>"+response['Data'][i].skuNo+"</td>";
                html +="<td style='width:5%'>"+response['Data'][i].price+"</td>";
                html +="<td style='width:5%'>"+response['Data'][i].releaseDate+"</td>";
                html +="<td style='width:5%'>"+response['Data'][i].sequenceNo+"</td>";
                if(response['Data'][i].isActive==1){
                  html +='<td style="width:5%"><span class="badge badge-pill badge-primary">Active</span></td>';
                }
                else {
                  html +='<td style="width:5%"><span class="badge badge-pill badge-warning">InActive</span></td>';
                }
                html +='<td style="width:5%"><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Upload Image" onclick="imguplod('+response['Data'][i].productId+')"><i class="fa fa-upload"></i></button><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+i+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removeProduct('+response['Data'][i].productId+')"><i class="fa fa-remove"></i></button></div></td>';
                html +="  </tr>";
            }
           $("#styletbldata").html(html);
           $('#styletbl').DataTable({
           searching: true,
           retrieve: true,
           bPaginate: $('tbody tr').length>10,
           order: [],
           columnDefs: [ { orderable: false, targets: [0,1,2,3,4,5,6,7,8,9] } ],
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
                     url:"http://praxello.com/tailorsmart/uploadimage.php",
                     type:"POST",
                     contentType: false,
                     cache: false,
                     processData:false,
                     data: fd,
                     dataType:'json',
                     success:function(response){
                       swal(response['Message']);
                        getproductdata();
                     }
              });
   };
}
// This function is created For Add Button New Style
function addStyle(){
  $("#customerstyletable").hide();
  $("#customerstyletableform").show();
  $("#productform").trigger("reset");
  $("#owner").val("").trigger('change');
  $("#parent").val("").trigger('change');
  $("#category").val("").trigger('change');
  $("#pricevariable").val("").trigger('change');
  $("#stylestatus").val("").trigger('change');
  $("#hidenavtab").hide();
  $("#savebtnproducts").show();
  $("#updatebtnproducts").hide();
}

// This function is created For Edit Button
function editStyle(id){
$("#hidenavtab").show();
$("#productId").val(productData[id].productId);
$("#producttitle").val(productData[id].productTitle);
$("#productsubtitle").val(productData[id].productSubTitle);
$("#productdetials").val(productData[id].productDetails);
$("#owner").val(productData[id].ownerId).trigger('change');
$("#productsequenceno").val(productData[id].sequenceNo);
$("#parent").val(productData[id].parentId).trigger('change');
$("#skuno").val(productData[id].skuNo);
$("#releasedate").val(productData[id].releaseDate);
$("#category").val(productData[id].categoryId).trigger('change');
$("#price").val(productData[id].price);
$("#pricevariable").val(productData[id].isPriceVariable).trigger('change');
$("#stylestatus").val(productData[id].isActive).trigger('change');
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
          getproductdata();
          $("#customerstyletableform").hide();
          $("#customerstyletable").show();
      }
  });
}

// This function is created For Refresh Action / Backbutton
$('#reloadbtn').on('click',function(event){
  event.preventDefault();
  $("#customerstyletableform").hide();
  $("#customerstyletable").show();
  $("#savebtnproducts").show();
  $("#updatebtnproducts").hide();
});

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
            // window.location.reload();
            getproductdata();
            $("#customerstyletableform").hide();
            $("#customerstyletable").show();

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
          getproductdata();
          $("#customerstyletableform").hide();
          $("#customerstyletable").show();
      }
  });
});
var table;
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
                    selfabricmap +='<tr><td>';
                    selfabricmap +='<lable><input id="check'+allfabricData[j].fabricId+'"  type="checkbox" name="fabricmapcheck"  value="'+allfabricData[j].fabricId+'" checked >';
                    selfabricmap +='</lable></td>';
                    selfabricmap +="<td> <img class='img-thumbnail' src='"+pic_url+"fabric/300x300/"+allfabricData[j].skuNo+".jpg' alt='No Image'></img></td>";
                    selfabricmap +="<td>"+allfabricData[j].fabricTitle+"</td>";
                    selfabricmap +="<td>"+allfabricData[j].skuNo+"</td></tr>";

                }
                else {
                    unselfabricmap +='<tr><td>';
                    unselfabricmap +='<input id="check'+allfabricData[j].fabricId+'"  type="checkbox" name="fabricmapcheck" value="'+allfabricData[j].fabricId+'" alt="No Iamge" >';
                    unselfabricmap +='</td>';
                    unselfabricmap +="<td> <img class='img-thumbnail' src='"+pic_url+"fabric/300x300/"+allfabricData[j].skuNo+".jpg' ></img></td>";
                    unselfabricmap +="<td>"+allfabricData[j].fabricTitle+"</td>";
                    unselfabricmap +="<td>"+allfabricData[j].skuNo+"</td></tr>";
                }
            }
            fabricmap +=selfabricmap;
            fabricmap +=unselfabricmap;

            $("#fabricmaptbldata").html(fabricmap);
            // var counttemparray = temparray.length;
            // alert(counttemparray);
            // for(var j=0;j<counttemparray;j++){
            //   $("#check" + temparray[j]).prop('checked', true);
            // }
           // table =$('#fabricmaptbl').DataTable({
           //
           //  searching: true,
           //  retrieve: true,
           //  bPaginate: $('tbody tr').length>10,
           //  order: [],
           //  columnDefs: [ { orderable: false,
           //  targets: [0,1,2,3] } ],
           //  dom: 'Bfrtip',
           //  select: {
           //      style: 'multi',
           //      items: 'cell'
           //  },
           //  buttons: [],
           //  destroy: true
           //  });
        //      table = $('#fabricmaptbl').DataTable({
        //        deferRender: true,
        //       'columnDefs': [
        //          {
        //             'targets': 0,
        //             'checkboxes': {
        //                'selectRow': true
        //             }
        //          }
        //       ],
        //       select: {
        //     style: 'multi',
        //     items: 'cell'
        // },
        //
        //
        //     });

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
            // $('#measurementmaptbl').DataTable({
            // searching: true,
            // retrieve: true,
            // bPaginate: $('tbody tr').length>10,
            // order: [],
            // columnDefs: [ { orderable: false, targets: [] } ],
            // dom: 'Bfrtip',
            // buttons: [],
            // destroy: true
            // });
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
              // console.log(response['Data'][i].StitchStyle.productId);
              // console.log(productId);
              if(response['Data'][i].StitchStyle.productId===productId){
              tempstitcharray.push(response['Data'][i].StitchStyle.stitchStyleId);
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
            // $('#stitchstylemaptbl').DataTable({
            // searching: true,
            // retrieve: true,
            // bPaginate: $('tbody tr').length>10,
            // order: [],
            // columnDefs: [ { orderable: false, targets: [] } ],
            // dom: 'Bfrtip',
            // buttons: [],
            // destroy: true
            // });
          }
        });
}
// This function is created for saved Product Fabric Mapping Function
$('#savefabric').on('click',function(event){
   var form = this;
  event.preventDefault();
  var TableData = new Array();
   var rows_selected = table.column(0).checkboxes.selected();
    $.each(rows_selected, function(index, rowId){
      var  arr = rowId.split("=\"");
      var  arr1 = arr[4].split("\"");
      TableData.push(parseInt(arr1[0]));

    });
  //  alert(TableData);
  var productId= $("#productId").val();
  var fabricidarray = TableData.toString();
  $.ajax({
      url:api_url+'createproductfabricmapping.php',
      type:'POST',
      async:true,
      cache:false,
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
