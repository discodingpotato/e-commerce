const multer = require("multer")

const destination = multer.diskStorage({
    destination: "src/public/images/updates/",
    filename: (req, file, cb) => {
        const filename = file.originalname;
        console.log(filename);
        cb(null, filename)
    }
});

const upload = multer({
    storage: destination,
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) { // Filter only images
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'), false);
        }
    }
});

const uploadUpdateImages = upload.array('images[]');

module.exports = {
    uploadUpdateImages,
}