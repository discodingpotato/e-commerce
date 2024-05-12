const User = require("../../../models/User");
const product = require("../../../models/product");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const loadHomePage = async (req, res, next) => {
    const products = await product.find({});
    if(!req.session.userId) {
        return res.render('home', {
            products
        });
    }
    const userDetails = await User.findById(req.session.userId);
    res.render('home', {userDetails, products})
}

module.exports = loadHomePage