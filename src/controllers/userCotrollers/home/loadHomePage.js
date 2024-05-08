const User = require("../../../models/User");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const loadHomePage = async (req, res, next) => {
    if(!req.session.userId) {
        return res.render('home');
    }
    const userDetails = await User.findById(req.session.userId);
    const {password, ...rest} = userDetails;
    res.render('home', {userData: rest})
}

module.exports = loadHomePage