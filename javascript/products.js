var productData = []; // This variable globally declare save all Style Data in Array
var EmployeeData = new Map();//from getmiscellaneousdata.php names only
var ParentProducts = new Map();//from getmiscellaneousdata.php for show active products styleTitle
var CategoryData =new Map();//from getmiscellaneousdata.php for show active products category
var FabricData = new Map();//from getfabrics.php names only
var MeasurementData = new Map();//from getmeasurementitems.php for show active products styleTitle
var StichStyleData =new Map();//from getstitchstyleitem.php for show active products category

getMicellaneousData(); // For Mapping Propose Category / Parent / Employee
getFabricData();     // For Mapping Propose Fabrics
getMeasurementData();  // For Mapping Propose Measurement
getStitchStyleData();  // For Mapping Propose Stitch Style
getproductdata();

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

$(document).ready(function() {

});


function getMicellaneousData(){
  // console.log('getmis');
  var selectowner ='',selectparent='',selectcategory='';
  $.ajax({
      type: "GET",
      url: api_url+'getmiscellaneousdata.php',
      success: function(response) {
        if (response.Employee != null) {
            let count_EmployeeData = response.Employee.length;
            for(var i=0;i<count_EmployeeData;i++){
                EmployeeData.set(response.Employee[i].employeeId,response.Employee[i]);
                selectowner +="<option value='"+response.Employee[i].employeeId+"'>"+response.Employee[i].firstName+"</option>";
                // console.log(EmployeeData.get(response.Employee[i].employeeId));
            }
            $("#owner").html(selectowner);
        }
        if (response.Categories != null) {
            let count_CategoriesData = response.Categories.length;
            for(var i=0;i<count_CategoriesData;i++){
                CategoryData.set(response.Categories[i].categoryId,response.Categories[i]);
                selectcategory +="<option value='"+response.Categories[i].categoryId+"'>"+response.Categories[i].categoryTitle+"</option>";
            }
            $("#category").html(selectcategory);
        }
        if (response.ParentProducts != null) {
            let count_ParentProducts = response.ParentProducts.length;
            for(var i=0;i<count_ParentProducts;i++){
                ParentProducts.set(response.ParentProducts[i].parentId,response.ParentProducts[i]);
                selectparent +="<option value='"+response.ParentProducts[i].parentId+"'>"+response.ParentProducts[i].styleTitle+"-"+response.ParentProducts[i].subStyleTitle+"</option>";
            }
             $("#parent").html(selectparent);
        }
        // console.log(ParentProducts.size);
      }
    });
}

function getFabricData(){
  var html ='';
  $.ajax({
      type: "GET",
      url: api_url+"getfabrics.php",
      success: function(response) {
        if (response.Data != null) {
            let count_fabricData = response.Data.length;
            for(var i=0;i<count_fabricData;i++){
                FabricData.set(response.Data[i].fabricId,response.Data[i]);

            }
        }
      }
    });
}
function getMeasurementData(){
  var html ='';
  $.ajax({
      type: "GET",
      url: api_url+"getmeasurementitems.php",
      success: function(response) {
        if (response.Data != null) {
            let count_measurementData = response.Data.length;
            for(var i=0;i<count_measurementData;i++){
                MeasurementData.set(response.Data[i].measurementId,response.Data[i]);

            }
        }
      }
    });
}

function getStitchStyleData(){
  var html ='';
  $.ajax({
      type: "GET",
      url: api_url+"getstitchstyleitem.php",
      success: function(response) {
        if (response.Data != null) {
            let count_stitchstyleData = response.Data.length;
            for(var i=0;i<count_stitchstyleData;i++){
                StichStyleData.set(response.Data[i].stitchStyleId,response.Data[i]);

            }
        }
      }
    });
}




