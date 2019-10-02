<div class="left-sidebar">
    <!-- Sidebar scroll-->
    <div class="scroll-sidebar">
        <!-- Sidebar navigation-->
        <nav class="sidebar-nav">
        <ul id="sidebarnav">
                <li class="nav-devider"></li>
                <li class="nav-label">Home</li>
            <?php
            $roleId = $_SESSION['roleId'];
            switch($roleId){
                case '1':?>

                <li> <a class="has-arrow" href="/" aria-expanded="false"><i class="fa fa-shopping-cart"></i>
                <span class="hide-menu">Orders</span></a>
                  <ul aria-expanded="false" class="collapse">
                        <li><a href="allorders.php">All Orders</a></li>
                        <li><a href="customers.php">Order Management</a></li>
                  </ul>
              </li>

              <li><a   href="customerappointment.php" aria-expanded="false"><i
                          class="fa fa-calendar"></i><span class="hide-menu">Appointment Management</span></a></li>



                          <li> <a class="has-arrow" href="/" aria-expanded="false"><i class="fa fa-shopping-cart"></i>
                                        <span class="hide-menu">Masters</span></a>
                                          <ul aria-expanded="false" class="collapse">
                                            <li><a class="  " href="customerstyles.php" aria-expanded="false" ><i
                                                        class="fa fa-male"></i><span class="" style="padding: 20px;">Styles</span></a></li>
                                            <li><a class="  " href="customersubstyles.php" aria-expanded="false" ><i
                                                        class="fa fa-female"></i><span class="" style="padding: 20px;">Substyles</span></a></li>
                                            <li><a class="  " href="masterproducts.php" aria-expanded="false"><i
                                                            class="fa  fa-desktop "></i><span class="" style="padding: 20px;">Products Heads</span></a></li>
                                            <li><a class="  " href="managecategory.php" aria-expanded="false"><i
                                                        class="fa fa-list-alt"></i><span class="" style="padding: 20px;">Manage Category</span></a></li>
                                            <li><a class=" " href="products.php" aria-expanded="false"><i class="fa fa-diamond"></i><span
                                                                    class="" style="padding: 20px;">Products</span></a></li>
                                            <li><a class="  " href="fabric.php" aria-expanded="false"><i class="fa fa-gift"></i><span
                                                        class="" style="padding: 20px;">Fabric</span></a></li>
                                            <li><a class="  " href="measurement.php" aria-expanded="false"><i class="fa fa-balance-scale"></i><span
                                                        class="" style="padding: 20px;">Measurements</span></a></li>

                                            <li><a class="  " href="stitchstyle.php" aria-expanded="false"><i class="fa fa-tag"></i><span
                                                        class="" style="padding: 20px;">Stitch-Style</span></a></li>
                                            <li><a class="  " href="stitchstyledetail.php" aria-expanded="false"><i
                                                        class="fa fa-tags"></i><span class="" style="padding: 20px;">Stitch Style Detail</span></a></li>
                                            <li><a class="  " href="employeemaster.php" aria-expanded="false"><i
                                                        class="fa fa-group"></i><span class="" style="padding: 20px;">Employee Master</span></a></li>
                                            <li><a class="  " href="holidaymaster.php" aria-expanded="false"><i
                                                        class="fa fa-columns"></i><span class="" style="padding: 20px;">Holiday Master</span></a></li>
                                            <li><a class=" " href="slotmaster.php" aria-expanded="false"><i
                                                        class="fa fa-clock-o"></i><span class="" style="padding: 20px;">Slot Master</span></a></li>
                                            <li><a class=" " href="currencymaster.php" aria-expanded="false"><i
                                                          class="fa fa-money"></i><span class="" style="padding: 20px;">Currency Master</span></a></li>
                                            <li><a class=" " href="catlogscr.php" aria-expanded="false"><i
                                                          class="fa fa-file-image-o "></i><span class="" style="padding: 20px;">Catlog Screen</span></a></li>
                                          </ul>
                          </li>
                          <?php
                break;
                case '2':?>
                 <li> <a class="has-arrow" href="/" aria-expanded="false"><i class="fa fa-shopping-cart"></i>
                                        <span class="hide-menu">Masters</span></a>
                                          <ul aria-expanded="false" class="collapse">
                                            <li><a class="  " href="customerstyles.php" aria-expanded="false" ><i
                                                        class="fa fa-male"></i><span class="" style="padding: 20px;">Styles</span></a></li>
                                            <li><a class="  " href="customersubstyles.php" aria-expanded="false" ><i
                                                        class="fa fa-female"></i><span class="" style="padding: 20px;">Substyles</span></a></li>
                                            <li><a class="  " href="masterproducts.php" aria-expanded="false"><i
                                                            class="fa  fa-desktop "></i><span class="" style="padding: 20px;">Products Heads</span></a></li>
                                            <li><a class="  " href="managecategory.php" aria-expanded="false"><i
                                                        class="fa fa-list-alt"></i><span class="" style="padding: 20px;">Manage Category</span></a></li>
                                            <li><a class=" " href="products.php" aria-expanded="false"><i class="fa fa-diamond"></i><span
                                                                    class="" style="padding: 20px;">Products</span></a></li>
                                            <li><a class="  " href="fabric.php" aria-expanded="false"><i class="fa fa-gift"></i><span
                                                        class="" style="padding: 20px;">Fabric</span></a></li>
                                            <li><a class="  " href="measurement.php" aria-expanded="false"><i class="fa fa-balance-scale"></i><span
                                                        class="" style="padding: 20px;">Measurements</span></a></li>

                                            <li><a class="  " href="stitchstyle.php" aria-expanded="false"><i class="fa fa-tag"></i><span
                                                        class="" style="padding: 20px;">Stitch-Style</span></a></li>
                                            <li><a class="  " href="stitchstyledetail.php" aria-expanded="false"><i
                                                        class="fa fa-tags"></i><span class="" style="padding: 20px;">Stitch Style Detail</span></a></li>
                                            <li><a class="  " href="employeemaster.php" aria-expanded="false"><i
                                                        class="fa fa-group"></i><span class="" style="padding: 20px;">Employee Master</span></a></li>
                                            <li><a class="  " href="holidaymaster.php" aria-expanded="false"><i
                                                        class="fa fa-columns"></i><span class="" style="padding: 20px;">Holiday Master</span></a></li>
                                            <li><a class=" " href="slotmaster.php" aria-expanded="false"><i
                                                        class="fa fa-clock-o"></i><span class="" style="padding: 20px;">Slot Master</span></a></li>
                                          </ul>
                          </li>
                <?php
                break;
                case '3':?>
                <li> <a class="has-arrow" href="/" aria-expanded="false"><i class="fa fa-shopping-cart"></i>
                <span class="hide-menu">Orders</span></a>
                  <ul aria-expanded="false" class="collapse">
                        <li><a href="allorders.php">All Orders</a></li>
                        <li><a href="customers.php">Order Management</a></li>
                  </ul>
              </li><?php
                break;
                case '4':
                ?>
                <li> <a class="has-arrow" href="/" aria-expanded="false"><i class="fa fa-shopping-cart"></i>
                <span class="hide-menu">Orders</span></a>
                  <ul aria-expanded="false" class="collapse">
                        <li><a href="vendorOrders.php">My Orders</a></li>
                  </ul>
              </li>
              <li><a class=" " href="products.php" aria-expanded="false"><i class="fa fa-diamond"></i><span
                                      class="" style="padding: 20px;">Products</span></a></li>
              <li><a class="  " href="fabric.php" aria-expanded="false"><i class="fa fa-gift"></i><span
                          class="" style="padding: 20px;">Fabric</span></a></li>
              <?php
                break;

            }
            ?>


            </ul>
        </nav>
    </div>
    <!-- End Sidebar scroll-->
</div>
