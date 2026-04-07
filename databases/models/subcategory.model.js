import mongoose from "mongoose";

export const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, "Subcategory name must be unique"],
        required: [true, "Subcategory name is required"],
        trim: true,
        minLength: [3, "Subcategory name must be at least 3 characters long"],
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
}, { timestamps: true });

const SubCategory = mongoose.model("SubCategory", subcategorySchema);

export default SubCategory;
