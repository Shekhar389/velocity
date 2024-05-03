import ErrorHandler from "../utils/errorhandler.js";

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "INTERNAL SERVER ERROR";
    err.statusCode = err.statusCode || 500;

    // Wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again `;
        err = new ErrorHandler(400, message);
    }

    // JWT EXPIRE error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is Expired, Try again `;
        err = new ErrorHandler(400, message);
    }

    res
        .status(err.statusCode)
        .json({
            message: err.message,
        });
}
