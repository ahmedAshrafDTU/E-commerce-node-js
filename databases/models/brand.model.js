import mongoose from "mongoose";

export const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, "Subcategory name must be unique"],
        required: [true, "Subcategory name is required"],
        trim: true,
        minLength: [3, "Subcategory name must be at least 3 characters long"],
    },
    logo: String,
}, { timestamps: true });

const brandModel = mongoose.model("brand", brandSchema);
