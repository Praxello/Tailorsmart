-- TRUNCATE table stitch_style_details_template_master;
-- TRUNCATE table stitch_style_template_master;
--
-- ALTER TABLE `stitch_style_template_master` ADD FOREIGN KEY (`stitchStyleId`) REFERENCES `stitch_style_details_template_master`(`stitchStyleId`) ON DELETE CASCADE ON UPDATE CASCADE;
--
--
-- ALTER TABLE `product_catalog_style_master` ADD FOREIGN KEY (`stitchStyleId`) REFERENCES `stitch_style_template_master`(`stitchStyleId`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- ALTER TABLE `product_fabric_mapping_master` ADD FOREIGN KEY (`fabricId`) REFERENCES `product_fabric_master`(`fabricId`) ON DELETE CASCADE ON UPDATE CASCADE;

1.master products
  table name : product_parent_master
  columns : {Style,Sub Style}
  ALTER TABLE `product_parent_master` ADD FOREIGN KEY (`styleId`) REFERENCES `product_style_master`(`styleId`) ON DELETE CASCADE ON UPDATE CASCADE;
  ALTER TABLE `product_parent_master` ADD FOREIGN KEY (`subStyleId`) REFERENCES `product_substyle_master`(`subStyleId`) ON DELETE CASCADE ON UPDATE CASCADE;
2.Products
  table name : product_master
  columns : {Owner,Parent,category}
  ALTER TABLE `product_master` ADD FOREIGN KEY (`categoryId`) REFERENCES `product_category_master`(`categoryId`) ON DELETE CASCADE ON UPDATE CASCADE;

  Fabric Mapping
  table name : product_fabric_mapping_master

  Measurement Mapping
  table name : product_catalog_measurement_master

  Stitch Mapping
  table name : product_catalog_style_master

3.Styles
  table name : product_style_master

4.Sub Styles
  table name : product_substyle_master

5.Manage Category
  table name :product_category_master

6.Measurement
  table name :measurement_item_master

7.Fabrics
  table name : product_fabric_master
  columns : {Category}
  ALTER TABLE `product_fabric_master` ADD FOREIGN KEY (`categoryId`) REFERENCES `product_category_master`(`categoryId`) ON DELETE CASCADE ON UPDATE CASCADE;

8.Stitch Styles
  table name : stitch_style_template_master

9 Stitch Style Detail Item
  table name : stitch_style_details_template_master
  columns : {Stitch Style}
  ALTER TABLE `stitch_style_details_template_master` ADD FOREIGN KEY (`stitchStyleId`) REFERENCES `stitch_style_template_master`(`stitchStyleId`) ON DELETE CASCADE ON UPDATE CASCADE;


--- newimagename

ALTER TABLE `product_parent_master` ADD FOREIGN KEY (`styleId`) REFERENCES `product_style_master`(`styleId`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `product_parent_master` ADD FOREIGN KEY (`subStyleId`) REFERENCES `product_substyle_master`(`subStyleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `product_master` ADD FOREIGN KEY (`parentId`) REFERENCES `product_parent_master`(`parentId`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `product_master` ADD FOREIGN KEY (`categoryId`) REFERENCES `product_category_master`(`categoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `product_fabric_master` ADD FOREIGN KEY (`categoryId`) REFERENCES `product_category_master`(`categoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `stitch_style_details_template_master` ADD FOREIGN KEY (`stitchStyleId`) REFERENCES `stitch_style_template_master`(`stitchStyleId`) ON DELETE RESTRICT ON UPDATE CASCADE;


ALTER TABLE `employee_master` ADD FOREIGN KEY (`roleId`) REFERENCES `user_roles`(`roleId`) ON DELETE RESTRICT ON UPDATE RESTRICT;
