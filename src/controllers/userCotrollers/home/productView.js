const product = require("../../../models/product")

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const productView = async (req, res, next) => {
    const productDetails = await product.findById(req.params.productId);
    if(!productDetails) {
        return res.redirect('/');
    }
    res.render('productView', {
        productDetails
    })
}

module.exports = productView