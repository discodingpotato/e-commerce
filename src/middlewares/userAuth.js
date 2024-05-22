const isBlocked = require("../helper/isBlocked");
const User = require("../models/User");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const isLogin = async (req, res, next) => {
    if(req.isAuthenticated()) {
        const userBlocked = await isBlocked(req.session.userId);
        if(userBlocked) {
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