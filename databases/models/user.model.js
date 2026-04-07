import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'user name is required'],
        trim: true,
        minLength: [3,'user name must be at least 3 characters long'],
    },
    email: {
        type: String,
        required: [true,'user email is required'],
        unique: [true,'user email must be unique'],
        trim: true,
    },
    password: {
        type: String,
        required: [true,'user password is required'],
        trim: true,
        minLength: [6,'user password must be at least 6 characters long'],
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user',
    }, 
    phone: {
        type: String,
        required: [true,'user phone is required'],
        unique: [true,'user phone must be unique'],
        trim: true,
    },
    profileImage: {
        type: String,
        required: [true,'user profile image is required'],
    },
    isactive: {
        type: Boolean,
        default: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const userModel = mongoose.model("user", userSchema);

export default userModel;
