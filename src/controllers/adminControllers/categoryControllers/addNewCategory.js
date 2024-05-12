const productCategory = require("../../../models/productCategory")

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const addNewCategory = async (req, res, next) => {
    /**
     * @type {string}
     */
    const categoryName = req.body.name;
    console.log(req.body.isBlocked)
    const alreadyExist = await productCategory.findOne({ name: categoryName.toLowerCase() });
    if (alreadyExist) {
        return res.status(409).json({ alreadyExist: true })
    }
    await productCategory.create({
        name: categoryName
    });
    res.status(200).json({ success: true })
}

module.exports = addNewCategory