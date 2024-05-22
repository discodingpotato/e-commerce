const passport = require('passport');
const oauthLogins = require('../models/oauthLogins');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:7000/auth/google/callback"
}, async function (accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //     return 
    // });
    // console.log(profile)
    let userDetails = await oauthLogins.findOneAndUpdate({ strategyId: profile.id }, {
        displayName: profile.displayName,
        email: profile.emails[0].value,
        profile: profile.photos[0].value,
        provider: profile.provider,
    }, { new: true, upsert: true })
    cb(null, userDetails);
}
));

passport.serializeUser((user, done) => {
    done(null, user._id)
});

passport.deserializeUser(async (userId, done) => {
    const googleAuthDetails = await oauthLogins.findById(userId)
    done(null, googleAuthDetails)
})