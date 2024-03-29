var styleData = new Map(); // This variable globally declare save all Style Data in Array
let confirmationStatus = new Map();
var EmployeeData = new Map(); //from getmiscellaneousdata.php
$('#owner').select2({
    allowClear: true,
    placeholder: "Select Owner"
});
getallcategory();

function getallcategory() {
    var html = '';
    $.ajax({
        type: "GET",
        url: api_url + "getallcategory.php",
        success: function(response) {
            var count;
            if (response['Data'] != null) {
                count = response['Data'].length;
            }
            html += '<option value="">Select Category</option>';
            for (var i = 0; i < count; i++) {
                html += "<option value='" + response['Data'][i].categoryId + "'>" + response['Data'][i].categoryTitle + "</option>";
            }
            $("#fabriccategory").html(html);
        }
    });
}
getMicellaneousData();

function getMicellaneousData() {
    var selectowner = '',
        selectparent = '',
        selectcategory = '';
    $.ajax({
        type: "GET",
        url: api_url + 'getmiscellaneousdata.php',
        beforeSend: function() {
            $(".preloader").show();
            // console.log("before");
        },
        success: function(response) {
            // console.log(response);
            // if (response.ParentProducts != null) {
            //     let count_ParentProducts = response.ParentProducts.length;
            //     for(var i=0;i<count_ParentProducts;i++){
            //         ParentProducts.set(response.ParentProducts[i].parentId,response.ParentProducts[i]);
            //         selectparent +="<option value='"+response.ParentProducts[i].parentId+"'>"+response.ParentProducts[i].styleTitle+"-"+response.ParentProducts[i].subStyleTitle+"</option>";
            //     }
            //      $("#parent").html(selectparent);
            // }
            if (response.Employee != null) {
                let count_EmployeeData = response.Employee.length;
                selectowner += "<option value=''></option>";
                for (var i = 0; i < count_EmployeeData; i++) {
                    EmployeeData.set(response.Employee[i].employeeId, response.Employee[i]);
                    selectowner += "<option value='" + response.Employee[i].employeeId + "'>" + response.Employee[i].firstName + "</option>";
                }
                $("#owner").html(selectowner);
            }
            // console.log(EmployeeData);
            // if (response.Categories != null) {
            //     let count_CategoriesData = response.Categories.length;
            //     for(var i=0;i<count_CategoriesData;i++){
            //         CategoryData.set(response.Categories[i].categoryId,response.Categories[i]);
            //         selectcategory +="<option value='"+response.Categories[i].categoryId+"'>"+response.Categories[i].categoryTitle+"</option>";
            //     }
            //     $("#category").html(selectcategory);
            // }
            // getproductdata();

        },
        complete: function(response) {
            getfabrics();
            // console.log("after");
            $(".preloader").hide();
        }

    });
}
// getfabrics();
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
var idshow = 1;
$('#actbtn').on('click', function(event) {
    idshow = 1;
    //settabledata(styleData);
    $("#inactbtn").show();
    $("#actbtn").hide();
    settabledata(styleData);
});
$('#inactbtn').on('click', function(event) {
    idshow = 0;
    //settabledata(inactstyleData);
    $("#inactbtn").hide();
    $("#actbtn").show();
    settabledata(styleData);
});

function getConfirmation() {
    confirmationStatus.set('0', '<span class="badge badge-pill badge-warning">InActive</span>');
    confirmationStatus.set('1', '<span class="badge badge-pill badge-primary">Active</span>');
}

