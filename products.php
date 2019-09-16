<!DOCTYPE html>
<html lang="en">


<!-- Mirrored from colorlib.com/polygon/elaadmin/table-datatable.html by HTTrack Website Copier/3.x [XR&CO'2014], Wed, 16 May 2018 06:46:36 GMT -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- Favicon icon -->
    <!-- <link rel="icon" type="image/png" sizes="16x16" href="images/favicon.png"> -->
    <title>Smart - Tailor</title>
    <!-- Bootstrap Core CSS -->
    <link href="css/lib/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="css/lib/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="css/helper.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
      <!-- <link href="dropzone/dropzone.css" rel="stylesheet" type="text/css"> -->

</head>

<body class="fix-header fix-sidebar">
    <!-- Preloader - style you can find in spinners.css -->
    <div class="preloader">
        <svg class="circular" viewBox="25 25 50 50">
			<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /> </svg>
    </div>
    <!-- Main wrapper  -->
    <div id="main-wrapper">
        <!-- header header  -->

        <!-- End header header -->
        <!-- Left Sidebar  -->
        <?php include "mainheader.php"; ?>
        <?php include "leftsidebar.php"; ?>
        <!-- End Left Sidebar  -->
        <!-- Page wrapper  -->
        <div class="page-wrapper">
            <!-- Bread crumb -->
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h3 class="text-primary">Products</h3> </div>
                <div class="col-md-7 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                        <li class="breadcrumb-item active">Products</li>
                    </ol>
                </div>
            </div>

            <div class="container-fluid">
                <!-- Start Page Content -->
                <div class="row" id="customerstyletable" style="display:block;">
                    <div class="col-12">
                        <div class="card">
                          <div class="row">
                            <div class="col-md-12">
                              <button type="button" id="button1" class="btn btn-success" onclick="addStyle()" style="float:right"> New Products</button>
                              <div id="data"></div>

                          </div>
                          </div>
                            <div class="card-body">

                                <div class="table-responsive m-t-40">
                                    <table id="styletbl" class="display nowrap table table-hover  table-bordered">
                                        <thead>
                                            <tr>
                                                <!-- <th>Id</th> -->
                                                <th style="width:15%">Image Icon</th>
                                                <th>Title</th>
                                                <th  style="width:15%">Sub Title</th>
                                                <th  style="width:5%">Parent</th>
                                                <th  style="width:5%">Skuno</th>
                                                <th  style="width:5%">Price</th>
                                                <th  style="width:5%">Release Date</th>
                                                <th  style="width:5%">Sequence</th>
                                                <th  style="width:5%">Status</th>
                                                <th  style="width:5%">Action </th>
                                            </tr>
                                        </thead>
                                        <tbody id="styletbldata">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" id="customerstyletableform" style="display:none;">
                  <div class="col-sm-12">
                    <div class="card">
                      <div class="row">
                          <div class="col-md-12">

                                  <div class="card-body">
                                      <h4 class="card-title">All Products</h4>
                                      <ul class="nav nav-pills m-t-30 m-b-30" id="hidenavtab">
                                          <li class=" nav-item"> <a href="#navpills-1" class="nav-link active" data-toggle="tab" aria-expanded="false"><i class="fa fa-gift"></i>Product</a> </li>
                                          <li class="nav-item"> <a href="#navpills-2" class="nav-link" data-toggle="tab" aria-expanded="false" onclick="fabricmapping();"><i class="fa fa-image"></i>Fabric Mapping</a> </li>
                                          <li class="nav-item"> <a href="#navpills-3" class="nav-link" data-toggle="tab" aria-expanded="true" onclick="measurementmapping();"><i class="fa fa-image"></i>Measurement Mapping</a> </li>
                                          <li class="nav-item"> <a href="#navpills-4" class="nav-link" data-toggle="tab" aria-expanded="true" onclick="stitchstylemapping();"><i class="fa fa-image"></i>Sticthing Style Mapping</a> </li>
                                      </ul>
                                      <div class="tab-content br-n pn">
                                          <div id="navpills-1" class="tab-pane active">
                                            <form id="productform">
                                          <div class="row">
                                          <input type="hidden" id="productId"/>
                                          <div class="col-sm-4">
                                            <div class="form-group">
                                              <label class="control-label">Product Title </label>
                                              <input type="text" class="form-control" id="producttitle"  title="Enter Product Title"/>
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group">
                                              <label class="control-label">Product Sub Title </label>
                                              <input type="text" class="form-control" id="productsubtitle"  title="Enter Product Sub Title"/>
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group">
                                              <label class="control-label">Product Details</label>
                                              <input type="text" class="form-control" id="productdetials"  title="Enter Product Details"/>
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group">
                                              <label class="control-label">Owner</label>
                                            <select  class="form-control" id="owner" style="width:100%;">
                                               <!-- <option value="">Select Owner</option> -->
                                            </select>
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group">
                                              <!-- onkeypress="return isNumberKey(event)" -->
                                              <label class="control-label">Sequence No</label>
                                              <input type="number" class="form-control" id="productsequenceno"  title="Enter Sequence No" onkeypress="return isNumberKey(event)"  />
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group">
                                              <label class="control-label">Parent</label>
                                              <select  class="form-control" id="parent" style="width:100%;">
                                                <!-- <option value="">Select Parent</option> -->
                                              </select>
                                            </div>
                                          </div>

                                          <div class="col-sm-4">
                                            <div class="form-group">
                                              <!--  onkeypress="return isNumberKey(event)"-->
                                              <label class="control-label">Sku Number</label>
                                              <input type="text" class="form-control" id="skuno"  title="Enter SKU No"  />
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group">
                                              <label class="control-label">Release Date</label>
                                              <input type="date" class="form-control" id="releasedate"  title="Enter Release Date"/>
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group">
                                              <label class="control-label">category</label>
                                              <select  class="form-control" id="category" style="width:100%;">
                                                <!-- <option value="">Select Parent</option> -->
                                              </select>
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group">
                                              <label class="control-label">Price</label>
                                              <input type="number" class="form-control" id="price"  title="Enter Product price"/>
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group">
                                              <label class="control-label">Price variable</label>
                                              <select  class="form-control" id="pricevariable" style="width:100%;">
                                                <option value="">Select Status</option>
                                                <option value="1">Off</option>
                                                <option value="0">On</option>
                                              </select>

                                            </div>
                                          </div>
                                            <div class="col-sm-4">
                                              <div class="form-group">
                                                <label class="control-label">Status</label>
                                                <select  class="form-control" id="stylestatus" style="width:100%;">
                                                  <option value="">Select Status</option>
                                                  <option value="0">InActive</option>
                                                  <option value="1">Active</option>
                                                </select>

                                              </div>
                                            </div>
                                            <div class="col-sm-4">

                                                  <div class="form-group">
                                                  <div style="padding-top:32px"></div>
                                                <button class="btn btn-success" id="savebtnproducts">Save</button>
                                                <button class="btn btn-success" id="updatebtnproducts" style="display:none;">Update</button>
                                                <button class="btn btn-secondary" id="reloadbtn" >Back</button>
                                              </div>
                                            </div>

                                          </div>
                                        </form>
                                          </div>
                                          <div id="navpills-2" class="tab-pane">
                                            <div class="row">
                                              <div class="col-md-12">
                                                <button type="button" id="savefabric" class="btn btn-success"  style="float:right">Save Fabric</button>

                                            </div>
                                            </div>
                                            <div class="row">


                                                    <div class="card-body">

                                                        <div class="table-responsive m-t-40">
                                                            <table id="fabricmaptbl" class="display nowrap table table-hover  table-bordered">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Select</th>
                                                                        <!-- <th><input name="fabricmapcheck" value="1" type="checkbox"></th> -->
                                                                        <th>Image Icon</th>
                                                                        <th>Fabric</th>
                                                                        <th>Sku No</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody id="fabricmaptbldata">
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>

                                            </div>
                                          </div>
                                          <div id="navpills-3" class="tab-pane">
                                            <div class="row">
                                              <div class="col-md-12">
                                                <button type="button" id="savemeasurement" class="btn btn-success"  style="float:right">Save Measurement</button>

                                            </div>
                                            </div>
                                              <div class="row">
                                                <div class="card-body">

                                                    <div class="table-responsive m-t-40">
                                                        <table id="measurementmaptbl" class="display nowrap table table-hover  table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>Select</th>

                                                                    <th>Measurement</th>

                                                                </tr>
                                                            </thead>
                                                            <tbody id="measurementmaptbldata">
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                              </div>
                                          </div>
                                          <div id="navpills-4" class="tab-pane">
                                            <div class="row">
                                              <div class="col-md-12">
                                                <button type="button" id="savestitchbtn" class="btn btn-success"  style="float:right">Save Stitch Style</button>

                                            </div>
                                            </div>
                                              <div class="row">
                                                <div class="card-body">

                                                    <div class="table-responsive m-t-40">
                                                        <table id="stitchstylemaptbl" class="display nowrap table table-hover  table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>Select</th>
                                                                    <th>Stitching</th>

                                                                </tr>
                                                            </thead>
                                                            <tbody id="stitchstylemaptbldata">
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                          </div>

                      </div>

                    </div>
                  </div>
                </div>

                <!-- End PAge Content -->
            </div>

        </div>
        <!-- End Page wrapper  -->
    </div>
    <!-- End Wrapper -->
    <!-- All Jquery -->
    <script src="js/lib/jquery/jquery.min.js"></script>
    <script src="javascript/apifile.js"></script>
    <script src="javascript/validation.js"></script>
    <link href="select2/select4.css" rel="stylesheet" />
    <script src="select2/select4.js" type="text/javascript"></script>
    <!-- Bootstrap tether Core JavaScript -->
    <script src="js/lib/bootstrap/js/popper.min.js"></script>
    <script src="js/lib/bootstrap/js/bootstrap.min.js"></script>
    <!-- slimscrollbar scrollbar JavaScript -->
    <script src="js/jquery.slimscroll.js"></script>
    <!--Menu sidebar -->
    <script src="js/sidebarmenu.js"></script>
    <!--stickey kit -->
    <script src="js/lib/sticky-kit-master/dist/sticky-kit.min.js"></script>
    <!--Custom JavaScript -->
    <script src="js/custom.min.js"></script>


    <!-- <script src="js/lib/datatables/datatables.min.js"></script> -->
    <script src="https://cdn.datatables.net/v/dt/dt-1.10.16/sl-1.2.5/datatables.min.js">

    </script>
    <!-- <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/dataTables.buttons.min.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.flash.min.js"></script>
    <script src="js/lib/datatables/cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js"></script>
    <script src="js/lib/datatables/cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/pdfmake.min.js"></script>
    <script src="js/lib/datatables/cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/vfs_fonts.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.html5.min.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.print.min.js"></script>
    <script src="js/lib/datatables/datatables-init.js"></script> -->
    <!-- <script src="dropzone/dropzone.js" type="text/javascript"></script> -->
    <script src="javascript/products.js"></script>
    <script src="js/lib/sweetalert/sweetalert.min.js"></script>
    <script src="https://gyrocode.github.io/jquery-datatables-checkboxes/1.2.10/js/dataTables.checkboxes.min.js">

    </script>
    <!-- <script src="js/lib/sweetalert/sweetalert.init.js"></script> -->
    <!-- <script type='text/javascript'>
    Dropzone.autoDiscover = false;
    $(".dropzone").dropzone({
        addRemoveLinks: true,
        removedfile: function(file) {
            var name = file.name;
            var eventgallery = $("#eventgallery").val();
            alert(name);
            alert(eventgallery);
            $.ajax({
                type: 'POST',
                url: './src/uploadeventgallary.php',
                data: {name: name,eventgallery:eventgallery,request: 2},
                sucess: function(data){
                    console.log('success: ' + data);
                }
            });
            var _ref;
            return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
        }
    });
    </script> -->
</body>

</html>
