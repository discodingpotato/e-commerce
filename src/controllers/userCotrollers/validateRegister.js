const bcryptjs = require('bcryptjs')
const User = require("../../models/User");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const validateRegister = async (req, res, next) => {
    // let lol = {"displayName":"made her beg","email":"imminibelyaonn@ikru.lol","phoneno":"6567576565","password":"po0(Asae","referal":"21SDQ"}
    console.log(req.body);
    // res.json(req.body);
    // return;
    /**
     * Request body
     */
    const { displayName, email, phoneno, password, referal } = req.body;
    /**
     * Trying to find existing user using provided email
     */
    let userData = await User.findOne({ email });
    /**
     * If user exist with the email
     */
    if (userData) {
        req.flash('emailError', 'Email already exists!');
        return res.redirect('/signup');
    };
    /**
     * Hash the password
     */
    let hashedPassword = bcryptjs.hashSync(password, 10);
    /**
     * Create a new user
     */
    let newUserData = await User.create({
        displayName, email, phoneno, password: hashedPassword
    });
    /**
     * Add userId in session
     */
    req.session.userId = newUserData._id;
    /**
     * Redirect to the otp
     */
    res.redirect('/otp')
}

module.exports = validateRegister