function settabledata(styleData) {

    var fid = $("#fid").val();
    var roleid = $("#roleid").val();
    // console.log(roleid);
    var empid = parseInt($("#empid").val());
    // console.log("Ep"+empid);
    var shtml = '',
        unhtml = '';
    $('#styletbl').dataTable().fnDestroy();
    $("#styletbldata").empty();
    for (let k of styleData.keys()) {
        var AllData = styleData.get(k);
        let empId = parseInt(AllData.ownerid);
        if (roleid === "4") {

            if (empId === empid) {
                let isConfirmed = confirmationStatus.get(AllData.isActive);
                let empName = '';
                if (EmployeeData.has(AllData.ownerid)) {
                    let empData = EmployeeData.get(AllData.ownerid);
                    empName = empData.firstName + " " + empData.lastName;
                } else {
                    empName = '-';
                }
                shtml += '<tr>';
                let imageUrl = pic_url + 'fabric/300x300/' + AllData.skuNo + '.jpg';
                shtml += "<td><form id='custstyleform" + AllData.skuNo + "' method='post' enctype='multipart/form-data'><input type='file' id='customerstylepic" + AllData.skuNo + "' accept='image/*' style='display:none'/> <img class='img-thumbnail' alt='No Image' src='" + imageUrl + "'  style='cursor: pointer' onclick='imguplod(\"" + AllData.skuNo + "\")' id='save" + AllData.skuNo + "' width='70px' height='70px' title='Upload Image'></img></form></td>";
                shtml += "<td>" + AllData.fabricTitle + "</td>";
                shtml += "<td>" + AllData.fabricBrand + "</td>";
                shtml += "<td>" + AllData.skuNo + "</td>";

                shtml += "<td>" + AllData.fabricPrice + "</td>";
                shtml += "<td>" + getDate(AllData.releaseDate) + "</td>";
                shtml += "<td>" + empName + "</td>";
                shtml += "<td>" + isConfirmed + "</td>";
                shtml += '<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Upload Image" onclick="imguplod(\'' + AllData.skuNo + '\')"><i class="fa fa-upload"></i></button><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle(' + k + ')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removeFabric(' + k + ')"><i class="fa fa-remove"></i></button></div></td>';
                shtml += "<td style='display:none;'>" + k + "</td>";
                shtml += "</tr>";

            }
        } else {
            if (AllData.isActive === "1") {
                let isConfirmed = confirmationStatus.get(AllData.isActive);
                let empName = '';
                if (EmployeeData.has(AllData.ownerid)) {
                    let empData = EmployeeData.get(AllData.ownerid);
                    empName = empData.firstName + " " + empData.lastName;
                } else {
                    empName = '-';
                }
                shtml += '<tr>';
                let imageUrl = pic_url + 'fabric/300x300/' + AllData.skuNo + '.jpg';
                shtml += "<td><form id='custstyleform" + AllData.skuNo + "' method='post' enctype='multipart/form-data'><input type='file' id='customerstylepic" + AllData.skuNo + "' accept='image/*' style='display:none'/> <img class='img-thumbnail' alt='No Image' src='" + imageUrl + "'  style='cursor: pointer' onclick='imguplod(\"" + AllData.skuNo + "\")'  id='save" + AllData.skuNo + "' width='70px' height='70px' title='Upload Image'></img></form></td>";
                shtml += "<td>" + AllData.fabricTitle + "</td>";
                shtml += "<td>" + AllData.fabricBrand + "</td>";
                shtml += "<td>" + AllData.skuNo + "</td>";

                shtml += "<td>" + AllData.fabricPrice + "</td>";
                shtml += "<td>" + getDate(AllData.releaseDate) + "</td>";
                shtml += "<td>" + empName + "</td>";
                shtml += "<td>" + isConfirmed + "</td>";
                shtml += '<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Upload Image" onclick="imguplod(\'' + AllData.skuNo + '\')"><i class="fa fa-upload"></i></button><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle(' + k + ')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removeFabric(' + k + ')"><i class="fa fa-remove"></i></button></div></td>';
                shtml += "<td style='display:none;'>" + k + "</td>";
                shtml += "</tr>";
            } else {
                let isConfirmed = confirmationStatus.get(AllData.isActive);
                let empName = '';

                if (EmployeeData.has(AllData.ownerid)) {

                    let empData = EmployeeData.get(AllData.ownerid);
                    empName = empData.firstName + " " + empData.lastName;
                } else {
                    empName = '-';
                }
                unhtml += '<tr>';
                let imageUrl = pic_url + 'fabric/300x300/' + AllData.skuNo + '.jpg';
                unhtml += "<td><form id='custstyleform" + AllData.skuNo + "' method='post' enctype='multipart/form-data'><input type='file' id='customerstylepic" + AllData.skuNo + "' accept='image/*' style='display:none'/> <img class='img-thumbnail' alt='No Image' src='" + imageUrl + "'  style='cursor: pointer' onclick='imguplod(\"" + AllData.skuNo + "\")'  id='save" + AllData.skuNo + "' width='70px' height='70px' title='Upload Image'></img></form></td>";
                unhtml += "<td>" + AllData.fabricTitle + "</td>";
                unhtml += "<td>" + AllData.fabricBrand + "</td>";
                unhtml += "<td>" + AllData.skuNo + "</td>";

                unhtml += "<td>" + AllData.fabricPrice + "</td>";
                unhtml += "<td>" + getDate(AllData.releaseDate) + "</td>";
                unhtml += "<td>" + empName + "</td>";
                unhtml += "<td>" + isConfirmed + "</td>";
                unhtml += '<td style=""><div class="btn-group" role="group" aria-label="Basic Example"><button class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="top" title="Upload Image" onclick="imguplod(\'' + AllData.skuNo + '\')"><i class="fa fa-upload"></i></button><button class="btn btn-success btn-sm" data-toggle="tooltip" data-placement="top" title="Edit" onclick="editStyle(' + k + ')"><i class="fa fa-edit"></i></button><button class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete" onclick="removeFabric(' + k + ')"><i class="fa fa-remove"></i></button></div></td>';
                unhtml += "<td style='display:none;'>" + k + "</td>";
                unhtml += "</tr>";

            }
        }

    }
    if (fid === "1") {
        $("#inactbtn").hide();
        $("#styletbldata").html(unhtml);
    } else {
        if (idshow === 1) {
            $("#styletbldata").html(shtml);
        } else {
            $("#styletbldata").html(unhtml);
        }
    }
    $('#styletbl').DataTable({
        searching: true,
        retrieve: true,
        bPaginate: $('tbody tr').length > 10,
        order: [],
        columnDefs: [{ orderable: false, targets: [0, 3, 4, 5, 6, 7, 8, 9] }],
        dom: 'Bfrtip',
        buttons: [],
        destroy: true
    });
}
// getfabrics();

