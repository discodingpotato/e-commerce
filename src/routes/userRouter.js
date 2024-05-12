const express = require('express');
const userControllers = require("../controllers/userCotrollers");
const flash = require('express-flash');
const session = require('express-session');
const { isLogin } = require('../middlewares/userAuth');
const router = express();

// router.set('view engine', 'ejs')
router.set('views', './src/views/user');
router.use(session({
    secret: 'snipe cat',
    saveUninitialized: true,
    resave: false
}))

router.get('/', userControllers.loadHomePage);

/**
 * -------------------------------
 * ------ Signup / Register ------
 * -------------------------------
 */

router.get('/signup', (req, res) => { res.render('signup') });
router.post('/signup', userControllers.validateRegister)

/**
 * -------------------------------
 * ------- Signin / Login --------
 * -------------------------------
*/

router.get('/signin', (req, res) => { res.render('signin')});
router.post('/signin', userControllers.validateUserLogin);

/**
 * -------------------------------
 * --------- Handle OTP ----------
 * -------------------------------
*/

router.get('/otp', isLogin, userControllers.handleOTPandRender);
router.post('/otp', isLogin, userControllers.verifyUserByOTP);
router.get('/resend-otp', userControllers.resendOTP);

/**
 * Product Details
 */

router.get('/products/:productId', userControllers.productView)

/**
 * -------------------------------
 * ------ Log Out / Destroy ------
 * -------------------------------
 */

router.get('/logout', isLogin, (req, res) => {
    req.session.destroy();
    res.redirect('/')
});

/**
 * -------------------------------
 * ----- ToS / Privacy Policy ----
 * -------------------------------
 */

router.get('/terms', (req, res) => {
    res.render('underConstruction');
})

router.get('/privacy', (req, res) => {
    res.render('underConstruction')
})


module.exports = router