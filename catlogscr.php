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
    <link href="css/lib/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="css/lib/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="css/lib/bootstrap/asterisks.css" rel="stylesheet">
    <link href="css/helper.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
      <link href="css/lib/dropzone/dropzone.css" rel="stylesheet">
    <!-- <link href="dropzone/dropzone.css" rel="stylesheet"> -->

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
                    <h3 class="text-primary">Catlog Screen</h3> </div>
                <div class="col-md-7 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                        <li class="breadcrumb-item active"></li>
                    </ol>
                </div>
            </div>

            <div class="container-fluid">
              
                <!-- Start Page Content -->
           <div class="row" id="displayimgall" style="display:block;">
             <div class="col-12">
                 <div class="card">
                  <div class="gallery" style="display:none;">
                    <?php
                       $foldname = "catlogimages/product/";
                       $dir = $foldname;
                       $ffs = preg_grep('~\.(jpeg|jpg|png)$~', scandir($dir));

                           foreach($ffs as $ff){
                               if($ff != '.' && $ff != '..'){ ?>
                                     <img data-gallery-tag="Products" class="gallery-item" src="catlogimages/product/<?php echo $ff;?>"/>
                                   <?php
                               }
                           };
                    ?>

                      <?php
                         $foldname = "catlogimages/fabrics/";
                         $dir = $foldname;
                         $ffs = preg_grep('~\.(jpeg|jpg|png)$~', scandir($dir));

                             foreach($ffs as $ff){
                                 if($ff != '.' && $ff != '..'){ ?>
                                       <img data-gallery-tag="fabrics" class="gallery-item" src="catlogimages/fabrics/<?php echo $ff;?>"/>
                                     <?php
                                 }
                             };
                      ?>
                 <!-- <img data-gallery-tag="Fabrics"  class="gallery-item" src="images/big/img3.jpg"/>
                  <img data-gallery-tag="Fabrics"  class="gallery-item" src="images/big/img4.jpg"/> -->

                 </div>
              </div>
            </div>
          </div>

          <!-- <div class="row" id="insertproductimg" style="display:none;">
            <div class="col-sm-12">
              <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Product Dropzone</h4>
                    <form action="#" class="dropzone">
                        <div class="fallback">
                            <input name="file" type="file" multiple />
                        </div>
                    </form>
                </div>
              </div>
            </div>
          </div>

          <div class="row" id="insertfabricimg" style="display:none;">
            <div class="col-sm-12">
              <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Fabric Dropzone</h4>
                    <form action="#" class="dropzone">
                        <div class="fallback">
                            <input name="file" type="file" multiple />
                        </div>
                    </form>
                </div>
              </div>
            </div>
          </div> -->

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
    <!-- <script src="js/lib/bootstrap/js/bootstrap.min.js"></script> -->
    <!-- slimscrollbar scrollbar JavaScript -->
    <script src="js/jquery.slimscroll.js"></script>
    <!--Menu sidebar -->
    <script src="js/sidebarmenu.js"></script>
    <!--stickey kit -->
    <script src="js/lib/sticky-kit-master/dist/sticky-kit.min.js"></script>
    <!--Custom JavaScript -->
    <script src="js/custom.min.js"></script>
    <script src="javascript/catlogscr.js"></script>
    <!-- <script href="dropzone/dropzone.js"></script> -->
    <script src="js/lib/dropzone/dropzone.js"></script>
    <script src="js/lib/datatables/datatables.min.js"></script>

    <script src="mau_gallery/bootstrap.min.js"  crossorigin="anonymous"></script>
    <script src="mau_gallery/docs/src/maugallery.js"></script>
    <script src="mau_gallery/docs/assets/scripts.js"></script>
    <script src="js/lib/sweetalert/sweetalert.min.js"></script>



</body>

</html>
<?php }else{
header('Location:index.php');
}?>