// This function is created for Get All Style Data.
function getfabrics() {
    // $('#styletbl').dataTable().fnDestroy();
    // $("#styletbldata").empty();
    $.ajax({
        type: "GET",
        url: api_url + "getfabrics.php",
        async: false,
        beforeSend: function() {
            $(".preloader").show();
            // console.log("before");
        },
        success: function(response) {
            var count;
            if (response['Data'] != null) {
                count = response['Data'].length;
            }
            for (var i = 0; i < count; i++) {
                styleData.set(response.Data[i].fabricId, response.Data[i]);
            }
            settabledata(styleData);
        },
        complete: function(response) {

            // console.log("after");
            $(".preloader").hide();
        }
    });
}

function imguplod(imgid) {
    var triggerid = $('#customerstylepic' + imgid).trigger('click');
    var fileupload = document.getElementById('customerstylepic' + imgid);
    fileupload.onchange = function() {
        var customerstylepic = $('#customerstylepic' + imgid).val();
        var fd = new FormData();
        var files = $('#customerstylepic' + imgid)[0].files[0];
        fd.append('file', files);
        fd.append('imgname', imgid);
        fd.append('foldername', "fabric");
        $.ajax({
            // url:"src/addimg.php",
            url: img_url,
            type: "POST",
            contentType: false,
            cache: false,
            processData: false,
            data: fd,
            dataType: 'json',
            success: function(response) {
                if (response['Responsecode'] == 200) {
                    swal(response['Message']);
                    // getcustomersubstyles();
                    var output = document.getElementById('save' + imgid);
                    output.src = URL.createObjectURL(files);

                } else {
                    swal(response['Message']);
                }
            }
        });
    };
}
// This function is created For Add Button New Style
function addStyle() {
    $("#customerstyletable").hide();
    $("#customerstyletableform").show();
    $("#fabricform").trigger("reset");
    $("#savebtncustomerstyle").show();
    $("#updatebtncustomerstyle").hide();
    $("#owner").val("").trigger('change');
    $("#fabricid").val("0");
    $("#fabriccategory").val("").trigger('change');
    $("#fabricPricevariable").val("").trigger('change');
    $("#fabricactivestatus").val("1").trigger('change');
}

