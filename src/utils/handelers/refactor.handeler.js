const catchAsyncError = require("../middleware/catchAsyncError");
const ApiError = require("../ApiError");

const deleteOne = (model) => {
  return catchAsyncError(async (req, res, next) => {
    const document = await model.findByIdAndDelete(req.params.id);
    if (!document) {
      return next(new ApiError("Document not found", 404));
    }
    res.status(200).json({ message: "Deleted successfully" });
  });
};

module.exports = deleteOne;
