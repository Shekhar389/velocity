import express from "express";

const paymentRouter = express.Router();

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { stripeCheckout, stripePayment } from "../controller/paymentController.js";

paymentRouter
    .route("/create-checkout-session")
    .post(isAuthenticated, stripeCheckout);

paymentRouter
    .route("/payment-status")
    .get(isAuthenticated, stripePayment);

export default paymentRouter;
