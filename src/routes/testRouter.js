const express = require('express');
const { Schema, SchemaTypes, model } = require('mongoose');
const multer = require('multer');
// const { TOTP } = require('totp-generator');
const router = express();

const OTPModel = new Schema({
    identifierBish: {
        type: SchemaTypes.Number
    },
    generatedValue: {
        type: SchemaTypes.Number
    },
    createdAt: {
        type: SchemaTypes.Date,
        default: new Date()
    }
});

const otpModel = model('test-otp', OTPModel);

router.get('/', (req, res) => {
    res.send('Whatever it is. I test codes right here : )')
})

router.get('/generate-otp/:id', async (req, res) => {
    let identifierBish = req.params.id;
    const findNumber = await otpModel.findOne({ identifierBish });
    if (!findNumber || isNumberOlderThan1Minutes(findNumber.createdAt)) {
        let generatedValue = generateRandomNumber(4);
        await otpModel.findOneAndUpdate({
            identifierBish
        }, {
            generatedValue,
            createdAt: new Date()
        });
        return res.json({ 'id': identifierBish, 'val': generatedValue })
    };
    return res.json({ 'id': identifierBish, 'val': findNumber.generatedValue })
})

function generateRandomNumber(digits) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(min + Math.random() * (max - min + 1));
}


function isNumberOlderThan1Minutes(createdAt) {
    const tenMinutesAgo = new Date();
    tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 1);
    return createdAt < tenMinutesAgo;
}

router.get('/exclude', (req, res) => {
    const data = { buhaha: 'lol', mew: 'ok' };
    const { buhaha: lol, ...rest } = data;
    res.json(rest)
});


router.get('/referal', (req, res) => {
    // const mew = TOTP.generate("JBSWY3DPEHPK3PXP", {algorithm:'SHA-512', digits: 4});
    // res.json(mew)
});


router.get('/otp-package', (req, res) => {
    let lol = generate(4, {
        digits: true,
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false
    });
    res.json(lol)
});

router.set('views', 'src/views/mew');
router.set('view engine', 'ejs')

router.get('/image', (req, res) => {
    res.render('me');
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Where to store the files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Filename
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
    },
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) { // Filter only images
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'), false);
        }
    }
});

router.post('/image', upload.single('humm'), (req, res) => {
    console.log(req.file);
    res.json('mwuhehe')
})

module.exports = router;
