const Brand = require("../../../databases/models/brand.model");
const slugify = require("slugify");
const catchAsyncError = require("../../utils/middleware/catchAsyncError");
const ApiError = require("../../utils/ApiError");
const deleteOne = require("../../utils/handelers/refactor.handeler");

// Create a new brand
const createBrand = catchAsyncError(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  const brand = await Brand.create(req.body);
  res.status(201).json({ message: "Brand created successfully", brand });
});

// Get all brands
const getAllBrands = catchAsyncError(async (req, res, next) => {
  const brands = await Brand.find();
  res.status(200).json({ message: "Success", brands });
});

// Get a single brand by ID
const getBrandById = catchAsyncError(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    return next(new ApiError("Brand not found", 404));
  }
  res.status(200).json({ message: "Success", brand });
});

// Update a brand
const updateBrand = catchAsyncError(async (req, res, next) => {
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }
  const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!brand) {
    return next(new ApiError("Brand not found", 404));
  }
  res.status(200).json({ message: "Brand updated successfully", brand });
});

// Delete a brand
const deleteBrand = deleteOne(Brand);

module.exports = {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};
