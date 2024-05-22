const productCategory = require("../../../models/productCategory");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const renderAddProduct = async (req, res, next) => {
    const availableCategories = await productCategory.find({ isBlocked: false, isDeleted: false });
    console.log(availableCategories)
    res.render('products-add', {
        availableCategories
    });
}

module.exports = renderAddProduct;