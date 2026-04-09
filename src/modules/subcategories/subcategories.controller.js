const SubCategory = require("../../../databases/models/subcategory.model");
const slugify = require("slugify");
const catchAsyncError = require("../../utils/middleware/catchAsyncError");
const ApiError = require("../../utils/ApiError");
const deleteOne = require("../../utils/handelers/refactor.handeler");

// Create a new subcategory
const createSubCategory = catchAsyncError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const subCategory = await SubCategory.create(req.body);
  res.status(201).json({ message: "Subcategory created successfully", subCategory });
});

// Get all subcategories
const getAllSubCategories = catchAsyncError(async (req, res, next) => {
  let filter = {};
  if (req.params.categoryId) {
    filter = { category: req.params.categoryId };
  }
  const subCategories = await SubCategory.find(filter).populate("category", "name");
  res.status(200).json({ message: "Success", subCategories });
});

// Get a single subcategory by ID
const getSubCategoryById = catchAsyncError(async (req, res, next) => {
  const subCategory = await SubCategory.findById(req.params.id).populate("category", "name");
  if (!subCategory) {
    return next(new ApiError("Subcategory not found", 404));
  }
  res.status(200).json({ message: "Success", subCategory });
});

// Update a subcategory
const updateSubCategory = catchAsyncError(async (req, res, next) => {
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }
  const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!subCategory) {
    return next(new ApiError("Subcategory not found", 404));
  }
  res.status(200).json({ message: "Subcategory updated successfully", subCategory });
});

// Delete a subcategory
const deleteSubCategory = deleteOne(SubCategory);

module.exports = {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
};
