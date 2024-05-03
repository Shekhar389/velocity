import express, { json, urlencoded } from "express";
import productRouter from "./routes/productRoutes.js"
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import orderRouter from "./routes/orderRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";

const app = express();

app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

app.use("/api/v1", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/payments", paymentRouter);

app.get("/", (req, res) => {
    res.json({
        status: "running",
    });
});

app.use(errorMiddleware);

export default app;
