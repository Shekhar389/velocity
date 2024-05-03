import jwt from "jsonwebtoken";
import Errorhandler from "../utils/errorhandler.js";
import { User } from "../model/userModel.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        if (!token) {
            return next(new Errorhandler(400, "Login Required"));
        }
        const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedData.id);
        if (!token) {
            return next(new Errorhandler(400, "Login Required"));
        }
        next();
    } catch (error) {
        next(error);
    }
};


export const isAuthorized = (role) => {

    return (req, res, next) => {
        try {
            if (role.toString() !== (req.user.roleAdmin.toString())) {
                return next(new Errorhandler(400, "Not Authorized"))
            }
            next();
        } catch (error) {
            next(error)
        }
    }
}
