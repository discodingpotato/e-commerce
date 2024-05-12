const productCategory = require("../../../models/productCategory");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const deleteCategory = async (req, res, next) => {
    // console.log(req.params);
    // console.log('lol');
    // res.status(200);
    // return;
    console.log(req.params);
    const categoryId = req.params.categoryId;
    await productCategory.findByIdAndUpdate(categoryId, {
        isDeleted: true
    });
    res.status(200).json({ deleted: true })
}

module.exports = deleteCategory