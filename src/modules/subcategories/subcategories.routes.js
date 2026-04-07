const express = require("express");
const subCategoryController = require("./subcategories.controller");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(subCategoryController.createSubCategory)
  .get(subCategoryController.getAllSubCategories);

router
  .route("/:id")
  .get(subCategoryController.getSubCategoryById)
  .put(subCategoryController.updateSubCategory)
  .delete(subCategoryController.deleteSubCategory);

module.exports = router;
