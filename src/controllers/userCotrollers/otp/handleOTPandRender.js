const OTP = require("../../../models/OTP");
const User = require("../../../models/User");
const generateOTP = require("../../../utils/generateOTP");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const generateOTPandRender = async (req, res, next) => {
    /**
     * Find user by using session
     */
    const userDetails = await User.findById(req.session.userId);
    console.log(userDetails);;

    /**
     * If the user is already verified, redirect to home page
     */
    if(userDetails && userDetails.isVerified) {
        res.redirect('/');
    } else {
        /**
         * If not, find user in OTP document
         */
        const existingOTP = await OTP.findOne({ userId: req.session.userId });
        /**
         * if OTP exists?
         */
        if(existingOTP) {
            console.log('Generating otp is controlled');
            console.log("OTP: ", existingOTP.otp);
        } else {
            const otp = generateOTP(4, 'digits');
            await OTP.findOneAndUpdate({
                userId: req.session.userId
            }, {
                otp,
                createdAt: new Date()
            }, { upsert: true });
            console.log('OTP: ', otp)
        }
        res.render('otp', {
            userEmail: userDetails.email
        })
    }
}

module.exports = generateOTPandRender