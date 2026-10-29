//Import the required modules
const express = require("express");
const router = express.Router();

//import the requrired controllers and middleware fuctions
const {
    login,
    signup,
    sendOTP,
    verifyOTP,
    changePassword,
} = require("../controllers/Auth")

const {
    resetPasswordToken,
    resetPassword,
} = require("../controllers/ResetPassword");

const {auth} = require("../middleware/auth");


// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

//Routes for user login
router.post("/login",login)

//routes for user signup
router.post("/signup",signup)

//router for sending otp to the user's email
router.post("/sendotp",sendOTP)
router.post("/verifyotp", verifyOTP)
//route for changing the password
router.post("/changepassword",auth,changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

//route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

//route for resetting user password after verification
router.post("/reset-password", resetPassword)

//export the router for use in the amin application
module.exports = router