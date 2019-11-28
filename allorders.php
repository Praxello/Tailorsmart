<?php
session_start();
if(isset($_SESSION['employeeId'])){
$employeeId = $_SESSION['employeeId'];
$employeeName = $_SESSION['employeeName'];
$aid = 0;
if(isset($_REQUEST['aid']))
{
  $aid = $_REQUEST['aid'];
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
                    <h3 class="text-primary">All Orders</h3> </div>
                <div class="col-md-7 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                        <li class="breadcrumb-item active">All Orders</li>
                    </ol>
                </div>
            </div>

            <div class="container-fluid">
              <div class="row">
                  <div class="col-md-4">
                      <div class="card p-30">
                          <div class="media">
                              <div class="media-left meida media-middle">
                                  <span><i class="fa fa-user f-s-40 color-primary"></i></span>
                              </div>
                              <div class="media-body media-text-right">
                                  <h2><div id="sptotalorder"></div></h2>
                                  <p class="m-b-0">Total Orders</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-4">
                      <div class="card p-30">
                          <div class="media">
                              <div class="media-left meida media-middle">
                                  <span><i class="fa fa-inr f-s-40 color-success"></i></span>
                              </div>
                              <div class="media-body media-text-right">
                                  <h2><div id="spreceivedamt"></div></h2>
                                  <p class="m-b-0">Total Received Amount</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-4">
                      <div class="card p-30">
                          <div class="media">
                              <div class="media-left meida media-middle">
                                  <span><i class="fa fa-inr f-s-40 color-warning"></i></span>
                              </div>
                              <div class="media-body media-text-right">
                                  <h2><div id="sptotalproduct"></div></h2>
                                  <p class="m-b-0">Total Order Amount</p>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>
                <!-- Start Page Content -->
                <div class="row" id="customerstyletable" style="display:block;">
                    <div class="col-12">
                        <div class="card">
                          <input type="hidden" id="aid" value="<?php echo $aid;?>"/>
                          <div class="row">
                            <div class="col-sm-4">
                              <div class="form-group">
                              <label>From Date</label><font color='red' class="float-right">(MM/DD/YYYY)</font>
                              <input type="text" name="min" id="min" class="form-control" />
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                              <label>Upto Date</label><font color='red' class="float-right">(MM/DD/YYYY)</font>
                              <input type="text" name="max" id="max" class="form-control"  />
                              </div>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                              </div>
                            </div>
                          </div>
                            <div class="card-body">

                                <div class="table-responsive m-t-40">
                                    <table id="customerordertbl" class="display nowrap table table-hover  table-bordered">
                                        <thead>
                                            <tr>
                                              <th>Customer Name</th>
                                              <th>Order Amount</th>
                                              <th>Recieved Amount</th>
                                              <th>Purchase Date</th>
                                              <th>Order Status</th>
                                              <th>Confirmation</th>
                                              <th>Expected Delivery</th>
                                              <th>Final Delivery Date</th>
                                              <th>Created By</th>

                                            </tr>
                                        </thead>
                                        <tbody id="customerordertbldata">
                                        </tbody>
                                    </table>
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
    <script src="date/datepicker.js"></script>
    <script src="date/moment.js"></script>
    <!-- <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/dataTables.buttons.min.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.flash.min.js"></script>
    <script src="js/lib/datatables/cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js"></script>
    <script src="js/lib/datatables/cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/pdfmake.min.js"></script>
    <script src="js/lib/datatables/cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/vfs_fonts.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.html5.min.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.print.min.js"></script>
    <script src="js/lib/datatables/datatables-init.js"></script> -->
    <script src="javascript/allorders.js"></script>
    <script src="js/lib/sweetalert/sweetalert.min.js"></script>
    <!-- <script src="js/lib/sweetalert/sweetalert.init.js"></script> -->

</body>

</html>
<?php }else{
header('Location:index.php');
}?>
