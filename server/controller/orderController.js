import { Order } from "../model/orderModel.js";
import { Cart } from "../model/cartModel.js";
import { CartItem } from "../model/cartItemModel.js";
import { User } from "../model/userModel.js";
import axios from "axios";
const getOrders = async (req, res, next) => {
    try {
        const allOrders = await Order.find({}).sort({ createdAt: -1 });
        res.json(allOrders);
    } catch (e) {
        next(e);
    }
}

const getOrdersByUser = async (req, res, next) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).populate('productId').sort({ createdAt: -1 });
        res.json(orders)
    } catch (error) {
        next(error);
    }
}

const changeOrderStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        order.isDelivered = !order.isDelivered;
        await order.save();

        res.json(order);
    } catch (error) {
        next(error);
    }
}

const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const orderItem = await Order.findById(id).populate('productId');

        res.json(orderItem)
    } catch (error) {
        next(error);
    }
}
const getOrderByEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json([]);
        }

        const userId = user._id;
        const orderItem = await Order.find({ userId }).populate('cart.productId');

        res.json(orderItem)
    } catch (error) {
        next(error);
    }
}
const createOrder = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;

        const response = await axios.get(`http://localhost:8080/api/v1/products/${productId}`);


        const orderItem = await Order.create({
            productId: productId,
            userId: req.user._id,
            totalPrice: ((response.data.price)*(1.12)).toFixed(2),
        });

        res.status(201).json(orderItem);

    } catch (e) {
        next(e);
    }
}

export { getOrders, createOrder, getOrdersByUser, changeOrderStatus, getOrderById, getOrderByEmail };