// This function is created For Edit Button
function editStyle(id) {
    var AllData = styleData.get(id.toString());

    $("#fabricid").val(AllData.fabricId);
    $("#fabrictitle").val(AllData.fabricTitle);
    $("#fabricbrand").val(AllData.fabricBrand);
    $("#fabricdetail").val(AllData.fabricDetails);
    $("#fabricprice").val(AllData.fabricPrice);
    $("#owner").val(AllData.ownerid).trigger('change');
    $("#skuno").val(AllData.skuNo);
    $("#releasedate").val(AllData.releaseDate);
    $("#hexcolor").val(AllData.hexColor);
    $("#fabriccategory").val(AllData.categoryId).trigger('change');
    $("#fabriccolorname").val(AllData.colorName);
    //$("#fabrictype").val(AllData.fabricType);
    $("#fabricPricevariable").val(AllData.isPriceVariable).trigger('change');
    $("#fabricactivestatus").val(AllData.isActive).trigger('change');
    $("#customerstyletable").hide();
    $("#customerstyletableform").show();
    $("#savebtncustomerstyle").hide();
    $("#updatebtncustomerstyle").show();
}



// This function is created For Refresh Action / Backbutton
$('#reloadbtn').on('click', function(event) {
    event.preventDefault();
    $("#customerstyletable").show();
    $("#customerstyletableform").hide();
    $("#savebtncustomerstyle").show();
    $("#updatebtncustomerstyle").hide();
    settabledata(styleData);
    var productId = $("#fabricid").val();
    var table = $('#styletbl').DataTable();
    var row = table.row(function(idx, data, node) {
        return data[9] === productId;
    });
    if (row.length > 0) {
        row.select()
            .show()
            .draw(false);
    }
});

// This function is created For Save Style Data
$('#savebtncustomerstyle').on('click', function(event) {
    event.preventDefault();
    var fabrictitle = $("#fabrictitle").val();
    var fabricbrand = $("#fabricbrand").val();
    var fabricdetail = $("#fabricdetail").val();
    var fabricprice = $("#fabricprice").val();
    var skuno = $("#skuno").val();
    var owner = $("#owner").val();
    var releasedate = $("#releasedate").val();
    var hexcolor = $("#hexcolor").val();
    var fabriccategory = $("#fabriccategory").val();
    var fabriccolorname = $("#fabriccolorname").val();
    var fabricPricevariable = $("#fabricPricevariable").val();
    var fabricactivestatus = $("#fabricactivestatus").val();
    var roleid = $("#roleid").val();
    var empid = $("#empid").val();
    if (roleid == "4") {
        fabricactivestatus = "0";
        owner = empid;
    }
    // if(fabrictitle==""||fabricbrand==""||fabricdetail==""||fabricprice==""||skuno==""||releasedate==""||hexcolor==""||fabriccategory==""||fabriccolorname==""||fabrictype==""||fabricPricevariable==""||fabricactivestatus==""){
    //   swal("Parameter missing");
    // }
    // else{
    var obj = {
        categoryId: fabriccategory,
        colorName: fabriccolorname,
        fabricBrand: fabricbrand,
        fabricDetails: fabricdetail,
        fabricPrice: fabricprice,
        fabricTitle: fabrictitle,
        hexColor: hexcolor,
        ownerid: owner,
        isActive: fabricactivestatus,
        isPriceVariable: fabricPricevariable,
        releaseDate: releasedate,
        skuNo: skuno
    };
    $.ajax({
        url: api_url + 'createfabric.php',
        type: 'POST',
        data: obj,
        dataType: 'json',
        beforeSend: function() {
            $(".preloader").show();
            // console.log("before");
        },
        success: function(response) {
            if (response.Responsecode === 200) {
                swal(response.Message);

                // $("#customerstyletable").show();
                // $("#customerstyletableform").hide();
                obj.fabricId = response.RowId.toString();
                styleData.set(response.RowId.toString(), obj);
                $("#fabricid").val(response.RowId.toString());
                // settabledata(styleData);
            } else {
                swal("Please Retry Again");
                // swal(response.Message);
            }
        },
        complete: function(response) {

            // console.log("after");
            $(".preloader").hide();
        }
    });
    // }
});

