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
                    <h3 class="text-primary">Stitch Styles</h3> </div>
                <div class="col-md-7 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                        <li class="breadcrumb-item active">Stitch Styles</li>
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
                              <button type="button" id="button1" class="btn btn-success" onclick="addStyle()" style="float:right"> New Stitch Style</button>
                              <div id="data"></div>
                          </div>
                          </div>
                            <div class="card-body">

                                <div class="table-responsive m-t-40">
                                    <table id="styletbl" class="display nowrap table table-hover  table-bordered">
                                        <thead>
                                            <tr>
                                                <!-- <th>Id</th> -->
                                                <th>Stitch Styles Image</th>
                                                <th>Title</th>
                                                <th>Details</th>
                                                <th>Stitch Styles Type</th>
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
                <div class="row" id="customerstyletableform" style="display:none;">
                  <div class="col-sm-12">
                    <div class="card">
                      <div class="row">
                      <input type="hidden" id="styleid"/>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">Title</label>
                          <input type="text" class="form-control" id="styletitle"  title="Enter Title"/>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">Detail</label>
                          <input type="text" class="form-control" id="styledetail"  title="Enter Detail"/>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">Type</label>
                          <select  class="form-control" id="styletype" style="width:100%;">
                            <option value="">Select Stitch Type</option>
                            <option value="0">Multiple selection</option>
                            <option value="1">Single Selection</option>
                            <option value="2">Input Field</option>
                          </select>
                        </div>
                      </div>
                        <!-- <div class="col-sm-4">
                          <div class="form-group required">
                            <label class="control-label">Status</label>
                            <select  class="form-control" id="stylestatus" style="width:100%;">
                              <option value="">Select Status</option>
                              <option value="0">InActive</option>
                              <option value="1">Active</option>
                            </select>

                          </div>
                        </div> -->
                        <div class="col-sm-4">

                              <div class="form-group">
                              <div style="padding-top:32px"></div>
                            <button class="btn btn-success" id="savebtncustomerstyle">Save</button>
                            <button class="btn btn-success" id="updatebtncustomerstyle" style="display:none;">Update</button>
                            <button class="btn btn-secondary" id="reloadbtn" >Back</button>
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
    <!-- <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/dataTables.buttons.min.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.flash.min.js"></script>
    <script src="js/lib/datatables/cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js"></script>
    <script src="js/lib/datatables/cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/pdfmake.min.js"></script>
    <script src="js/lib/datatables/cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/vfs_fonts.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.html5.min.js"></script>
    <script src="js/lib/datatables/cdn.datatables.net/buttons/1.2.2/js/buttons.print.min.js"></script>
    <script src="js/lib/datatables/datatables-init.js"></script> -->
    <script src="javascript/stitchstyle.js"></script>
    <script src="js/lib/sweetalert/sweetalert.min.js"></script>
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
            // $.ajax({
            //     type: 'POST',
            //     url: './src/uploadeventgallary.php',
            //     data: {name: name,eventgallery:eventgallery,request: 2},
            //     sucess: function(data){
            //         console.log('success: ' + data);
            //     }
            // });
            var _ref;
            return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
        }
    });
    </script> -->
</body>

</html>
<?php }else{
header('Location:index.php');
}?>
