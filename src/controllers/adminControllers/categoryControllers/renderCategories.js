const productCategory = require("../../../models/productCategory")

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const renderCategories = async (req, res, next) => {
    const categories = await productCategory.find({ isDeleted: false });
    console.log();
    res.render('category-list', {
        categories
    })
}

module.exports = renderCategories