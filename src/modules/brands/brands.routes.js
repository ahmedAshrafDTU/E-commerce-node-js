const express = require("express");

const {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require("./brands.controller");

const router = express.Router();

router.route("/")
  .post(createBrand)
  .get(getAllBrands);

router.route("/:id")
  .get(getBrandById)
  .put(updateBrand)
  .delete(deleteBrand);

module.exports = router;
