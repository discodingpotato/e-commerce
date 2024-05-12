const productCategory = require("../../../models/productCategory");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const editCategory = async (req, res, next) => {
    let categoryId = req.params.categoryId
    let updateData = {};
    if(req.body.name != undefined) updateData.name = req.body.name;
    console.log(req.body)
    if(req.body.action != 'undefined' && req.body.action == 'block'){
        updateData.isBlocked = true
    };
    if(req.body.action != undefined && req.body.action == 'unblock') updateData.isBlocked = false;
    await productCategory.findByIdAndUpdate(categoryId, updateData);
    res.status(200).json({updates: true})
}

module.exports = editCategory