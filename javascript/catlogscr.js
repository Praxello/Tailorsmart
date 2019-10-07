// getallimagesfromfolder();
// function getallimagesfromfolder() {
// console.log("images");
//     $.ajax({
//         type: "GET",
//         url: api_url + "getAllimages.php",
//         data:{
//           foldername:"../mobileimages/product"
//         },
//         success: function(response) {
//           console.log(response);
//           if(response!=null){
//               var count = response.length;
//               var html ="";
//               if(count>0){
//                 let i=0;
//                 for(i=0;i<count;i++){
//                  html +='<img data-gallery-tag="Products" class="gallery-item" src="http://praxello.com/tailorsmart/mobileimages/product/'+response[i]+'"/>';
//
//                 }
//                  $("#g1").html(html);
//               }
//           }
//
//
//         }
//       });
// }

//This function is useful for upload the image files
// function imguplod(imgid){
//    var triggerid=$('#customerstylepic'+imgid).trigger('click');
//    var fileupload = document.getElementById('customerstylepic'+imgid);
//    fileupload.onchange = function () {
//                 var customerstylepic = $('#customerstylepic'+imgid).val();
//                 var fd = new FormData();
//                 var files = $('#customerstylepic'+imgid)[0].files[0];
//                 fd.append('file',files);
//                 fd.append('imgname',imgid);
//                 fd.append('foldername',"style");
//                 $.ajax({
//                      // url:"src/addimg.php",
//                      url:img_url,
//                      type:"POST",
//                      contentType: false,
//                      cache: false,
//                      processData:false,
//                      data: fd,
//                      dataType:'json',
//                      success:function(response){
//                        swal(response['Message']);
//                        getcustomerstyles();
//                      }
//               });
//    };
// }

// This function is created For Add Button New Style
// function addpimages(){
//
//   $("#insertproductimg").show();
//     $("#displayimgall").hide();
//   $("#insertfabricimg").hide();
// }
// function addfimages(){
//   // $("#displayimgall").hide();
//   $("#insertfabricimg").show();
//   $("#insertproductimg").hide();
//   $("#displayimgall").hide();
// }
//
// function addimages(){
//   // $("#displayimgall").hide();
//   $("#insertfabricimg").hide();
//   $("#insertproductimg").hide();
//   $("#displayimgall").show();
// }
