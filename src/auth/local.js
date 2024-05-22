const passport = require("passport")
const User = require("../models/User")
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const userDetails = await User.findOne({
        email
    });
    if (!userDetails || !await userDetails.isValidPassword(password)) {
        return done(null, false, { message: 'Email or Password invalid!' })
    }
    const { password: pass, ...rest } = userDetails.toObject()
    done(null, rest);
    return;
}));

passport.serializeUser((user, done) => {
    done(null, user._id)
});

passport.deserializeUser(async (userId, done) => {
    let userDetails = await User.findById(userId);
    let {password, ...rest} = userDetails.toObject();
    done(null, rest);
});