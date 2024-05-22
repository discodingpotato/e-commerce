const { unlink } = require("fs");
const { editProductImages } = require("../../../middlewares/editProductImages");
const product = require("../../../models/product");
const productCategory = require("../../../models/productCategory");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const editProduct = async (req, res, next) => {
    const { name, brand, price, category: categoryId, quantity, description, existingImages, specifications } = req.body;
    /**
     * Find the category
     */
    // console.log(req.body)
    // res.json({success: true})
    // return;
    let category = await productCategory.findById(categoryId);
    // console.log(category);
    /**
     * Newly uploaded image names into an array
     */
    const newlyUploadedFileNames = req.files.map(item => item.originalname);
    /**
     * Database images
     */
    let productDetails = await product.findById(req.params.productId);
    /**
     * Removed images? like, they're deleted things
     */
    let removedImages = productDetails.images.filter(img => !existingImages.includes(img));
    /**
     * Unlink files from the cdn
     */
    if(removedImages.length > 0) {
        for (let i = 0; i < removedImages.length; i++) {
            unlink('src/public/imagages/pruducts/' + productDetails._id + '/' + removedImages[i])
        }
    }
    /**
     * Just log some
     */
    console.log('Body: ', req.body);
    console.log('Removed: ',removedImages);
    console.log('Exist: ', existingImages);
    console.log('Uploaded: ', req.files);
    /**
     * Update the product
     */
    let theProduct = await product.findById(req.params.productId);
    await theProduct.updateOne({
        name, brand, price, category: category._id, quantity, description, $pull: { images: { $in: removedImages } }
    });
    await theProduct.updateOne({
        $addToSet: { images: { $each: newlyUploadedFileNames } }
    });
    /**
     * Success message?
    */
    return res.json({
        success: true
    })
}

module.exports = editProduct;