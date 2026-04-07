const Category = require("../../../databases/models/category.model");
const slugify = require("slugify");

const catchAsyncError = (fn)=>{
  return (req,res,next)=>{
    fn(req,res,next).catch(err=>{
      next(err)
    })
  }
}

// Create a new category
const createCategory =catchAsyncError( async (req, res) => {
  try {
    req.body.slug = slugify(req.body.name);
    const category = await Category.create(req.body);
    res.status(201).json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error: error.message });
  }
});

// Get all categories
const getAllCategories = catchAsyncError (async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ message: "Success", categories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error: error.message });
  }
});

// Get a single category by ID
const getCategoryById =catchAsyncError( async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    /* if (!category) {
       return res.status(404).json({ message: "Category not found" });
     }
     res.status(200).json({ message: "Success", category });
     */
    !category && res.status(404).json({ message: "Category not found" });
    category && res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error: error.message });
  }
});

// Update a category
const updateCategory =catchAsyncError( async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category updated successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error: error.message });
  }
});

// Delete a category
const deleteCategory = catchAsyncError(async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error: error.message });
  }
});

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
