const User = require("../../models/user-client");
const ForgotPassword= require("../../models/forgot-passsword.model");
const {generateOTP} = require("../../helper/generateOtp");

module.exports.forgotPasswordPost = async (req, res) => {
    const {email} = req.body;

    const user = await User.findOne({
        email: email,
        deleted: false
    });
    if (!user) {
        throw new Error("Email không tồn tại!");
    }

    const forgotPassword = await ForgotPassword.findOne({
        email: email,
    });

    if(forgotPassword){
        throw new Error("OTP đã được gửi. Vui lòng kiểm tra email.");
    }

    const otp = generateOTP();

    const objectForgotPassword = new ForgotPassword({
        email: email,
        otp: otp,
        expiresAt: Date.now() + 3 * 60 * 1000 // 3 minutes
    });

    await objectForgotPassword.save();     
}

module.exports.verifyOtpPost = async (req, res) => {
    const {email, otp} = req.body;

    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp
    });

    if (!result) {
        throw new Error("OTP không chính xác!");
    }

    if (result.expiresAt < Date.now()) {
        await ForgotPassword.deleteOne({ email: email });
        throw new Error("OTP đã hết hạn!");
    }          
}