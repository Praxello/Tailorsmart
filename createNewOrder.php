<script src="js/createNewOrder.js"></script>
<body>
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

                    </div>
                    <div class="col-sm-3"> 
                    <button type="button" class="btn btn-primary" style="margin-top: 30px;padding-left:5px;padding-right:20px;padding-top:5px;padding-bottom:5px;" onclick="window.location.reload();">Close Order</button>
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
   <?php include 'add_measurment.php';?>
   <?php include 'add_styles.php';?>
  <?php include 'add_fabrics.php';?>
    <!-- <button type="button" class="delete-row">Delete Row</button> -->
</body>

</html>