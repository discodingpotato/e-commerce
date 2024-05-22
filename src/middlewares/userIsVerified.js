const userSchema = require('../models/User');
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const userIsVerified = async (req, res, next) => {
    const userDetails = await userSchema.findById(req.session.user.id);
    if(userDetails.isVerified) {
        res.redirect('/')
    } else {
        res.redirect('/otp')
    }
}

module.exports = userIsVerified;