<script src="js/createNewOrder.js"></script>

<body>
  <ul class="nav nav-tabs" role="tablist">
    <li class="nav-item">
      <a class="nav-link active" data-toggle="tab" href="#productHome">Products</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="tab" href="#paymentlink" onclick="getPaymentList()">Payment Links</a>
    </li>
  </ul>
  <div class="tab-content">
    <div id="productHome" class="container tab-pane active"><br>
      <div class="row">
        <div class="col-sm-12">
          <div class="card">
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
        <div class="col-sm-12">
          <div class="card">
            <div class="row">
              <div class="col-sm-3">
                <div class="form-group">
                  <label class="control-label">Select Product </label>
                  <select class="form-control form-control-sm" id="products">
                  </select>
                </div>
              </div>
              <div class="col-sm-3">
                <div class="form-group">
                  <button type="button" class="add-row btn btn-success" style="margin-top: 30px;padding-left:5px;padding-right:20px;padding-top:5px;padding-bottom:5px;">add product</button>
                </div>
              </div>
              <div class="col-sm-3">
              <button type="button" class="btn btn-primary" style="margin-top: 30px;padding-left:5px;padding-right:20px;padding-top:5px;padding-bottom:5px;" onclick="window.location.reload();">Close Order</button>
              </div>
              <div class="col-sm-3">
              <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#paymentLinkModal" style="margin-top: 30px;padding-left:5px;padding-right:20px;padding-top:5px;padding-bottom:5px;">Create Payment Link</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="table-responsive m-t-40">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Product Title</th>
                <th>Product Sub Title</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="productData">

            </tbody>
          </table>
        </div>
      </div>
    </div>
  <div id="paymentlink" class="container tab-pane"><br>
    <div class="card">
        <div class="table-responsive m-t-40">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Payment Id</th>
                <th>Payment Mode</th>
                <th>Payment Type</th>
                <th>Amount</th>
               <th>Employee Name</th>
               <th>Payment Time</th>
               <th>Action</th>
              </tr>
            </thead>
            <tbody id="paymentData">

            </tbody>
          </table>
        </div>
    </div>
</div>
</div>
    <?php include 'add_measurment.php'; ?>
    <?php include 'add_styles.php'; ?>
    <?php include 'add_fabrics.php'; ?>
    <?php include 'add_paymentLink.php';?>
    <!-- <button type="button" class="delete-row">Delete Row</button> -->
</body>

</html>