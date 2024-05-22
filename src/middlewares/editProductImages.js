const multer = require("multer")
    
    const productDisk = multer.diskStorage({
        destination: (req,file, cb) => {
            cb(null, `src/public/images/products/${req.params.productId}`);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    });

    const productUpload = multer({
        storage: productDisk,
        fileFilter: function (req, file, cb) {
            if (file.mimetype.startsWith('image/')) { // Filter only images
                cb(null, true);
            } else {
                cb(new Error('Only images are allowed!'), false);
            }
        }
    });
    
    const editProductImages =  productUpload.array('images');

module.exports = {
    editProductImages,
}