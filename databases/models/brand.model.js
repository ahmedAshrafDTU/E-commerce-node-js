const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, "Brand name must be unique"],
        required: [true, "Brand name is required"],
        trim: true,
        minLength: [3, "Brand name must be at least 3 characters long"],
    },
    slug: {
        type: String,
        lowercase: true,
        required: true,
    },
    logo: String,
}, { timestamps: true });

const brandModel = mongoose.model("brand", brandSchema);

module.exports = brandModel;

