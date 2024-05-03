import mongoose from "mongoose";
import { cartItemSchema } from "./cartItemModel.js";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cartItems: [cartItemSchema],
}, { timestamps: true });

export const Cart = mongoose.model("Cart", cartSchema);