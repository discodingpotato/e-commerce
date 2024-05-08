const productCategory = require("../../../models/productCategory")

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const addNewCategory = async (req, res, next) => {
    const categories = await productCategory.find({});
    res.render('categories', { categories });
}

module.exports = addNewCategory