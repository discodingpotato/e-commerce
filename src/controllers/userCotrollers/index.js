const handleOTPandRender = require("./otp/handleOTPandRender");
const validateRegister = require("./validateRegister");
const validateUserLogin = require("./validateUserLogin");
const verifyUserByOTP = require("./otp/verifyUserByOTP");
const resendOTP = require("./otp/resendOTP");
const loadHomePage = require("./home/loadHomePage");
const productView = require("./home/productView");

module.exports = {
    validateUserLogin,
    validateRegister,
    handleOTPandRender,
    verifyUserByOTP,
    resendOTP,
    loadHomePage,
    productView
}