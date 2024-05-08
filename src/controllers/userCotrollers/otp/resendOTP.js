const OTP = require("../../../models/OTP");
const generateOTP = require("../../../utils/generateOTP");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const resendOTP = async (req, res, next) => {
    console.log(req.session);
    let userOTP = await OTP.findOne({userId: req.session.userId});
    if(userOTP) {
        let regenOTP = generateOTP(4, 'digits');
        await OTP.findOneAndUpdate({
            userId: req.session.userId
        }, {
            otp: regenOTP,
            createdAt: new Date()
        });
        console.log('Regenerated OTP: ', regenOTP);
        return res.status(204).json('Success')    
    } else {
        return res.status(404).json('not found');
    }
}

module.exports = resendOTP


// -------------------- Additional functions to simplify --------------------

/**
 * 
 * @param {Date} createdAt 
 * @returns {boolean} A boolean value that states the contition ture or not
 */
function is1MinutesOld(createdAt) {
    let currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() - 1);
    return createdAt < currentDate
}