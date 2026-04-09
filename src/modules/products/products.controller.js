const Product = require("../../../databases/models/product.model");
const slugify = require("slugify");
const catchAsyncError = require("../../utils/middleware/catchAsyncError");
const ApiError = require("../../utils/ApiError");
const deleteOne = require("../../utils/handelers/refactor.handeler");

// Create a new product
const createProduct = catchAsyncError(async (req, res) => {
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }
  const product = await Product.create(req.body);
  res.status(201).json({ message: "Product created successfully", product });
});


// Get all products
const getAllProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find()
    .populate("category", "name")
    .populate("subCategory", "name")
    .populate("brand", "name");
  res.status(200).json({ message: "Success", products });
});

// Get a single product by ID
const getProductById = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate("category", "name")
    .populate("subCategory", "name")
    .populate("brand", "name");
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  res.status(200).json({ message: "Success", product });
});

// Update a product
const updateProduct = catchAsyncError(async (req, res, next) => {
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  res.status(200).json({ message: "Product updated successfully", product });
});

// Delete a product
const deleteProduct = deleteOne(Product);

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
