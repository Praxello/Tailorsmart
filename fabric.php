<?php
session_start();
if(isset($_SESSION['employeeId'])){
$employeeId = $_SESSION['employeeId'];
$employeeName = $_SESSION['employeeName'];
$roleId = $_SESSION['roleId'];
$fid = 0;
if(isset($_REQUEST['fid']))
{
  $fid = $_REQUEST['fid'];
}
?>
<!DOCTYPE html>
<html lang="en">
<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
<head>
    <?php include "metatag.php"; ?>
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon.png">
    <title>Smart - Tailor</title>
    <!-- Bootstrap Core CSS -->
    <link href="css/lib/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="css/lib/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="css/lib/bootstrap/asterisks.css" rel="stylesheet">
    <link href="css/helper.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">

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
                    <h3 class="text-primary">Fabrics</h3> </div>
                <div class="col-md-7 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                        <li class="breadcrumb-item active">Fabrics</li>
                    </ol>
                </div>
            </div>

            <div class="container-fluid">
                <!-- Start Page Content -->
                <div class="row" id="customerstyletable" style="display:block;">
                    <div class="col-12">
                        <div class="card">
                          <input type="hidden" id="fid" value="<?php echo $fid;?>"/>
                          <input type="hidden" id="empid" value="<?php echo $employeeId;?>"/>
                          <input type="hidden" id="roleid" value="<?php echo $roleId;?>"/>
                          <div class="row">
                            <div class="col-md-12">
                              <?php if($roleId!=4){?>
                              <button type="button" id="inactbtn" class="btn btn-primary" style="float:left;">To Be Approved</button>
                              <button type="button" id="actbtn" class="btn btn-primary" style="float:left;display:none;">Fabric Table</button>
                              <?php } ?>
                              <button type="button" id="button1" class="btn btn-success" onclick="addStyle()" style="float:right"> New Fabrics</button>
                              <div id="data"></div>
                          </div>
                          </div>
                            <div class="card-body">

                                <div class="table-responsive m-t-40">
                                    <table id="styletbl" class="display nowrap table table-hover  table-bordered">
                                        <thead>
                                            <tr>
                                                <!-- <th>Id</th> -->
                                                <th>Image Icon</th>
                                                <th>Fabric Title</th>
                                                <th>Fabric Brand</th>
                                                <th>SKU No</th>
                                                <th>Price</th>
                                                <th>Release Date</th>
                                                <th>Created by</th>
                                                <th>Status</th>
                                                <th>Action</th>
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
                      <form id="fabricform">
                      <div class="row">
                      <input type="hidden" id="fabricid"/>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">Fabric Title</label>
                          <input type="text" class="form-control" id="fabrictitle"  title="Enter Fabric Title" required/>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">Fabric Brand</label>
                          <input type="text" class="form-control" id="fabricbrand"  title="Enter Fabric Brand" required/>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">Fabric Details</label>
                          <input type="text" class="form-control" id="fabricdetail"  title="Enter Fabric Details" required/>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">Fabric Price</label>
                          <input type="text" class="form-control" id="fabricprice"  title="Enter Fabric Price" required/>
                        </div>
                      </div>
                        <?php if($roleId!=4){?>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">Source</label>
                        <select  class="form-control" id="owner" style="width:100%;">

                        </select>
                        </div>
                      </div>
                        <?php } ?>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">SKU No</label>
                          <input type="text" class="form-control" id="skuno"  title="Enter SKU No" value="<?php echo rand(100,1000);?>" required/>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">Release Date</label>
                          <input type="date" class="form-control" id="releasedate"  title="Enter Release Date" required/>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">Hexcolor</label>
                          <input type="color" class="form-control" id="hexcolor"  title="Enter Hexcolor" required/>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">Category</label>
                          <select  class="form-control" id="fabriccategory" style="width:100%;" required>

                            <option value="0">InActive</option>
                            <option value="1">Active</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">Color Name</label>
                          <input type="text" class="form-control" id="fabriccolorname"  title="Enter Color Name" required/>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <!-- <div class="form-group required">
                          <label class="control-label">Fabric Type</label>
                          <input type="text" class="form-control" id="fabrictype"  title="Enter Title" required/>
                        </div> -->
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">Price Variable</label>
                          <select  class="form-control" id="fabricPricevariable" style="width:100%;" required>
                            <option value="">Select Status</option>
                            <option value="0">Off</option>
                            <option value="1">On</option>
                          </select>
                        </div>
                      </div>
                        <?php if($roleId!=4){?>
                        <div class="col-sm-4">
                          <div class="form-group required">
                            <label class="control-label"> Active Status</label>
                            <select  class="form-control" id="fabricactivestatus" style="width:100%;" required>
                              <option value="">Select Status</option>
                              <option value="0">InActive</option>
                              <option value="1">Active</option>
                            </select>

                          </div>
                        </div>
                          <?php } ?>
                        <div class="col-sm-4">

                              <div class="form-group required">
                              <div style="padding-top:32px"></div>
                            <button class="btn btn-success" id="savebtncustomerstyle"  >Save</button>
                            <button class="btn btn-success" id="updatebtncustomerstyle"  style="display:none;">Update</button>
                            <button class="btn btn-secondary" id="reloadbtn">Back</button>
                          </div>
                        </div>

                      </div>
                    </form>
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
    <link href="select2/select4.css" rel="stylesheet" />
    <script src="select2/select4.js" type="text/javascript"></script>
    <!-- Bootstrap tether Core JavaScript -->
    <!-- <script src="js/lib/bootstrap/js/popper.min.js"></script> -->
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
    <script src="javascript/fabric.js"></script>
    <script src="js/lib/sweetalert/sweetalert.min.js"></script>
    <!-- <script src="js/lib/sweetalert/sweetalert.init.js"></script> -->

</body>
</html>
<?php }else{
header('Location:index.php');
}?>
