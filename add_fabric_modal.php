 <!-- The Modal -->
 <div class="modal" id="newFabric">
     <div class="modal-dialog modal-lg">
         <div class="modal-content">

             <!-- Modal Header -->
             <div class="modal-header">
                 <h4 class="modal-title">Add Fabric</h4>
                 <div class='btn-group' role='group' aria-label='Basic example'>
                </div>
                </div>
             <!-- Modal body -->
             <form id="fabricform" method="POST" enctype="multipart/form-data">
             <div class="modal-body" style="overflow-x: hidden;max-height: 500px;">
             <div class="row" id="customerstyletableform">
                  <div class="col-sm-12">
                    <div class="card">
                    
                      <div class="row">
                    
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">Fabric Title</label>
                          <input type="text" class="form-control form-control-sm" id="fabrictitle" name="fabricTitle" title="Enter Fabric Title" required/>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">Fabric Brand</label>
                          <input type="text" class="form-control form-control-sm" id="fabricbrand" name="fabricBrand"  title="Enter Fabric Brand" required/>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">Fabric Details</label>
                          <input type="text" class="form-control form-control-sm" id="fabricdetail" name="fabricDetails" title="Enter Fabric Details" required/>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">Fabric Price</label>
                          <input type="text" class="form-control form-control-sm" id="fabricprice" name="fabricPrice" title="Enter Fabric Price" required/>
                        </div>
                      </div>
                       
                      <div class="col-sm-4">
                        <div class="form-group required">
                          <label class="control-label">SKU No</label>
                          <input type="text" class="form-control form-control-sm" id="skuno" name="skuNo"  title="Enter SKU No" value="<?php echo rand(100,1000);?>" required/>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="text-center">
                                           
                                           <img src="" alt="No image" class="img-fluid mb-20" width="90" height="75" id="userJpg" style="padding-block-end: 10px;">

                                       <div class="row text-center justify-content-md-center">
                                          <div class="form-group">
                                       <input type="file" name="userPic" id="userPic" class="form-control" onchange="loadFile(event)" accept="image/x-png,image/gif,image/jpeg">
                                            </div>
                                            </div>
                                       </div>
                        </div>

                      </div>
                   
                    </div>
                  </div>
                </div>
             </div>

             <!-- Modal footer -->
             <div class="modal-footer">
                 <button type="submit" class="btn btn-success btn-sm">Save</button>
                 <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
             </div>
             </form>
         </div>
     </div>
 </div>
 <script>
     $('#fabricform').on('submit', function(event) {
    event.preventDefault();
    var fData = new FormData(this);
    fData.append('productId',productId_fabric);
    $.ajax({
        url: api_url + 'addFabric.php',
        type: 'POST',
        data: fData,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function() {
            $(".preloader").show();
        },
        success: function(response) {
            if (response.Responsecode == 200) {
                alert('New fabric added successfully');
                $('#fabricform').trigger('reset');
                $('#newFabric').modal('hide');
                $('#userJpg').attr('src', '');
            } else {
                alert(response.Message);
            }
        },
        complete: function(response) {
            $(".preloader").hide();
            $('#skuno').val(Math.floor((Math.random() * 1000) + 1));
            loadAddedFabrics(productId_fabric);
        }
       
    });
});

var loadFile = function(event) {
    var output = document.getElementById('userJpg');
    output.src = URL.createObjectURL(event.target.files[0]);
    document.getElementById('userPic').src = URL.createObjectURL(event.target.files[0]);
};

function loadAddedFabrics(productId){
    $("#fabricsTable").empty();
    $.ajax({
        url: api_url + 'getproductfabricmapping.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var createDropdownOptions = '';
            if (response.Data != null) {
                var count = response.Data.length;
                for (var i = 0; i < count; i++) {
                    if(response.Data[i].productId == productId){
                    createDropdownOptions += "<tr><td><img class='img-thumbnail' src='mobileimages/fabric/300x300/" + response['Data'][i].skuNo + ".jpg' alt='No Image Available'></img></td>";
                    createDropdownOptions += "<td>" + response['Data'][i].fabricTitle + "</td>";
                    createDropdownOptions += "<td>" + response['Data'][i].skuNo + "</td>";
                    createDropdownOptions += "<td>" + response['Data'][i].fabricPrice + "</td>";
                    createDropdownOptions += "<td><input type='checkbox' name='fabrics' value=" + response['Data'][i].fabricId + "></td>";
                    createDropdownOptions += "</tr>";
                    }
                }
                $("#fabricsTable").html(createDropdownOptions);
                $('#FabricsModal').modal();
            } else {
                alert('Add Fabrics First');
            }
        }
    });
}
</script>