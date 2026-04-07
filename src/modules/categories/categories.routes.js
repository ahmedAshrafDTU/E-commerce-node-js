const express = require("express");

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("./categories.controller");
const subCategoryRoutes = require("../subcategories/subcategories.routes");

const router = express.Router();

router.use("/:categoryId/subcategories", subCategoryRoutes);

router.route("/")
  .post(createCategory)
  .get(getAllCategories);

router.route("/:id")
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
