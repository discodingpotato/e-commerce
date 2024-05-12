const multer = require("multer")

const productDisk = multer.diskStorage({
    destination: "src/public/images/products/haha",
    filename: (req, file, cb) => {
        const filename = file.originalname;
        console.log(filename);
        cb(null, filename)
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
const uploadProductImages = productUpload.array('images[]');

module.exports = {
    uploadProductImages,
}