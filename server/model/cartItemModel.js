import mongoose from "mongoose";

export const cartItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
  },
  size: {
    type: String,
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
}, { timestamps: true });

export const CartItem = mongoose.model("CartItem", cartItemSchema);
