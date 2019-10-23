<script src="js/ordermanagement_inner.js"></script>

<body>
    <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#productHome"><i class="fa fa-home"></i> Products</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#paymentlink"><i class="fa fa fa-rupee"></i>Payment Links</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#OrderStatus"><i class="fa fa fa-rupee"></i>Order Status</a>
        </li>
    </ul>
    <div class="tab-content">
        <div id="productHome" class="tab-pane active"><br>
            <div class="row">
                <div class="col-sm-6">
                    <div class="card">
                        <div class="row">

                            <div class="col-sm-12">
                            <a href="#" class="text-primary" data-toggle="collapse" data-target="#demo" style="font-weight:bolder;"> Order Details<i
                                        class="fa fa-close float-right"></i></a>
                            </div>
                        </div>
                        <div id="demo" class="collapse">
                            <div class="row">

                                <div class="col-sm-4">
                                    <h4 class="card-title">Order Number</h4>
                                    <h6 class="card-subtitle"><span id="orderId"></span></h6>
                                </div>
                                <div class="col-sm-4">
                                    <h4 class="card-title">Order Amount</h4>
                                    <h6 class="card-subtitle"><span id="Orderamount"></span></h6>
                                </div>
                                <div class="col-sm-4">
                                    <h4 class="card-title">Status</h4>
                                    <h6 class="card-subtitle"><span id="orderStatus"></span></h6>
                                </div>
                                <div class="col-sm-4">
                                    <h4 class="card-title">Purchase Date</h4>
                                    <h6 class="card-subtitle"><span id="purchaseDateTime"></span></h6>
                                </div>
                                <div class="col-sm-4">
                                    <h4 class="card-title">Expected Delivery Date</h4>
                                    <h6 class="card-subtitle"><span id="customerExpectedDate"></span></h6>
                                </div>

                                <div class="col-sm-4">
                                    <h4 class="card-title">Final Delivery Date</h4>
                                    <h6 class="card-subtitle"><span id="FinalDeliveryDate"></span></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card">
                        <div class="row">

                            <div class="col-sm-12">
                                <a href="#" class="text-primary" data-toggle="collapse" data-target="#demo1" style="font-weight:bolder;" > Customer Details<i
                                        class="fa fa-close float-right"></i></a>
                            </div>
                        </div>

                        <div id="demo1" class="collapse">
                            <div class="row">

                                <div class="col-sm-4">
                                    <h4 class="card-title">Customer Name</h4>
                                    <h6 class="card-subtitle"><span id="custName"></span></h6>
                                </div>
                                <div class="col-sm-4">
                                    <h4 class="card-title">Email address</h4>
                                    <h6 class="card-subtitle"><span id="custEmail"></span></h6>
                                </div>
                                <div class="col-sm-4">
                                    <h4 class="card-title">Contact Number</h4>
                                    <h6 class="card-subtitle"><span id="custMobile"></span></h6>
                                </div>
                                <div class="col-sm-4">
                                    <h4 class="card-title">Residence Address</h4>
                                    <h6 class="card-subtitle"><span id="custAddress"></span></h6>
                                </div>
                                <div class="col-sm-4">
                                    <h4 class="card-title">City</h4>
                                    <h6 class="card-subtitle"><span id="custCity"></span></h6>
                                </div>

                                <div class="col-sm-4">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="card">
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label class="control-label">Select Product </label>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label class="control-label">Enter Amount for this Product</label>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="form-group">

                                    <select class="form-control form-control-sm" id="products" style="width:100%"
                                        onchange="getPriceOfProduct(this.value)">
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-sm" name="OrderItemPrice"
                                        id="OrderItemPrice">
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="btn-group" role="group" aria-label="add example">
                                    <button type="button" class="add-row btn btn-success"><i class="fa  fa-plus"></i>Add
                                        Product</button>
                                    <button type="button" class="btn btn-primary" id="loadfirstpage"><i
                                            class="fa  fa-arrow-left"></i>Go Back</button></div>
                            </div>
                            <div class="col-sm-3">

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="table-responsive m-t-40">
                    <table class="table table-bordered" id="productTable">
                        <thead>
                            <tr>
                                <th>Product Title</th>
                                <th>Product Sub Title</th>
                                <th>Price</th>
                                <th>Alteration</th>
                                <th>Remark</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="productData">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div id="paymentlink" class="tab-pane"><br>
            <div class="card">
                <div class="form-group ">
                    <button type="button" class="btn btn-secondary float-right" data-toggle="modal"
                        data-target="#paymentLinkModal">Create Payment Link</button>
                </div>
                <div class="table-responsive m-t-40">
                    <input type="hidden" id="totalpayment"/>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Sr no</th>
                                <th>Payment Mode</th>
                                <th>Payment Type</th>
                                <th>Amount</th>
                                <th>Currency</th>
                                <th>Created By</th>
                                <th>Payment Time</th>
                                <th>Status</th>
                                <th>Deleted By</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="paymentData">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div id="OrderStatus" class="tab-pane">
        <div class="col-sm-12">
                    <div class="card">
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label class="control-label">Change status of order</label>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label class="control-label">Confirmation of order</label>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                <label class="control-label">Change Expected Delivery Date </label>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                <label class="control-label">Change Final Delivery Date</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="form-group">

                                    <select class="form-control form-control-sm"  style="width:100%" id="statusOfOrder">
                                    <option value="0">Not completed</option>
                                    <option value="1">Confirmed</option>
                                    <option value="2">Processing</option>
                                    <option value="3">Sent for Trial</option>
                                    <option value="4">Completed</option>
                                    <option value="5">Cancelled</option>
                                    <option value="6">For Alteration</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                <select class="form-control form-control-sm"  style="width:100%" id="confirmationOfOrder">
                                <option value="0">Not Confirmed</option>
                                <option value="1">Confirmed</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-3">
                            <input type="date" class="form-control form-control-sm" id="dateOfExpected" value="<?php echo  date('Y-m-d');?>">
                            </div>
                            <div class="col-sm-3">
                            <input type="date" class="form-control form-control-sm" id="dateOfFinalDelivery" value="<?php echo  date('Y-m-d');?>">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4">

                            </div>
                            <div class="col-sm-4">
                                <button type="button" class="btn btn-success" id="updateorderstatus">Update Status</button>
                            </div>
                            <div class="col-sm-4">

                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>

    <?php include 'add_measurment.php'; ?>
    <?php include 'add_styles.php'; ?>
    <?php include 'add_fabrics.php'; ?>
    <?php include 'add_paymentLink.php'; ?>
    <?php include 'edit_orderItemPrice.php'; ?>
    <?php include 'add_assignwork.php'; ?>
      <?php include 'add_comment.php'; ?>
</body>

</html>
