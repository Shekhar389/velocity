import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    totalPrice:{
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    }
, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);
