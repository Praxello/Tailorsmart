 <!-- header header  -->
 <div class="header">
            <nav class="navbar top-navbar navbar-expand-md navbar-light">
                <!-- Logo -->
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">
                        <b><img src="images/logo1.png" alt="homepage" class="dark-logo" style="width:60px;" /></b>
                    </a>
                </div>
                <!-- End Logo -->
                <div class="navbar-collapse">
                    <!-- toggle and nav items -->
                    <ul class="navbar-nav mr-auto mt-md-0">
                        <!-- This is  -->
                        <li class="nav-item"> <a class="nav-link nav-toggler hidden-md-up text-muted  " href="javascript:void(0)"><i class="mdi mdi-menu"></i></a> </li>
                        <li class="nav-item m-l-10"> <a class="nav-link sidebartoggler hidden-sm-down text-muted  " href="javascript:void(0)"><i class="ti-menu"></i></a> </li>
                        <!-- Messages -->

                        <!-- End Messages -->
                    </ul>
                    <!-- User profile and search -->
                    <ul class="navbar-nav my-lg-0">

                      <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle text-muted text-muted  "  href="customerappointment.php?cid=1"  title="Appointment Status" id="mheadappointment" > <i class="fa fa-bell"> 1</i>
                      <div class="notify"> <span class="heartbit" ></span> <span class="point"></span> </div>
                      </a>
                      </li>
                      <!-- End Comment -->
                      <!-- Messages -->
                      <li class="nav-item dropdown">

                          <a class="nav-link dropdown-toggle text-muted  " href="products.php?pid=1"   title="Active Product" id="mheadactive"> <i class="fa fa-envelope">2</i>
                          <div class="notify"> <span class="heartbit"></span> <span class="point"></span> </div>
                        </a>
                      </li>

                      <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle text-muted text-muted  "  href="fabric.php?fid=1"  title="Active Fabric" id="mheadfabric"> <i class="fa fa-diamond">3</i>
                      <div class="notify"> <span class="heartbit"></span> <span class="point"></span> </div>
                      </a>
                      </li>

                      <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle text-muted text-muted  " href="#"  id="4"  title="Appointment Status4"> <i class="fa fa-tags">4</i>
                      <div class="notify"> <span class="heartbit"></span> <span class="point"></span> </div>
                      </a>
                      </li>


                        <!-- Profile -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-muted  " href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="images/users/5.jpg" alt="user" class="profile-pic" /></a>
                            <div class="dropdown-menu dropdown-menu-right animated zoomIn">
                                <ul class="dropdown-user">
                                    <!-- <li><a href="#"><i class="ti-user"></i> Profile</a></li>
                                    <li><a href="#"><i class="ti-wallet"></i> Balance</a></li>
                                    <li><a href="#"><i class="ti-email"></i> Inbox</a></li>
                                    <li><a href="#"><i class="ti-settings"></i> Setting</a></li> -->
                                      <li><a href="#"><i class="ti-user"></i> <? echo $_SESSION['employeeName']; ?> </a></li>
                                    <li><a href="logout.php"><i class="fa fa-power-off"></i> Logout</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
<script type="text/javascript">
// $('#mheadactive').on('click',function(event){
//   // event.preventDefault();
//   alert("active");
//   });
</script>
