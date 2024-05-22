const bcryptjs = require('bcryptjs')
const User = require("../../models/User");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
// deprecated?
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
        return res.redirect('/signin');
    }
    /**
     * Comparing the password
     */
    let passwordMatch = await userDetails.isValidPassword(password);
    /**
     * If no matched b/w the input and the hashed
     */
    if(!passwordMatch) {
        req.flash('errori', "Email or Password invalid!");
        console.log('lol');
        return res.redirect('/signin');
    }
    /**
     * Remove password hash from the database object
     */
    let {password: passhash, ...rest} = userDetails.toObject()
    /**
     * If everything is ok?, put the user id as session;
     */
    // req.session.userId = userDetails._id;
    // req.user = rest
    // console.log(req.user);
    /**
     * Checks whether the user is verified or not
     */
    if(!userDetails.isVerified) {
        req.flash('pendingVerification', 'You didn\'t verified your account. Verify to continue')
        return res.redirect('/otp');
    }
    /**
     * Redirect to the home page;
     * 
     * Showing user details is handled on front end
     */
    res.redirect('/');
}

module.exports = validateUserLogin;