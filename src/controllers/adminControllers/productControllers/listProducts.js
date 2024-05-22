const product = require("../../../models/product");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const listProducts = async (req, res, next) => {
    const products = await product.find({ isDeleted: false }).populate({path: 'category', select: 'name -_id'}).lean();
    console.log(products);
    res.render('products-list', { products });
}

module.exports = listProducts;