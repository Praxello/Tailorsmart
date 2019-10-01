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
    <link href="css/lib/sweetalert/sweetalert.css" rel="stylesheet">
    <link href="css/lib/bootstrap/bootstrap.min.css" rel="stylesheet">
    <link href="css/lib/bootstrap/asterisks.css" rel="stylesheet">
    <link href="css/helper.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <!-- <link href="dropzone/dropzone.css" rel="stylesheet"> -->
    <link href="dropzone/dropzone.css" rel="stylesheet" type="text/css">
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
               <!-- <div class="row" id="displayimg" style="display:block;">
                <div class="col-12">

                      <div class="row">
                        <div class="col-md-2">
                          <button type="button" class="btn btn-success" onclick="addimages()" > Main Page </button>

                        </div>
                        <div class="col-md-2">
                          <button type="button"  class="btn btn-primary" onclick="addpimages()" > New Product Images</button>

                        </div>
                        <div class="col-md-2">
                          <button type="button"  class="btn btn-warning" onclick="addfimages()" > New Fabrics Images</button>

                        </div>
                      </div>

                  </div>
                </div> -->
                <!-- Start Page Content -->
           <div class="row" id="displayimgall" style="display:block;">
             <div class="col-12">
                 <div class="card">
                  <div class="gallery" style="display:none;">
                  <img data-gallery-tag="Products" class="gallery-item" src="images/big/img1.jpg"/>
                  <img data-gallery-tag="Products" class="gallery-item" src="images/big/img2.jpg"/>
                  <img data-gallery-tag="Fabrics"  class="gallery-item" src="images/big/img3.jpg"/>
                  <img data-gallery-tag="Fabrics"  class="gallery-item" src="images/big/img4.jpg"/>
                 </div>
              </div>
            </div>
          </div>

          <div class="row" id="insertproductimg" style="display:none;">
            <div class="col-sm-12">
              <!-- <div class="card">

                  <form action="./src/uploadeventgallary.php" class="dropzone" id="myAwesomeDropzone" >
                  <input type="hidden" id="eventgallery2" name="eventgallery2" />

              </div> -->
              <!-- <div class='content'>
              <form action="./src/uploadeventgallary.php" class="dropzone" id="myAwesomeDropzone">
              <input type="hidden" id="eventgallery" name="eventgallery" />
              </form>
              </div> -->
            </div>
          </div>

          <!-- <div class="row" id="insertfabricimg" style="display:none;">
            <div class="col-sm-12">
              <div class="card">

                  <form action="./src/uploadeventgallary.php" class="dropzone1" id="myAwesomeDropzone1" >
                  <input type="hidden" id="eventgallery" name="eventgallery" />
                  </form>
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
    <script href="dropzone/dropzone.js"></script>
    <script src="js/lib/datatables/datatables.min.js"></script>

    <script
    src="mau_gallery/bootstrap.min.js"
    integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
    crossorigin="anonymous"></script>
    <script src="mau_gallery/docs/src/maugallery.js"></script>
    <script src="mau_gallery/docs/assets/scripts.js"></script>
    <!----mau gallery contents end------>

    <!-- <script src="javascript/stitchstyle.js"></script> -->
    <script src="js/lib/sweetalert/sweetalert.min.js"></script>
    <!-- <script type='text/javascript'>
    Dropzone.autoDiscover = false;
    $(".dropzone").dropzone({
        addRemoveLinks: true,
        removedfile: function(file) {
            var name = file.name;
            var eventgallery = $("#eventgallery").val();
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
<?php }else{
header('Location:index.php');
}?>
