import Stripe from 'stripe';
import axios from "axios";
import fs from "fs";
import { createInvoice } from "../utils/createInvoice.js";
import { uploadPdf } from "../utils/uploadToS3.js";
import { log } from 'console';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
let productId=null;
const stripeCheckout = async (req, res) => {
    const { product } = req.body;
    const user = req.user;
    const tax = 0.12;
    productId=product._id;
    const line_items = [{
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.title,
                    images: [product.image],
                },
                unit_amount: Math.round((product.price * 100) * (1 + tax)),
            },
            quantity: 1,
        }];

    const session = await stripe.checkout.sessions.create({
        customer_email: user.email,
        line_items: line_items,

        mode: "payment",
        payment_method_types: ["card"],

        // shipping_address_collection: {
        //     allowed_countries: ['IN'],
        // },

        billing_address_collection: 'auto',

        success_url: `http://localhost:8080/api/v1/payments/payment-status?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:8080/api/v1/payments/payment-status?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.json({ id: session.id });
}

const stripePayment = async (req, res) => {
    const customer = await stripe.checkout.sessions.retrieve(req.query.session_id);

    if (customer.payment_status === "unpaid") {
        return res.redirect(`${process.env.CLIENT_URL}/order-fail`);
    }

    console.log("Payment successful");
    const response = await axios.post(`http://localhost:8080/api/v1/orders`, {
        productId
    }, {
        headers: {
            Authorization: `Bearer ${req.cookies.token}`,
        }
    });

    // const getOrder = await axios.get(`http://localhost:8080/api/v1/orders/${response.data._id}`, {
    //     headers: {
    //         Authorization: `Bearer ${req.cookies.token}`,
    //     }
    // });

    // await createInvoice(getOrder.data, `${getOrder.data._id}.pdf`);
    // const data = fs.readFileSync(`./${getOrder.data._id}.pdf`);
    // await uploadPdf(data, getOrder.data._id, req.user._id);
    // fs.unlinkSync(`./${getOrder.data._id}.pdf`);

    res.redirect(`${process.env.CLIENT_URL}/order-success`);
}

export { stripeCheckout, stripePayment };
