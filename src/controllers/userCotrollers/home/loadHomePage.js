const User = require("../../../models/User");
const product = require("../../../models/product");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const loadHomePage = async (req, res, next) => {
    console.log(req.isAuthenticated())
    console.log(req.user);
    const products = await product.find({});
    if(!req.isAuthenticated()) {
        return res.render('home', {
            products
        });
    }
    let userDetails = req.user;
    res.render('home', {userDetails, products})
}

module.exports = loadHomePage