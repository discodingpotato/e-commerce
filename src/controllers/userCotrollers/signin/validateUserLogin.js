const bcryptjs = require('bcryptjs')
const User = require("../../../models/User");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const validateUserLogin = async (req, res, next) => {
    /**
     * From Body
     */
    const { email, password } = req.body;
    /**
     * Find the values in database
     */
    let userDetails = await User.findOne({
        email
    });
    /**
     * If no user found
     */
    if(!userDetails) {
        /**
         * Flash a message in locals;
         */
        req.flash('errori', 'Email or Password invalid!');
        /**
         * redirect (here, it'll work as reload the login page)
         */
        console.log('mew');
        return res.redirect('/signin');
    }
    /**
     * Comparing the password
     */
    let passwordMatch = bcryptjs.compareSync(password, userDetails.password);
    /**
     * If no matched b/w the input and the hashed
     */
    if(!passwordMatch) {
        req.flash('errori', "Email or Password invalid!");
        console.log('lol');
        return res.redirect('/signin');
    }
    /**
     * If everything is ok?, put the user id as session;
     */
    req.session.userId = userDetails._id;
    /**
     * Checks whether the user is verified or not
     */
    if(!userDetails.isVerified) {
        req.flash('pendingVerification', 'You didn\'t verified your account. Verify to continue')
        return res.redirect('/otp')
    }
    /**
     * Redirect to the home page;
     * 
     * Showing user details is handled on front end
     */
    res.redirect('/');
}

module.exports = validateUserLogin;