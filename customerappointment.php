<?php
session_start();
if(isset($_SESSION['employeeId'])){
$employeeId = $_SESSION['employeeId'];
$employeeName = $_SESSION['employeeName'];
$cid = 0;
if(isset($_REQUEST['cid']))
{
  $cid = $_REQUEST['cid'];
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
    <!-- Bootstrap Core CSS -->
    <link href="css/lib/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="css/lib/bootstrap/asterisks.css" rel="stylesheet">
    <link href="css/lib/sweetalert/sweetalert.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="css/helper.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link rel="stylesheet" href="date/date.css" />

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
                    <h3 class="text-primary">Dashboard</h3> </div>
                <div class="col-md-7 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                        <li class="breadcrumb-item active">Dashboard</li>
                    </ol>
                </div>
            </div>
            <!-- End Bread crumb -->
            <!-- Container fluid  -->
            <div class="container-fluid">
                <!-- Start Page Content -->
                <div class="row" id="customerappointtbl" style="display:block;">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <input type="hidden" id="cid" value="<?php echo $cid;?>"/>

                                <div class="table-responsive m-t-40">
                                    <table id="appointmenttbl" class="display nowrap table table-hover table-striped table-bordered" cellspacing="0" width="100%">
                                        <thead>
                                            <tr>

                                                <th>Customer Name</th>
                                                <th>Appointment Date</th>
                                                <th style='display:none;'>Date</th>
                                                <th>Slot Time</th>
                                                <th>Address</th>
                                                <th>City</th>
                                                <th>Contact No</th>
                                                <th>Employee Name</th>
                                                <th>Status</th>
                                                <th style='display:none;'>Appointment ID</th>
                                                <th>Created Date</th>
                                                <th>Action </th>
                                            </tr>
                                        </thead>
                                        <tbody id="appointmenttbldata">

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" id="customerappointdetailtbl" style="display:none;">
                  <div class="col-sm-12">
                    <div class="card">
                      <div class="row">
                      <input type="hidden" id="appointmentdetailid" />
                      <div class="col-sm-4">
                        <h4 class="card-title">Customer Name/Mobile No</h4>
                        <h6 class="card-subtitle"><span id="customername"></span></h6>
                      </div>
                        <div class="col-sm-4">
                          <h4 class="card-title">Appointment Date</h4>
                          <h6 class="card-subtitle"><span id="appointmentdate"></span></h6>
                        </div>
                        <div class="col-sm-4">
                          <h4 class="card-title">Appointment Status</h4>
                          <h6 class="card-subtitle"><span id="appointmentstatus"></span></h6>
                        </div>
                        <div class="col-sm-4">
                          <h4 class="card-title">Address</h4>
                          <h6 class="card-subtitle"><span id="appointmentdetailaddr"></span></h6>
                        </div>
                        <div class="col-sm-4">
                          <h4 class="card-title">Slot Time</h4>
                          <h6 class="card-subtitle"><span id="slottime"></span></h6>
                        </div>

                          <div class="col-sm-4">
                            <h4 class="card-title">Email</h4>
                            <h6 class="card-subtitle"><span id="employeename"></span></h6>
                          </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-3"></div>
                  <div class="col-6">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Product Details</h4>

                                <div class="table-responsive m-t-40">
                                    <table id="appointdetailtbl" class="display nowrap table">
                                        <thead>
                                            <tr>
                                                <!-- <th>Id</th> -->
                                                <th>Product Title</th>
                                                <th>SKU</th>
                                                <th>Brand</th>
                                                <th>Fabrics Title</th>

                                            </tr>
                                        </thead>
                                        <tbody id="appointdetailtbldata">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-3"></div>
                    <div class="col-sm-12">
                      <div class="card">
                        <div class="row">

                        <div class="col-sm-3">
                          <div class="form-group required">
                              <label class="control-label ">Appointment Status</label>
                                  <select class="form-control" id="appointmentStatus" style="width:100%;" required>
                                    <option value="0">Idle</option>
                                    <option value="1">Confirmed</option>
                                    <option value="2">Cancelled</option>
                                    <option value="3">Withdrawn by customer</option>
                                    <!-- <option value="5">None</option> -->
                                  </select>
                                </div>
                        </div>
                          <div class="col-sm-3">
                                <div class="form-group required">
                            <label class="control-label">Employee </label>
                                <select class="form-control" id="setemployeeId" style="width:100%;" required>

                                </select>
                              </div>
                          </div>
                          <div class="col-sm-3">
                                <div class="form-group required">
                            <label class="control-label">Slot Time</label>
                                <select class="form-control"  id="settimeslot" style="width:100%;">

                                </select>
                              </div>
                          </div>
                          <div class="col-sm-3">
                                <div class="form-group required">
                            <label class="control-label">Appointment Date</label>
                              <input type="date" class="form-control" id="updateappointmentdate" required/>
                          </div>
                            </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-4">
                            <div class="form-group">
                              <button class="btn btn-success" onclick="updateAppointmentDetails()" >Update</button>
                              <button class="btn btn-primary" id="reloadbtn">Back</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                </div>
                <!-- End PAge Content -->
            </div>
            <!-- End Container fluid  -->
            <!-- footer -->
            <!-- <footer class="footer"> © 2018 All rights reserved. Template designed by <a href="https://colorlib.com/">Colorlib</a></footer> -->
            <!-- End footer -->
        </div>
        <!-- End Page wrapper  -->
    </div>
    <!-- End Wrapper -->
    <!-- All Jquery -->

    <script src="js/lib/jquery/jquery.min.js"></script>
    <script src="javascript/apifile.js"></script>
    <link href="select2/select4.css" rel="stylesheet" />
    <script src="select2/select4.js" type="text/javascript"></script>

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
    <script src="date/datepicker.js"></script>
    <script src="date/moment.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/dataTables.buttons.min.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.flash.min.js"></script>
    <script src="js/lib/datatables/cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js"></script>
    <script src="js/lib/datatables/cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/pdfmake.min.js"></script>
    <script src="js/lib/datatables/cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/vfs_fonts.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.html5.min.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.print.min.js"></script>
    <script src="js/lib/datatables/datatables-init.js"></script>
    <script src="js/getpushnotification.js"></script>
    <script src="javascript/customerappointment.js"></script>
    <script src="js/lib/sweetalert/sweetalert.min.js"></script>
</body>
</html>
<?php }else{
header('Location:index.php');
}?>
