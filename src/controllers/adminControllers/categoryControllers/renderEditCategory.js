const productCategory = require("../../../models/productCategory");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const renderEditCategory = async (req, res, next) => {
    const categoryId = req.params.categoryId;
    let categoryData = await productCategory.findById(categoryId);
    res.render('category/editCategory', { categoryData })
}

module.exports = renderEditCategory