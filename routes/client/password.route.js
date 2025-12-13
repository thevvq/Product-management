const express = require("express");
const router = express.Router();

const passwordController = require("../../controllers/client/password.controller");

router.get("/forgot", passwordController.forgotPassword);

router.post("/forgot", passwordController.forgotPasswordPost);

router.post("/resend-otp", passwordController.resendOTP);

router.get("/verify-otp", passwordController.verityOtp);

router.post("/verify-otp", passwordController.verityOtpPost);

module.exports = router;

