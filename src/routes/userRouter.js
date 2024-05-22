const express = require('express');
const userControllers = require("../controllers/userCotrollers");
const flash = require('express-flash');
const session = require('express-session');
const { isLogin } = require('../middlewares/userAuth');
const passport = require('passport');
const router = express();

const authRouter = require('./authRouter');
// require('../auth/local');

// router.set('view engine', 'ejs')
router.set('views', './src/views/user');

router.use(session({
    secret: 'snipe cat',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: false }
}));

router.use(passport.initialize());
router.use(passport.session());

router.use((err, req, res, next) => {
    console.error(err.stack);  // Log the error stack for debugging
    res.status(500).json({      // Send a generic 500 response
        message: "Something went wrong!",
        error: err.message
    });
})

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

router.get('/signin', (req, res) => { res.render('signin') });
// router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), (req, res) => {
//     res.redirect('/');
//     console.log(req.isAuthenticated())
// })
router.post('/signin', userControllers.validateUserLogin)

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
 * Authendication??
 */

router.use('/auth', authRouter)

/**
 * -------------------------------
 * ------ Log Out / Destroy ------
 * -------------------------------
 */

router.get('/logout', isLogin, (req, res) => {
    req.logOut()
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