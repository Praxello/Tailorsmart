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
    <!-- <link rel="icon" type="image/png" sizes="16x16" href="images/favicon.png"> -->
    <title>Smart - Tailor</title>
    <!-- Bootstrap Core CSS -->
    <link href="css/lib/bootstrap/asterisks.css" rel="stylesheet">
    <link href="css/lib/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="css/lib/bootstrap/bootstrap.min.css" rel="stylesheet">
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
                    <h3 class="text-primary">Add Users</h3> </div>
                <div class="col-md-7 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                        <li class="breadcrumb-item active">Add Users</li>
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
                              <button type="button" id="button1" class="btn btn-success" onclick="addStyle()" style="float:right">Add Employee</button>
                              <div id="data"></div>
                          </div>
                          </div>
                            <div class="card-body">

                                <div class="table-responsive m-t-40">
                                    <table id="employeetbl" class="display nowrap table table-hover  table-bordered">
                                        <thead>
                                            <tr>

                                                <th>Emp Name</th>
                                                <th>Email</th>
                                                <th>Mobile</th>
                                                <th>User Role</th>
                                                <th>Address</th>
                                                <th>Password</th>
                                                <th >Status</th>
                                                <th >Action </th>
                                            </tr>
                                        </thead>
                                        <tbody id="employeetbldata">
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

                      <input type="hidden" id="empid"/>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">First Name</label>
                          <input type="text" class="form-control" id="firstname"  title="Enter First Name" required/>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">Last Name</label>
                          <input type="text" class="form-control" id="lastname"  title="Enter Last Name" required/>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">User Role</label>
                          <select  class="form-control" id="userrole" style="width:100%;" required>

                          </select>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">Email</label>
                          <input type="text" class="form-control" id="email"  title="Enter Email" required/>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">Mobile No</label>
                          <input type="text" class="form-control" id="mobileno"  title="Enter Mobile No" required/>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">City</label>
                          <input type="text" class="form-control" id="city"  title="Enter City" required/>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">State</label>
                          <input type="text" class="form-control" id="state"  title="Enter State" required/>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">Address</label>
                          <input type="text" class="form-control" id="address"  title="Enter Addres" required/>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group ">
                          <label class="control-label">Birth Date</label>
                          <input type="date" class="form-control" id="birthdate"  title="Enter Birth Date" required/>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group ">
                          <label class="control-label">Adhar Id</label>
                          <input type="text" class="form-control" id="adharid"  title="Enter Adhar Id" required/>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">Password</label>
                          <input type="text" class="form-control" id="password"  title="Enter Password" required/>
                        </div>
                      </div>
                        <div class="col-sm-4">
                          <div class="form-group ">
                            <label class="control-label">Status</label>
                            <select  class="form-control" id="stylestatus" style="width:100%;">
                              <option value="">Select Status</option>
                              <option value="0">InActive</option>
                              <option value="1">Active</option>
                            </select>

                          </div>
                        </div>
                        <div class="col-sm-4">

                              <div class="form-group required">
                              <div style="padding-top:32px"></div>
                            <button class="btn btn-success" id="savebtncustomerstyle"  >Save</button>
                            <button class="btn btn-success" id="updatebtncustomerstyle" style="display:none;">Update</button>
                            <button class="btn btn-secondary" id="reloadbtn">Back</button>
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
    <link href="select2/select4.css" rel="stylesheet" />
    <script src="select2/select4.js" type="text/javascript"></script>
    <!-- <script src="javascript/collectionsort.js"></script> -->
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
    <!-- <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/dataTables.buttons.min.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.flash.min.js"></script>
    <script src="js/lib/datatables/cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js"></script>
    <script src="js/lib/datatables/cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/pdfmake.min.js"></script>
    <script src="js/lib/datatables/cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/vfs_fonts.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.html5.min.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.print.min.js"></script>
    <script src="js/lib/datatables/datatables-init.js"></script> -->
    <script src="javascript/emp.js"></script>
    <script src="js/lib/sweetalert/sweetalert.min.js"></script>
    <!-- <script src="js/lib/sweetalert/sweetalert.init.js"></script> -->

</body>

</html>
<?php }else{
header('Location:index.php');
}?>
