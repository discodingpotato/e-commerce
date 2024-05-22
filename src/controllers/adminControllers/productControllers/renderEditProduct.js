const product = require("../../../models/product");
const productCategory = require("../../../models/productCategory");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const renderEditProduct = async (req, res, next) => {
    const productId = req.params.productId;
    let productDetails = await product.findById(productId).populate({
        path: 'category',
        select: 'name -_id'
    });
    productDetails.images
    let availableCategories = await productCategory.find({ isBlocked: false, isDeleted: false });

    res.render('products-edit', {
        productDetails, availableCategories
    })
}

module.exports = renderEditProduct;