function getproductdata(){
     $('#styletbl').dataTable().fnDestroy();
     $("#styletbldata").empty();

     $.ajax({
         type: "GET",
         url: api_url+"getallproducts.php",
         async : false,
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
                // console.log(ParentProducts.get(response['Data'][i].parentId));
                // console.log(response['Data'][i].parentId);
                if(ParentProducts.has(response['Data'][i].parentId)){
                    let parentSubName= ParentProducts.get(response['Data'][i].parentId);
                    html +="<td style='width:5%'>"+parentSubName.styleTitle+" "+parentSubName.subStyleTitle+"</td>";
                }
                else{
                  html +="<td style='width:5%'></td>";
                }
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
fabricmapping();
measurementmapping();
stitchstylemapping();
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

          if(response.Responsecode===200){
            getproductdata();
            $("#customerstyletableform").hide();
            $("#customerstyletable").show();
            swal(response.Message);
          }
          else {
            swal(response.Message);
          }

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
          if(response.Responsecode===200){
            getproductdata();
            $("#customerstyletableform").hide();
            $("#customerstyletable").show();
            swal(response.Message);
          }
          else {
            swal(response.Message);
          }

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
        if(response.Responsecode===200){
          getproductdata();
          $("#customerstyletableform").hide();
          $("#customerstyletable").show();
          swal(response.Message);
        }
        else {
          swal(response.Message);
        }
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

              let fabricDatacount =FabricData.size;
              for(let k of FabricData.keys())
                  {
                    let fabricName = FabricData.get(k);
                    if(temparray.includes(fabricName.fabricId)){
                        selfabricmap +='<tr><td>';
                        selfabricmap +='<lable><input id="check'+fabricName.fabricId+'"  type="checkbox" name="fabricmapcheck"  value="'+fabricName.fabricId+'" checked >';
                        selfabricmap +='</lable></td>';
                        selfabricmap +="<td> <img class='img-thumbnail' src='"+pic_url+"fabric/300x300/"+fabricName.skuNo+".jpg' alt='No Image'></img></td>";
                        selfabricmap +="<td>"+fabricName.fabricTitle+"</td>";
                        selfabricmap +="<td>"+fabricName.skuNo+"</td></tr>";

                    }
                    else {
                        unselfabricmap +='<tr><td>';
                        unselfabricmap +='<input id="check'+fabricName.fabricId+'"  type="checkbox" name="fabricmapcheck" value="'+fabricName.fabricId+'" alt="No Iamge" >';
                        unselfabricmap +='</td>';
                        unselfabricmap +="<td> <img class='img-thumbnail' src='"+pic_url+"fabric/300x300/"+fabricName.skuNo+".jpg' ></img></td>";
                        unselfabricmap +="<td>"+fabricName.fabricTitle+"</td>";
                        unselfabricmap +="<td>"+fabricName.skuNo+"</td></tr>";
                    }
                }
              }

            fabricmap +=selfabricmap;
            fabricmap +=unselfabricmap;
            $("#fabricmaptbldata").html(fabricmap);
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
              let MeasurementDatacount =MeasurementData.size;
              for(let k of MeasurementData.keys())
                  {
                        let measureName = MeasurementData.get(k);
                        if(tempmeasurementarray.includes(measureName.measurementId)){
                          selmeasurement +='<tr><td><label class="checkbox" >';
                          selmeasurement +='<input id="check'+measureName.measurementId+'" type="checkbox"  name="measurementcheck" value="'+measureName.measurementId+'" checked>';
                          selmeasurement +='</label></td>';
                          selmeasurement +="<td>"+measureName.itemTitle+"</td></tr>";
                        }
                        else {
                          unselmeasurement +='<tr><td><label class="checkbox" >';
                          unselmeasurement +='<input id="check'+measureName.measurementId+'" type="checkbox" name="measurementcheck" value="'+measureName.measurementId+'">';
                          unselmeasurement +='</label></td>';
                          unselmeasurement +="<td>"+measureName.itemTitle+"</td></tr>";
                        }
                }
            }

            measurementhtml += selmeasurement;
            measurementhtml += unselmeasurement;
            $("#measurementmaptbldata").html(measurementhtml);
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
              if(response['Data'][i].StitchStyle.productId===productId){
              tempstitcharray.push(response['Data'][i].StitchStyle.stitchStyleId);
              }
              }

              let StichStyleDatacount =StichStyleData.size;
              for(let k of StichStyleData.keys())
                  {
                        let stitchName = StichStyleData.get(k);
                        if(tempstitcharray.includes(stitchName.stitchStyleId)){
                          // alert(measurementData[j].measurementId);
                          selstitchhtml +='<tr><td><label class="checkbox" >';
                          selstitchhtml +='<input id="check'+stitchName.stitchStyleId+'" type="checkbox" name="stitchstyleitemcheck" value="'+stitchName.stitchStyleId+'" checked>';
                          selstitchhtml +='</label></td>';
                          selstitchhtml +="<td>"+stitchName.stitchStyleTitle+"</td></tr>";
                        }
                        else {
                          unstitchhtml +='<tr><td><label class="checkbox" >';
                          unstitchhtml +='<input id="check'+stitchName.stitchStyleId+'" type="checkbox" name="stitchstyleitemcheck" value="'+stitchName.stitchStyleId+'" >';
                          unstitchhtml +='</label></td>';
                          unstitchhtml +="<td>"+stitchName.stitchStyleTitle+"</td></tr>";
                        }
                }
            }
            stitchhtml += selstitchhtml;
            stitchhtml += unstitchhtml;
            $("#stitchstylemaptbldata").html(stitchhtml);
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
      async:true,
      cache:false,
      data:{
        productid : productId,
        fabricid:fabricidarray,
      },
      dataType:'json',
      success:function(response){
         if(response.Responsecode===200){
           swal(response.Message);
           fabricmapping();
         }
         else {
            swal(response.Message);
         }


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
        if(response.Responsecode===200){
          swal(response.Message);
          measurementmapping();
        }
        else {
           swal(response.Message);
        }


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
        if(response.Responsecode===200){
          swal(response.Message);
          stitchstylemapping();
        }
        else {
           swal(response.Message);
        }
      }
  });
});


// // Function Navbar For Fabric Mapping
// function navfabricmapping()
// {
//
// }
// // Function Navbar For Measurement Mapping
// function navmeasurementmapping()
// {
//
// }
// // Function Navbar For Stitch Style Mapping
// function navstitchstylemapping()
// {
//
// }
 // This function Fabric Table Search Box
$("#fabricmaptblInput").on("keyup", function() {
var value = $(this).val().toLowerCase();
$("#fabricmaptbl tr").filter(function() {
 $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
});
});
// This Function Measurment searching
$("#measurementmaptblInput").on("keyup", function() {
var value = $(this).val().toLowerCase();
$("#measurementmaptbl tr").filter(function() {
 $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
});
});
// This Function Stitch Style searching
$("#stitchstylemaptblInput").on("keyup", function() {
var value = $(this).val().toLowerCase();
$("#stitchstylemaptbl tr").filter(function() {
 $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
});
});
