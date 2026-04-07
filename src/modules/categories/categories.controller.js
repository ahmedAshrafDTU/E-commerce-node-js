const Category = require("../../../databases/models/category.model");
const slugify = require("slugify");
const catchAsyncError = require("../../utils/middleware/catchAsyncError");
const ApiError = require("../../utils/ApiError");
// Create a new category
const createCategory = catchAsyncError(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  const category = await Category.create(req.body);
  res.status(201).json({ message: "Category created successfully", category });
});

// Get all categories
const getAllCategories = catchAsyncError(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({ message: "Success", categories });
});

// Get a single category by ID
const getCategoryById = catchAsyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ApiError("Category not found", 404));
  }
  res.status(200).json({ message: "Success", category });
});

// Update a category
const updateCategory = catchAsyncError(async (req, res, next) => {
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) {
    return next(new ApiError("Category not found", 404));
  }
  res.status(200).json({ message: "Category updated successfully", category });
});

// Delete a category
const deleteCategory = catchAsyncError(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return next(new ApiError("Category not found", 404));
  }
  res.status(200).json({ message: "Category deleted successfully" });
});

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
