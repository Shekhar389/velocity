import express from "express";
import { isAuthenticated, isAuthorized } from "../middleware/isAuthenticated.js";
import {
    changeOrderStatus,
    createOrder,
    getOrderByEmail,
    getOrderById,
    getOrders,
    getOrdersByUser
} from "../controller/orderController.js";

const orderRouter = express.Router();

orderRouter
    .route("/")
    .get(isAuthenticated, isAuthorized(true), getOrders)
    .post(isAuthenticated, createOrder);

orderRouter
    .route("/ordersByUser")
    .get(isAuthenticated, getOrdersByUser);

orderRouter
    .route("/getByEmail")
    .post(isAuthenticated, isAuthorized(true), getOrderByEmail);

orderRouter
    .route("/:id")
    .get(isAuthenticated, getOrderById)
    .put(isAuthenticated, isAuthorized(true), changeOrderStatus)

export default orderRouter;
