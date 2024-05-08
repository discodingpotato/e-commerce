const handleOTPandRender = require("./otp/handleOTPandRender");
const validateRegister = require("./signup/validateRegister");
const validateUserLogin = require("./signin/validateUserLogin");
const verifyUserByOTP = require("./otp/verifyUserByOTP");
const resendOTP = require("./otp/resendOTP");
const loadHomePage = require("./home/loadHomePage");

module.exports = {
    validateUserLogin,
    validateRegister,
    handleOTPandRender,
    verifyUserByOTP,
    resendOTP,
    loadHomePage
}