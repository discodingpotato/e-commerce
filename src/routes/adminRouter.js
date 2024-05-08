const express = require('express');
const session = require('express-session');
const router = express();
const bcryptjs = require('bcryptjs')

const adminDashboardRouter = require('./adminDashboardRouter');
const { isLogin, isLogout } = require('../middlewares/adminAuth');
const User = require('../models/User');

router.use(session({
    secret: 'mew burger',
    saveUninitialized: true,
    resave: false
}))

router.set('views', './src/views/admin');

/**
 * Base (/admin)
 */
router.get('/', (req, res) => {
    res.redirect(req.baseUrl + '/login');
});

/**
 * Render login page, 
 */
router.get('/login', (req, res) => {
    let redirectUrl = req.query?.redirect
    redirectUrl ? res.render('login', { redirectUrl }) : res.render('login')
});

/**
 * Humm, Handle the login request,
 * Make sure the id is ADMIN!!!
 */
router.post('/login', async (req, res) => {
    console.log(req.body)
    const userDetails = await User.findOne({
        email: req.body.email
    });

    if(!userDetails) {
        req.flash('loginError', 'Email or Password invalid!');
        return res.redirect(req.baseUrl + '/login');
    }

    const passwordCompare = bcryptjs.compareSync(req.body.password, userDetails.password);
    if(!passwordCompare) {
        req.flash('loginError', 'Email or Password invalid!');
        return res.redirect(req.baseUrl + '/login');
    }
    
    if(!userDetails.isAdmin) {
        req.flash('loginError', 'Not Authorized!');
        return res.redirect(req.baseUrl + '/login');
    }

    req.session.adminId = userDetails._id;
    let redirectUrl = req.body.redirect
    redirectUrl ? res.redirect(req.baseUrl + redirectUrl) : res.redirect(req.baseUrl + '/dashboard')
})

router.use('/dashboard', adminDashboardRouter)



































/**
 * Just testing purpose, bummmm!!
 */
router.get('/sample', (req, res) => {
    req.query.redirect ? res.render('sample', { redirect: req.query.redirect }) : res.render('sample');
});

router.get('/sampled', (req, res) => {
    req.flash('buhaha', "mew")
    // res.render('sample');
    res.redirect(req.baseUrl + '/sample')
});

router.post('/sample', (req, res) => {
    console.log(req.url);
    console.log(req.baseUrl);

    console.log('Request received:', req.body);
    if(req.body.redirect) {
        console.log('Redirecting to:', req.baseUrl + req.body.redirect);
        res.redirect(req.baseUrl + req.body.redirect);
    } else {
        console.log('No redirect found, redirecting to /login');
        res.redirect('/login');
    }
});

module.exports = router