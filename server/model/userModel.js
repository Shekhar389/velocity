import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roleAdmin: {
        type: Boolean,
        default: false
    },
    deliveryAddress: {
        type: String
    },
    resetToken: {
        type: String
    },
    resetTokenExpiry: {
        type: Date
    },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
