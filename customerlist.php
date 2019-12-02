<?php
session_start();
if(isset($_SESSION['employeeId'])){
$employeeId = $_SESSION['employeeId'];
$employeeName = $_SESSION['employeeName'];
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
    <link href="dropzone/dropzone.css" rel="stylesheet">

</head>

<body class="fix-header fix-sidebar">
    <!-- Preloader - style you can find in spinners.css -->
    <div class="preloader">
        <svg class="circular" viewBox="25 25 50 50">
			<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /> </svg>
    </div>
    <!-- Main wrapper  -->
    <div id="main-wrapper">
        <?php include "mainheader.php"; ?>
        <?php include "leftsidebar.php"; ?>
        <div class="page-wrapper">
            <!-- Bread crumb -->
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h3 class="text-primary">Customer List</h3> </div>
                <div class="col-md-7 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                        <li class="breadcrumb-item active">Customer List</li>
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
                              <button type="button" id="button1" class="btn btn-success" onclick="addStyle()" style="float:right"> New Customer</button>
                              <div id="data"></div>
                          </div>
                          </div>
                            <div class="card-body">

                                <div class="table-responsive m-t-40">
                                    <table id="styletbl" class="display nowrap table table-hover  table-bordered">
                                        <thead>
                                            <tr>
                                                <!-- <th>Id</th> -->
                                                <th>Customer Name </th>
                                                <!-- <th>Gender</th> -->
                                                <th>Email</th>
                                                <th>Mobile No</th>
                                                <th>Address</th>
                                                <!-- <th>Status</th> -->
                                                <th>Action </th>
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

                <div class="row" id="customerdata" style="display:none;">
                              <input type="hidden" id="customerId" />
                  <div class="col-sm-12" id="formcustomer" style="display:none;">
                    <div class="card">

                      <div class="row">

                        <div class="col-sm-4">
                          <div class="form-group required">
                            <label class="control-label">First Name</label>
                            <input type="text" class="form-control" id="cfname"  title="Enter First Name"/>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group required">
                            <label class="control-label">Last Name</label>
                            <input type="text" class="form-control" id="clname"  title="Enter Last Name"/>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group required">
                            <label class="control-label">Email</label>
                            <input type="email" class="form-control" id="cemail"  title="Enter Email"/>
                          </div>
                        </div>
                      </div>
                      <div class="row">

                        <div class="col-sm-4">
                          <div class="form-group required">
                            <label class="control-label">Birth Date</label>
                            <input type="date" class="form-control" id="cdob"  title="Enter Birth Date"/>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group required">
                            <label class="control-label">Mobile</label>
                            <input type="text" class="form-control" id="cmobile"  title="Enter Mobile"/>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group required">
                            <label class="control-label">Gender</label>

                            <select  class="form-control" id="cgender" style="width:100%;">
                              <option value="">Select Gender</option>
                              <option value="0">Male</option>
                              <option value="1">Female</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="row">

                        <div class="col-sm-4">
                          <div class="form-group required">
                            <label class="control-label">City</label>
                            <input type="text" class="form-control" id="ccity"  title="Enter City"/>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group required">
                            <label class="control-label">State</label>
                            <input type="text" class="form-control" id="cstate"  title="Enter State"/>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group required">
                            <label class="control-label">Country</label>
                            <input type="text" class="form-control" id="ccountry"  title="Enter Country"/>
                          </div>
                        </div>
                      </div>
                      <div class="row">

                        <div class="col-sm-8">
                          <div class="form-group required">
                            <label class="control-label">Address</label>
                            <input type="text" class="form-control" id="caddress"  title="Enter Address"/>
                          </div>
                        </div>

                        <div class="col-sm-4">
                          <div class="form-group required">
                            <label class="control-label">Password</label>
                            <input type="text" class="form-control" id="cpassword"  title="Enter Password"/>
                          </div>
                        </div>
                      </div>
                        <div class="row">
                          <div class="col-sm-4">

                                <div class="form-group">
                                <div style="padding-top:32px"></div>
                              <button class="btn btn-success" id="savebtncustomerstyle"  >Save</button>
                              <button class="btn btn-success" id="updatebtncustomerstyle" style="display:none;">Update</button>
                              <button class="btn btn-secondary" id="reloadbtn">Back</button>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>

                    <div class="col-sm-12" id="formmeasure" style="display:none;">
                    <div class="row" >

                    <div class="col-12">
                        <div class="card">
                          <div class="row">
                            <div class="col-md-12">
                              <button class="btn btn-secondary" id="reloadbtn1" style="float:left">Back</button>
                              <button type="button" id="saveMeasurementsData1" class="btn btn-success" style="float:right"> SAVE MEASUREMENT</button>

                          </div>
                          </div>
                            <div class="card-body">

                                <div class="table-responsive m-t-40">
                                    <table id="productTable" class="display nowrap table table-hover  table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Measurement ID</th>
                                                <th>Measurement Name</th>
                                                <th style="display:none;">Measurement ID</th>
                                                <th>Value</th>

                                                <!-- <th>Action </th> -->
                                            </tr>
                                        </thead>
                                        <tbody id="productlist">
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
        <!-- End Page wrapper  -->
    </div>

    <!-- End Wrapper -->
    <!-- All Jquery -->
    <script src="js/lib/jquery/jquery.min.js"></script>

    <!-- include 'add_customer_measurments.php'; -->
    <script src="javascript/apifile.js"></script>
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

    <link href="dropzone/dropzone.js" rel="stylesheet">
    <script src="js/lib/datatables/datatables.min.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/dataTables.buttons.min.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.flash.min.js"></script>
    <script src="js/lib/datatables/cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js"></script>
    <script src="js/lib/datatables/cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/pdfmake.min.js"></script>
    <script src="js/lib/datatables/cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/vfs_fonts.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.html5.min.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.print.min.js"></script>
    <script src="js/lib/datatables/datatables-init.js"></script>
    <script src="javascript/customerlist.js"></script>
    <script src="js/lib/sweetalert/sweetalert.min.js"></script>

</body>

</html>
<?php }else{
header('Location:index.php');
}?>
