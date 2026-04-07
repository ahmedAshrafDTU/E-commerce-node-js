import mongoose from "mongoose";

export const productSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true,'product name is required'],
        unique: [true,'product name must be unique'],
        trim: true,
        minLength: [3,'product name must be at least 3 characters long'],
    },
    slug: {
        type: String,
        required: [true,'product slug is required'],
        lowercase: true,
    },
    price: {
        type: Number,
        required: [true,'product price is required'],
        min: [0,'product price must be at least 0'],
    },
    priceAfterDiscount: {
        type: Number,
        min: [0,'product price must be at least 0'],
    },
    ratingsAverage: {
        type: Number,
        min: [1,'product rating must be at least 1'],
        max: [5,'product rating must be at most 5'],
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        required: [true,'product description is required'],
        trim: true,
        minLength: [3,'product description must be at least 3 characters long'],
    },
    quantity: {
        type: Number,
        required: [true,'product quantity is required'],
        min: [0,'product quantity must be at least 0'],
    },
    sold: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        required: [true,'product image is required'],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
    },
}, { timestamps: true });

const productModel = mongoose.model("product", productSchema);

export default productModel;
