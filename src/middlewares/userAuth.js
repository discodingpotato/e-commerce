const User = require("../models/User");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const isLogin = async (req, res, next) => {
    if(req.session.userId) {
        let userDetails = await User.findById(req.session.userId);
        if(userDetails && userDetails.isBlocked) {
            return res.render('blocked');
        }
        next();
    } else {
        res.redirect('/signin');
    }
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const isLogout = (req, res, next) => {
    if(req.session.userId) {
        res.redirect('/');
    } else {
        next()
    }
}

module.exports = {
    isLogin,
    isLogout
}