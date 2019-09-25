var styleData = new Map(); // This variable globally declare save all Style Data in Array
var EmployeeData = new Map();//from getmiscellaneousdata.php names only
var ParentProducts = new Map();//from getmiscellaneousdata.php for show active products styleTitle
var CategoryData =new Map();//from getmiscellaneousdata.php for show active products category
var FabricData = new Map();//from getfabrics.php names only
var MeasurementData = new Map();//from getmeasurementitems.php for show active products styleTitle
var StichStyleData =new Map();//from getstitchstyleitem.php for show active products category
let confirmationStatus = new Map();
getConfirmation();
function getConfirmation() {
    confirmationStatus.set('0', '<span class="badge badge-pill badge-warning">InActive</span>');
    confirmationStatus.set('1', '<span class="badge badge-pill badge-primary">Active</span>');
}
getFabricData();     // For Mapping Propose Fabrics
getMeasurementData();  // For Mapping Propose Measurement
getStitchStyleData();  // For Mapping Propose Stitch Style
getMicellaneousData(); // For Mapping Propose Category / Parent / Employee





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

function getMicellaneousData(){
  // console.log('getmis');
  var selectowner ='',selectparent='',selectcategory='';
  $.ajax({
      type: "GET",
      url: api_url+'getmiscellaneousdata.php',
      success: function(response) {
        // console.log(response);
        if (response.ParentProducts != null) {
            let count_ParentProducts = response.ParentProducts.length;
            for(var i=0;i<count_ParentProducts;i++){
                ParentProducts.set(response.ParentProducts[i].parentId,response.ParentProducts[i]);
                selectparent +="<option value='"+response.ParentProducts[i].parentId+"'>"+response.ParentProducts[i].styleTitle+"-"+response.ParentProducts[i].subStyleTitle+"</option>";
            }
             $("#parent").html(selectparent);
        }
        if (response.Employee != null) {
            let count_EmployeeData = response.Employee.length;
            for(var i=0;i<count_EmployeeData;i++){
                EmployeeData.set(response.Employee[i].employeeId,response.Employee[i]);
                selectowner +="<option value='"+response.Employee[i].employeeId+"'>"+response.Employee[i].firstName+"</option>";
            }
            $("#owner").html(selectowner);
        }
        // console.log(EmployeeData);
        if (response.Categories != null) {
            let count_CategoriesData = response.Categories.length;
            for(var i=0;i<count_CategoriesData;i++){
                CategoryData.set(response.Categories[i].categoryId,response.Categories[i]);
                selectcategory +="<option value='"+response.Categories[i].categoryId+"'>"+response.Categories[i].categoryTitle+"</option>";
            }
            $("#category").html(selectcategory);
        }
         getproductdata();

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
function settabledata(styleData){
   //console.log(ParentProducts);
   // console.log(styleData);
  var html ='';
  $('#styletbl').dataTable().fnDestroy();
  $("#styletbldata").empty();
  for(let k of styleData.keys())
  {
        var AllData= styleData.get(k);
        let isConfirmed = confirmationStatus.get(AllData.isActive);

        html +='<tr>';
        let imageUrl = pic_url+'product/300x300/'+k+'.jpg';
        let parentname = ParentProducts.get(AllData.parentId);
        html +="<td style='width:15%'><form id='custstyleform"+k+"' method='post' enctype='multipart/form-data'><input type='file' id='customerstylepic"+k+"' name='file' accept='image/*' style='display:none;' /> <img  accept='image/*' class='img-thumbnail' src='"+imageUrl+"' style='cursor: pointer' alt='No Image' onclick='imguplod("+k+")'></img></form></td>";
        html +="<td>"+AllData.productTitle+"</td>";
        html +="<td style='width:15%'>"+AllData.productSubTitle+"</td>";

        html +="<td style='width:10%'>"+parentname.styleTitle+" "+parentname.subStyleTitle+"</td>";
        html +="<td style='width:5%'>"+AllData.skuNo+"</td>";
        html +="<td style='width:5%'>"+AllData.price+"</td>";
        html +="<td style='width:5%'>"+AllData.releaseDate+"</td>";

        html +="<td style='width:5%'>"+AllData.sequenceNo+"</td>";
        html +="<td>"+isConfirmed+"</td>";
        html +='<td style="width:5%"><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Upload Image" onclick="imguplod('+k+')"><i class="fa fa-upload"></i></button><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle('+k+')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removeProduct('+k+')"><i class="fa fa-remove"></i></button></div></td>';
        html +="</tr>";
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



function getproductdata(){
     // $('#styletbl').dataTable().fnDestroy();
     // $("#styletbldata").empty();
     $.ajax({
         type: "GET",
         url: api_url+"getallproducts.php",
         async : false,
         success: function(response) {
           var count;
            if(response['Data']!=null){
               count= response['Data'].length;
            }
            for(var i=0;i<count;i++)
            {
            styleData.set(response.Data[i].productId,response.Data[i]);
            }
            settabledata(styleData);
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
                // console.log(fd);
                $.ajax({
                     url:img_url,
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
  var obj = {
      categoryId: category,
      isActive: stylestatus,
      isPriceVariable: pricevariable,
      ownerId:owner,
      parentId: parent,
      price: price,
      productDetails: productdetials,
      productSubTitle:productsubtitle,
      productTitle:producttitle,
      releaseDate:releasedate,
      sequenceNo: productsequenceno,
      skuNo: skuno
    };
    $.ajax({
        url:api_url+'createproduct.php',
        type:'POST',
        data:obj,
        dataType:'json',
        beforeSend: function() {
              $(".preloader").show();
              // console.log("before");
        },
        success:function(response){
          if(response.Responsecode===200){
            // getproductdata();
            $("#customerstyletableform").hide();
            $("#customerstyletable").show();
            swal(response.Message);
            obj.productId = response.RowId.toString();
            styleData.set(response.RowId.toString(),obj);
            // settabledata(styleData);
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
  var obj = {
      categoryId: category,
      isActive: stylestatus,
      isPriceVariable: pricevariable,
      ownerId:owner,
      parentId: parent,
      price: price,
      productDetails: productdetials,
      productId: productId,
      productSubTitle:productsubtitle,
      productTitle:producttitle,
      releaseDate:releasedate,
      sequenceNo: productsequenceno,
      skuNo: skuno
    };
  $.ajax({
      url:api_url+'editproduct.php',
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
          $("#customerstyletableform").hide();
          $("#customerstyletable").show();
          styleData.set(productId.toString(),obj);
          settabledata(styleData);

        }
        else
        {
          swal(response.Message);
        }
      },
      complete:function(response){

        // console.log("after");
        $(".preloader").hide();
      }
  });
});


// This function is created For Remove Button
function removeProduct(id){
  $.ajax({
      url:api_url+'deleteproduct.php',
      type:'POST',
      data:{
        productId:id
      },
      dataType:'json',
      beforeSend: function() {
            $(".preloader").show();
            // console.log("before");
      },
      success:function(response){
          if(response.Responsecode===200){
            $("#customerstyletableform").hide();
            $("#customerstyletable").show();
            styleData.delete(id.toString());
            settabledata(styleData);
            swal(response.Message);
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
// This function is created For Edit Button
function editStyle(id){
var AllData= styleData.get(id.toString());
$("#hidenavtab").show();
$("#productId").val(AllData.productId);
$("#producttitle").val(AllData.productTitle);
$("#productsubtitle").val(AllData.productSubTitle);
$("#productdetials").val(AllData.productDetails);
$("#owner").val(AllData.ownerId).trigger('change');
$("#productsequenceno").val(AllData.sequenceNo);
$("#parent").val(AllData.parentId).trigger('change');
$("#skuno").val(AllData.skuNo);
$("#releasedate").val(AllData.releaseDate);
$("#category").val(AllData.categoryId).trigger('change');
$("#price").val(AllData.price);
$("#pricevariable").val(AllData.isPriceVariable).trigger('change');
$("#stylestatus").val(AllData.isActive).trigger('change');
$("#customerstyletable").hide();
$("#customerstyletableform").show();
$("#savebtnproducts").hide();
$("#updatebtnproducts").show();
fabricmapping();
measurementmapping();
stitchstylemapping();
}
function setfabrcmapping(temparray){

  // $('#fabricmaptbl').dataTable().fnDestroy();
  $("#fabricmaptbldata").empty();
  let fabricDatacount =FabricData.size;
  // console.log("Fabric Data"+FabricData);
  // console.log("Fabric Data"+fabricDatacount);
  var selfabricmap='',unselfabricmap='',fabricmap='';
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
            unselfabricmap +='<input id="check'+fabricName.fabricId+'"  type="checkbox" name="fabricmapcheck" value="'+fabricName.fabricId+'"  >';
            unselfabricmap +='</td>';
            unselfabricmap +="<td> <img class='img-thumbnail' src='"+pic_url+"fabric/300x300/"+fabricName.skuNo+".jpg' alt='No Image' ></img></td>";
            unselfabricmap +="<td>"+fabricName.fabricTitle+"</td>";
            unselfabricmap +="<td>"+fabricName.skuNo+"</td></tr>";
        }
    }
    fabricmap +=selfabricmap;
    fabricmap +=unselfabricmap;
    $("#fabricmaptbldata").html(fabricmap);
}
// This function Display Product Fabric Mapping Table Data
function fabricmapping(){
      var productId= $("#productId").val();
      $.ajax({
          type: "GET",
          url: api_url+"getproductfabricmapping.php",
          beforeSend: function() {
                $(".preloader").show();
                // console.log("before");
          },
          success: function(response) {
            var temparray = [];
            if(response['Data']==null){
            }
            else
            {
                var count= response['Data'].length;
                for (var i = 0; i < count; i++)
                {
                      if(response['Data'][i].productId===productId){
                      temparray.push(response['Data'][i].fabricId);
                      }
                }
            }
                setfabrcmapping(temparray);
          },
          complete:function(response){

            // console.log("after");
            $(".preloader").hide();
          }
        });
}

function setmeasuremapping(tempmeasurementarray){

    // $('#measurementmaptbl').dataTable().fnDestroy();
    $("#measurementmaptbldata").empty();
    // console.log("Fabric Data"+fabricDatacount);
    var selmeasurement='',unselmeasurement='',measurementhtml='';
    let MeasurementDatacount =MeasurementData.size;
    // console.log("Measurment Data"+MeasurementData);
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
      measurementhtml += selmeasurement;
      measurementhtml += unselmeasurement;
      $("#measurementmaptbldata").html(measurementhtml);
}
// This function Display Product Measurement Mapping Table Data
function measurementmapping(){

    var productId= $("#productId").val();

      $.ajax({
          type: "GET",
          url: api_url+"getproductmeasurementmapping.php",
          beforeSend: function() {
                $(".preloader").show();
                // console.log("before");
          },
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
              setmeasuremapping(tempmeasurementarray);
          },
          complete:function(response){

            // console.log("after");
            $(".preloader").hide();
          }
        });
}


function setstitchstylemapping(tempstitcharray){
    $("#stitchstylemaptbldata").empty();
    var selstitchhtml='',unstitchhtml='',stitchhtml='';
    let StichStyleDatacount =StichStyleData.size;
    // console.log("StichStyleData "+StichStyleData);
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
      stitchhtml += selstitchhtml;
      stitchhtml += unstitchhtml;
      $("#stitchstylemaptbldata").html(stitchhtml);
}
// This function Display Product Stitvh Style Mapping Table Data
function stitchstylemapping(){
  // $('#stitchstylemaptbl').dataTable().fnDestroy();
      var productId= $("#productId").val();
      $.ajax({
          type: "GET",
          url: api_url+"getproductstitchstylemapping.php",
          beforeSend: function() {
                $(".preloader").show();
                // console.log("before");
          },
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

            }
            setstitchstylemapping(tempstitcharray);
          },
          complete:function(response){

            // console.log("after");
            $(".preloader").hide();
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
  var obj = {
    productId : productId,
    fabricId:fabricidarray
  };
  $.ajax({
      url:api_url+'createproductfabricmapping.php',
      type:'POST',
      async:true,
      cache:false,
      data:obj,
      dataType:'json',
      beforeSend: function() {
            $(".preloader").show();
            // console.log("before");
      },
      success:function(response){
         if(response.Responsecode===200){
           swal(response.Message);
           setfabrcmapping(TableData);
           // fabricmapping();
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
  var obj = {
      productId : productId,
    measurementId:measurementidarray
  };
  $.ajax({
      url:api_url+'createproductmeasurementmapping.php',
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
          setmeasuremapping(TableData);
          // measurementmapping();
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
  var obj ={
      productId : productId,
      stitchStyleId:stitchstyleidarray
  };
  $.ajax({
      url:api_url+'createproductstitchstylemapping.php',
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
          // stitchstylemapping();
          setstitchstylemapping(TableData);
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
});



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
