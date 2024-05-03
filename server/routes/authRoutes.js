import express from "express";
import { googleAuth, googleAuthHandler, login, newPassword, reset, signUp } from "../controller/authController.js";
import "../utils/google.js";

const authRouter = express.Router();

authRouter
    .route('/login')
    .post(login);

authRouter
    .route('/google')
    .get(googleAuth);

authRouter
    .route('/auth/google')
    .get(googleAuthHandler);

authRouter
    .route('/signup')
    .post(signUp);

authRouter
    .route('/reset')
    .post(reset);

authRouter
    .route('/newPassword')
    .post(newPassword);

export default authRouter;
