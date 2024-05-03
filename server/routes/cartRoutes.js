import express from "express";
import { addToCart, deleteCartItem, getCart } from "../controller/cartController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const cartRouter = express.Router();

cartRouter
    .route("/")
    .post(isAuthenticated, addToCart);

cartRouter
    .route("/")
    .get(isAuthenticated, getCart);

cartRouter
    .route("/:prodId")
    .delete(isAuthenticated, deleteCartItem);

export default cartRouter;
