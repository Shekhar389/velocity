import { dispatchJsonToken } from "../utils/dispatchToken.js";
import Errorhandler from "../utils/errorhandler.js";
import bcrypt from "bcryptjs";
import sgMail from "@sendgrid/mail";
import crypto from "crypto";
import { createTokenForGoogle, getGoogleAuth, getGoogleData } from "../utils/google.js";
import { User } from "../model/userModel.js";

export const signUp = async (req, res, next) => {
    try {
        const { email, password, username, roleAdmin } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new Errorhandler(400, "User Already Exists"));
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const data = {
            email,
            password: hashedPassword,
            username,
            roleAdmin,
        };
        await User.create(data);

        res.status(201).json({
            message: "Successfully Created",
        });
    } catch (e) {
        next(e);
    }
};
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return next(new Errorhandler(404, "User Not Found"));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new Errorhandler(400, "Invalid Credentials"));
        }

        dispatchJsonToken(user, 201, res);
    } catch (e) {
        next(e);
    }
};

export const reset = async (req, res, next) => {
    try {

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const email = req.body.email;
        const user = await User.findOne({ email });
        if (!user) {
            return next(new Errorhandler(404, "User Not Found"));
        }
        const resetToken = crypto.randomBytes(20).toString("hex");
        await User.findOneAndUpdate({ email }, {
            resetToken: resetToken,
            resetTokenExpiry: new Date(Date.now() + 3600000),
        });

        const msg = {
            to: email, // Change to your recipient
            from: "hungrygrabo@gmail.com", // Change to your verified sender
            subject: "Password Reset Request",
            text: "Mkart V3",
            html: `
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
              }
              .container {
                  width: 80%;
                  margin: auto;
                  padding: 20px;
                  border: 1px solid #ddd;
                  border-radius: 5px;
              }
              .button {
                  background-color: #4CAF50;
                  border: none;
                  color: white;
                  padding: 15px 32px;
                  text-align: center;
                  text-decoration: none;
                  display: inline-block;
                  font-size: 16px;
                  margin: 4px 2px;
                  cursor: pointer;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Password Reset Request</h2>
              <p>Hello,</p>
              <p>We received a request to reset your password. Click the button below to reset it.</p>
              <a href="http://localhost:3000/reset/${resetToken}" class="button">Reset Password</a>
              <p>If you didn't request this, please ignore this email.</p>
              <p>Thanks,</p>
              <p>Your Team</p>
          </div>
      </body>
      `,
        };

        const response = await sgMail.send(msg);
        res.status(response[0].statusCode).json({
            message: "Email Sent",
        });
    } catch (e) {
        next(e);
    }
};

export const newPassword = async (req, res, next) => {
    try {
        const { resetToken, password } = req.body;
        const user = await User.findOne({
            resetToken,
            resetTokenExpiry: {
                $gte: new Date(Date.now() - 3600000),
            },
        });

        if (!user) {
            return next(new Errorhandler(400, "Invalid Token"));
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.findByIdAndUpdate({
            resetToken,
            _id: user._id,
        }, {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpiry: null,
        }, { new: true });

        res.status(200).json({
            message: "Password Updated",
        });
    } catch (e) {
        next(e);
    }
}


//googleAuth url is used to create a URL for the client side to reach consent screen
export const googleAuth = async (req, res, next) => {
    try {
        const url = getGoogleAuth();
        res.json(url);
    } catch (e) {
        next(e);
    }
}


//googleAuthHandler is used to handle the response from the google consent screen (Callback URL)
export const googleAuthHandler = async (req, res, next) => {
    try {
        const code = req.query.code;

        if (!code) {
            return next(new Errorhandler(400, "No Code Provided"));
        }
        //Get Google Data from Google using code
        const googleUserData = await getGoogleData(code);

        const user = await User.findOne({
            email: googleUserData.email,
        });
        if (!user) {
            const data = {
                email: googleUserData.email,
                username: googleUserData.name,
                password: crypto.randomBytes(20).toString("hex"),
            }
            const user = await User.create(data);

            const googleToken = createTokenForGoogle(user);
            res.status(201).cookie("token", googleToken.token, googleToken.options);
        } else {
            const googleToken = createTokenForGoogle(user);
            res.status(201).cookie("token", googleToken.token, googleToken.options);
        }

        res.redirect("http://localhost:3000");

    } catch (e) {
        next(e);
    }
}
