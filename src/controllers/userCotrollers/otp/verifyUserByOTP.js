const OTP = require("../../../models/OTP");
const User = require("../../../models/User")

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const verifyUserByOTP = async (req, res, next) => {
    console.log(req.body);
    // req.session.destroy();
    // res.redirect('/login')
    // return
    const userInOTP = await OTP.findOne({
        userId: req.session.userId
    });

    if(userInOTP && userInOTP.otp === req.body.otp) {
        console.log('lol');
        await User.findByIdAndUpdate(req.session.userId, {
            isVerified: true
        });
        await OTP.findOneAndDelete({userId: req.session.userId});
        res.redirect('/');
    } else {
        req.flash('otpError', 'Invalid OTP');
        res.redirect('/otp')
    }
}

module.exports = verifyUserByOTP