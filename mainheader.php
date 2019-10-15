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
                      <?php
                      $roleId = $_SESSION['roleId'];
                      if($roleId==="1"){ ?>
                       <!-- This badge for list of all appointment Status which will be idel at the moment -->
                      <li class="nav-item dropdown" >
                      <a class="nav-link dropdown-toggle text-muted text-muted  "  href="customerappointment.php?cid=1"  title="Appointment Status" id="mheadappointment" ><img src="images/bell.png"><span id='b1'></span>
                      <div class="notify"><span class="heartbit" id="ap1"></span> <span class="point" id="ap2"></span> </div>
                      </a>
                      </li>
                       <!-- This badge for list of all orders which status not be complete till now -->
                      <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle text-muted text-muted  " href="ordermanagement.php?aid=1"   title="Orders Not Completed">  <img src="images/checklist.png"><span id='b2'></span>
                      <div class="notify"> <span class="heartbit" id="ap3"></span> <span class="point" id="ap4"></span> </div>
                      </a>
                      </li>

                      <!-- This badge for list of all orders which status not be complete till now -->
                     <li class="nav-item dropdown">
                     <a class="nav-link dropdown-toggle text-muted text-muted  " href="ordermanagement.php?aid=2"   title="Request For Alteration"> <img src="images/schere.png"><span id='b5'></span>
                     <div class="notify"> <span class="heartbit" id="ap9"></span> <span class="point" id="ap10"></span> </div>
                     </a>
                     </li>
                      <!-- This badge for list of all orders which active product which will be not active yet -->
                      <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle text-muted  " href="products.php?pid=1"   title="Active Product" id="mheadactive"> <img src="images/gift.png"><span id='b3'></span>
                          <div class="notify"> <span class="heartbit" id="ap5"></span> <span class="point" id="ap6"></span> </div>
                        </a>
                      </li>
                      <!-- This badge for list of all orders which fabric will be not active yet-->
                      <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle text-muted text-muted  "  href="fabric.php?fid=1"  title="Active Fabric" id="mheadfabric"> <img src="images/sewing-machine.png"><span id='b4'></span>
                      <div class="notify"> <span class="heartbit" id="ap7"></span> <span class="point" id="ap8"></span> </div>
                      </a>
                      </li>
                    <?php } ?>



                        <!-- Profile -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-muted" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="images/user.png"></a>
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
