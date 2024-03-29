<?php
session_start();
if(!isset($_SESSION['employeeId'])){
?>
<!DOCTYPE html>
<html lang="en">
<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
<head>
    <?php include "metatag.php"; ?>
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon.png">
    <title>Tailor Smart</title>
    <!-- Bootstrap Core CSS -->
    <link href="css/lib/bootstrap/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->
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

        <div class="unix-login">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-lg-4">
                        <div class="login-content card">
                            <div class="login-form">

                                <h4><img src="images/logo1.png" alt="homepage" class="dark-logo" style="width:50%;" /></h4>

                                <form id="login" method="POST">
                                    <div class="form-group">
                                        <label>Username / Email </label>
                                        <input type="email" class="form-control form-control-sm"  name="usrname" id="usrname" placeholder="Enter Your Email-ID" required>
                                    </div>

                                    <div class="form-group">
                                        <label>Password</label>
                                        <input type="password" class="form-control form-control-sm"  name="passwrd" id="passwrd" placeholder="Enter Your Password" required>
                                    </div>
                                    <!-- <div class="checkbox">
                                        <label>
        										                        <input type="checkbox"> Remember Me
        									            </label>
                                        <label class="pull-right">
        										                        <a href="#">Forgotten Password?</a>
        									             </label>

                                    </div> -->
                                        <div id="wait" style="display: none;   border: 0px solid black; position: absolute; top: 50%; left: 45%;"><img src="images/spinner.gif" width="64" height="64" /><br>Loading..</div>
                                    <button type="submit" class="btn btn-primary btn-flat m-b-30 m-t-30">Sign in</button>
                                    <div class="register-link m-t-15 text-center">
                                        <!-- <p>Don't have account ? <a href="#"> Sign Up Here</a></p> -->
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <!-- End Wrapper -->
    <!-- All Jquery -->
    <script src="js/lib/jquery/jquery.min.js"></script>
     <script src="javascript/lapifile.js"></script>
     <script type="text/javascript" src="js/ajaxLoader.js"></script>
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
    <script src="js/login.js"></script>

</body>
</html>
<?php
}
else{
    header('Location:customers.php');
}
?>
