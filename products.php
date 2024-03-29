<?php
session_start();
if(isset($_SESSION['employeeId'])){
$employeeId = $_SESSION['employeeId'];
$employeeName = $_SESSION['employeeName'];
$roleId = $_SESSION['roleId'];
$pid = 0;
if(isset($_REQUEST['pid']))
{
  $pid = $_REQUEST['pid'];
}
?>
<!DOCTYPE html>
<html lang="en">
<meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
<head>
  <?php include "metatag.php"; ?>
      <!-- Favicon icon -->
      <link rel="icon" type="image/png" sizes="16x16" href="images/favicon.png">
    <title>Smart - Tailor</title>
    <link href="css/lib/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="css/lib/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="css/lib/bootstrap/asterisks.css" rel="stylesheet">
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
                            <input type="hidden" id="pid" value="<?php echo $pid;?>"/>
                            <input type="hidden" id="empid" value="<?php echo $employeeId;?>"/>
                            <input type="hidden" id="roleid" value="<?php echo $roleId;?>"/>
                            <div class="col-md-12">
                              <?php if($roleId!=4){?>

                              <button type="button" id="inactbtn" class="btn btn-primary" style="float:left;">To Be Approved</button>
                              <button type="button" id="actbtn" class="btn btn-primary" style="float:left;display:none;">Product Table</button>
                              <?php } ?>
                              <button type="button" id="button1" class="btn btn-success" onclick="addStyle()" style="float:right"> New Products</button>
                              <div id="data"></div>

                          </div>
                          </div>
                            <div class="card-body">
                            <div class="spinner-border" role="status" id="loader" style="display: none;">
  <span class="sr-only">Loading...</span>
</div>
                                <div class="table-responsive m-t-40">
                                    <table id="styletbl" class="display nowrap table table-hover  table-bordered">
                                        <thead>
                                            <tr>
                                                <!-- <th>Id</th> -->
                                                <th style="width:15%">Image Icon</th>
                                                <th>Title</th>

                                                <th  style="width:5%">Parent</th>
                                                <th  style="width:5%">Skuno</th>
                                                <th  style="width:5%">Price</th>
                                                <th  style="width:5%">Release Date</th>
                                                <th  style="width:5%">Sequence</th>
                                                <th  style="width:15%">Created by</th>
                                                <th  style="width:5%">Status</th>
                                                <th  style="width:5%">Action </th>
                                                <th style="display:none;">Row ID</th>
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
                                          <li class=" nav-item"> <a href="#navpills-1" class="nav-link active" data-toggle="tab" aria-expanded="false"><i class="fa fa-diamond"></i>Product</a> </li>
                                          <li class="nav-item"> <a href="#navpills-2" class="nav-link" data-toggle="tab" aria-expanded="false" ><i class="fa fa-gift"></i>Fabric Mapping</a> </li>
                                          <li class="nav-item"> <a href="#navpills-3" class="nav-link" data-toggle="tab" aria-expanded="true" ><i class="fa fa-balance-scale"></i>Measurement Mapping</a> </li>
                                          <li class="nav-item"> <a href="#navpills-4" class="nav-link" data-toggle="tab" aria-expanded="true"><i class="fa fa-tags"></i>Sticthing Style Mapping</a> </li>
                                      </ul>
                                      <div class="tab-content br-n pn">
                                          <div id="navpills-1" class="tab-pane active">
                                            <form id="productform">
                                          <div class="row">
                                          <input type="hidden" id="productId"/>
                                          <div class="col-sm-4">
                                            <div class="form-group required">
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
                                          <?php if($roleId!=4){?>
                                          <div class="col-sm-4">
                                            <div class="form-group required">
                                              <label class="control-label">Source</label>
                                            <select  class="form-control" id="owner" style="width:100%;">
                                               <!-- <option value="">Select Owner</option> -->
                                            </select>
                                            </div>
                                          </div>
                                          <?php } ?>
                                          <div class="col-sm-4">
                                            <div class="form-group required">

                                              <label class="control-label">Sequence No</label>
                                              <input type="number" class="form-control" id="productsequenceno"  title="Enter Sequence No" onkeypress="return isNumberKey(event)"  />
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group required">
                                              <label class="control-label">Parent</label>
                                              <select  class="form-control" id="parent" style="width:100%;">
                                                <!-- <option value="">Select Parent</option> -->
                                              </select>
                                            </div>
                                          </div>

                                          <div class="col-sm-4">
                                            <div class="form-group required">
                                              <!--  onkeypress="return isNumberKey(event)"-->
                                              <label class="control-label">Sku Number</label>
                                              <input type="text" class="form-control" id="skuno"  title="Enter SKU No"  />
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group required">
                                              <label class="control-label">Release Date</label>
                                              <input type="date" class="form-control" id="releasedate"  title="Enter Release Date"/>
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group required">
                                              <label class="control-label">Category</label>
                                              <select  class="form-control" id="category" style="width:100%;">
                                              </select>
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group required">
                                              <label class="control-label">Price</label>
                                              <input type="number" class="form-control" id="price"  title="Enter Product price"/>
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group required">
                                              <label class="control-label">Price variable</label>
                                              <select  class="form-control" id="pricevariable" style="width:100%;">
                                                <option value="">Select Status</option>
                                                <option value="1">YES</option>
                                                <option value="0">NO</option>
                                              </select>

                                            </div>
                                          </div>
                                            <?php if($roleId!=4){?>
                                            <div class="col-sm-4">
                                              <div class="form-group required">
                                                <label class="control-label">Status</label>
                                                <select  class="form-control" id="stylestatus" style="width:100%;">
                                                  <option value="">Select Status</option>
                                                  <option value="0">InActive</option>
                                                  <option value="1">Active</option>
                                                </select>

                                              </div>
                                            </div>
                                              <?php } ?>
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
                                                  <div class="col-sm-4" >
                                                  <div class="form-group">
                                                      <label>Search</label>
                                                      <input id="fabricmaptblInput" type="text" placeholder="Search.." class="form-control form-control-sm">
                                                  </div>
                                                  </div>
                                                  <div class="col-sm-2" >
                                                  <div class="form-group">
                                                        <label>Filter</label>
                                                        <div class="btn-group" role="group" aria-label="Basic Example">
                                                      <button class="btn btn-success" id="selectbtn" >Selected</button>
                                                      <button class="btn btn-warning" id="unselectbtn" >Unselected</button>
                                                    </div>
                                                  </div>
                                                  </div>
                                                  <div class="col-sm-2" >
                                                  <div class="form-group">
                                                    <label>Total</label><br/>
                                                    <span id="totselitem"></span>
                                                    <!-- <span id="totunselitem"></span> -->
                                                  </div>
                                                  </div>

                                            </div>
                                            <div class="row">
                                              <div class="col-sm-2" >
                                              <div class="form-group">
                                              </div>
                                            </div>
                                                <div class="col-sm-8" >
                                                <div class="form-group">
                                                    <div class="card-body" style="">

                                                        <div class="table-responsive m-t-40" style="overflow: auto;max-height: 521px;">

                                                            <table id="fabricmaptbl" class="display nowrap table table-hover table-bordered" >
                                                                <thead>
                                                                    <tr>
                                                                        <th>Select</th>

                                                                        <th>Image Icon</th>
                                                                        <th>Fabric</th>
                                                                        <th>Sku No</th>
                                                                        <th>Price</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody id="fabricmaptbldata">
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                  </div>
                                              </div>
                                              <div class="col-sm-2" >
                                              <div class="form-group">
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
                                                  <div class="col-sm-4">
                                                  <div class="form-group">
                                                      <label>Search</label>
                                                      <input id="measurementmaptblInput" type="text" placeholder="Search.." class="form-control form-control-sm">
                                                  </div>
                                                  </div>
                                                  <div class="col-sm-2" >
                                                  <div class="form-group">
                                                        <label>Filter</label>
                                                        <div class="btn-group" role="group" aria-label="Basic Example">
                                                      <button class="btn btn-success" id="measureselectbtn" >Selected</button>
                                                      <button class="btn btn-warning" id="measureunselectbtn" >Unselected</button>
                                                    </div>
                                                  </div>
                                                  </div>
                                                  <div class="col-sm-2" >
                                                  <div class="form-group">
                                                    <label>Total</label><br/>
                                                    <span id="measuretotselitem"></span>
                                                    <!-- <span id="totunselitem"></span> -->
                                                  </div>
                                                  </div>

                                            </div>
                                              <div class="row">
                                                <div class="col-sm-2" >
                                                <div class="form-group">
                                                </div>
                                              </div>
                                              <div class="col-sm-8" >
                                              <div class="form-group">
                                                <div class="card-body" >

                                                    <div class="table-responsive m-t-40" style="">
                                                        <table id="measurementmaptbl" class="display nowrap table table-hover  table-bordered" >
                                                            <thead>
                                                                <tr>
                                                                    <th>Select</th>
                                                                    <th>Sequence Number</th>
                                                                    <th style="text-align: center;">Measurement</th>

                                                                </tr>
                                                            </thead>
                                                            <tbody id="measurementmaptbldata">
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                              </div>
                                              </div>
                                                <div class="col-sm-2" >
                                                <div class="form-group">
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
                                                  <div class="col-sm-4">
                                                  <div class="form-group">
                                                      <label>Search</label>
                                                      <input id="stitchstylemaptblInput" type="text" placeholder="Search.." class="form-control form-control-sm">
                                                  </div>
                                                  </div>
                                                  <div class="col-sm-2" >
                                                  <div class="form-group">
                                                        <label>Filter</label>
                                                        <div class="btn-group" role="group" aria-label="Basic Example">
                                                      <button class="btn btn-success" id="stitchselectbtn" >Selected</button>
                                                      <button class="btn btn-warning" id="stitchunselectbtn" >Unselected</button>
                                                    </div>
                                                  </div>
                                                  </div>
                                                  <div class="col-sm-2" >
                                                  <div class="form-group">
                                                    <label>Total</label><br/>
                                                    <span id="stitchtotselitem"></span>
                                                    <!-- <span id="totunselitem"></span> -->
                                                  </div>
                                                  </div>
                                            </div>
                                              <div class="row">
                                                <div class="col-sm-2" >
                                                <div class="form-group">
                                                </div>
                                              </div>
                                              <div class="col-sm-8" >
                                              <div class="form-group">
                                                <div class="card-body" >

                                                    <div class="table-responsive m-t-40" style="overflow:auto;max-height: 521px;">
                                                        <table id="stitchstylemaptbl" class="display nowrap table table-hover  table-bordered" >
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
                                                <div class="col-sm-2" >
                                                <div class="form-group">
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


    <script src="js/lib/datatables/datatables.min.js"></script>
    <script src="javascript/datatablesl.min.js"></script>
    <script src="javascript/datatablerowshow.min.js"></script>

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

</body>

</html>
<?php }else{
header('Location:index.php');
}?>
