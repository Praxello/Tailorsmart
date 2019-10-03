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
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon.png">
    <title>Smart - Tailor</title>
    <!-- Bootstrap Core CSS -->
    <link href="css/lib/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="select2/select4.css" rel="stylesheet">
    <link href="select2/select2-bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="css/helper.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
<!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"> -->
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:** -->
    <!--[if lt IE 9]>
    <script src="https:**oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https:**oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
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
                    <h3 class="text-primary">Customers</h3>
                </div>
                <div class="col-md-7 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                        <li class="breadcrumb-item active">Customers</li>
                    </ol>
                </div>
            </div>
            <!-- End Bread crumb -->
            <!-- Container fluid  -->
            <div class="container-fluid">
                <!-- Start Page Content -->
                <input type="hidden" id="empId" value="<?php echo $employeeId;?>" />
                <input type="hidden" id="empName" value="<?php echo $employeeName;?>" />
               <div id="loadNewPage"></div>
                <div class="row"  id="customerSelectionBlock" >
                    <div class="col-sm-12">
                        <div class="card">
                        <div class="row">
                                <div class="col-sm-4">

                                </div>
                                <div class="col-sm-4">
                                <div class="form-group">
                                        <label class="control-label">Select Customer </label>

                                    </div>
                                </div>
                                <div class="col-sm-4">
                                <div class="form-group">
                                </div>
                            </div>
                        </div>
                            <div class="row">
                                <div class="col-sm-4">

                                </div>
                                <div class="col-sm-4">
                                <div class="form-group">
                                        <select class="form-control form-control-sm" id="customerId" onchange="getOrdersOfCustomer(this.value)" style="width:100%;">
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                <div class="form-group">
                                        <button type="button" id="createOrder" class="btn btn-success"><i class="fa  fa-plus"></i>Create New Order</button>
                                    </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row" id="customerOrdersBlock" style="display:none">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Data Export</h4>
                                <!-- <h6 class="card-subtitle">Export data to Copy, CSV, Excel, PDF & Print</h6> -->
                                <div class="table-responsive m-t-40">
                                    <table id="customerOrdersDataTable" class="display nowrap table table-hover table-striped table-bordered" cellspacing="0" width="100%">
                                        <thead>
                                            <tr>
                                                <th>Order Amount</th>
                                                <th>Recieved Amount</th>
                                                <th>Promo code</th>
                                                <th>Order Status</th>
                                                <th>Confirmation</th>
                                                <th>Expected Delivery</th>
                                                <th>Final Delivery Date</th>
                                                <th>Created By</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody id="customerOrdersData">
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
    <!-- <script src="js/lib/jquery/jquery.min.js"></script> -->
    <script src="select2/select4.js"></script>
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
    <script src="js/customer.js"></script>
    <script src="js/lib/datatables/datatables.min.js"></script>
    <!-- <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/dataTables.buttons.min.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.flash.min.js"></script>
    <script src="js/lib/datatables/cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js"></script>
    <script src="js/lib/datatables/cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/pdfmake.min.js"></script>
    <script src="js/lib/datatables/cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/vfs_fonts.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.html5.min.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.print.min.js"></script> -->
    <script src="js/lib/datatables/datatables-init.js"></script>

</body>
</html>
<?php }else{
header('Location:index.php');
}?>