// This function is created For Update Style Data
$('#updatebtncustomerstyle').on('click', function(event) {
    event.preventDefault();
    var fabricid = $("#fabricid").val();
    var fabrictitle = $("#fabrictitle").val();
    var fabricbrand = $("#fabricbrand").val();
    var fabricdetail = $("#fabricdetail").val();
    var fabricprice = $("#fabricprice").val();
    var skuno = $("#skuno").val();
    var owner = $("#owner").val();
    var releasedate = $("#releasedate").val();
    // alert(releasedate);
    var hexcolor = $("#hexcolor").val();
    var fabriccategory = $("#fabriccategory").val();
    var fabriccolorname = $("#fabriccolorname").val();
    // var fabrictype = $("#fabrictype").val();
    var fabricPricevariable = $("#fabricPricevariable").val();
    var fabricactivestatus = $("#fabricactivestatus").val();
    var roleid = $("#roleid").val();
    var empid = $("#empid").val();
    if (roleid == "4") {
        fabricactivestatus = "0";
        owner = empid;
    }
    // if(fabricid==""||fabrictitle==""||fabricbrand==""||fabricdetail==""||fabricprice==""||skuno==""||releasedate==""||hexcolor==""||fabriccategory==""||fabriccolorname==""||fabrictype==""||fabricPricevariable==""||fabricactivestatus==""){
    //   swal("Parameter missing");
    // }
    // else{
    var obj = {
        categoryId: fabriccategory,
        colorName: fabriccolorname,
        fabricBrand: fabricbrand,
        fabricDetails: fabricdetail,
        fabricId: fabricid,
        ownerid: owner,
        fabricPrice: fabricprice,
        fabricTitle: fabrictitle,
        // fabricType: fabrictype,
        hexColor: hexcolor,
        isActive: fabricactivestatus,
        isPriceVariable: fabricPricevariable,
        releaseDate: releasedate,
        skuNo: skuno
    };
    $.ajax({
        url: api_url + 'editfabric.php',
        type: 'POST',
        data: obj,
        dataType: 'json',
        beforeSend: function() {
            $(".preloader").show();
            // console.log("before");
        },
        success: function(response) {
            if (response.Responsecode === 200) {
                swal(response.Message);

                // $("#customerstyletable").show();
                // $("#customerstyletableform").hide();
                styleData.set(fabricid.toString(), obj);
                settabledata(styleData);
            } else {
                swal("Please Retry Again");
                // swal(response.Message);
            }
        },
        complete: function(response) {

            // console.log("after");
            $(".preloader").hide();
        }
    });
    // }
});

// This function is created For Remove Button
function removeFabric(id) {
    $.ajax({
        url: api_url + 'deletefabric.php',
        type: 'POST',
        data: {
            fabricId: id
        },
        dataType: 'json',
        beforeSend: function() {
            $(".preloader").show();
            // console.log("before");
        },
        success: function(response) {

            if (response.Responsecode === 200) {
                swal(response.Message);
                // getfabrics();
                $("#customerstyletable").show();
                $("#customerstyletableform").hide();
                styleData.delete(id.toString());
                settabledata(styleData);
                var value = 0;
                var table = $('#styletbl').DataTable();
                var tottablen = table.column(0).data().length;
                let i = 0;
                var row = table.row(function(idx, data, node) {
                    i++;
                    if (parseInt(data[9]) < parseInt(id)) {
                        value = data[9];
                        if (i === tottablen) {
                            return value;
                        }
                    } else {
                        // console.log("value new"+value);
                        return value;
                    }

                });
                // console.log(row.length);
                if (row.length > 0) {
                    row.select()
                        .show()
                        .draw(false);
                }
            } else {
                swal("Fabric Already Used Can't Delete");
                // swal(response.Message);
            }

        },
        complete: function(response) {

            // console.log("after");
            $(".preloader").hide();
        }
    });
}

function getDate(date) {
    var output = '-';
    if (date == null) {
        return output;
    } else {
        var d = new Date(date);

        if (d != "Invalid Date") {
            output = d.toDateString(); // outputs to "Thu May 28 2015"
            let outarr = output.split(" ");
            let datestr = outarr[0] + "," + outarr[2] + " " + outarr[1] + " " + outarr[3];
            output = datestr;
        } else {
            output = '-'
        }

    }
    return output;
}